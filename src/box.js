import { elm } from "./elements.js";
import render_static from "./render_static.js";

var box = {
    zoomFactor: 1.05,
    delta: 15,
    offsetX: 0,
    offsetY: 0,
    scaleFactor: 1,
    prevBox: {
        scaleFactor: 1,
        offsetX: 0,
        offsetY: 0
    },
    recordPrev : function() {
        box.prevBox.scaleFactor = box.scaleFactor;
        box.prevBox.offsetX = box.offsetX;
        box.prevBox.offsetX = box.offsetX;
    },
    resizeCanvas : function(width,height) {
        elm.width = width;
        elm.height = height;
        render_static();
    },
    setCanvasHeight: function(height) {
        this.resizeCanvas(elm.width,height);
    }
}

export default box;