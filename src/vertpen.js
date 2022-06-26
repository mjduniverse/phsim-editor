import dynSimEdit from "./dynSimEdit.js";
import { ctx, elm } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import render_static from "./render_static.js";
import {session} from "./session.js";
import shapeWindow from "./shapewin.js";
import { getSelectedSimulation } from "./shortcuts.js";

/*** 

Path Creator v2
Copyright Mjduniverse.com

****/

var vertPen = {

    i: null,

    obj: null,

    verts: [],

    toggle: function() {

        if(vertPen.activated === true) {
            vertPen.deactivate();
        }
        
        else {
            vertPen.activate();
        }

    },

    onmouseclick: function() {
        vertPen.verts.push(new PhSim.Vector(getMouseX(),getMouseY()));
        render_static();
    },

    preview: function() {

        if(vertPen.verts.length > 0) {

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.fillStyle = 'red';
            
            // Path Preview
            
            ctx.moveTo(vertPen.verts[0].x,vertPen.verts[0].y)

            for(var i = 0; i < vertPen.verts.length; i++) {
                ctx.lineTo(vertPen.verts[i].x,vertPen.verts[i].y);
            }

            if(vertPen.verts.length > 1) {
                ctx.lineTo(vertPen.verts[0].x,vertPen.verts[0].y);
            }

            ctx.stroke();

        }

    },

    activated: false,

    activate: function() {
        elm.style.cursor = "crosshair";
        elm.onmousemove = null;
        elm.addEventListener('click', vertPen.onmouseclick);
        elm.addEventListener('dblclick', vertPen.deactivate);
        document.querySelector("#msg").innerHTML = "Click to add a point. Double click to finish.";
        vertPen.activated = true;
    },

    deactivate: function() {
        elm.style.cursor = "default";
        
        /*** Add Vertices to settings object, clear the temporary path variables and refresh canvas ***/
        
        vertPen.save();
        vertPen.verts = []
        
        
        /*** Makes elm.onmousedown EventListener go back to ordinary eventListener. ***/
        
        elm.removeEventListener('click', vertPen.onmouseclick);
        elm.removeEventListener('dblclick', vertPen.deactivate);
        
        vertPen.activated = false;

        elm.style.cursor = "default";
        render_static();
    },

    save: function() {

        // Remove end clone element.

        var test1 = (vertPen.verts[0].x === vertPen.verts[vertPen.verts.length - 1].x) && (vertPen.verts[0].y === vertPen.verts[vertPen.verts.length - 1].y);
        var test2 = (vertPen.verts[vertPen.verts.length - 2].x === vertPen.verts[vertPen.verts.length - 1].x) && (vertPen.verts[vertPen.verts.length - 2].y === vertPen.verts[vertPen.verts.length - 1].y);

        if(test1 || test2) {
            vertPen.verts.pop();
        }

        vertPen.obj = new PhSim.Static.Polygon(vertPen.verts);

        vertPen.obj.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        vertPen.obj.lineWidth = document.querySelector(".lineWidth").value;
        vertPen.obj.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];

        getSelectedSimulation().layers[session.selectedLayerI].objUniverse.push(vertPen.obj);

        if(dynSimEdit.phSim) {
            dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(vertPen.obj));
        }

        document.querySelector("#msg").innerHTML = "Polygon Added";

    }
}

shapeWindow.addPathButton.addEventListener('click', function() {
    vertPen.toggle();
});

document.querySelector(".addPath.button-2").addEventListener('click', function() {
    vertPen.toggle();
});



session.actions.createShape.polygon = function() {
    vertPen.toggle();
}

export default vertPen;