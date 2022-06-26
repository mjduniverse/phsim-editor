import { elm } from "./elements.js";
import multiSelect from "./multiSelect.js";
import { down, left, right, up, zoomIntoMouse, zoomOutofMouse } from "./navigation.js";
import ObjectEditor from "./objectEditor.js";
import render_static from "./render_static.js";
import simTest from "./simTest.js";

window.addEventListener('keydown', function(e) {
    if(e.key === "+" && !ObjectEditor.instance && !simTest.dynSim) {
        zoomIntoMouse();
        render_static();
    }

    if(e.key === "-" && !ObjectEditor.instance && !simTest.dynSim) {
        zoomOutofMouse();
        render_static();
    }

    if(e.key === "ArrowRight") {
        
        if(!ObjectEditor.instance && !simTest.dynSim && multiSelect.selectedObjects.length === 0) {
            right();
            render_static();
        }

        if(multiSelect.selectedObjects.length > 0) {
            multiSelect.transformAll(1,0);
            render_static();
        }

    }	

    if(e.key === "ArrowLeft") {

        if(!ObjectEditor.instance && !simTest.dynSim && multiSelect.selectedObjects.length === 0) {
            left();
            render_static();
        }

        if(multiSelect.selectedObjects.length > 0) {
            multiSelect.transformAll(-1,0);
            render_static();
        }
    }

    if(e.key === "ArrowUp") {

        if(!ObjectEditor.instance && !simTest.dynSim && multiSelect.selectedObjects.length === 0) {
            up();
            render_static();
        }

        if(multiSelect.selectedObjects.length > 0) {
            multiSelect.transformAll(0,-1);
            render_static();
        }

    }

    if(e.key === "ArrowDown") {

        if(!ObjectEditor.instance && !simTest.dynSim && multiSelect.selectedObjects.length === 0) {
            down();
            render_static();
        }

        if(multiSelect.selectedObjects.length > 0) {
            multiSelect.transformAll(0,1);
            render_static();
        }

    }
});

elm.addEventListener("wheel", function(e) {
    if(e.deltaY < 0) {
        zoomIntoMouse();
        render_static();
        return null;
    }

    if(e.deltaY > 0) {
        zoomOutofMouse();
        render_static();
        return null;
    }
});