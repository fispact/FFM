import React, { Component } from 'react';
import { saveAs } from 'file-saver';

import { getRawText } from './PathCreator.js';
import { OptionalOptions } from './options/OptionalOptions.js';
import { USE_CUSTOM_GROUP } from '../Groups.js';
import { LabelWithCheck, DropdownInput } from '../Utils.js';

import {
  getAvailableSFLibraries,
  getAvailableFYLibraries
} from '../../configHandler';

import './FilesFile.css';
import '../App.css';

const SF_LIBS = ["-"].concat(getAvailableSFLibraries());
const FY_LIBS = ["-"].concat(getAvailableFYLibraries());

class FilesFile extends Component {

  constructor( props ) {
    super( props );

    this.handleDirChange = this.handleDirChange.bind(this);
    this.handleDownloadFile = this.handleDownloadFile.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleWindowsPathChange = this.handleWindowsPathChange.bind(this);

    this.handleFYChange = this.handleFYChange.bind(this);
    this.handleSFChange = this.handleSFChange.bind(this);

    this.state = {
      base_dir: "",
      fy_lib: "",
      sf_lib: "",
      windowsStylePaths: false,
      files: {
        custom_xs: "",
        fluxes: "",
        input: "",
        output: "",
        arb_flux: "",
        graph: "",
        gnuplot: "",
        tab1: "",
        tab2: "",
        tab3: "",
        tab4: "",
        ind_nuco: "",
        enbins: "",
        ggbins: "",
        xs_extra: "",
        xs_endfb: "",
      }
    }
  }

  getTextInput(){
    var input = Object.assign({}, this.state);
    input['group'] = this.props.group;
    input['particle'] = this.props.particle;
    input['eaf'] = this.props.eaf;
    input['library'] = this.props.library;

    if(this.props.group !== USE_CUSTOM_GROUP){
      input.files['enbins'] = "";
      input.files['custom_xs'] = "";
    }
    
    return getRawText(input, this.state.windowsStylePaths);
  }

  handleWindowsPathChange(e){
    var windowsStylePaths = e.target.checked;
    this.setState({ windowsStylePaths: windowsStylePaths });
  }

  handleDirChange(e){
    var base_dir = e.target.value;
    this.setState({ base_dir: base_dir });
  }

  handleFYChange(e){
    this.setState({ fy_lib: e.target.value });
  }
  handleSFChange(e){
    this.setState({ sf_lib: e.target.value });
  }

  handleDownloadFile(){
    const rawtext = this.getTextInput();
    const blob = new Blob([rawtext[0]], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "fispact.files");
  }

  handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.value;
    var files = {...this.state.files};
    files[name] = file;
    this.setState({
      files: files,
    });
  }

  render() {

    var data = this.getTextInput();

    var customgroupoptions = null;
    if(this.props.group === USE_CUSTOM_GROUP){
        customgroupoptions = 
        <div>
          <div>
            Custom XS file: 
            <input className="Files-flux-input" type="text" name="custom_xs" onChange={this.handleFileChange}/>
          </div>
          <div>
            Custom XS group bounds file: 
            <input className="Files-flux-input" type="text" name="enbins" onChange={this.handleFileChange}/>
          </div>
        </div>;
    }
    var sfoptions = null;
    if(!this.props.eaf){
      sfoptions = 
      <div>
        <div>
        Fission yield data: <DropdownInput 
                            classname="select" 
                            data={FY_LIBS}
                            selected={this.state.fy_lib}
                            handler={this.handleFYChange} />
        </div>
        <br/>
        <div>
        Spontaneous fission data: <DropdownInput 
                            classname="select" 
                            data={SF_LIBS}
                            selected={this.state.sf_lib}
                            handler={this.handleSFChange}  />
        </div>
      </div>
    }

    var placeholderPath = "/path/to/FISPACT-II/nuclear_data";
    if(this.state.windowsStylePaths){
      placeholderPath = "C:\\path\\to\\FISPACT-II\\nuclear_data";
    }

    return (
      <div>
        <div className="App-left">
            <div className="App-content">
                <div>
                <p>Nuclear data directory:</p>
                <input className="Files-path-input" type="text" placeholder={placeholderPath} name="Base directory" onChange={this.handleDirChange}/>
                </div>
                <div  className="Files-note">
                *Note that paths are pre-set for the distributed directories of FISPACT-II. Paths can also be relative.
                <br />
                <br />
                <LabelWithCheck 
                    classname="App-checkbox" 
                    name="windowsStylePaths" 
                    label="Enable windows style paths?" 
                    handler={this.handleWindowsPathChange}
                    value={this.state.windowsStylePaths}/>
                    </div>
                <br />
                <div>
                Fluxes filename: <input className="Files-flux-input" type="text" name="fluxes" onChange={this.handleFileChange}/>
                </div>

                <br />
                {sfoptions}
                <br />
                {customgroupoptions}
                <br />
                <OptionalOptions eaf={this.props.eaf} handleFileChange={this.handleFileChange}/>
            </div>
        </div>

        <div className="App-right">
            <textarea className="Files-fileviewer" value={data[0]} rows={data[1]} readOnly/>
            <button className="App-button" onClick={this.handleDownloadFile}>Download files file</button>
        </div>
        
      </div>
    );
  }
}

export default FilesFile;
