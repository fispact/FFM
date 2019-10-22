import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter } from 'react-router-dom';

import {
    getAvailableXSLibraries,
    getXSEAFLibraries,
    getAvailableParticles,
    getAvailableGroups
} from './configHandler';

import InputApp from './apps/InputApp';
import FilesApp from './apps/FilesApp';
import FluxesApp from './apps/FluxesApp';

const ND_LIBS = getAvailableXSLibraries();
const EAF_LIBS = getXSEAFLibraries();

class Main extends Component {

    constructor( props ) {
      super( props );

      this.handleGroupChange = this.handleGroupChange.bind(this);
      this.handleLibraryChange = this.handleLibraryChange.bind(this);
      this.handleParticleChange = this.handleParticleChange.bind(this);

      const particles = getAvailableParticles(ND_LIBS[0]);
      const particle = particles.length > 0 ? particles[0] : null;
      const groups = getAvailableGroups(ND_LIBS[0], particle);
      const group = groups.length > 0 ? groups[0] : null;

      this.state = {
        eaf: false,
        group: group,
        availableGroups: groups,
        particle: particle,
        availableParticles: particles,
        library: ND_LIBS[0],
        availableLibraries: ND_LIBS
      }
    }
  
    handleGroupChange(e){
        var group = e.target.value;
        var groupValue = null;
    
        if(!isNaN(group)){
          groupValue = parseInt(group, 10);
        }
        else{
          groupValue = group;
        }
        
        this.setState({ group: groupValue });
    }
  
    handleLibraryChange(e){
      var library = e.target.value;
      // eaf is a special case
      var found = false;
      if(EAF_LIBS.find(function(lib) {
        return lib === library;
      })){
          found = true;
      }

      const particles = getAvailableParticles(library);
      const groups = getAvailableGroups(library, particles[0]);

      this.setState({ 
          eaf: found, 
          library: library,
          group: groups[0],
          availableGroups: groups,
          particle: particles[0],
          availableParticles: particles,
        });
    }

    handleParticleChange(e){
      var particle = e.target.value;
      const library = this.state.library;
      const groups = getAvailableGroups(library, particle);

      this.setState({ 
          particle: particle,
          group: groups[0],
          availableGroups: groups
        });
    }

    createInputApp(){
        return (
            <InputApp 
                handleLibraryChange={this.handleLibraryChange} 
                handleParticleChange={this.handleParticleChange} 
                handleGroupChange={this.handleGroupChange}
                data={this.state} />
        );
    }

    createFilesApp(){
        return (
            <FilesApp 
                handleLibraryChange={this.handleLibraryChange} 
                handleParticleChange={this.handleParticleChange} 
                handleGroupChange={this.handleGroupChange}
                data={this.state} />
        );
    }

    createFluxesApp(){
        return (
            <FluxesApp 
                handleLibraryChange={this.handleLibraryChange} 
                handleParticleChange={this.handleParticleChange} 
                handleGroupChange={this.handleGroupChange}
                data={this.state} />
        );
    }

    render() {
        return (
        <div>
            <BrowserRouter forceRefresh={false}>
            <div>
                <Route exact path='/ffm' render={() => this.createFilesApp()} />
                {/* <Route path='/input' render={() => this.createInputApp()} /> */}
                <Route exact path='/ffm/files' render={() => this.createFilesApp()} />
                <Route exact path='/ffm/fluxes' render={() => this.createFluxesApp()} />
            </div>
            </BrowserRouter>
        </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('ffm-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
