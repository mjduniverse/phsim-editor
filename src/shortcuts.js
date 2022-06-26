import {session} from "./session.js";

export function getSelectedSimulation() {
    return session.sim.simulations[session.simulationI];
}

export function getSelectedLayer() {
    return getSelectedSimulation().layers[session.selectedLayerI];
}

export function selectsimulation(i) {
    session.simulationI = i;
};

export var SL = function(S,L) {
    return session.sim.simulations[S].layers[L];
}

export function SLO(S,L,O) {
    
    if(session.sim.simulations[S].layers[L].objUniverse[O]) {
        return session.sim.simulations[S].layers[L].objUniverse[O];
    }
    
    else {
        return null;
    }
}

export var LO = function(L,O) {
    return SLO(session.simulationI,L,O);
}