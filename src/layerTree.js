import { deleteLayerFromSL, deleteObjectSLO } from "./delete.js";
import HTMLWin from "./htmlwin.js";

var getObjByStr = function(str) {
	
    var array = getStrAddrArray(str);

    if(array.length === 1) {
        return sim.simulations[array[0]]
    }

    if(array.length === 2) {
        return sim.simulations[array[0]].layers[array[1]]
    }

    if(array.length === 3) {
        return sim.simulations[array[0]].layers[array[1]].objUniverse[array[2]]
    }
}

var getStrAddrArray = function(str) {
    str = str.split(",");
    return str;
}


/*** simulation Selection ***/

function lowerIndexSLO(SL = null ,L = null, O = null) {

    if(SL !== null && L !== null && O !== null) {
        if(sim.simulations[SL].layers[L].objUniverse[O-1].objUniverse) {
            swapArrayElements(sim.simulations[SL].layers[L].objUniverse,O,O-1);
            return sim.simulations[SL].layers[L].objUniverse[O];
        }

        else {
            console.error("Attempted to swap outside array.")
        }
    }


    if(SL !== null && L !== null) {

        if(sim.simulations[SL].layers[L-1].objUniverse) {
            swapArrayElements(sim.simulations[SL].layers,L,L-1);
            return sim.simulations[SL].layers[L];
        }

        else {
            console.error("Attempted to swap outside array.")
        }

    }


    if(SL !== null) {

        if(sim.simulations[SL-1]) {
            swapArrayElements(sim.simulations,SL,SL-1);
            return sim.simulations[SL];
        }

        else {
            console.error("Attempted to swap outside array.")			
        }

    }


}

export default function LayerTree(sim) {

    LayerTree.instances.push(this);

    this.layerTree = document.createElement('div');
    this.layerTree.className = "layertree";

    this.sim = sim;
    this.update();

    this.ctrls = document.createElement("div");
    this.ctrls.className = "ctrls"

    this.htmlWin = new HTMLWin("Layer Tree","layer-tree");
    this.htmlWin.winBody.appendChild(this.layerTree);
    this.htmlWin.winBody.appendChild(this.ctrls);

    this.deleteButton = document.createElement("span");
    this.deleteButton.addEventListener("click",this.deleteSelectedEntity);


    this.incrementIndexButton = document.createElement("span");

    this.decrementIndexButton = document.createElement("span");
    this.decrementIndexButton.addEventListener("click",this.decrementIndex);

    this.ctrls.appendChild(this.deleteButton);
    this.ctrls.appendChild(this.incrementIndexButton);
    this.ctrls.appendChild(this.decrementIndexButton);
    
}

LayerTree.prototype.decrementIndex = function() {
    
    if(this.arrayAddr.length === 1) {
        lowerIndexSLO(this.arrayAddr[0]);
    }

    if(this.arrayAddr.length === 2) {
        lowerIndexSLO(this.arrayAddr[0],this.arrayAddr[1]);
    }

    if(this.arrayAddr.length === 3) {
        lowerIndexSLO(this.arrayAddr[0],this.arrayAddr[1],this.arrayAddr[2]);
    }
}

LayerTree.prototype.update = function() {

    this.layerTree.innerHTML = null;

    var this_a = this;

    this.selectByClick = function() {


    
        // Here, "this" refers to the HTML element,
        // not an object constructed using LayerTree.

        if(this_a.subjectEl) {
            this_a.subjectEl.classList.remove("selected");
            this_a.subjectEl.querySelector('.label').style = null;
        }
    
        this_a.subject = getObjByStr(this.dataset.phAddr);
        this_a.arrayAddr = getStrAddrArray(this.dataset.phAddr);
        this_a.subjectEl = this;
        this_a.subjectSL = sim.simulations[this_a.arrayAddr[0]];

        if(this_a.arrayAddr[1]) {
            this_a.subjectL = sim.simulations[this_a.arrayAddr[0]].layers[this_a.arrayAddr[1]]
        }

        this.className = this.className + " selected";
        this.querySelector('.label').style = "border: 5px solid orange";
    
    }

    this.ondblclk = function() {
        var arrayAddrLocal = getStrAddrArray(this.dataset.phAddr);

        if(arrayAddrLocal.length === 1) {
            selectsimulation(arrayAddrLocal[0]);
        }

        if(arrayAddrLocal.length === 2) {
            selectsimulation(arrayAddrLocal[0]);
            session.selectedLayerI = arrayAddrLocal[1];
        }

        if(arrayAddrLocal.length === 3) {
            selectsimulation(arrayAddrLocal[0]);
            session.selectedLayerI = arrayAddrLocal[1];

        }
    }

    for(var SL = 0; SL < this.sim.simulations.length; SL++) {

        var simulationBranch = document.createElement("div");
        simulationBranch.className = "branch simulation"
        simulationBranch.innerHTML = "<span class=\"label simulation\">" + this.sim.simulations[SL].name + "</span>";

        simulationBranch.dataset.phAddr = SL;
        simulationBranch.addEventListener('click',this.selectByClick, true)

        var layerList = document.createElement('div');
        simulationBranch.appendChild(layerList);


        for(var L = 0; L < this.sim.simulations[SL].layers.length; L++) {
            var layerBranch = document.createElement('div');
            layerBranch.className = "branch layer"
            layerBranch.dataset.phAddr = SL + ',' + L;
            layerBranch.addEventListener('click',this.selectByClick,true)
            layerBranch.innerHTML = "<span class=\"label layer\"> Layer " + L + "</span>";
            layerList.appendChild(layerBranch);

            var enableObjList = false;
            
            if(enableObjList === true) {

                var objectList = document.createElement("div");

                for(var O = 0; O < this.sim.simulations[SL].layers[L].objUniverse.length; O++) {
                    var objectBranch = document.createElement('div');
                    objectBranch.className = "branch object"
                    objectBranch.dataset.phAddr = SL + ',' + L + ',' + O;
                    objectBranch.addEventListener('click',this.selectByClick,true)
                    objectBranch.innerHTML = "<span class=\"label\"> Object " + O + "</span>";
                    objectList.appendChild(objectBranch);
                }

                layerBranch.appendChild(objectList);

            }

            
        }

        this.layerTree.appendChild(simulationBranch);

    }

}

LayerTree.prototype.pushLayerDownI = function(i) {
    if((i-1) > 0) {
        swapArrayElements(this.sim.simulations,i,i-1);
        this.update();
    }

    else {
        console.error("Error: Element at index " + (i-1) + " is less than 0");
    }
}


LayerTree.prototype.selectedObject = null;

LayerTree.prototype.deleteSelectedEntity = function() {

    if(this.arrayAddr.length === 1) {
        deletesimulation(this.arrayAddr[0]);
    }

    if(this.arrayAddr.length === 2) {
        deleteLayerFromSL(this.arrayAddr[0],this.arrayAddr[1]);
    }

    if(this.arrayAddr.length === 3) {
        deleteObjectSLO(this.arrayAddr[0],this.arrayAddr[1],this.arrayAddr[2]);
    }

    this.update();

}

// Synchronize all instances of LayerTree

LayerTree.instances = []
LayerTree.syn = function() {
    for(var i = 0; i < LayerTree.instances.length; i++) {
        LayerTree.instances[i].update();
    }
}
