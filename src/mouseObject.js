/****************

Code for Selecting objects
Copyright 2019 Mjduniverse.com

*****************/

import multiSelect from "./multiSelect.js";
import { LO } from "./shortcuts.js";

export var mouseObject = {
    gLayer: null,
    gObject: null,
    vi: null,
    hoverIndex1: null,
    hoverIndex2: null,
    cond: null,
    corner: null,
    constraint: {},
    elevatorPoint: null,
    elevator: {},
    mObj: {}
}

export function mObj() {
    return LO(mouseObject.gLayer,mouseObject.gObject);
}

export var selectionObject = {
    gLayer: null,
    gObject: null,
    selected: false,
    vertexSelected: false,
    vi: null,
    transformingByMouse: false,
    sObj: null,
}

export function sObj() {
    return multiSelect.selectedObjects[0];
}

window.mouseObject = mouseObject;
window.selectionObject = selectionObject;