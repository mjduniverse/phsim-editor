import multiSelect from "./multiSelect.js";
import { session } from "./session.js";
import { SL } from "./shortcuts.js";
import { transformObj } from "./transformShapes.js";
import getArrCentroid from "./getArrayCentroid.js";
import { getMouse, getMouseX, getMouseY, mousePrev } from "./getmouse.js";

var Clipboard = {
    array: [],
    transformAll: function(dx,dy) {
        for(var i = 0; i < this.array.length; i++) {
            transformObj(this.array[i],dx,dy);
        }
    },
    copy: function() {

        this.array = [];

        if(multiSelect.selectedObjects.length > 0) {
            for(var i = 0; i < multiSelect.selectedObjects.length; i++) {
                this.array.push( JSON.parse(JSON.stringify(multiSelect.selectedObjects[i])) );
            }
        }

    },

    cut: function() {
        Clipboard.copy();
        multiSelect.deleteAll();
        multiSelect.deselect();
    },

    paste: function() {

        var a = [];

        for(var i = 0; i < this.array.length; i++) {
            var o = JSON.parse(JSON.stringify(this.array[i]));
            a.push(o);
            SL(session.simulationI,session.selectedLayerI).objUniverse.push(o)
            //o.parentObj = SL(session.simulationI,selectedLayerI).objUniverse;
        }

        return a;

    },

    paste_from_menu: function() {

        if(Clipboard.array.length > 0) {
                
            var c = getArrCentroid(Clipboard.array);
            Clipboard.transformAll(-c.x,-c.y);
            Clipboard.transformAll(mousePrev.x,mousePrev.y);

            Clipboard.paste.call(Clipboard);
            render_static();

        }

    },

    text: {
        clipboardJS: new ClipboardJS(".clipboard-trigger"),
        elm: document.querySelector(".clipboard-trigger"),
        copy: function(str) {
            this.elm.dataset.clipboardText = str;
            this.elm.click();
        }
    }
}

window.Clipboard = Clipboard;

export default Clipboard;