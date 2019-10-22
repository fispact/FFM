import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { saveAs } from 'file-saver';

import { LabelWithInput } from '../Utils.js'
import { getRawText } from './KeywordCreator.js'
import { MaterialTable } from './MaterialTable.js'
import { Table } from './periodictable/Table.js';

import { FileOptions } from './options/FileOptions.js';
import { NuclearDataOptions } from './options/NuclearDataOptions';
import { OutputOptions } from './options/OutputOptions.js';
import { RunOptions } from './options/RunOptions.js';

import './InputFile.css';
import '../App.css';

class InputFile extends Component {

  constructor( props ) {
    super( props );

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDownloadFile = this.handleDownloadFile.bind(this);
    this.handleElements = this.handleElements.bind(this);
    this.handleFuel = this.handleFuel.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSelectedElements = this.handleSelectedElements.bind(this);
    this.renderElementTableEditable = this.renderElementTableEditable.bind(this);

    this.state = {
      name: "",
      options: {
        clobber: false,
        usejson: false,
        spek: false,
        half: false,
        clear: false,
        atwo: false,
        usearrayx: false,
        readsf: false,
        verbose: false,
        showElements: false,
      },
      totalMass: 1.0,
      elemental: [],
      isotopic: []
    }
  }

  getTextInput(){
    var input = Object.assign({}, this.state);
    input['group'] = this.props.group;
    input['particle'] = this.props.particle;
    input['eaf'] = this.props.eaf;
    return getRawText(input);
  }

  handleNameChange(e){
    var name = e.target.value;
    this.setState({ name: name });
  }

  handleSelectedElements(elements){
      var elemental = [];
      const defaultvalue = 100.0/elements.length;
      for(var i=0;i<elements.length;++i){
        elemental.push({
          element: elements[i], 
          percent: defaultvalue
        });
      }
      this.setState({ 
        elemental: elemental
      });
  }

  handleOptionChange = (e) => {
    const { name } = e.target;
    const option = e.target.checked;
    var options = {...this.state.options};
    options[name] = option;
    this.setState({
      options: options,
    });
  }

  handleElements(){
    this.setState({
      showElements: !this.state.showElements
    });
  }

  handleFuel(){
    //todo: implement
  }

  handleDownloadFile(){
    const rawtext = this.getTextInput();
    const blob = new Blob([rawtext[0]], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "input.i");
  }

  renderElementTableEditable(cellInfo){
    var elemental = [...this.state.elemental];
    return (
      <div
        style={{ backgroundColor: "#e8eaec" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          elemental[cellInfo.index].percent = parseFloat(e.target.innerHTML);
          this.setState({ 
            elemental: elemental 
          });
        }}
        dangerouslySetInnerHTML={{
          __html: elemental[cellInfo.index].percent
        }}
      />
    );
  };

  render() {
    const data = this.getTextInput();
    const selectedElements = this.state.elemental.map(e => e.element);
    var tableElementData = [];
    for(var i=0;i<this.state.elemental.length;++i){
      tableElementData.push({
        element: this.state.elemental[i].element, 
        value: this.state.elemental[i].percent
      });
    }

    return (
      <div>
        <ReactTooltip getContent={(dataTip) =>  <h4>{dataTip}</h4> } delayHide={1000} multiline={true} className="Input-tooltip"/>
        <div className={this.state.showElements ? 'hidden' : ''}>
          <div className="App-left">
            <div className="App-content">
              <div>
                Run name: <input className="App-name-input" type="text" name="Name" onChange={this.handleNameChange}/>
              </div>

              <br/>

              <div className="App-mass">
                <h4>Material selection</h4>
                <button className="App-button" onClick={this.handleElements}>Choose...</button>
                <LabelWithInput 
                  name="Total Mass" 
                  handler={(e) => {this.setState({ totalMass: Math.max(0.0, parseFloat(e.target.value)) })}} 
                  unit="kg"
                  />
                <MaterialTable data={tableElementData} renderElementEditable={this.renderElementTableEditable}/>
                <p>Percentages do not have to sum to 100% but will be automatically normalised on a FISPACT-II run</p>
              </div>   

              <br/>
              
              <FileOptions handleOptionChange={this.handleOptionChange}/>
              <NuclearDataOptions handleOptionChange={this.handleOptionChange}/>
              <OutputOptions handleOptionChange={this.handleOptionChange}/>
              <RunOptions handleOptionChange={this.handleOptionChange}/>

            </div>
          </div>

          <div className="App-right">
            <textarea className="Input-fileviewer" value={data[0]} rows={data[1]} readOnly/>
            <button className="App-button" onClick={this.handleDownloadFile}>Download input file</button>
          </div>
        </div>
        
        <div className={this.state.showElements ? '': 'hidden'}>
          <div className="App-wrapper">
            <Table handleClose={this.handleElements} 
                   handleSelectedElements={this.handleSelectedElements} 
                   selectedElements={selectedElements}/>
          </div>
        </div>
      </div>
    );
  }
}

export default InputFile;
