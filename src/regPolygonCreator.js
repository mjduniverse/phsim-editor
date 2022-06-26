import dynSimEdit from "./dynSimEdit.js";
import { elm } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import { session } from "./session.js";
import { getSelectedLayer } from "./shortcuts.js";
import { calc_vert_distance } from "./vertices.js";

/*** 
 * 
 * Regular Polygon Creator
 * 
 * 
*/

var regPolygonCreator = {
    
    regPolygon: {},

    canvas_onmouseclick: function() {

        // Second Stage Click
        
        if(typeof regPolygonCreator.regPolygon.x === "number" && typeof regPolygonCreator.regPolygon.y === "number") {
            elm.removeEventListener("mousemove",regPolygonCreator.stage2_onmousemove);
            elm.removeEventListener("click",regPolygonCreator.canvas_onmouseclick);
            getSelectedLayer().objUniverse.push(regPolygonCreator.regPolygon);

            if(dynSimEdit.phSim) {
                dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(regPolygonCreator.regPolygon));
            }

            regPolygonCreator.regPolygon = {};
        }

        // First Stage Click

        else {
            regPolygonCreator.regPolygon = new PhSim.Static.RegPolygon(getMouseX(),getMouseY(),0,6);
            elm.addEventListener("mousemove",regPolygonCreator.stage2_onmousemove);
        }

    },


    stage2_onmousemove: function() {
        
        // Set Special Point

        regPolygonCreator.regPolygon.radius = calc_vert_distance(regPolygonCreator.regPolygon.x,regPolygonCreator.regPolygon.y,getMouseX(),getMouseY());
        regPolygonCreator.regPolygon.cycle = Math.atan2( getMouseY() - regPolygonCreator.regPolygon.y , getMouseX() - regPolygonCreator.regPolygon.x );
    
        // Color Value

        regPolygonCreator.regPolygon.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        regPolygonCreator.regPolygon.lineWidth = document.querySelector(".lineWidth").value;
        regPolygonCreator.regPolygon.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];
    
        // Preview 

        session.phStaticRender.renderRegPolygon(regPolygonCreator.regPolygon);

    },

    activate: function() {
        elm.addEventListener("click",regPolygonCreator.canvas_onmouseclick);
    }
}

document.querySelector(".addRegpoly.button-2").addEventListener('click',regPolygonCreator.activate);

session.actions.createShape.regPolygon = regPolygonCreator.activate;

export default regPolygonCreator;