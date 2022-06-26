function stringifyProjectJSON(o) {
    return JSON.stringify(o,function(key,value){
        if(typeof value === "string" && value.match(/^blob:/)) {
            return undefined;
        }

        else {
            return value;
        }
    });
}

export default stringifyProjectJSON;