import React from 'react';
import { stack as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";

import { DropdownInput } from './Utils.js';

import './App.css';

function Header(props) {

    return (
      <div>
        <div className="App-title">
          FISPACT-II File Maker
        </div>
        
        <Menu>
          {/* <Link id="input file" className="menu-item" to="/input">Input File</Link> */}
          <Link id="files file" className="menu-item" to="/ffm/files">Files File</Link>
          <Link id="fluxes file" className="menu-item" to="/ffm/fluxes">Fluxes File</Link>
          <div className="bm-item-entry">
            <div className="bm-item-subentry">
              Cross section data: <DropdownInput 
                          classname="select" 
                          data={props.data.availableLibraries} 
                          handler={props.handleLibraryChange}
                          selected={props.data.library}/>
            </div>
            <div className="bm-item-subentry">
              Particle: <DropdownInput 
                          classname="select" 
                          data={props.data.availableParticles} 
                          handler={props.handleParticleChange}
                          selected={props.data.particle}/>
            </div>
            <div className="bm-item-subentry">
              Group: <DropdownInput 
                        classname="select" 
                        data={props.data.availableGroups} 
                        handler={props.handleGroupChange}
                        selected={props.data.group}/>
            </div>
          </div>
        </Menu>
      </div>
    );
}

export default Header;
