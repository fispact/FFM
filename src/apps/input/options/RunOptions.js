import React from 'react';
import { LabelWithCheck } from '../../Utils.js';

import '../../App.css';
//import './RunOptions.css';

function RunOptions(props){

    return(
        <div className="wrap-collabsible">
            <input id="collapsible-runoptions" className="toggle" type="checkbox" />
            <label htmlFor="collapsible-runoptions" className="lbl-toggle">Run settings</label>
            <div className="collapsible-content">
                <div className="content-inner">
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="spek" label="Approximate gamma spectrum?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Use this option to cause the calculation of an approximate γ spectrum for nuclides in the decay library which have no spectral data. These nuclides are flagged by an ‘&’ in the inventory output.'>?</button>
                    </div>
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="verbose" label="Verbose output during run?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Use this option to print the run status and current process to stdout (terminal output).'>?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {RunOptions};