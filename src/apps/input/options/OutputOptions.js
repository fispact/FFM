import React from 'react';
import { LabelWithCheck } from '../../Utils.js';

import '../../App.css';
//import './OutputOptions.css';

function OutputOptions(props){

    return(
        <div className="wrap-collabsible">
            <input id="collapsible-outputoptions" className="toggle" type="checkbox" />
            <label htmlFor="collapsible-outputoptions" className="lbl-toggle">Output options</label>
            <div className="collapsible-content">
                <div className="content-inner">
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="half" label="Output halflives?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Use this option to allow the half-life of each nuclide to be printed in the output at all timesteps. The units are seconds, but if the nuclide is stable then the word ‘Stable’ is printed'>?</button>
                    </div>
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="clear"label="Output clearance data?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Use this option to allow the clearance data of radionuclides to be input, the calculations to include these data to be performed and the results for individual nuclides and summed clearance indices to be output at all timesteps'>?</button>
                    </div>
                    <div>
                        <LabelWithCheck classname="App-checkbox" name="atwo" label="Output legal limits data?" handler={props.handleOptionChange}/>
                        <button className="Input-optional-button" data-tip='Use this option to allow the legal limits of activity for transport of radioactive material to be read, the calculations to include these data to be performed and the results for individual nuclides and summed values to be output for all timesteps.'>?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {OutputOptions};