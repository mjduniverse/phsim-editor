import HTMLWin from "./htmlwin.js";
import { elementFromObject } from "./htmlFactory.js"
import render_static from "./render_static.js";
import stringifyProjectJSON from "./stringifyProjectJSON.js";
import { session } from "./session.js";
import loadSim from "./loadSim.js";

var file = {}

file.exportEntity = function(fileName,object) {

    return new Promise(function(resolve,reject){   
        var data = stringifyProjectJSON(object);
        var blob = new Blob([data]);
        var dataURL = URL.createObjectURL(blob);

        var link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName + ".json";
        link.click();
        resolve();
    })
 
}

file.export = function(fileName) {

    /*

    var data = JSON.stringify(sim);
    var blob = new Blob([data]);
    var dataURL = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName + ".json";
    link.click();

    */

    return file.exportEntity(fileName,session.sim)
}

file.import = function(fileInput) {

    

}

/****** 

File Code

******/

file.gui = {}
file.gui.import = {}
file.gui.export = {}

file.gui.import.htmlWin = new HTMLWin("Import File","importFile","superWin");
file.gui.export.htmlWin = new HTMLWin("Export File","exportFile","superWin");

// Export Description

file.gui.export.desc = document.createElement("div");
file.gui.export.desc.innerHTML = "Type in the name for the file you want to save:"

// Export Input

file.gui.export.exportInput = document.createElement("input");
file.gui.export.exportInput.type = "text";

// Export Button

file.gui.export.exportButton = document.createElement("span");
file.gui.export.exportButton.className = "exportButton button";
file.gui.export.exportButton.innerHTML = "Save File";

file.gui.export.exportButton.addEventListener('click', function() {

    file.export(file.gui.export.exportInput.value);

});

// Appending Objects to export
file.gui.export.htmlWin.winBody.appendChild(file.gui.export.desc);
file.gui.export.htmlWin.winBody.appendChild(file.gui.export.exportInput);
file.gui.export.htmlWin.winBody.appendChild(file.gui.export.exportButton);

// Make htmlWin accessable via the menu bar

/** 
document.querySelector(".file-save").addEventListener('click', function() {
    file.gui.export.htmlWin.appendToDocumentBody();
});

**/

//Import Description

file.gui.import.desc = document.createElement("div");
file.gui.import.desc.innerHTML = "Select a file to open:"

// import Input

file.gui.import.importInput = document.createElement("input");
file.gui.import.importInput.type = "file";

file.gui.import.importInput.addEventListener("change",function(){

    var fileReader = new FileReader();

    fileReader.addEventListener("load",function(){
        
        file.gui.import.htmlWin.winBody.appendChild(file.gui.import.importButton);

        file.gui.import.importButton.addEventListener('click', function() {
            loadSim(JSON.parse(fileReader.result));
        });

    })

    fileReader.readAsText(this.files[0]);

})

// import Button

file.gui.import.importButton = document.createElement("span");
file.gui.import.importButton.className = "importButton button";
file.gui.import.importButton.innerHTML = "Open File";

// Appending Objects to import
file.gui.import.htmlWin.winBody.appendChild(file.gui.import.desc);
file.gui.import.htmlWin.winBody.appendChild(file.gui.import.importInput);

/**

session.actions.openFile = function() {
    file.gui.import.htmlWin.appendToDocumentBody();
};

**/

export default file;