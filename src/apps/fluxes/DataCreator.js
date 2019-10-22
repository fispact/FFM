function getRawText(input){
    var data =  [];
    for(var i=input.values.length-1;i>=0;--i){
        data.push(input.values[i])
    }
    
    data.push(input.normalisation);
    data.push(input.name);

    return data.join("\n");
}

export { getRawText }