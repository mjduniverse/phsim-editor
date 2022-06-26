import {session} from "./session.js";
import { getSelectedSimulation } from "./shortcuts.js";

var objLoops = {

    /**
     * Execute function on all objects in simulation options
     * @param {Function} method 
     */

    global: function(method) {
        return PhSim.ObjLoops.global(session.sim,method);
    },

    /**
     * Execute function on all objects in the selected simulation
     * @param {Function} method 
     */

    subglobal: function(method) {
        for(var j = 0; j < getSelectedSimulation().layers.length; j++) {
            for(var k = 0; k < getSelectedSimulation().layers[j].objUniverse.length; k++) {
                method(getSelectedSimulation().layers[j].objUniverse[k]);
            }
        }
    },

    /**
     * Execute function on all widgets in simulation options
     * @param {Function} method 
     */

    subglobal_widgets: function(method) {
        this.subglobal(function(o){
            if(o.widgets) {
                for(var i = 0; i < o.widgets.length; i++) {
                    method(o.widgets[i],i);
                }
            }
        });
    },

    rel_index_subglobal: function(method,rel_i) {
        for(var j = 0; j < session.sim.simulations[rel_i].layers.length; j++) {
            for(var k = 0; k < session.sim.simulations[rel_i].layers[j].objUniverse.length; k++) {
                method.call(session.sim.simulations[rel_i].layers[j].objUniverse[k],rel_i,j,k);
            }
        }
    },

    simulation: function(simulation,method) {
        return PhSim.ObjLoops.simulation(simulation,method);
    },

    layer: function(layer,method) {
        return PhSim.ObjLoops.layer(layer,method);
    },

    layerConstraints: function(layer,method) {
        for(k = 0; k < layer.objUniverse.length; k++) {
            method(layer.objUniverse[k]);
        }
    }

}

export default objLoops;