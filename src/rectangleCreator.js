import dynSimEdit from "./dynSimEdit.js";
import { ctx, elm } from "./elements.js";
import FollowMeRect from "./followMeRect.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import RectCalc from "./rectCalc.js";
import render_static from "./render_static.js";
import { session } from "./session.js";
import shapeWindow from "./shapewin.js";
import { SL } from "./shortcuts.js";

/***

Rectangle Creator
Used for creating and loading rectangles.

**/

export var rectangleCreatorObj = {
    x: null,
    y: null,
    w: null,
    h: null,
    rectangle: null,
    upperCornerSelected: false,
    lowerCornerSelected: false,
    activated: false,
    followMeRect : null
}

export function rectangleCreator() {

    if(rectangleCreatorObj.lowerCornerSelected === false) {

        rectangleCreatorObj.x = getMouseX();
        rectangleCreatorObj.y = getMouseY();

        rectangleCreatorObj.lowerCornerSelected = true;

        rectangleCreatorObj.rectangle = new RectCalc(ctx,rectangleCreatorObj.x,rectangleCreatorObj.y,10,10);

        rectangleCreatorObj.followMeRect = new FollowMeRect(rectangleCreatorObj.rectangle);
        rectangleCreatorObj.lowerCornerSelected = true;


        document.querySelector('#msg').innerHTML = "Second, click on a point to define the lower right corner of the rectangle. Then, the rectangle shall be created."

        return rectangleCreatorObj;
    }

    if(rectangleCreatorObj.lowerCornerSelected === true) {

        rectangleCreatorObj.followMeRect.unset();

        rectangleCreatorObj.rectangle.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        rectangleCreatorObj.rectangle.lineWidth = document.querySelector(".lineWidth").value;
        rectangleCreatorObj.rectangle.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];

        rectangleCreatorObj.rectangle.objUpdate();

        rectangleCreatorObj.rectangle.addToLayer(SL(session.simulationI,session.selectedLayerI));

        
        if(dynSimEdit.phSim) {
            dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(rectangleCreatorObj.rectangle.obj));
        }

        render_static();

        rectangleCreatorObj = {
            x: null,
            y: null,
            w: null,
            h: null,
            rectangle: null,
            upperCornerSelected: false,
            lowerCornerSelected: false,
            activated: false
        }

        elm.removeEventListener('click', rectangleCreator);

        document.querySelector('#msg').innerHTML = "A new rectangle has been created."

        return rectangleCreatorObj;

    }
}

export function rectangleCreatorEvent() {

    if(rectangleCreatorObj.activated === false) {
        elm.addEventListener('click', rectangleCreator);
        rectangleCreatorObj.activated = true;
        document.querySelector('#msg').innerHTML = "First, click on a point to define the upper left corner of the rectangle."
        return rectangleCreatorObj;
    }

    if(rectangleCreatorObj.activated === true) {
        elm.removeEventListener('click', rectangleCreator);
        rectangleCreatorObj.activated = false;
        return rectangleCreatorObj;
    }
}

shapeWindow.addRect.addEventListener('click',rectangleCreatorEvent);

document.querySelector(".addRectangle.button-2").addEventListener('click',rectangleCreatorEvent);

session.actions.createShape.rectangle = rectangleCreatorEvent;