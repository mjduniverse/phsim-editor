import colorForm from "./colorForm.js";
import HTMLWin from "./htmlwin.js";
import { xLabeledButton } from "./xlabeled.js";

/***
*
* Color Form
*
****/

function ColorField(value,title,onsubmit = function() {} ) {

    var self = this;

    var container = document.createElement("div");
    
    var label = document.createElement("span");
    label.className = "colorfield-label"

    container.appendChild(label);
    container.className = "colorfield-container";

    container.style.background = value;
    container.dataset.value = value;
    label.innerText = value;

    container.addEventListener("click",function(){
        
        var htmlWin = new HTMLWin("Color - " + title,"colorfield-window","superWin");
        var f = colorForm(self.value);

        function updateHex() {
            self.setValue(f.hexStr())
        }

        f.onupdateClr = function() {
            updateHex()
        }

        var submit = xLabeledButton("Submit",function(){
            updateHex()
            onsubmit();
        })

        htmlWin.winBody.appendChild(f.container);
        htmlWin.winBody.appendChild(submit);
        htmlWin.appendToDocumentBody();
    });

    this.value = value;
    this.container = container;
    this.label = label;
    this.onsubmit = onsubmit;

}

ColorField.prototype.setValue = function(value) {
    this.container.style.background = value;
    this.container.dataset.value = value;
    this.label.innerText = value;
    this.value = value;
}

ColorField.prototype.htmlClrToHex = function(clrStr) {
    var m = document.createElement("canvas");
    var c = m.getContext("2d");

}

ColorField.prototype.oppositeColor = function(clrStr) {
    var r = (255 - parseInt(clrStr[1] + clrStr[2],16)).toString(16);
    var g = (255 - parseInt(clrStr[3] + clrStr[4],16)).toString(16);
    var b = (255 - parseInt(clrStr[5] + clrStr[6],16)).toString(16);
    return "#" + r + g + b;
}

export default ColorField;