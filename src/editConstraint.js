import { elm } from "./elements.js";
import { focusObject } from "./focusObject.js";
import { getMouseX, getMouseY, mousePrev } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import multiSelect from "./multiSelect.js";
import render_static from "./render_static.js";

/*** 
 * 
 * Edit constraint
 * 
*/

var editConstraint = {

    active: false,
    point: null,
    initObj: null,

    target: null,

    transformPointByMouse: function() {
        editConstraint.point.x = editConstraint.point.x + (getMouseX() - mousePrev.x);
        editConstraint.point.y = editConstraint.point.y + (getMouseY() - mousePrev.y);
    },

    onmousedown: function() {
        if(mouseObject.constraint.point) {
            editConstraint.target =  mouseObject.constraint;
            editConstraint.point = editConstraint.target.point;
            elm.addEventListener("mousemove",editConstraint.onmousemove);
            elm.addEventListener("mouseup",editConstraint.onmouseup);
            editConstraint.active = true;
            editConstraint.initObj = mouseObject.mObj;
        }
    },

    onmousemove: function() {
        
        editConstraint.transformPointByMouse();

        render_static();

        if(mouseObject.cond) {
            focusObject(mouseObject.mObj);
        }

    },

    onmouseup: function() {

        //if(mouseObject.mObj && editConstraint.target.point) {
        //	editConstraint.target.point.x = editConstraint.target.point.x - PhSim.Centroid.shape(mouseObject.mObj).x;
        //	editConstraint.target.point.y = editConstraint.target.point.y - PhSim.Centroid.shape(mouseObject.mObj).y; 
        //}

        //else if(editConstraint.initObj && editConstraint.target.point) {
        //	editConstraint.target.point.x = editConstraint.target.point.x + PhSim.Centroid.shape(editConstraint.initObj).x;
        //	editConstraint.target.point.y = editConstraint.target.point.y + PhSim.Centroid.shape(editConstraint.initObj).y; 
        //}

        if(editConstraint.target.point === editConstraint.target.widget.pointA) {

            if(mouseObject.mObj) {
                editConstraint.target.widget.objectA = {
                    L: mouseObject.gLayer,
                    O: mouseObject.gObject
                };

            }

            else {
                delete editConstraint.target.widget.objectA;
            }

        }

        else if(editConstraint.target.point === editConstraint.target.widget.pointB) {
            
            if(mouseObject.mObj) {
                editConstraint.target.widget.objectB = {
                    L: mouseObject.gLayer,
                    O: mouseObject.gObject
                };
            }

            else {
                delete editConstraint.target.widget.objectB;
            }

        }

        //multiSelect.deselect();
        
        elm.removeEventListener("mousemove",editConstraint.onmousemove);
        elm.removeEventListener("mouseup",editConstraint.onmouseup);
        editConstraint.target = null;
        editConstraint.active = false;
        editConstraint.point = null;
    },

}

elm.addEventListener("mousedown",editConstraint.onmousedown);

export default editConstraint;