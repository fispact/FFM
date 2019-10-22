import React from 'react';
import { LabelWithCheck } from '../../Utils.js';

import '../../App.css';
//import './NuclearDataOptions.css';

function NuclearDataOptions(props){

    return(
        <div className="wrap-collabsible">
            <input id="collapsible-ndoptions" className="toggle" type="checkbox" />
            <label htmlFor="collapsible-ndoptions" className="lbl-toggle">Nuclear data options</label>
            <div className="collapsible-content">
                <div className="content-inner">
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="readsf" label="Read spontaneous fission library data" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='This option causes the ENDF spontaneous fission yield data to be read, and has no effect for EAF data libraries. The directory containing the spontaneous fission yield data is specified by the keyword sf_endf in the files file.'>?</button>
                    </div>
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="usearrayx" label="Read previous arrayx file?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Use this option to read decay data from an existing condensed decay library arrayx file.'>?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {NuclearDataOptions};