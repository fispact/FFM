
import { 
    USE_COLLAPX_STRING, 
    USE_CUSTOM_GROUP,
    USE_NO_XS } from '../Groups.js';

import {
    getXSLibraryShoryName,
    getXSLibraryDirName,
    getFYLibraryShoryName,
    getSFLibraryShoryName,
    getFYLibraryDirName,
    getSFLibraryDirName
} from '../../configHandler.js';

function getlib(name){
    if(name && name.length > 0){
        return name[0];
    }
    return name;
}

function getPaths(input, useWindowsPaths){
    var text = [];

    const spacing = " ";
    var sep = "/";
    if(useWindowsPaths){
        sep = "\\";
    }
    const nd_path = input.base_dir;
    const group = input.group;
    const particle = input.particle.length > 0 ? input.particle[0] : null;
    var libshortname = getlib(getXSLibraryShoryName(input.library));
    var libdirname = getlib(getXSLibraryDirName(input.library));
    var fylibshortname = getlib(getFYLibraryShoryName(input.fy_lib));
    var fylibdirname = getlib(getFYLibraryDirName(input.fy_lib));
    var sflibshortname = getlib(getSFLibraryShoryName(input.sf_lib));
    var sflibdirname = getlib(getSFLibraryDirName(input.sf_lib));
    
    var xs_group = "";
    var read_collapse = false;
    var no_xs = false;
    var custom_xs = false;
    if(group === USE_NO_XS){
        no_xs = true;
    }
    else{
        no_xs = false;
        read_collapse = false;
        if(group === USE_COLLAPX_STRING){
            read_collapse = true;
        }
        else if(group === USE_CUSTOM_GROUP){
            custom_xs = true;
        }
        else{
            xs_group = group.toString();
            if(xs_group.length === 2){
                xs_group = `0${xs_group}`;
            }
        }
    }

    if(input.eaf){
        const fis_groups = [66, 69];
        const flt_groups = [172, 211];

        var xs_str = "";
        if(fis_groups.includes(group)){
            xs_str = "fis";
        }
        else if(flt_groups.includes(group)){
            xs_str = "flt";
        }
        else{
            xs_str = "fus";
        }

        text.push("# index file - 2233 nuclides, no other index file can be used with EAF");
        text.push(`ind_nuc${spacing}${nd_path}${sep}EAF2010data${sep}eaf_index_20100\n`);

        text.push("# decay data");
        text.push(`decay${spacing}${nd_path}${sep}EAF2010data${sep}eaf_dec_20100.001\n`);

        if(xs_group){
            text.push("# cross section data");
            text.push(`crossec${spacing}${nd_path}${sep}EAF2010data${sep}eaf_n_gxs_${xs_group}_${xs_str}_20100`);
            text.push(`crossunc${spacing}${nd_path}${sep}EAF2010data${sep}eaf_un_20100\n`);
        }

        text.push("# fission data");
        text.push(`asscfy${spacing}${nd_path}${sep}EAF2010data${sep}eaf_n_asscfy_20100`);
        text.push(`fissyld${spacing}${nd_path}${sep}EAF2010data${sep}eaf_n_fis_20100\n`);

        text.push("# absorp data");
        text.push(`absorp${spacing}${nd_path}${sep}EAF2010data${sep}eaf_abs_20100\n`);

        text.push("# regulatory data");
        text.push(`hazards${spacing}${nd_path}${sep}EAF2010data${sep}eaf_haz_20100`);
        text.push(`clear${spacing}${nd_path}${sep}EAF2010data${sep}eaf_clear_20100`);
        text.push(`a2data${spacing}${nd_path}${sep}EAF2010data${sep}eaf_a2_20100\n`);
    }
    else{
        // special case for ENDFB/VII.1
        if(libshortname === "endfb71"){
            text.push("# index file - for ENDFB/V.II");
            text.push(`ind_nuc${spacing}${nd_path}${sep}${libdirname}${sep}endfb71_index\n`);
        }else{
            text.push("# index file - decay_2012 covers 3875 nuclides and is the standard index file");
            text.push("# Matches with TENDL (14, 15, 17), JEFF, CENDL and JENDL");
            text.push("# For ENDFB/VII use its index file");
            text.push(`ind_nuc${spacing}${nd_path}${sep}decay${sep}decay_2012_index_2012\n`);
        }

        text.push("# decay data base directory");
        text.push(`dk_endf${spacing}${nd_path}${sep}decay${sep}decay_2012\n`);

        if(xs_group && particle){
            text.push("# cross section data");
            //special case for ENDFB/VII.1
            if(libshortname === "endfb71" && xs_group === "586"){
                text.push(`xs_endf${spacing}${nd_path}${sep}${libdirname}${sep}${libshortname}-${particle}${sep}gxs-${xs_group}-600\n`);
            }else{
                text.push(`xs_endf${spacing}${nd_path}${sep}${libdirname}${sep}${libshortname}-${particle}${sep}gxs-${xs_group}\n`);
            }
        }

        if(fylibshortname.length > 0){
            text.push("# fission yield data");            
            text.push(`fy_endf${spacing}${nd_path}${sep}${fylibdirname}${sep}${fylibshortname}\n`);
        }
        if(sflibshortname.length > 0){
            text.push("# spontaneous fission yield data");         
            text.push(`sf_endf${spacing}${nd_path}${sep}${sflibdirname}${sep}${sflibshortname}\n`);
        }

        text.push("# absorp data");
        text.push(`absorp${spacing}${nd_path}${sep}decay${sep}abs_2012\n`);

        text.push("# regulatory data");
        text.push(`hazards${spacing}${nd_path}${sep}decay${sep}hazards_2012`);
        text.push(`clear${spacing}${nd_path}${sep}decay${sep}clear_2012`);
        text.push(`a2data${spacing}${nd_path}${sep}decay${sep}a2_2012\n`);
    }

    for (const [key, value] of Object.entries(input.files)) {
        if(value.length > 0){
            if(key === 'custom_xs' && custom_xs){
                text.push(`# custom cross section file`);
                if(input.eaf){
                    text.push(`crossec${spacing}${input.files.custom_xs}\n`)
                }else{
                    text.push(`xs_endf${spacing}${input.files.custom_xs}\n`)
                }
            }else{
                text.push(`#${spacing}${key}`);
                text.push(`${key}${spacing}${value}\n`);
            }
        }
    }

    if(!no_xs){
        if(read_collapse){
            text.push("# collapsed cross section data (in)");
            text.push(`collapxi${spacing}COLLAPX\n`);
        }
        else{
            text.push("# collapsed cross section data (out)");
            text.push(`collapxo${spacing}COLLAPX\n`);
        }
    }

    text.push("# condensed decay and fission data (in and out)");
    text.push(`arrayx${spacing}ARRAYX\n`);

    return text;
}

function getRawText(input, useWindowsPaths=false){
    const data =  getPaths(input, useWindowsPaths);
    const rawtext = data.join("\n");
    const rows = data.length + 3;

    return [rawtext, rows];
}

export { getRawText }