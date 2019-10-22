import REFDATA from './refdata.json';


export function libraryAccumulate(func){
    var data = [];
    const libdata = Object.values(REFDATA['refflux']);
    for(var i=0; i<libdata.length;++i){
        func(data, libdata[i]);
    }
    return data;
}

export function getRefDataSetNames(){
    return libraryAccumulate((d, e) => { d.push(e.name) });
}

export function getRefData(name){
    var energies = [];
    var values = [];
    const libdata = Object.values(REFDATA['refflux']);
    for(var i=0; i<libdata.length;++i){
        if(libdata[i].name === name) { 
            for(var j=0; j<libdata[i].values.length;++j){
                energies.push(libdata[i].energies[j]);
                values.push(libdata[i].values[j]);
            }
            energies.push(libdata[i].energies[libdata[i].energies.length-1]);
        } 
    }
    return [energies, values];
}
