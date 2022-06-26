import { getMouseX, getMouseY } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import rectangleEditor from "./rectangleEditor.js";
import { getSelectionRadius } from "./session.js";
import { getSelectedSimulation, LO } from "./shortcuts.js";
import { calc_vert_distance } from "./vertices.js";

export function isPointInObject(arg) {

    var x = arg.x;
    var y = arg.y;
    var l = arg.layerIndex;
    var o = arg.objectIndex;

    var a = null;

    if(Number.isInteger(l) && Number.isInteger(o)) {
        a = LO(l,o);
    }

    if(arg.object) {
        a = arg.object;
    }

    var localCanvas = document.createElement("canvas");
    var localCtx = localCanvas.getContext("2d");
    
    if(a.shape === "polygon") {
            
        localCtx.beginPath();
        localCtx.moveTo(a.verts[0].x, a.verts[0].y);
        
        for(var j = 0; j < a.verts.length; j++) {
            localCtx.lineTo(a.verts[j].x , a.verts[j].y);
        }
        
        var vrlo = false;

        if(Number.isInteger(l) && Number.isInteger(o)) {
            vrlo = vertRangeLO(l,o);
        }

        if(localCtx.isPointInPath(x,y) || vrlo) {
            return true;		
        }

        localCtx.fill();
        localCtx.closePath();
        
        localCtx.stroke();

        return false;
    
    }
    
    if(a.shape === "circle") {
        
        localCtx.beginPath();
    
        localCtx.arc(a.x, a.y, a.radius, 0, 2*Math.PI);
    
        if(localCtx.isPointInPath(x,y)) {
            return true;
        }

        localCtx.fill();
        localCtx.stroke();
            
        return false;
    }

    if(a.shape === "rectangle") {

        var ePoints = rectangleEditor.getEditPointByPoint(a,x,y);

        if(PhSim.Query.pointInRectangle(a,x,y) || ePoints) {
            return true;
        }

        else {
            return false;
        }

    }

    if(a.shape === "regPolygon") {

        var vertSet = PhSim.Vertices.regPolygon(a);
    
        localCtx.moveTo(vertSet[0].x, vertSet[0].y);
    
        for(var j = 0; j < vertSet.length; j++) {
        localCtx.lineTo(vertSet[j].x, vertSet[j].y);
        }

        if(localCtx.isPointInPath(x,y)) {
            return true;
        }

        localCtx.closePath();
        localCtx.stroke();
        localCtx.fill();

        return false;
    }

    if(a.shape === "composite") {

        var b = false;

        for(var i = 0; i < a.parts.length && !b; i++) {
            b = isPointInObject({
                x: arg.x,
                y: arg.y,
                object: a.parts[i]
            })
        }

        return b;

    }

    return null;

}

export function getObjectByMouse() {

    for(var i = getSelectedSimulation().layers.length - 1; i >=0 ; i--) {
        if(getSelectedSimulation().layers[i].objUniverse) {
            for(var j = getSelectedSimulation().layers[i].objUniverse.length - 1; j >= 0 ; j--) {

                var a = isPointInObject({
                    layerIndex: i,
                    objectIndex: j,
                    x: getMouseX(),
                    y: getMouseY()
                })
                
                if(a) {
                    mouseObject.gLayer = i;
                    mouseObject.gObject = j;
                    mouseObject.cond = true;
                    mouseObject.mObj = LO(i,j);
                    return true;
                }

                else {
                    mouseObject.gLayer = null;
                    mouseObject.gObject = null;
                    mouseObject.cond = false;
                    mouseObject.mObj = null;
                }

            }
        }

    }

}

// Sees if the mouse is in the range of at least one vertex of the object in layer L and object O.

export function vertRangeLO(L,O) {
    
    var k = false;
    
    for(var i = 0; i < getSelectedSimulation().layers[L].objUniverse[O].verts.length; i++) {
        if(mouseWithinVertex(L,O,i) === true) {
            var k = true;
        }
    }
    
    return k;
}

/*** Sees if the mouse is within a certain distance of a vertex, and returns "true" if it happens. ***/

export function mouseWithinVertex(L,O,V, radius = getSelectionRadius()) {
    
    var r = calc_vert_distance(getSelectedSimulation().layers[L].objUniverse[O].verts[V].x, getSelectedSimulation().layers[L].objUniverse[O].verts[V].y, getMouseX(), getMouseY());
    
    if(r < radius) {
        return true;
    }
    
    else {
        return false;
    }
    
}
