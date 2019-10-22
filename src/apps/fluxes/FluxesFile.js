import React, { Component } from 'react';
import { saveAs } from 'file-saver';
import Dropzone from 'react-dropzone'
import _ from 'lodash'

import { ALL_GROUPS } from '../Groups';
import { DropdownInput } from '../Utils.js';
import { GroupStructurePlot } from './GroupStructurePlot.js';
import { FluxPlot } from './FluxPlot.js';
import { FluxTable } from './FluxTable';
import { getRawText } from './DataCreator.js';
import {
    getRefDataSetNames,
    getRefData
} from './RefDataHandler.js';

import './FluxesFile.css';
import '../App.css';

const allgroups = Object.keys(ALL_GROUPS);//.concat("custom");
const refdatanames = ["random", "flat", "linear", "custom"].concat(getRefDataSetNames());

class FluxesFile extends Component {

  constructor( props ) {
    super( props );

    this.handleDownloadFile = this.handleDownloadFile.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleRefDataChange = this.handleRefDataChange.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.onDrop = this.onDrop.bind(this);
    
    this.delayedCallback = _.debounce(this.changeName, 1000);

    const group = props.group;
    const bounds = ALL_GROUPS[group].reverse(); 
    const groupPlotData = this.generateGroupVisData(bounds);  
    const values = this.randomData(group);
    const [plotData, tableData] = this.generateSpectraVisData(bounds, values);
      
    this.state = {
      name: "",
      normalisation: 1.0,
      group: group,
      values: values,
      fluxPlotData: plotData,
      bounds: bounds,
      groupPlotData: groupPlotData,
      tableData: tableData,
      refDataName: refdatanames[0],
    }
  }

  renderEditable(cellInfo){
    var values = [...this.state.values];
    var plotData = [...this.state.fluxPlotData];
    // var tableData = [...this.state.tableData];
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          values[cellInfo.index] = parseFloat(e.target.innerHTML);
          plotData[2*cellInfo.index].y = values[cellInfo.index];
          plotData[2*cellInfo.index+1].y = values[cellInfo.index];
          // tableData[2*cellInfo.index].value = values[cellInfo.index];
          // tableData[2*cellInfo.index+1].value = values[cellInfo.index];
          this.setState({ 
            // tableData: tableData,
            fluxPlotData: plotData, 
            values: values 
          });
        }}
        dangerouslySetInnerHTML={{
          __html: values[cellInfo.index]
        }}
      />
    );
  };

  // expects bounds and values in ascending energy order
  generateSpectraVisData(bounds, values){
    var fluxPlotData = [];
    var tablePlotData = [];
    for(var i=0;i<bounds.length-1;++i){
      fluxPlotData.push({ x: bounds[i], y: values[i]});
      fluxPlotData.push({ x: bounds[i+1], y: values[i]});
      tablePlotData.push({
          lowerEnergy: bounds[i], 
          upperEnergy: bounds[i+1], 
          value: values[i]
      });
    }

    return [fluxPlotData, tablePlotData];
  }

  // returns bounds in ascending energy order
  generateGroupVisData(bounds){
    var groupPlotData = [];
    var v = 1;
    
    for(var i=0;i<bounds.length;++i){
      // data.push({ x: Math.log(bounds[i]), y: v});
      groupPlotData.push({ x: bounds[i], y: v});
      groupPlotData.push({ x: bounds[i]*(1+1e-15), y: -v});
      v = -v;
    }
    return groupPlotData;
  }
  
  handleRefDataChange(e){
    const name = e.target.value;
    const group = this.state.group;
    var bounds = [...this.state.bounds];
    var values = [];
    var plotData = [];
    var tableData = [];
    var groupPlotData = [...this.state.groupPlotData];
    if(name === "random"){
      values = this.randomData(group);
    }
    else if(name === "flat"){
      values = new Array(group);
      for(var i=0; i<group;++i){
        values[i] = 1.0;
      }
    }
    else if(name === "linear"){
      values = new Array(group);
      for(i=0; i<group;++i){
        values[i] = (Math.log(bounds[i]) + Math.log(bounds[i+1]))/2.0 + 20.;
      }
    }else{
      [bounds, values] = getRefData(name);
    }

    [plotData, tableData] = this.generateSpectraVisData(bounds, values);
    groupPlotData = this.generateGroupVisData(bounds);  
    
    this.setState({ 
      group: values.length, 
      refDataName: name,
      bounds: bounds,
      values: values,
      fluxPlotData: plotData,
      groupPlotData: groupPlotData,
      tableData: tableData
    });
  }

  // predefined group
  handleGroupChange(e){
    const group = e.target.value;
    const name = "random";
    var bounds = [];
    var values = [];
    var plotData = [];
    var tableData = [];
    var groupPlotData = [];

    if(group in ALL_GROUPS){    
      bounds = ALL_GROUPS[group].reverse(); 
      groupPlotData = this.generateGroupVisData(bounds);
      values = this.randomData(group);
      [plotData, tableData] = this.generateSpectraVisData(bounds, values);
    }

    this.setState({ 
      refDataName: name,
      group: group, 
      values: values, 
      bounds: bounds,
      fluxPlotData: plotData,
      groupPlotData: groupPlotData,
      tableData: tableData
    });
  }

  changeName(e){
    this.setState({name: e.target.value});
  }

  handleNameOnChange(e) {
    //This will ensure that the event is not pooled
    e.persist();
    this.delayedCallback(e);
  }

  handleDownloadFile(){
    var input = Object.assign({}, this.state);
    const rawtext = getRawText(input);
    const blob = new Blob([rawtext], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "fluxes.data");
  }

  randomData(group){
    var data = new Array(group);
    for(var i=0; i<group;++i){
      data[i] = Math.random();
    }
    return data;
  }

  onDrop(acceptedFiles) {
    const reader = new FileReader();

    reader.onabort = () => {
      console.log('file reading was aborted');
      this.setState({customFluxFileData: ""});
    }

    reader.onerror = () => {
      console.log('file reading has failed');
      this.setState({customFluxFileData: ""});
    }

    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      // console.log(binaryStr)
      var filedata = {};
      //var msg = "";
      try{
        filedata = binaryStr.split("\n");
      }catch(e) {
        console.log('Invalid file format - invalid JSON file.');
        //msg = "Invalid file format - invalid JSON file. Try another file.";
      }

      // strip off empty lines
      var filtered = filedata.filter(function (el) {
        return el !== "" && el !== "\n";
      });

      var correctedvalues = [];
      for (var i=0;i<filtered.length-2;++i){
        var line = filtered[i].replace(/(^\s+|\s+$)/g,'').split(" ");
        for(var j=0;j<line.length;++j){
          if(line[j].replace(/(^\s+|\s+$)/g,'') !== ""){
            correctedvalues.push(parseFloat(line[j]));
          }
        }
      }

      // only supports pre defined group files
      var values = []
      for(i=0;i<correctedvalues.length;++i){
        values.push(correctedvalues[i]);
      }
      values = values.reverse()

      const group = values.length;
      var bounds = [];
      var plotData = [];
      var tableData = [];
      var groupPlotData = [];

      if(group in ALL_GROUPS){    
        bounds = ALL_GROUPS[group].reverse(); 
        groupPlotData = this.generateGroupVisData(bounds);
        [plotData, tableData] = this.generateSpectraVisData(bounds, values);
      }

      this.setState({ 
        refDataName: "custom",
        group: group, 
        values: values, 
        bounds: bounds,
        fluxPlotData: plotData,
        groupPlotData: groupPlotData,
        tableData: tableData
      });
    }

    acceptedFiles.forEach(file => reader.readAsBinaryString(file))
  }

  render() {
    // remove zero entries, since causes issues on log log plots
    const filteredPlotData = [...this.state.fluxPlotData].filter(function(value, index, arr){
      return value.y > 0;
    });

    return (
      <div>
        <div className="App-wrapper">
            <div>
              Title 
              <input 
                className="Fluxes-name-input" 
                type="text" 
                name="Name" 
                onChange={this.handleNameOnChange.bind(this)}
              />
              <div style={{marginTop: "30px"}}>
                Group: <DropdownInput 
                          classname="select" 
                          data={allgroups} 
                          handler={this.handleGroupChange}
                          selected={this.state.group}/>
              </div>
              <div style={{marginTop: "10px"}}>
                Example spectra: <DropdownInput 
                          classname="Fluxes-select" 
                          data={refdatanames} 
                          handler={this.handleRefDataChange}
                          selected={this.state.refDataName}/>
              </div>
            </div>

            <Dropzone onDrop={this.onDrop}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p style={{color: "#c21724"}}>Drag 'n' drop a flux file here instead...</p>
                  </div>
                </section>
              )}
            </Dropzone>
            
            <div className="centered">
              <GroupStructurePlot data={this.state.groupPlotData} />
            </div>
            <div className="centered">
              <FluxPlot data={filteredPlotData}/>
              <FluxTable data={this.state.tableData} renderEditable={this.renderEditable}/>
              <button className="App-button" onClick={this.handleDownloadFile}>
                Download Fluxes File
              </button>
            </div>
        </div>
      </div>
    );
  }
}

export default FluxesFile;
