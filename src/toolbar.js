import { addBlankLayer, addBlankSimulation } from "./addObjContainers.js";
import ColorField from "./colorField.js";
import dynSimEdit from "./dynSimEdit.js";
import { generateZipFolder } from "./gensim.js";
import HTMLConfirm from "./htmlConfirm.js";
import loadSim from "./loadSim.js";
import multiSelect from "./multiSelect.js";
import ObjectEditor from "./objectEditor.js";
import file from "./file.js";
import render_static from "./render_static.js";
import { session } from "./session.js";
import { getSelectedSimulation, selectsimulation } from "./shortcuts.js";
import XSelectionMenu from "./xSelectionMenu.js";

// Toolbar Layer Selection

var layerSelection = document.querySelector("#layer-selection");
var layerOptionMap = new Map();

layerSelection.addEventListener("change",function(event){
    session.selectedLayerI = layerSelection.selectedIndex;
});

export function addLayerOption(layer) {
    var e = document.createElement("option");
    e.innerText = layer.name;
    layerSelection.appendChild(e);
    layerOptionMap.set(layer,e);
    return e;
}

export function generateLayerSelection() {

    var s = session.getSelectedSimulation();

    for(let i = 0; i < s.layers.length; i++) {
        addLayerOption(s.layers[i])
    }

}

// Simulation Selection Toolbar

var simulationSelection = document.querySelector("#simulation-selection"); 
var simOptionMap = new Map();

simulationSelection.addEventListener("change",function(event){
    session.simulationI = simulationSelection.selectedIndex;
    session.selectedLayerI = 0;
});

export function addSimulationSelection(simulation) {
    var e = document.createElement("option");
    e.innerText = simulation.name;
    simulationSelection.appendChild(e);
    simOptionMap.set(simulation,e);
    return e;
}

export function generateSimulationSelection() {
    

    // Add selection options

    for(let i = 0; i < session.sim.simulations.length; i++) {
        addSimulationSelection(session.sim.simulations[i])
    }

    // Generate layer selection

    generateLayerSelection();

}

/*** 
 * 
 * 
 * Some Toolbar Options
 * @
 * 
 * ***/

// ADDING AND REMOVING SIMULATIONS

document.querySelector("#sim-add-button").addEventListener("click",function(){
    addBlankSimulation(session.sim);
});

document.querySelector("#sim-remove-button").addEventListener("click",function(){

    var f = function() {
        var i = session.simulationI;

        simulationSelection.removeChild(simOptionMap.get(session.sim.simulations[i]));

        session.sim.simulations.splice(i,1);
        session.simulationI--;
        session.selectedLayerI = 0;


        session.syn.layers();
    }

    var c = new HTMLConfirm("Are you sure you want to delete simulation" + getSelectedSimulation().name + "?",f);

});

// ADDING AND REMOVING LAYERS

document.querySelector("#layer-add-button").addEventListener("click",function(){
    addBlankLayer(getSelectedSimulation());
});

document.querySelector("#layer-remove-button").addEventListener("click",function(){

    var i = session.selectedLayerI;
    var l = session.sim.simulations[session.simulationI].layers[session.selectedLayerI];
    var e = layerOptionMap.get(l);

    layerSelection.removeChild(e);

    session.sim.simulations[session.simulationI].layers.splice(i,1);

    session.selectedLayerI--;
    session.syn.layers();

});



document.querySelector(".simulation-settings").addEventListener("click",function(){
    var a = new ObjectEditor(session.sim.simulations[session.simulationI]);
    a.open();
});


/*** Composite Simulation Settings ***/


document.querySelector(".comp-settings").addEventListener("click",function(){
    var a = new ObjectEditor(session.sim);
    a.open();
});

document.querySelector(".file-open").addEventListener('click', function() {
    file.gui.import.htmlWin.appendToDocumentBody();
});

document.querySelector(".file-save").addEventListener('click', function() {
    file.gui.export.htmlWin.appendToDocumentBody();
});


document.querySelector(".generate-zip").addEventListener("click",generateZipFolder)

document.querySelector(".guide").addEventListener("click",function(){
    window.open("./help")
});



/*** Menu Color Fields ***/

var fillcolorCtrl = new ColorField("#333333","Fill Color",function(){

    if(multiSelect.selectedObjects.length > 0) {
        multiSelect.forAll(function(o){
            
            o.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            
            if(dynSimEdit.phSim) {
                dynSimEdit.map.get(o).object.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            }

            render_static();
        })
    }

});

document.querySelector(".fillcolor-ctrl").appendChild(fillcolorCtrl.container);

var strokecolorCtrl = new ColorField("#000000","Stroke Color",function(){

    if(multiSelect.selectedObjects.length > 0) {
        multiSelect.forAll(function(o){
            o.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            
            if(dynSimEdit.phSim) {
                dynSimEdit.map.get(o).object.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            }
            
            render_static();
        });
    }

});

document.querySelector(".strokecolor-ctrl").appendChild(strokecolorCtrl.container);

document.querySelector(".lineWidth").addEventListener("input",function() {

    var self = this;

    multiSelect.recordStateForAll("lineWidth");

    if(multiSelect.selectedObjects.length > 0) {
        multiSelect.forAll(function(o) {

            o.lineWidth = Number.parseInt(self.value);

            if(dynSimEdit.phSim) {
                dynSimEdit.map.get(o).object.lineWidth = Number.parseInt(self.value);
            }

            render_static();

        });
    }

});

/**

/**
 * Dropdown Menus
 

document.querySelector(".dropdown-item.new-file").addEventListener("click",function(){
    session.actions.createNewSim();
});

document.querySelector(".dropdown-item.open-file").addEventListener("click",function(){
    session.actions.openFile();
});

document.querySelector(".dropdown-item.open-file").addEventListener("click",function(){
    session.actions.openFile();
});

**/

/** 

session.testSimulation()

session.actions.createShape.polygon()

session.actions.createShape.circle()

session.actions.createShape.rectangle()
session.actions.createShape.regPolygon()


**/

function toggleQSettings(event) {

    if(event.checked) {
        document.querySelector('.quick-settings').style.display = 'block'
    }
    
    else {
        document.querySelector('.quick-settings').style.display = 'none' 
    }

}

function toggleStatusBar(event) {

    if(event.checked) {
        document.querySelector('.statusBar').style.display = 'block' 
    }
    
    else {
        document.querySelector('.statusBar').style.display = 'none' 
    }

}
