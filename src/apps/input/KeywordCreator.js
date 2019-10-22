
import { PARTICLES, PARTICLE_ID } from '../Particle.js';
import { USE_COLLAPX_STRING, USE_CUSTOM_GROUP } from '../Groups.js';

function getControlText(input){
    var text = [];

    if(input.options.verbose){
        text.push("MONITOR 1");
    }

    if(input.options.clobber){
        text.push("CLOBBER");
    }

    if(input.options.readsf){
        text.push("READSF");
    }

    if(input.options.usejson){
        text.push("JSON");
    }

    if(input.options.spek){
        text.push("SPEK");
    }

    if(input.eaf){
        text.push("LIBVERSION 0");
    }

    if(input.particle){
        const projindx = Math.max(0, PARTICLES.indexOf(input.particle));
        var line = "PROJECTILE " + PARTICLE_ID[projindx];
        text.push(line);
    }

    if(input.group != null){
        line = "GETXS ";
        if(input.group === USE_COLLAPX_STRING){
            line += "0";
        }
        else if(input.group === USE_CUSTOM_GROUP){
            line += "1 1";
        }
        else if(!isNaN(input.group)){
          line += "1 " + parseInt(input.group, 10);
        }
        else{
          line = "";
        }
        if (line.length> 0){
            text.push(line);
        }
    }

    if(input.options.usearrayx){
        text.push("GETDECAY 0");
    }else{
        text.push("GETDECAY 1");
    }
    text.push("FISPACT");

    return text;
}

function getInitialText(input){
    var text = [];
    text.push("* " + input.name);

    if(input.options.atwo){
        text.push("ATWO");
    }

    if(input.options.clear){
        text.push("CLEAR");
    }

    if(input.options.half){
        text.push("HALF");
    }

    if(input.elemental.length > 0){
        text.push("MASS " + input.totalMass.toExponential() + " " + input.elemental.length);
        for(var i = 0; i < input.elemental.length; i++) {
            text.push(input.elemental[i].element + " " + input.elemental[i].percent);
        }
    }

    return text;
}

function getInventoryText(input){
    var text = [];

    text.push("END");
    text.push("* end");

    return text;
}

function getRawText(input){
    const controltext = getControlText(input);
    const initialkeys = getInitialText(input);
    const inventorykeys =  getInventoryText(input);

    const rawtext = controltext.join("\n") + "\n" +
                    initialkeys.join("\n") + "\n" +
                    inventorykeys.join("\n");

    const rows = controltext.length + initialkeys.length + inventorykeys.length + 1;

    return [rawtext, rows];
}

export {getRawText}