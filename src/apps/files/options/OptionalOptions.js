import React from 'react';
import ReactTooltip from 'react-tooltip'

import '../../App.css';
import './OptionalOptions.css';

function OptionalOptions(props){

    var eafoptions = null;
    if(!props.eaf){
        eafoptions = 
        <div>
            <div>
                <label className="Files-lbl">Binary cross section file:</label>
                <input className="Files-optional-input" type="text" name="xs_endfb" onChange={props.handleFileChange}/>
                <button className="Files-optional-button" data-tip='If you have used compress_xs_endf tool to create a binary file then enter that file here. Remember to use this use GETXS -1.'>?</button>  
            </div>
            <div>
                <label className="Files-lbl">Additional cross section dir:</label>
                <input className="Files-optional-input" type="text" name="xs_extra" onChange={props.handleFileChange}/>
                <button className="Files-optional-button" data-tip='If using USEXSEXTRA then point to additional cross section data stream (directory).'>?</button>
            </div>
        </div>;
    }

    return(
        <div>
            <ReactTooltip getContent={(dataTip) =>  <h4>{dataTip}</h4> } delayHide={1000} multiline={true} className="Files-tooltip"/>
            <div className="wrap-collabsible">
                <input id="collapsible-optionaloptions" className="Files-toggle" type="checkbox" />
                <label htmlFor="collapsible-optionaloptions" className="Files-lbl-toggle">Optional options</label>
                <div className="Files-collapsible-content">
                    <div className="Files-content-inner">
                        <div>
                            {eafoptions}
                        </div>
                        <div>
                            <label className="Files-lbl">Pathways index file:</label>
                            <input className="Files-optional-input" type="text" name="ind_nuco" onChange={props.handleFileChange}/>
                            <button className="Files-optional-button" data-tip='If INDEXPATH is used with pathways analysis, this will set the output file name for the nuclide index file. This file will be created.'>?</button>
                        </div>
                        <div>
                            <label className="Files-lbl">Custom gamma group file:</label>
                            <input className="Files-optional-input" type="text" name="ggbins" onChange={props.handleFileChange}/>
                            <button className="Files-optional-button" data-tip='If READGG is used, it requires a custom file for input with the gamma spectrum energy bin boundaries. Energies should in specified in ascending order and in units of eV. This file must exist.'>?</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap-collabsible">
                <input id="collapsible-defaultoptions" className="Files-toggle" type="checkbox" />
                <label htmlFor="collapsible-defaultoptions" className="Files-lbl-toggle">Advanced custom configuration</label>
                <div className="Files-collapsible-content">
                    <div className="Files-content-inner">
                        <div>
                            <label className="Files-lbl">Input filename:</label><input className="Files-optional-input" type="text" name="input" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">Output filename:</label><input className="Files-optional-input" type="text" name="output" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">Arbitary flux file:</label><input className="Files-optional-input" type="text" name="arb_flux" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">Graph filename:</label><input className="Files-optional-input" type="text" name="graph" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">Graph gnuplot file:</label><input className="Files-optional-input" type="text" name="gnuplot" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">TAB1 file:</label><input className="Files-optional-input" type="text" name="tab1" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">TAB2 file:</label><input className="Files-optional-input" type="text" name="tab2" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">TAB3 file:</label><input className="Files-optional-input" type="text" name="tab3" onChange={props.handleFileChange}/>
                        </div>
                        <div>
                            <label className="Files-lbl">TAB4 file:</label><input className="Files-optional-input" type="text" name="tab4" onChange={props.handleFileChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { OptionalOptions };