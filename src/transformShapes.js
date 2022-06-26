import { ctx } from "./elements.js";
import { getMouseX, getMouseY, mousePrev } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import rectangleEditor from "./rectangleEditor.js";
import render_static from "./render_static.js";
import { getSelectedSimulation } from "./shortcuts.js";
import { rotateAroundO } from "./vertices.js";

/***** Transforming Circles *****/

export var transformCircle = {}

transformCircle.center = function(object,x,y) {
    object.x = object.x + x;
    object.y = object.y + y;
}

transformCircle.modifyRadius = function() {

}

transformCircle.transformByMouse = function(object) {
    transformCircle.center(object,getMouseX() - mousePrev.x ,getMouseY() - mousePrev.y);

}

/***** Transforming Rectangles *****/

export var transformRectangle = {}

transformRectangle.upperLeftCorner = function(object, x,y) {
    object.x = object.x + x;
    object.y = object.y + y;
}

transformRectangle.byMouse = {}

transformRectangle.byMouse.modifyPosition = function(object) {

    if(!mouseObject.corner && !rectangleEditor.active) {
        transformRectangle.upperLeftCorner(object,getMouseX() - mousePrev.x ,getMouseY() - mousePrev.y);

    }

}

/***

Transform Path j of layer i in the x direction by P.

***/


export function transformPathX(i, j, x) {
    
    for(var m = 0; m < getSelectedSimulation().layers[i].objUniverse[j].verts.length; m++) {
        getSelectedSimulation().layers[i].objUniverse[j].verts[m].x += x;
    }
    
    ctx.clearRect(0, 0, elm.width, elm.height);
    render_static();
    
}


/***

Transform Path j of layer i in the y direction by P.

***/

export function transformPathY(i, j, y) {
    
    for(var m = 0; m < getSelectedSimulation().layers[i].objUniverse[j].verts.length; m++) {
        getSelectedSimulation().layers[i].objUniverse[j].verts[m].y += y;
    }
    
    ctx.clearRect(0, 0, elm.width, elm.height);
    render_static();
    
}



/***

Move path j of layer i in the (x,y) direction.

***/

export function transformPathXY(i, j, x, y) {
    transformPathX(i, j, x);
    transformPathY(i, j, y);
}

export function transformPath(a,x,y) {
    
    for(var m = 0; m < a.verts.length; m++) {
        a.verts[m].x += x;
        a.verts[m].y += y;
    }
    
    return a;
}

export function transformObj(object,vx,vy) {

    if(object.shape === "polygon") {
        transformPath(object,vx,vy);
    }

    if(object.shape === "circle" || object.shape === "regPolygon" || object.shape === "rectangle") {
        object.x += vx;
        object.y += vy;
    }

    if(object.shape === "composite") {
        for(var i = 0; i < object.objUniverse.length; i++) {
            transformObj(object.objUniverse[i],vx,vy)
        }
    }

}

/*** Move Path to Origin  ***/

export function transformToOrigin(path) {
    var cent = PhSim.Centroid.polygon(path);
    transformPath(path,-cent.x,-cent.y);
    return path;
}

/*** Move Path to point (x,y) ***/

export function transformToPoint(path,x,y) {
    transformToOrigin(path);
    transformPath(x,y);
    return path;
}


/*** Rotate Object around Centroid by angle ***/

export function rotateAroundCentroid(a,angle) {
		
    var cent = PhSim.Centroid.polygon(a);
    
    // Transform all points to origin point of canvas
    
    transformPath(a,-cent.x,-cent.y);
    
    for(var i = 0; i < a.verts.length; i++) {
        var k = rotateAroundO(a.verts[i].x, a.verts[i].y,angle);
        a.verts[i].x = k.x;
        a.verts[i].y = k.y;
    }
    
    // Transform all points to centroid point of path
    
    transformPath(a,cent.x,cent.y);
    
    return a;
}
