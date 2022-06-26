import box from "./box.js";
import { elmName } from "./elements.js";

var event;

window.addEventListener("mousemove",function(e){
    event = e;
})

export function trueMouseX() {
    return event.pageX - document.querySelector(elmName).getBoundingClientRect().left;
}

export function trueMouseY() {
    return event.pageY - document.querySelector(elmName).getBoundingClientRect().top;
}

export function getMouseX() {
    return Math.floor((trueMouseX() / box.scaleFactor) - box.offsetX);
}

export function getMouseY() {
    return Math.floor((trueMouseY() / box.scaleFactor) - box.offsetY);
}

export function getMouse() {
    return new PhSim.Vector(getMouseX(),getMouseY());
}

/* Mouse Recording */

export var mousePrev = {
    x: null,
    y: null
}

export var oldMouse = {
    x: 0,
    y: 0
}

var a = 0;
var b = 0;

export function tracMouse() {

    // X-Direction

    if(getMouseX() < oldMouse.x) {
        a = -1;
    }

    if(getMouseX() > oldMouse.x) {
        a = 1;
    }

    // Y-Direction

    if(getMouseY() < oldMouse.y) {
        b = -1;
    }

    if(getMouseY() > oldMouse.y) {
        b = 1;
    }

    // Record Mouse Directions

    mousePrev.x = oldMouse.x;
    mousePrev.y = oldMouse.y;

    oldMouse.x = getMouseX();
    oldMouse.y = getMouseY();
    
    return {x:a,y:b};

}