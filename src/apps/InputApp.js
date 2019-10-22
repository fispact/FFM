import React from 'react';

import Header from './Header.js';
import InputFile from './input/InputFile.js';

import './App.css';

function InputApp(props) {

    return (
      <div className="App">
      <Header {...props}/>
      <InputFile group={props.data.group} 
                 particle={props.data.particle}
                 eaf={props.data.eaf} 
      />
      </div>
    );
}

export default InputApp;
