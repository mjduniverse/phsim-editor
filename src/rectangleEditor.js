import { getMouseX, getMouseY } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import render_static from "./render_static.js";
import { getSelectionRadius } from "./session.js";
import simTest from "./simTest.js";
import { calc_vert_distance } from "./vertices.js";

var rectangleEditor = {

    activate: function(subject) {

    },

    shiftRect: function(rectangle,mode,vector) {

        //if(rectangle.w > 0 && rectangle.h > 0) {

            var a1 = rectangle.cycle;

            if(mode === "topLeft") {
                rectangle.w = rectangle.w - vector.x;
                rectangle.h = rectangle.h - vector.y;
                rectangle.x = rectangle.x + vector.x;
                rectangle.y = rectangle.y + vector.y;
            }
    
            if(mode === "topRight") {
                rectangle.w = rectangle.w + vector.x;
                rectangle.h = rectangle.h - vector.y;
                rectangle.y = rectangle.y + vector.y;
            }
    
            if(mode === "bottomLeft") {
                rectangle.w = rectangle.w - vector.x;
                rectangle.h = rectangle.h + vector.y;
                rectangle.x = rectangle.x + vector.x;
            }
    
            if(mode === "bottomRight") {
                rectangle.w = rectangle.w + vector.x;
                rectangle.h = rectangle.h + vector.y;
            }

            if(mode === "stretchX") {
                rectangle.w = rectangle.w - vector.x;
                rectangle.x = rectangle.x + vector.x;
            }

            if(mode === "!stretchX") {
                rectangle.w = rectangle.w + vector.x;
                rectangle.x = rectangle.x - vector.x;
            }

            rectangle.cycle = a1;

        //}

        //else {
            
        //}
    },

    getPositionVectors: function(rectangle) {

        /*

        var z = {

            "topLeft": {
                "x": rectangle.x,
                "y": rectangle.y
            },

            "topRight": {
                "x": rectangle.x + rectangle.w,
                "y": rectangle.y
            },

            "bottomLeft": {
                "x": rectangle.x,
                "y": rectangle.y + rectangle.h
            },

            "bottomRight": {
                "x": rectangle.x + rectangle.w,
                "y": rectangle.y + rectangle.h
            }

        }

        return z;

        */

        return PhSim.Vertices.getRectangleCorners(rectangle);

    },

    pointWithinEditPoint(rectangle,corner,x,y) {
        var o = rectangleEditor.getPositionVectors(rectangle)[corner];
        return calc_vert_distance(o.x,o.y,x,y) < getSelectionRadius();
    },

    getEditPointByPoint(rectangle,x,y) {

        if(rectangleEditor.pointWithinEditPoint(rectangle,"topLeft",x,y)) {
            return "topLeft";
        }

        if(rectangleEditor.pointWithinEditPoint(rectangle,"topRight",x,y)) {
            return "topRight";
        }

        if(rectangleEditor.pointWithinEditPoint(rectangle,"bottomLeft",x,y)) {
            return "bottomLeft";
        }

        if(rectangleEditor.pointWithinEditPoint(rectangle,"bottomRight",x,y)) {
            return "bottomRight";
        }

    },

    corner: null,

    o: null,

    editCornerByMouse: function() {

        var rectangle = rectangleEditor.o;
        var corner = rectangleEditor.corner;

        var rect = new RectangleFrame(rectangle.x,rectangle.y,rectangle.w,rectangle.h);
        rect.rotateAroundCenter(rectangle.cycle);
        rect.setCorner(corner,getMouseX(),getMouseY());

        var pos = rect.getUnrotatedRawUpperPoint()
        
        rectangle.x = pos.x;
        rectangle.y = pos.y;
        rectangle.w = rect.w;
        rectangle.h = rect.h;
        rectangle.cycle = rect.angle;

        render_static();
    },

    setMouseCorner: function() {

        if(!simTest.active) {

            if(Number.isInteger(mouseObject.gObject) && mouseObject.mObj.shape === "rectangle") {
                mouseObject.corner = rectangleEditor.getEditPointByPoint(mouseObject.mObj,getMouseX(),getMouseY());
            }

            else {
                mouseObject.corner = null;
            }

        }

    },

    funcRef: null,

    active: false,

    activate: function() {

        if(mouseObject.corner) {

            rectangleEditor.o = mouseObject.mObj;
            rectangleEditor.corner = mouseObject.corner;
            rectangleEditor.active = true;

            window.addEventListener("mousemove",rectangleEditor.editCornerByMouse);
            window.addEventListener("mouseup",rectangleEditor.deactivate);
            window.addEventListener("contextmenu",rectangleEditor.deactivate);
        }

    },

    deactivate: function() {
        window.removeEventListener("mousemove",rectangleEditor.editCornerByMouse);
        window.removeEventListener("mouseup",rectangleEditor.deactivate);
        window.removeEventListener("contextmenu",rectangleEditor.deactivate);
        //rectangleEditor.funcRef = null;
        rectangleEditor.active = false;
    }

}

window.addEventListener("mousemove",rectangleEditor.setMouseCorner);
window.addEventListener("mousedown",rectangleEditor.activate);

export default rectangleEditor;