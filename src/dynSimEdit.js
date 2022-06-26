import { compositeHTMLElement } from "./htmlFactory2.js";
import HTMLWin from "./htmlwin.js";
import render_static from "./render_static.js";
import { xLabeledButton } from "./xlabeled.js";

/**

Edit by Physics

*/

var dynSimEdit = {

    phSim: null,

    // Map for associating static objects to a dynamic object in the simulation

    map: new Map(),
    
    activate: function() {

        dynSimEdit.phSim = new PhSim(sim);
        dynSimEdit.phSim.noCamera = true;
        dynSimEdit.phSim.gotoSimulationIndex(session.simulationI);

        dynSimEdit.phSim.addEventListener("objupdate",function(e) {
            Object.assign(e.target.static,e.target.object);
            dynSimEdit.map.set(e.target.static,e.target);
        });

        dynSimEdit.phSim.addEventListener("afterupdate",function(){
            render_static();
        });

    },

    deactivate: function() {
        dynSimEdit.phSim.exit();
        dynSimEdit.phSim = null;
    },

    gui: {

        htmlWin: null,

        open: function() {

            dynSimEdit.gui.htmlWin = new HTMLWin("Edit by Simulation");
            dynSimEdit.gui.htmlWin.appendToDocumentBody();

            var playButton = xLabeledButton("Play",function(){
                
                if(dynSimEdit.phSim) {
                    dynSimEdit.phSim.play();
                }

                else {
                    dynSimEdit.activate();
                }

            });

            var pauseButton = xLabeledButton("Pause",function(){
                if(dynSimEdit.phSim) {
                    dynSimEdit.phSim.pause();
                }
            });

            var exitButton = xLabeledButton("Exit",function(){
                if(dynSimEdit.phSim) {
                    dynSimEdit.deactivate();
                }
            });

            var buttons = compositeHTMLElement("div",playButton,pauseButton,exitButton);

            dynSimEdit.gui.htmlWin.winBody.appendChild(buttons);

        }


    }

}

//document.querySelector(".dynsim-edit").addEventListener("click",function(){
  //  dynSimEdit.gui.open();
//});

export default dynSimEdit;