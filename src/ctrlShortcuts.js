import Clipboard from "./clipboard.js";
import getArrCentroid from "./getArrayCentroid.js";
import multiSelect from "./multiSelect.js";
import render_static from "./render_static.js";

var ctrlShortcuts = function(e) {

    if( (e.key === "c" || e.key === "C") && e.ctrlKey) {
        Clipboard.copy();		
    }

    if( (e.key === "x" || e.key === "X") && e.ctrlKey ) {
        Clipboard.cut();
    }

    if( (e.key === "v" || e.key === "V") && e.ctrlKey) {
        var c = getArrCentroid(Clipboard.array);
        Clipboard.transformAll(-c.x,-c.y);
        Clipboard.transformAll(mousePrev.x,mousePrev.y);
        Clipboard.paste();
        render_static();
    }

    if( (e.key === "a" || e.key === "A") && e.ctrlKey ) {
        multiSelect.selectAll();
        render_static();
        e.preventDefault();
    }

}

window.addEventListener("keydown",ctrlShortcuts);

export default ctrlShortcuts;
