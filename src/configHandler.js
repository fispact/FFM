import CONFIG from './config.json';

import { 
    USE_COLLAPX_STRING, 
    USE_CUSTOM_GROUP,
    USE_NO_XS } from './apps/Groups.js';

function libraryAccumulate(func, name){
    var data = [];
    const libdata = Object.values(CONFIG[name]);
    for(var i=0; i<libdata.length;++i){
        func(data, libdata[i]);
    }
    return data;
}

//decay libraries
function libraryDecayAccumulate(func){
    return libraryAccumulate(func, 'decaylibraries');
}

export function getAvailableDecayLibraries(){
    return libraryDecayAccumulate((d, e) => { d.push(e.name) });
}

export function getDecayLibraryShoryName(libname){
    return libraryDecayAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.libname);
        }
    });
}

export function getDecayLibraryDirName(libname){
    return libraryDecayAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.dirname);
        }
    });
}

export function getDecayEAFLibraries(){
    return libraryDecayAccumulate((d, e) => {if(e.iseaf) { d.push(e.name) } });
}

// XS libraries
function libraryXSAccumulate(func){
    return libraryAccumulate(func, 'xslibraries');
}

export function getAvailableXSLibraries(){
    return libraryXSAccumulate((d, e) => { d.push(e.name) });
}

export function getXSLibraryShoryName(libname){
    return libraryXSAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.libname);
        }
    });
}

export function getXSLibraryDirName(libname){
    return libraryXSAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.dirname);
        }
    });
}

export function getXSEAFLibraries(){
    return libraryXSAccumulate((d, e) => {if(e.iseaf) { d.push(e.name) } });
}

export function getAvailableParticles(libname){
    return libraryXSAccumulate((d, e) => {
        if(e.name === libname) { 
            for(var j=0; j<e.particles.length;++j){
                d.push(e.particles[j].name);
            }
        } 
    });
}

export function getAvailableGroups(libname, particle){
    return (
        libraryXSAccumulate((d, e) => {
        if(e.name === libname) { 
            for(var j=0; j<e.particles.length;++j){
                if(e.particles[j].name === particle){
                    for(var k=0; k<e.particles[j].groups.length;++k){
                        d.push(e.particles[j].groups[k]);
                    }
                }
            }
        } 
    }).concat([USE_COLLAPX_STRING, USE_CUSTOM_GROUP, USE_NO_XS]));
}

//fission libraries
function libraryFYAccumulate(func){
    return libraryAccumulate(func, 'fylibraries');
}
function librarySFAccumulate(func){
    return libraryAccumulate(func, 'sflibraries');
}

export function getAvailableFYLibraries(){
    return libraryFYAccumulate((d, e) => { d.push(e.name) });
}

export function getFYLibraryShoryName(libname){
    return libraryFYAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.libname);
        }
    });
}

export function getFYLibraryDirName(libname){
    return libraryFYAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.dirname);
        }
    });
}

export function getAvailableSFLibraries(){
    return librarySFAccumulate((d, e) => { d.push(e.name) });
}

export function getSFLibraryShoryName(libname){
    return librarySFAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.libname);
        }
    });
}

export function getSFLibraryDirName(libname){
    return librarySFAccumulate((d, e) => { 
        if(e.name === libname) {
            d.push(e.dirname);
        }
    });
}