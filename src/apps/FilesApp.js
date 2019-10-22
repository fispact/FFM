import React from 'react';

import Header from './Header.js';
import FilesFile from './files/FilesFile.js';

import './App.css';

function FilesApp(props) {
    return (
      <div className="App">
        <Header {...props}/>
        <FilesFile group={props.data.group} 
                   particle={props.data.particle}
                   eaf={props.data.eaf} 
                   library={props.data.library} 
        />
      </div>
    );
}

export default FilesApp;
