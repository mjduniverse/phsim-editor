import { session } from "./session.js";
import {addSimulationSelection, addLayerOption} from "./toolbar.js"

export function addBlankLayer(simulation) {
    var newLayer = new PhSim.Static.Layer();
    newLayer.name = "Layer" + session.sim.simulations[session.simulationI].layers.length.toString();
    session.sim.simulations[session.simulationI].layers.push(newLayer);
    addLayerOption(newLayer)
    session.syn.layers();
    return newLayer;
}

export function addBlankSimulation(sim) {
    var newSL = new PhSim.Static.Simulation();
    newSL.name = "simulation" + session.sim.simulations.length.toString();
    session.sim.simulations.push(newSL);
    addSimulationSelection(newSL);
    session.syn.layers();
    return newSL;
}