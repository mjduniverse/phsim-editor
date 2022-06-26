import box from "./box.js";
import render_static from "./render_static.js";
import usrPref from "./usrpref.js";
import HTMLConfirm from "./htmlConfirm.js";
import loadSim from "./loadSim.js";

export var session = {};

window.session = session;

session.loaded = false;
session.selectedLayerI;
session.sim;
session.spriteImgObj;
session.phStaticRender;
session.sim_proxy;
session.layers;
session.sim_raw;
session.msg = document.querySelector("#msg");
session.initStaticSprites = [];
session.sim_dir;
session.simulationI;
session.selectionRadius = 10;
session.initStaticSpriteUrls = new Set();
session.tool = "rectangle_multiselect";
session.usrPref = usrPref

session.getSelectedLayer = function() {
    return session.sim.simulations[session.simulationI].layers[session.selectedLayerI];
}

session.getSelectedSimulation = function() {
    return session.sim.simulations[session.simulationI];
}

session.actions = {

    createShape: {

    }

}

session.actions.createNewSim = function() {
    
    new HTMLConfirm("Do you really want to create a new simulation?",function() {      
        loadSim(new PhSim.Static());
        session.syn.layers();
    });
}

session.syn = {
    layers: function() {
        render_static();
    }
}

export function getSelectionRadius() {

    return (session.selectionRadius / box.scaleFactor);
}