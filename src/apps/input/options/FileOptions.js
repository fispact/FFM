import React from 'react';
import { LabelWithCheck } from '../../Utils.js';

import '../../App.css';
//import './FileOptions.css';

function FileOptions(props){

    return(
        <div className="wrap-collabsible">
            <input id="collapsible-fileoptions" className="toggle" type="checkbox" />
            <label htmlFor="collapsible-fileoptions" className="lbl-toggle">File options</label>
            <div className="collapsible-content">
                <div className="content-inner">
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="usejson" label="Enable JSON output?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Introduced in version 4.0, this option causes FISPACT-II to produce an additional output file, conforming to standard JSON format.'>?</button>
                    </div>
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="clobber" label="Overwrite files?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='In order to prevent accidental loss of data, the default action of FISPACT-II is to terminate with a fatal error if output files of the same names as specied in the current run already exist in the present working directory. This option allows existing output files to be overwritten without any error messages from the program.'>?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {FileOptions};