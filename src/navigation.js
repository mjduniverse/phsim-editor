import box from "./box.js";
import { ctx } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";

/* 

Zoom in and out Functions and navigation functions 
These are glitchy, so they are disabled until further notice

*/

export function zoomIn() {

    /* 

    Untranslate canvas, to make sure that the scaling does not happen 
    while the rendering is translated.
    Otherwise, a glitch happens.

    */

    ctx.translate(-box.offsetX,-box.offsetY); 

    ctx.scale(box.zoomFactor,box.zoomFactor);

    box.recordPrev();

    box.scaleFactor = box.scaleFactor * box.zoomFactor;

    ctx.translate(box.offsetX,box.offsetY); // Restore translation

    //render_static();
}

export function zoomOut() {


    /* 

    Untranslate canvas, to make sure that the scaling does not happen 
    while the rendering is translated.
    Otherwise, a glitch happens.

    */

    ctx.translate(-box.offsetX,-box.offsetY);

    ctx.scale(1/box.zoomFactor,1/box.zoomFactor);

    box.recordPrev();

    box.scaleFactor = box.scaleFactor / box.zoomFactor;

    ctx.translate(box.offsetX,box.offsetY); // Restore translation

    //render_static();
}

export function up() {

    //ctx.scale(1/scaleFactor,1/scaleFactor);

    box.recordPrev();

    ctx.translate(0,box.delta);
    box.offsetY = box.offsetY + box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

export function down() {

    box.recordPrev();

    //ctx.scale(1/scaleFactor,1/scaleFactor);

    ctx.translate(0,-box.delta);
    box.offsetY = box.offsetY - box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

export function left() {

    box.recordPrev();

    //ctx.scale(1/scaleFactor,1/scaleFactor);

    ctx.translate(-box.delta,0);
    box.offsetX = box.offsetX - box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

export function right() {

    box.recordPrev();

    //ctx.scale(1/box.scaleFactor,1/box.scaleFactor);

    ctx.translate(box.delta,0);
    box.offsetX = box.offsetX + box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

export function transform(x,y) {

    var prevDelta = box.delta;

    box.delta = 1;

    if(x > 0) {
        for(var i = 0; i < x; i++) {
            right();
        }
    }

    else {
        for(var i = 0; i < Math.abs(x); i++) {
            left();
        }
    }

    if(y > 0) {

        for(var i = 0; i < y; i++) {
            up();
        }

    }

    else {
        for(var i = 0; i < Math.abs(y); i++) {
            down();
        }
    }

    box.delta = prevDelta;

}

export function transformAndZoom(x,y) {
    zoomIn();
    transform(x,y);
}

export function zoomIntoMouse() {

    var preMX = getMouseX();
    var preMY = getMouseY();

    zoomIn();

    var postMX = getMouseX();
    var postMY = getMouseY();

    var vecX = postMX - preMX;
    var vecY = postMY - preMY;

    transform(vecX,vecY);
}

export function zoomOutofMouse() {

    var preMX = getMouseX();
    var preMY = getMouseY();

    zoomOut();

    var postMX = getMouseX();
    var postMY = getMouseY();

    var vecX = postMX - preMX;
    var vecY = postMY - preMY;

    transform(vecX,vecY);

}