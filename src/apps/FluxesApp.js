import React from 'react';

import Header from './Header.js';
import FluxesFile from './fluxes/FluxesFile.js';

import './App.css';

function FluxesApp(props) {
  return (
    <div className="App">
      <Header {...props}/>
      <FluxesFile group={props.data.group} />
    </div>
  );
}

export default FluxesApp;
