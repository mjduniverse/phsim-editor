import clipboard from "./clipboard.js";
import { deleteObjectSLO } from "./delete.js";
import { elm } from "./elements.js";
import { getMouse, getMouseX, getMouseY, mousePrev } from "./getmouse.js";
import HTMLConfirm from "./htmlConfirm.js";
import HTMLWin from "./htmlwin.js";
import JSONViewer from "./jsonViewer.js";
import {mouseObject} from "./mouseObject.js";
import multiSelect from "./multiSelect.js";
import ObjectEditor from "./objectEditor.js";
import render_static from "./render_static.js";
import { getSelectionRadius } from "./session.js";
import { getVertsByCircleAndObj } from "./vertices.js";
import widgets from "./widgets.js";
import { xLabeledButton } from "./xlabeled.js";
import getArrCentroid from "./getArrayCentroid.js";

function deletePoint() {

    if(mouseObject.cond) {

        if(mouseObject.mObj.shape === "polygon") {

        var mouseVert = getVertsByCircleAndObj(mouseObject.mObj,getSelectionRadius(),getMouseX(),getMouseY())[0];

        if(mouseVert) {

            var vStr = "(" + mouseVert.x + "," + mouseVert.y + ")";

            this.addListItem("Delete point" + vStr,function() {
                var m = new HTMLAlert("Are you sure you want to delete " + vStr + "?",function(){
                    mouseObject.mObj.verts.splice(mouseObject.mObj.verts.indexOf(mouseVert),1);
                    render_static();
                })
            });
        }

        }

    }

}

function deleteObject() {

    var objName = null;

    if(multiSelect.selectedObjects.length > 0) {
        objName = "(" + multiSelect.selectedObjects.length + ") selected items"
    }

    else {
        objName = mouseObject.mObj.name;
    }

    new HTMLConfirm("Are you sure you want to delete \"" + objName + "\"?", function(){

        if(mouseObject.cond && multiSelect.selectedObjects.length === 0) {
            deleteObjectSLO(session.simulationI,session.selectedLayerI,mouseObject.gObject);
            multiSelect.deselect()
        }

        if(multiSelect.selectedObjects.length > 0) {
            multiSelect.deleteAll();
        }

    });
}

function ContextMenu(object,x,y) {

    var self = this;

    this.mouseInContextMenu = null;

    ContextMenu.inst = this;

    this.object = object;
    this.list = document.createElement("div");
    this.list.classList.add("context-menu-ph")
    this.list.style.position = "fixed";
    this.list.style.left = x + "px";
    this.list.style.top = y + "px";

    /*

    var objEditor = elementFromHTML("div","Object Properties");
    var delObj = elementFromHTML("div","Delete Object")

    if(this.object) {
        this.list.appendChild(objEditor);
        this.list.appendChild(delObj);
    }

    */

    this.addListItem("Select All",function(){
        multiSelect.selectAll();
        render_static();
    });

    this.addSeperator();

    if(mouseObject.cond && !widgets.mouseObject.vectorIndex && multiSelect.selectedObjects.length > 0) {

        this.object = mouseObject.mObj;
        var self = this;

        this.addListItem("Object Properties",function() {
            var a = new ObjectEditor(self.object);
            a.open();
        });

        this.addListItem("Cut",clipboard.cut.bind(clipboard));
        this.addListItem("Copy",clipboard.copy.bind(clipboard));

        /* 

        if(multiSelect.selectedObjects.length > 0) {

            this.addListItem("Lock Selected",multiSelect.forAll(function(o){
                o.locked = true;
            }));

            this.addListItem("Unlock Selected",multiSelect.forAll(function(o){
                o.locked = false;
            }));

            this.addListItem("Toggle Lock",multiSelect.forAll(function(o){
                o.locked = !o.locked
            }));

        }

        */


    }

    if(mouseObject.cond) {

            if(mouseObject.mObj.shape === "polygon") {

            var mouseVert = getVertsByCircleAndObj(mouseObject.mObj,getSelectionRadius(),getMouseX(),getMouseY())[0];

            if(mouseVert) {

                var vStr = "(" + mouseVert.x + "," + mouseVert.y + ")";

                this.addListItem("Delete point" + vStr,function() {
                    var m = new HTMLAlert("Are you sure you want to delete " + vStr + "?",function(){
                        mouseObject.mObj.verts.splice(mouseObject.mObj.verts.indexOf(mouseVert),1);
                        render_static();
                    })
                });
            }

        }

    }

    if(mouseObject.cond || multiSelect.selectedObjects.length > 0) {

        var del_obj_txt_str = "";

        if(multiSelect.selectedObjects.length > 0) {
            var del_obj_txt_str = "Delete Selected Items";
        }

        else {
            del_obj_txt_str = "Delete Object"
        }


        
        this.addListItem(del_obj_txt_str,function() {

            var objName = null;

            if(multiSelect.selectedObjects.length > 0) {
                objName = "(" + multiSelect.selectedObjects.length + ") selected items"
            }

            else {
                objName = mouseObject.mObj.name;
            }

            new htmlConfirm("Are you sure you want to delete \"" + objName + "\"?", function(){

                if(mouseObject.cond && multiSelect.selectedObjects.length === 0) {
                    deleteObjectSLO(session.simulationI,session.selectedLayerI,mouseObject.gObject);
                    multiSelect.deselect()
                }

                if(multiSelect.selectedObjects.length > 0) {
                    multiSelect.deleteAll();
                }

            });
        });

        this.addListItem("Move to top of layer",function(){
            multiSelect.moveToTop();
        });

        this.addListItem("See Source",function(){
            multiSelect.forAll(function(o){
                new JSONViewer(o);
            })
        })

        if(multiSelect.selectedObjects.length > 0) {

            this.addListItem("Change Sensor Classes",function(){

                // Div

                var d = document.createElement("div");
                d.className = "change-cs-div";
                d.innerHTML = "Change Sensor Class for the selected object(s):";

                // Input

                var e = document.createElement("input");
                e.className = "change-cs-input";
                d.appendChild(e);

                // List

                var l = document.createElement("ul");

                multiSelect.forAll(function(o){
                    var li = document.createElement("li");
                    l.appendChild(li);
                    li.innerText = o.name;
                })

                d.appendChild(l);

                // Apply Button

                var b = new xLabeledButton("Change Censor Classes",function(){
                    multiSelect.forAll(function(o){
                        o.sensorClass = e.value;
                    });
                });

                d.appendChild(b);

                // HTMLWin

                var csc = new HTMLWin("Change Sensor Class","change-sensor-class","superWin");
                
                csc.winBody.appendChild(d);

                csc.appendToDocumentBody();	

            });

            this.addListItem("Change Collision Classes",function(){

                // Div

                var d = document.createElement("div");
                d.className = "change-col-div";
                d.innerHTML = "Change Collision Class for the selected object(s):";

                // Input

                var e = document.createElement("input");
                e.className = "change-col-input";
                d.appendChild(e);

                // List

                var l = document.createElement("ul");

                multiSelect.forAll(function(o){
                    var li = document.createElement("li");
                    l.appendChild(li);
                    li.innerText = o.name;
                })

                d.appendChild(l);

                // Apply Button

                var b = new xLabeledButton("Change Collision Classes",function(){
                    multiSelect.forAll(function(o){
                        o.collisionClass = e.value;
                    });
                });

                d.appendChild(b);

                // HTMLWin

                var csc = new HTMLWin("Change Collision Class","change-collision-class","superWin");
                
                csc.winBody.appendChild(d);

                csc.appendToDocumentBody();	

            });

        }

        this.addListItem("Change Multiple Objects",function(){

            // Div

            var d = document.createElement("div");
            d.className = "change-cs-div";
            d.innerHTML = "Change Sensor Class for the selected object(s):";

            // List

            var l = document.createElement("ul");

            multiSelect.forAll(function(o){
                var li = document.createElement("li");
                l.appendChild(li);
                li.innerText = o.name || "--Untitled Object--";
            })

            d.appendChild(l);

            // Input

            var e = document.createElement("input");
            e.className = "change-cs-input";
            d.appendChild(e);

            // Apply Button

            var b = new xLabeledButton("Change Censor Classes",function(){
                multiSelect.forAll(function(o){
                    o.sensorClass = e.value;
                });
            });

            d.appendChild(b);

            // Lock All Objects

            var lao = new xLabeledButton("Lock",function(){
                multiSelect.forAll(function(o){
                    o.locked = true;
                });
            });

            // unlock All Objects

            var uao = new xLabeledButton("Unlock",function(){
                multiSelect.forAll(function(o){
                    o.locked = false;
                });
            })

            // toggle lock status

            var tls = new xLabeledButton("Toggle Lock",function(){
                multiSelect.forAll(function(o){
                    o.locked = !o.locked;
                });
            })

            // HTMLWin

            var csc = new HTMLWin("Change Sensor Class","change-sensor-class","superWin");
            
            csc.winBody.appendChild(d);
            csc.winBody.appendChild(lao);
            csc.winBody.appendChild(uao);

            csc.appendToDocumentBody();	

        });



    }

    if(Number.isInteger(widgets.mouseObject.vectorIndex)) {

        this.addListItem("Widget Properties",function() {
            
        })

    }

    if(clipboard.array.length > 0) {
        this.addListItem("Paste",function() {
            
            var c = getArrCentroid(clipboard.array);
            clipboard.transformAll(-c.x,-c.y);
            clipboard.transformAll(mousePrev.x,mousePrev.y);

            clipboard.paste.call(clipboard);
            render_static();
        });
    }


    this.list.addEventListener("mouseenter", function() {
        self.mouseInContextMenu = true;
    });

    this.list.addEventListener("mouseleave", function() {
        self.mouseInContextMenu = false;
    });

    document.body.appendChild(this.list);

}

ContextMenu.prototype.addSeperator = function() {
    var s = document.createElement("div");
    s.className = "context-menu-seperator";
    this.list.appendChild(s);
}

ContextMenu.prototype.remove = function() {
    document.body.removeChild(this.list);
    ContextMenu.inst = null;
}

ContextMenu.prototype.addListItem = function(name,onclick) {

    var self = this;

    var element = document.createElement("div");
    element.classList.add("context-menu-item");

    var label = document.createElement("span");
    label.innerHTML = name;
    label.classList.add("context-menu-label")

    element.appendChild(label);

    element.addEventListener("click",function() {
        onclick();
        self.remove();
    })

    this.list.appendChild(element);

    return element;

}

ContextMenu.inst = null;

elm.addEventListener("contextmenu", function(e) {

    if(ContextMenu.inst === null) {
        ContextMenu.inst = new ContextMenu(mouseObject.mObj,e.pageX,e.pageY);
    }

    else {
        ContextMenu.inst.remove();
        ContextMenu.inst = new ContextMenu(mouseObject.mObj,e.pageX,e.pageY);
    }

    e.preventDefault();

});

window.addEventListener("mousedown",function() {
    if(ContextMenu.inst) {
        if(!ContextMenu.inst.mouseInContextMenu) {
            ContextMenu.inst.remove();
        }
    }
})



export default ContextMenu;