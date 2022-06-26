import { elm } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import render_static from "./render_static.js";

// Elevator Editor

var editElevatorByMouse = {

    "onmousedown": function() {
        if(mouseObject.elevatorPoint) {
            elm.addEventListener("mousemove",editElevatorByMouse.onmousemove);
            elm.addEventListener("mouseup",editElevatorByMouse.onmouseup);
            editElevatorByMouse.active = true;
            editElevatorByMouse.elevatorPoint = mouseObject.elevatorPoint;
        }
    },

    "onmouseup": function() {
        elm.removeEventListener("mousemove",editElevatorByMouse.onmousemove);
        elm.removeEventListener("mouseup",editElevatorByMouse.onmouseup);
        editElevatorByMouse.elevatorPoint = null;
        editElevatorByMouse.active = false;
    },

    "onmousemove": function() {
        editElevatorByMouse.elevatorPoint.x = getMouseX();
        editElevatorByMouse.elevatorPoint.y = getMouseY();
        render_static();
    },

    "active": false,
    "elevatorPoint": null

}

elm.addEventListener("mousedown",editElevatorByMouse.onmousedown);

export default editElevatorByMouse;