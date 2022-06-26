import HTMLConfirm from "./htmlConfirm.js";
import { mouseObject, sObj } from "./mouseObject.js";
import multiSelect from "./multiSelect.js";
import { session } from "./session.js";


export function deletesimulation(i) {
    session.sim.simulations.splice(i,1);	
}

export function deleteLayerFromSL(SL,L) {
    session.sim.simulations[SL].splice(L,1);
}

export function deleteObjectSLO(S,L,O) {
    session.sim.simulations[S].layers[L].objUniverse.splice(O,1);
}

export function deleteByIndex(S,L,O) {
    session.sim.simulations[S].layers[L].objUniverse.splice(O,1);
}

// Delete Selected Object

export function del_sObj() {
    deleteByIndex(session.simulationI,session.selectedLayerI,multiSelect.subjectIndexes[0].O);
    multiSelect.deselect();
}

export function gui_del_object(object) {
    new HTMLConfirm("Are you sure you want to delete \"" + object.name + "\"?", del_sObj);
}

export function gui_del_sObj() {
    new HTMLConfirm("Are you sure you want to delete \"" + sObj().name + "\"?", del_sObj);
}

window.addEventListener("keydown", function(e) {
    if(e.key === "Delete") {		
        if(multiSelect.selectedObjects.length > 0) {
            new HTMLConfirm("Are you sure you want to delete the selected object(s)?",function(){
                if(mouseObject.cond && multiSelect.selectedObjects.length === 0) {
                    deleteObjectSLO(session.simulationI,selectedLayerI,mouseObject.gObject);
                    multiSelect.deselect()
                }

                if(multiSelect.selectedObjects.length > 0) {
                    multiSelect.deleteAll();
                }
                
            })
        }
    }
})