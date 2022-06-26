/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/usrpref.js
// User Preferences Default Values

var usrPref = {
	debugging: true,
	grid: 20,
	selection: {
		double: true,
		color: "#00ffdc",
		showSides: false
	},
	renderColored: true,
	autosave: true
};

/* harmony default export */ const usrpref = (usrPref);
;// CONCATENATED MODULE: ./src/elements.js
var elmName = '.bbb';

var elements_elm = document.querySelector(elmName);

elements_elm.style.position = "absolute";
elements_elm.style.top = "0px";

var elements_ctx = elements_elm.getContext('2d');

function setCanvasSizeToWindow() {
    elements_elm.width = window.screen.width;
    elements_elm.height =  window.screen.height;
}

setCanvasSizeToWindow();

//window.addEventListener("resize",setCanvasSizeToWindow);
;// CONCATENATED MODULE: ./src/topMenuBar.js
var items = document.querySelectorAll('.item');

for(var topMenuBar_i = 0; topMenuBar_i < items.length; topMenuBar_i++) {
    
    items[topMenuBar_i].addEventListener('mouseover', function() {
        this.querySelector('.submenu').style.display = "block";
    });
    
    items[topMenuBar_i].addEventListener('mouseout', function() {
        this.querySelector('.submenu').style.display = "none";
    });
    
}
;// CONCATENATED MODULE: ./src/htmlwin.js
function htmlwin_HTMLWin(title = "", htmlClass = "", species = "htmlWin", closeable = true, startHidden = false) {
		
    htmlwin_HTMLWin.instances.push(this);

    this.win = document.createElement('div');
    this.h3 = document.createElement('h3');
    this.winBody = document.createElement('div');
    this.win = document.createElement('div');

    this.winWrapper = document.createElement('div');

    this.closeButton = document.createElement('span');

    /**
     * Minimize Button
     */

    this.minimizeButton = document.createElement('span');
    this.minimizeButton.className = "htmlwin-min-button";

    this.minimizeButton.addEventListener("click",function(){
        thisAlias.minimizeToggle();
    })

    this.h3.className = "htmlwin-h3-header";
    
    this.closeButton.className = "htmlwin-close-button";
    
    var thisAlias = this; // Used as an alias for the "this" keyword.
    
    this.closeButton.addEventListener('click', function() {
        thisAlias.remove();
    });
    
    this.winWrapper.className = "winWrapper " + species;
        
    if(species === "htmlWin") {
        this.win.className = "win " + htmlClass;
    }
    
    if(species === "superWin") {
        this.win.className = "superWin " + htmlClass;
    }
    
    if(species === "fullScreenWin") {
        this.win.className = "fullScreenWin " + htmlClass;
    }
    
    this.winBody.className = "winBody ";
    
    this.h3.innerText = title;

    if(closeable === true) {
        this.h3.appendChild(this.closeButton);
        this.h3.appendChild(this.minimizeButton);
    }

    
    this.win.appendChild(this.h3);
    this.win.appendChild(this.winBody);
    
    this.winWrapper.appendChild(this.win);
    
    this.species = species;
}

htmlwin_HTMLWin.instances = [];

htmlwin_HTMLWin.baseZIndex = 1000;

htmlwin_HTMLWin.creationMethods = {
    "int": []
};

htmlwin_HTMLWin.addCreationEvent = function(eventClass,call) {
    htmlwin_HTMLWin.creationMethods[eventClass].push(call);
},

htmlwin_HTMLWin.prototype.getWinBodyWidth = function() {
    return this.winBody.getBoundingClientRect().width;
}

htmlwin_HTMLWin.execCreationEventClass = function(eventStr,eventArg) {
    for(var i = 0; i < htmlwin_HTMLWin.creationMethods[eventStr].length; i++) {
        htmlwin_HTMLWin.creationMethods[eventStr].call(this,(eventArg));
    }
}

htmlwin_HTMLWin.prototype.makeZIndexGreatest = function() {

    var a = Array.from(document.querySelectorAll(".winWrapper"));
    a.pop(this.winWrapper);

    for(var i = 0; i < a.length; i++) {
        a[i].style.zIndex = htmlwin_HTMLWin.baseZIndex + i;
    }
}

htmlwin_HTMLWin.prototype.prevWinbodyDisplay = "";

htmlwin_HTMLWin.prototype.minimizeToggle = function() {

    if(this.winBody.classList.contains("min")) {
        this.winBody.classList.remove("min");
        this.winBody.style.display = "inline-block";
        this.h3.style.width = this.getWinBodyWidth() + "px";
    }

    else {
        this.h3.style.width = this.getWinBodyWidth();
        this.prevWinbodyDisplay = this.winBody.style.display + "px";
        this.winBody.classList.add("min");
        this.winBody.style.display = "none";
    }
}

htmlwin_HTMLWin.prototype.getInstanceID = function() {
    return htmlwin_HTMLWin.instances.indexOf(this);
}

htmlwin_HTMLWin.prototype.setToCenter = function() {
    this.win.style.top =  ((0.5 * window.innerHeight) - (0.5 * this.win.clientHeight)) + "px";
}

htmlwin_HTMLWin.prototype.appendTo = function (element) {
    
    var self = this;

    element.appendChild(this.winWrapper);
    this.appended = element;

    if(this.species === "superWin") {
        this.win.style.position =  "relative";
        
        this.setToCenter();

        this.winWrapper.addEventListener("click",function(){
            self.makeZIndexGreatest();
        })
    }

    if(this.species === "htmlWin") {

        var self = this;

        $(this.winWrapper).draggable({
            containment: "window"
        }).css("position", "absolute");;

        $(this.winBody).resizable();

        this.winBody.addEventListener("click",function(){
            
        });

    }

}

htmlwin_HTMLWin.prototype.remove = function() {
    this.beforewindowremoval();
    this.removeFromParent();
    htmlwin_HTMLWin.instances.splice(htmlwin_HTMLWin.instances.indexOf(this),1);
}

htmlwin_HTMLWin.prototype.removeFromParent = function () {
    this.winWrapper.parentNode.removeChild(this.winWrapper);
}

htmlwin_HTMLWin.prototype.appendToDocumentBody = function() {
    this.appendTo(document.body);
}

htmlwin_HTMLWin.prototype.toggle = function (remove = false) {
    
    if(this.winWrapper.style.display === "none") {
        this.winWrapper.style.display = "inline-block";
        return null;
    }
    
    else {
        this.winWrapper.style.display = "none";
        return null;
    }
    
}

htmlwin_HTMLWin.prototype.onwindowtoggle = function() {};
htmlwin_HTMLWin.prototype.beforewindowtoggle = function() {};

htmlwin_HTMLWin.prototype.onwindowmin = function() {};

htmlwin_HTMLWin.prototype.onwindowremoval = function() {};
htmlwin_HTMLWin.prototype.beforewindowremoval = function() {};

htmlwin_HTMLWin.prototype.closeButtonClass = "close-button";
htmlwin_HTMLWin.prototype.minimizeButtonClass = "minimize";

htmlwin_HTMLWin.prototype.addCloseButton = function() {
    this.closeButton = document.createElement('span');
}

// Append node to window body.

htmlwin_HTMLWin.prototype.appendChild = function(node) {
    this.winBody.appendChild(node);
}

htmlwin_HTMLWin.prototype.removeChild = function(node) {
    this.winBody.removeChild(node);
}

/* harmony default export */ const htmlwin = (htmlwin_HTMLWin);
;// CONCATENATED MODULE: ./src/htmlConfirm.js


function htmlConfirm_HTMLConfirm(message,onok = function() {} ,oncancel = function() {} ) {
		
    var this_a = this;
    
    var messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;

    this.htmlWin = new htmlwin("Message:","alert","superWin",false);

    this.okButton = document.createElement("span");
    this.okButton.className = "button ok";
    this.okButton.innerText = "OK";
    this.okButton.addEventListener('click', function() {
        this_a.htmlWin.remove();
        onok();
    });
    
    this.htmlWin.winBody.appendChild(messageDiv);

    this.htmlWin.winBody.appendChild(this.okButton);

    this.cancelButton = document.createElement("span");
    this.cancelButton.className = "button red";
    this.cancelButton.innerText = "Cancel";
    this.cancelButton.addEventListener('click', function() {
        this_a.htmlWin.remove();
        oncancel();
    });

    this.htmlWin.winBody.appendChild(this.cancelButton);

    this.htmlWin.appendTo(document.body);
}

/* harmony default export */ const src_htmlConfirm = (htmlConfirm_HTMLConfirm);
;// CONCATENATED MODULE: ./src/createTempImgURL.js
function createTempImgURL(base64url) {

    var s = atob(base64url.split(",")[1]);

    var type = base64url.split(";")[0].split(":")[1]; 

    var a = [];

    for(var i = 0; i < s.length; i++) {
        a.push(s[i].codePointAt());
    }

    var uint8 = Uint8Array.from(a);

    var blob = new Blob([uint8],{
        type: type
    });

    return URL.createObjectURL(blob);
}

window.createTempImgURL = createTempImgURL;

/* harmony default export */ const src_createTempImgURL = (createTempImgURL);
;// CONCATENATED MODULE: ./src/htmlAlert.js


function htmlAlert_HTMLAlert(message, onok = function() {} ) {

    var this_a = this;
    
    var messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;

    this.messageDiv = messageDiv;

    this.htmlWin = new htmlwin("Message:","alert","superWin",false);

    this.closeButton = document.createElement("span");
    this.closeButton.className = "button red";
    this.closeButton.innerText = "OK";
    this.closeButton.addEventListener('click', function() {
        this_a.htmlWin.remove();
        onok();
    });

    this.htmlWin.winBody.appendChild(messageDiv);
    this.htmlWin.winBody.appendChild(this.closeButton);

    this.htmlWin.appendTo(document.body);
}

/* harmony default export */ const htmlAlert = (htmlAlert_HTMLAlert);
;// CONCATENATED MODULE: ./src/shortcuts.js


function shortcuts_getSelectedSimulation() {
    return session_session.sim.simulations[session_session.simulationI];
}

function getSelectedLayer() {
    return shortcuts_getSelectedSimulation().layers[session_session.selectedLayerI];
}

function shortcuts_selectsimulation(i) {
    session_session.simulationI = i;
};

var SL = function(S,L) {
    return session_session.sim.simulations[S].layers[L];
}

function SLO(S,L,O) {
    
    if(session_session.sim.simulations[S].layers[L].objUniverse[O]) {
        return session_session.sim.simulations[S].layers[L].objUniverse[O];
    }
    
    else {
        return null;
    }
}

var shortcuts_LO = function(L,O) {
    return SLO(session_session.simulationI,L,O);
}
;// CONCATENATED MODULE: ./src/mouseObject.js
/****************

Code for Selecting objects
Copyright 2019 Mjduniverse.com

*****************/




var mouseObject_mouseObject = {
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

function mObj() {
    return LO(mouseObject_mouseObject.gLayer,mouseObject_mouseObject.gObject);
}

var selectionObject = {
    gLayer: null,
    gObject: null,
    selected: false,
    vertexSelected: false,
    vi: null,
    transformingByMouse: false,
    sObj: null,
}

function mouseObject_sObj() {
    return src_multiSelect.selectedObjects[0];
}

window.mouseObject = mouseObject_mouseObject;
window.selectionObject = selectionObject;
;// CONCATENATED MODULE: ./src/objloops.js



var objloops_objLoops = {

    /**
     * Execute function on all objects in simulation options
     * @param {Function} method 
     */

    global: function(method) {
        return PhSim.ObjLoops.global(session_session.sim,method);
    },

    /**
     * Execute function on all objects in the selected simulation
     * @param {Function} method 
     */

    subglobal: function(method) {
        for(var j = 0; j < shortcuts_getSelectedSimulation().layers.length; j++) {
            for(var k = 0; k < shortcuts_getSelectedSimulation().layers[j].objUniverse.length; k++) {
                method(shortcuts_getSelectedSimulation().layers[j].objUniverse[k]);
            }
        }
    },

    /**
     * Execute function on all widgets in simulation options
     * @param {Function} method 
     */

    subglobal_widgets: function(method) {
        this.subglobal(function(o){
            if(o.widgets) {
                for(var i = 0; i < o.widgets.length; i++) {
                    method(o.widgets[i],i);
                }
            }
        });
    },

    rel_index_subglobal: function(method,rel_i) {
        for(var j = 0; j < session_session.sim.simulations[rel_i].layers.length; j++) {
            for(var k = 0; k < session_session.sim.simulations[rel_i].layers[j].objUniverse.length; k++) {
                method.call(session_session.sim.simulations[rel_i].layers[j].objUniverse[k],rel_i,j,k);
            }
        }
    },

    simulation: function(simulation,method) {
        return PhSim.ObjLoops.simulation(simulation,method);
    },

    layer: function(layer,method) {
        return PhSim.ObjLoops.layer(layer,method);
    },

    layerConstraints: function(layer,method) {
        for(k = 0; k < layer.objUniverse.length; k++) {
            method(layer.objUniverse[k]);
        }
    }

}

/* harmony default export */ const objloops = (objloops_objLoops);
;// CONCATENATED MODULE: ./src/simproxyhandler.js
var simProxyHandler = {

    getProxy: true,

    get: function(target,key) {
        if(this.getProxy && target[key] && typeof target[key] === "object") {
            if(proxyMap.toProxy.get(target[key]) === undefined) {
                var proxy = new Proxy(target[key],simProxyHandler);
                proxyMap.toProxy.set(target[key],proxy);
                proxyMap.toObject.set(proxy,target[key]);
                return proxy;
            }

            else {
                return proxyMap.toProxy.get(target[key]);
            }
        }

        else {
            return target[key];
        }

    },

    apply: function(target,thisArg,argList) {

        if(target.name === "indexOf") {
            target(proxyMap.toObject(argList[0]));
        }

        else {
            return target.apply(thisArg,argList);
        }

    },

    set: function(target,key,value) {

        target[key] = value;

        /**if(target[key] && typeof target[key] === "object" && key !== "parentObj" && (target.regPolygon || target.circle || target.rectangle || target.Polygon)) {
            target[key].
        }**/

        return true;

    },

    /** 

    deleteProperty: function(target,key) {

        if(Array.isArray(target)) {
            target.splice(key,1);
        }

        else {
            delete target[key];
        }

    }

    */



}



var proxyMap = {
    toProxy: new Map(),
    toObject: new Map()
}

/* harmony default export */ const simproxyhandler = (simProxyHandler);
;// CONCATENATED MODULE: ./src/addObjContainers.js



function addBlankLayer(simulation) {
    var newLayer = new PhSim.Static.Layer();
    newLayer.name = "Layer" + session_session.sim.simulations[session_session.simulationI].layers.length.toString();
    session_session.sim.simulations[session_session.simulationI].layers.push(newLayer);
    addLayerOption(newLayer)
    session_session.syn.layers();
    return newLayer;
}

function addBlankSimulation(sim) {
    var newSL = new PhSim.Static.Simulation();
    newSL.name = "simulation" + session_session.sim.simulations.length.toString();
    session_session.sim.simulations.push(newSL);
    addSimulationSelection(newSL);
    session_session.syn.layers();
    return newSL;
}
;// CONCATENATED MODULE: ./src/colorForm.js
	/*** 
	 * 
	 * Code for generating an image containing all HSL hues on color wheel
	 * Copyright Mjduniverse.com
	 * 
	*/

	var HSLCanvas = {

		h: function(w,h) {
			var hueCanvas = document.createElement("canvas");
			var hueCtx = hueCanvas.getContext("2d");
		
			hueCanvas.width = w;
			hueCanvas.height = h;
		
			var grad = hueCtx.createLinearGradient(0,hueCanvas.height * 0.5,hueCanvas.width,hueCanvas.height * 0.5)
		
			for(var h = 0; h < 361; h++) {
				grad.addColorStop(h/360,"hsl(" + h + ",100%,50% )");
			}
		
			hueCtx.fillStyle = grad
		
			hueCtx.fillRect(0,0,hueCanvas.width,hueCanvas.height);
		
			return hueCanvas
		},

		s: function(w,h,hue) {
			var satCanvas = document.createElement("canvas");
			var satCtx = satCanvas.getContext("2d");
		
			satCanvas.width = w;
			satCanvas.height = h;
		
			var grad = satCtx.createLinearGradient(0,satCanvas.height * 0.5,satCanvas.width,satCanvas.height * 0.5)
		
			for(var s = 0; s < 101; s++) {
				grad.addColorStop(s/101,"hsl(" + hue + "," + s + "%,50%)");
			}
		
			satCtx.fillStyle = grad
		
			satCtx.fillRect(0,0,satCanvas.width,satCanvas.height);
		
			return satCanvas
		},

		l: function(w,h,hue) {
			var lCanvas = document.createElement("canvas");
			var lCtx = lCanvas.getContext("2d");
		
			lCanvas.width = w;
			lCanvas.height = h;
		
			var grad = lCtx.createLinearGradient(0,lCanvas.height * 0.5,lCanvas.width,lCanvas.height * 0.5)
		
			for(var s = 0; s < 101; s++) {
				grad.addColorStop(s/101,"hsl(" + hue + ",50%," + s + "%)");
			}
		
			lCtx.fillStyle = grad
		
			lCtx.fillRect(0,0,lCanvas.width,lCanvas.height);
		
			return lCanvas
		}
	}



function colorForm(hexStr) {

    var body = document.createElement("div");
    body.className = "colorform-body";

    var clr = {
        parseInt: function(a) {
            
            var s = a.toString("16")
            
            if(a < 15) {
            s = "0" + s;
            }
            
            return s;
            
        },
        r: 0,
        g: 0,
        b: 0,
        hexStr: function() {
            return "#" + this.parseInt(clr.r) + this.parseInt(clr.g) + this.parseInt(clr.b)
        },
        "container": body,
        onupdateClr: function() {}
    }

    var container = document.createElement("div");

    function setHex(hexStr) {
        ctx.fillStyle = hexStr;                 
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        var imgData = ctx.getImageData(0,0,1,1).data;
        
        clr.r = imgData[0];
        clr.g = imgData[1];
        clr.b = imgData[2];
                        
        rNum.value = imgData[0];
        gNum.value = imgData[1];
        bNum.value = imgData[2];
    
        r.value = imgData[0];
        g.value = imgData[1];
        b.value = imgData[2];
    }

    
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.className = "clrCanvas";

    var hexInput = document.createElement("input");
    hexInput.className = "hexInput";
    hexInput.value = hexStr;
    hexInput.addEventListener("input",function(){
        setHex(this.value);
    });

    body.appendChild(canvas);

    body.appendChild(hexInput)

    body.appendChild(container);

    function onupdateClr() {
        ctx.fillStyle = clr.hexStr(); ctx.fillRect(0,0,canvas.width,canvas.height);
        hexInput.value = clr.hexStr();
        clr.onupdateClr();
    }

    function partialHex(str) {
        if(str.length === 0 || str.length === 1) {
            return "#000000"
        }
        
        if(str.length === 2) {
            return "#" + str[1] + "00000"
        }
        
        if(str.length === 3) {
            return "#" + str[1] + str[2] + "0000"
        }
        
        if(str.length === 4) {
            return "#" + str[1] + str[2] + str[3]+ "000"
        }
        
        if(str.length === 5) {
            return "#" + str[1] + str[2] + str[3]+ str[4] + "00"
        }
        
        if(str.length === 6) {
            return "#" + str[1] + str[2] + str[3]+ str[4] + str[5] + "0"
        }
        
        if(str.length === 7) {
            return str;
        }
    }

    var rgbHeader = document.createElement("h3");
    rgbHeader.innerText = "RGB:"

    /*** Text Inputs ***/

    var rNum = document.createElement("input");
    var gNum = document.createElement("input");
    var bNum = document.createElement("input");

    rNum.type = "number";
    gNum.type = "number";
    bNum.type = "number";

    rNum.min = 0;
    rNum.max = 255;

    gNum.min = 0;
    gNum.max = 255;

    bNum.min = 0;
    bNum.max = 255;

    rNum.addEventListener("input",function(){
        clr.r = Number.parseInt(this.value);
        r.value = Number.parseInt(this.value);
        onupdateClr();
    })

    bNum.addEventListener("input",function(){
        clr.b = Number.parseInt(this.value);
        b.value = Number.parseInt(this.value);
        onupdateClr();
    })

    gNum.addEventListener("input",function(){
        clr.g = Number.parseInt(this.value);
        g.value = Number.parseInt(this.value);
        onupdateClr();
    })

    /*** Range Inputs ***/

    var r = document.createElement("input");
    var g = document.createElement("input");
    var b = document.createElement("input");

    r.addEventListener("input",function(){
        clr.r = Number.parseInt(this.value);
        rNum.value = Number.parseInt(this.value);
        onupdateClr();
    })

    g.addEventListener("input",function(){
        clr.g = Number.parseInt(this.value);
        gNum.value = Number.parseInt(this.value);
        onupdateClr();
    })

    b.addEventListener("input",function(){
        clr.b = Number.parseInt(this.value);
        bNum.value = Number.parseInt(this.value);
        onupdateClr();
    })

    r.className = "colorRange red";
    g.className = "colorRange green";
    b.className = "colorRange blue";

    r.type = "range";
    g.type = "range";
    b.type = "range";

    r.min = 0;
    r.max = 255;

    g.min = 0;
    g.max = 255;

    b.min = 0;
    b.max = 255;

    /*** Input Pairs ***/

    var rPair = document.createElement("div");
    var bPair = document.createElement("div");
    var gPair = document.createElement("div");

    var rLabel = document.createElement("label");
    rLabel.className = "rgbLabel";
    rLabel.innerText = "Red:"
    rPair.appendChild(rLabel);
    rPair.appendChild(r);
    rPair.appendChild(rNum);

    var gLabel = document.createElement("label");
    gLabel.className = "rgbLabel";
    gLabel.innerText = "Green:"
    gPair.appendChild(gLabel);
    gPair.appendChild(g);
    gPair.appendChild(gNum);

    var bLabel = document.createElement("label");
    bLabel.className = "rgbLabel";
    bLabel.innerText = "Blue:"
    bPair.appendChild(bLabel);
    bPair.appendChild(b);
    bPair.appendChild(bNum);


    container.appendChild(rgbHeader);
    container.appendChild(rPair);
    container.appendChild(gPair);
    container.appendChild(bPair);



    /*** HSL Functions ***/

    var HSLCanvas = {

            h: function(w,h) {
                var hueCanvas = document.createElement("canvas");
                var hueCtx = hueCanvas.getContext("2d");
            
                hueCanvas.width = w;
                hueCanvas.height = h;
            
                var grad = hueCtx.createLinearGradient(0,hueCanvas.height * 0.5,hueCanvas.width,hueCanvas.height * 0.5)
            
                for(var h = 0; h < 361; h++) {
                    grad.addColorStop(h/360,"hsl(" + h + ",100%,50% )");
                }
            
                hueCtx.fillStyle = grad
            
                hueCtx.fillRect(0,0,hueCanvas.width,hueCanvas.height);
            
                return hueCanvas
            },

            s: function(w,h,hue) {
                var satCanvas = document.createElement("canvas");
                var satCtx = satCanvas.getContext("2d");
            
                satCanvas.width = w;
                satCanvas.height = h;
            
                var grad = satCtx.createLinearGradient(0,satCanvas.height * 0.5,satCanvas.width,satCanvas.height * 0.5)
            
                for(var s = 0; s < 101; s++) {
                    grad.addColorStop(s/101,"hsl(" + hue + "," + s + "%,50%)");
                }
            
                satCtx.fillStyle = grad
            
                satCtx.fillRect(0,0,satCanvas.width,satCanvas.height);
            
                return satCanvas
            },

            l: function(w,h,hue) {
                var lCanvas = document.createElement("canvas");
                var lCtx = lCanvas.getContext("2d");
            
                lCanvas.width = w;
                lCanvas.height = h;
            
                var grad = lCtx.createLinearGradient(0,lCanvas.height * 0.5,lCanvas.width,lCanvas.height * 0.5)
            
                for(var s = 0; s < 101; s++) {
                    grad.addColorStop(s/101,"hsl(" + hue + ",50%," + s + "%)");
                }
            
                lCtx.fillStyle = grad
            
                lCtx.fillRect(0,0,lCanvas.width,lCanvas.height);
            
                return lCanvas
            }
        }

    /*** HSL Form ***/

    var hslStruct = {
    h: "0",
    s: "100%",
    l: "50%"
    }

    function hsl2hex() {
        
    ctx.fillStyle = "hsl(" + hslStruct.h + "," + hslStruct.s + "," + hslStruct.l + ")";                 ctx.fillRect(0,0,canvas.width,canvas.height);
        
        var imgData = ctx.getImageData(0,0,1,1).data;
        
        clr.r = imgData[0];
        clr.g = imgData[1];
        clr.b = imgData[2];
                        
        rNum.value = imgData[0];
        gNum.value = imgData[1];
        bNum.value = imgData[2];
    
        r.value = imgData[0];
        g.value = imgData[1];
        b.value = imgData[2];

        onupdateClr()
    }

    var h3hsl = document.createElement("h3");
    h3hsl.innerText = "HSL"
    container.appendChild(h3hsl);

    var h = document.createElement("input");
    var s = document.createElement("input");
    var l = document.createElement("input");

    h.style = "background-image: url('" + HSLCanvas.h(400,20).toDataURL() + "')"

    h.addEventListener("input",function(){
        hslStruct.h = Number.parseInt(this.value);
        hNum.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
        s.style = "background-image: url('" + HSLCanvas.s(400,20,hslStruct.h).toDataURL() + "')"
        l.style = "background-image: url('" + HSLCanvas.l(400,20,hslStruct.h).toDataURL() + "')"
    })

    s.addEventListener("input",function(){
        hslStruct.s = Number.parseInt(this.value) + "%";
        sNum.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    l.addEventListener("input",function(){
        hslStruct.l = Number.parseInt(this.value) + "%";
        lNum.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    h.className = "colorRange h";
    s.className = "colorRange s";
    l.className = "colorRange l";

    h.type = "range";
    s.type = "range";
    l.type = "range";

    h.min = 0;
    h.max = 360;

    s.min = 0;
    s.max = 100;

    l.min = 0;
    l.max = 100;

    // HSL Number Inputs

    var hNum = document.createElement("input");
    var sNum = document.createElement("input");
    var lNum = document.createElement("input");

    hNum.type = "number";
    sNum.type = "number";
    lNum.type = "number";

    hNum.min = 0;
    hNum.max = 360;

    sNum.min = 0;
    sNum.max = 100;

    lNum.min = 0;
    lNum.max = 100;

    hNum.addEventListener("input",function(){
        hslStruct.h = Number.parseInt(this.value);
        h.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
        s.style = "background-image: url('" + HSLCanvas.s(400,20,hslStruct.h).toDataURL() + "')"
        l.style = "background-image: url('" + HSLCanvas.l(400,20,hslStruct.h).toDataURL() + "')"
    })

    sNum.addEventListener("input",function(){
        hslStruct.s = Number.parseInt(this.value) + "%";
        s.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    lNum.addEventListener("input",function(){
        hslStruct.l = Number.parseInt(this.value) + "%";
        l.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    // Hex to HSL

    function getHSLFromRGB(r,g,b) {

        var k = {
            "r": r/255,
            "g": g/255,
            "b": b/255
        }

        var a = [k.r,k.g,k.b];

        var min = Math.min.apply(this,a);
        var max = Math.max.apply(this,a);

        var l = (min + max)/2

        var s = 0;

        if(l < 0.5) {
            var s = (max-min)/(max+min);
        }

        if(l > 0.5) {
            var s = (max-min)/(2-max-min);
        }

        var h = 0;

        if(max === k.r) {
            h = (k.g-k.b)/(max-min)
        } 

        if(max === k.g) {
            h = 2 + (k.b-k.r)/(max-min)
        } 

        if(max === k.b) {
            h = 4 + (k.r-k.g)/(max-min)
        } 

        h = h * 60

        return {
            "h": Math.round(h * 10),
            "s": Math.round(s * 10),
            "l": Math.round(l * 10)
        }

    }

    // HSL Pairs

    var hPair = document.createElement("div");
    hPair.className = "hPair";
    var hLabel = document.createElement("label");
    hLabel.innerText = "Hue:"
    hLabel.className = "rgbLabel h"
    hPair.appendChild(hLabel);
    hPair.appendChild(h);
    hPair.appendChild(hNum);
    container.appendChild(hPair);

    var sPair = document.createElement("div");
    sPair.className = "sPair";
    var sLabel = document.createElement("label");
    sLabel.innerText = "Saturation:"
    sLabel.className = "rgbLabel s"
    sPair.appendChild(sLabel);
    sPair.appendChild(s);
    sPair.appendChild(sNum);
    container.appendChild(sPair);

    var lPair = document.createElement("div");
    lPair.className = "lPair";
    var lLabel = document.createElement("label");
    lLabel.innerText = "Light:"
    lLabel.className = "rgbLabel l"
    lPair.appendChild(lLabel);
    lPair.appendChild(l);
    lPair.appendChild(lNum);
    container.appendChild(lPair);

    setHex(hexStr);

    return clr;
}
;// CONCATENATED MODULE: ./src/xlabeled.js
function xLabeledInput(label,type,defaultValue,inputClass,oninput) {
    var a = document.createElement("div");
    var b = document.createElement("span");
    var c = document.createElement("input");

    a.appendChild(b);
    a.appendChild(c);
    a.classList.add("xlabeled-container");

    b.innerText = label;
    b.classList.add("xlabeled-label");

    c.type = type;
    c.addEventListener("input",oninput);
    c.value = defaultValue;

    c.classList = inputClass;
    c.classList.add("xlabeled-input");

    return a;
}

function tr_xLabeledInput(label,type,defaultValue,inputClass,oninput) {

    var a = document.createElement("tr");
    var b = document.createElement("span");
    var c = document.createElement("input");

    var tr_1 = a.insertCell();
    var tr_2 = a.insertCell();

    tr_1.appendChild(b);
    tr_2.appendChild(c);

    a.classList.add("xlabeled-container");

    if(typeof label === "string") {
        b.innerText = label;
    }

    else if(label instanceof HTMLElement) {
        b.appendChild(label);
    }

    b.classList.add("xlabeled-label");

    c.type = type;
    c.addEventListener("input",oninput);
    c.value = defaultValue;

    c.classList.add(inputClass);
    c.classList.add("xlabeled-input");

    return a;
}

function tr_xLabeledElement(label,element) {
    
    var tr = document.createElement("tr");

    var td_1 = document.createElement("td");
    var td_2 = document.createElement("td");

    tr.appendChild(td_1);
    tr.appendChild(td_2);

    td_1.innerText = label;
    td_2.appendChild(element);

    return tr;
}

function xLabeledButton(label,onclick) {
    var button = document.createElement("span");
    button.innerText = label;
    button.classList.add("button");
    button.addEventListener("click",onclick);
    button.classList.add("xlabeled-button");
    return button;
}


;// CONCATENATED MODULE: ./src/colorField.js




/***
*
* Color Form
*
****/

function colorField_ColorField(value,title,onsubmit = function() {} ) {

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
        
        var htmlWin = new htmlwin("Color - " + title,"colorfield-window","superWin");
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

colorField_ColorField.prototype.setValue = function(value) {
    this.container.style.background = value;
    this.container.dataset.value = value;
    this.label.innerText = value;
    this.value = value;
}

colorField_ColorField.prototype.htmlClrToHex = function(clrStr) {
    var m = document.createElement("canvas");
    var c = m.getContext("2d");

}

colorField_ColorField.prototype.oppositeColor = function(clrStr) {
    var r = (255 - parseInt(clrStr[1] + clrStr[2],16)).toString(16);
    var g = (255 - parseInt(clrStr[3] + clrStr[4],16)).toString(16);
    var b = (255 - parseInt(clrStr[5] + clrStr[6],16)).toString(16);
    return "#" + r + g + b;
}

/* harmony default export */ const colorField = (colorField_ColorField);
;// CONCATENATED MODULE: ./src/htmlFactory2.js
// Composite HTML Element

function compositeHTMLElement(tag) {
    var container = document.createElement(tag);

    for(var i = 1; i < arguments.length; i++) {
        container.appendChild(arguments[i]);
    }

    return container;
}

function createAppendElm(tagStr,targetNode) {
    var e = document.createElement(tagStr);
    targetNode.appendChild(e);
    return e;
}

function createAppendTxtElm(tagStr,targetNode,innerText) {
    var e = createAppendElm(tagStr,targetNode);
    e.innerText = innerText;
}

function keyAndValueTxtRow(key,value) {
    var a = document.createElement("td");
    var b = document.createElement("td");
    a.innerText = key;
    b.innerText = value;
    return compositeHTMLElement("tr",a,b);
}

;// CONCATENATED MODULE: ./src/dynSimEdit.js





/**

Edit by Physics

*/

var dynSimEdit = {

    phSim: null,

    // Map for associating static objects to a dynamic object in the simulation

    map: new Map(),
    
    activate: function() {

        dynSimEdit.phSim = new PhSim(sim);
        dynSimEdit.phSim.noCamera = true;
        dynSimEdit.phSim.gotoSimulationIndex(session.simulationI);

        dynSimEdit.phSim.addEventListener("objupdate",function(e) {
            Object.assign(e.target.static,e.target.object);
            dynSimEdit.map.set(e.target.static,e.target);
        });

        dynSimEdit.phSim.addEventListener("afterupdate",function(){
            src_render_static();
        });

    },

    deactivate: function() {
        dynSimEdit.phSim.exit();
        dynSimEdit.phSim = null;
    },

    gui: {

        htmlWin: null,

        open: function() {

            dynSimEdit.gui.htmlWin = new htmlwin("Edit by Simulation");
            dynSimEdit.gui.htmlWin.appendToDocumentBody();

            var playButton = xLabeledButton("Play",function(){
                
                if(dynSimEdit.phSim) {
                    dynSimEdit.phSim.play();
                }

                else {
                    dynSimEdit.activate();
                }

            });

            var pauseButton = xLabeledButton("Pause",function(){
                if(dynSimEdit.phSim) {
                    dynSimEdit.phSim.pause();
                }
            });

            var exitButton = xLabeledButton("Exit",function(){
                if(dynSimEdit.phSim) {
                    dynSimEdit.deactivate();
                }
            });

            var buttons = compositeHTMLElement("div",playButton,pauseButton,exitButton);

            dynSimEdit.gui.htmlWin.winBody.appendChild(buttons);

        }


    }

}

//document.querySelector(".dynsim-edit").addEventListener("click",function(){
  //  dynSimEdit.gui.open();
//});

/* harmony default export */ const src_dynSimEdit = (dynSimEdit);
;// CONCATENATED MODULE: ./src/gensim.js



/**
 * 
 * Get text array of wFunctions
 * 
 */

function getWFunctionTxtArr(arrName,indent) {

    var a = [];
  
    a.push(`var ${arrName} = [];\n`);

    objloops.subglobal_widgets(function(o){
        if(o.type === "wFunction") {
            
            var s = o.function;

            var n = "\n".padEnd(indent);

            s.replace(/\n/g,n)

            a.push(arrName + "[" + (a.length - 1) + "] = " + "function() {\n" + s + "\n};\n")
        }
    });

    return a.join("\n");

}

// Generate ZIP Folder

function generateZipFolder() {

    var simObj = PhSim.Query.deepClone(session_session.sim);

    var zip = new JSZip();
    zip.file("saveFile.json",JSON.stringify(session_session.sim));

    // JavaScript files folder

    var js = zip.folder("js");

    // JavaScript audio folder

    var audio = zip.folder("audio");

    // Images folder

    var imgs = zip.folder("img");

    return new Promise(function(resolve,reject){

        var matter = new XMLHttpRequest();
        matter.open("get",document.querySelector("#matter-script").src);

        matter.addEventListener("load",function(){
            js.file("matter.js",matter.responseText);
            resolve();
        });

        matter.addEventListener("error",function(){
            reject("XMLHttpRequest Error");
        });

        matter.send();

    }).then(function(){
        return new Promise(function(resolve,reject){

            var polyDecomp = new XMLHttpRequest();
            polyDecomp.open("get",document.querySelector("#poly-decomp-script").src);

            polyDecomp.addEventListener("load",function(){
                js.file("poly-decomp.js",polyDecomp.responseText);
                resolve();
            });

            polyDecomp.addEventListener("error",function(){
                reject("XMLHttpRequest Error");
            });

            polyDecomp.send();

        }); 
    }).then(function(){
        return new Promise(function(resolve,reject){

            var phSim = new XMLHttpRequest();
            phSim.open("get",document.querySelector("#phsim-script").src);

            phSim.addEventListener("load",function(){
                js.file("phsim.js",phSim.responseText);
                resolve();
            });

            phSim.addEventListener("error",function(){
                reject("XMLHttpRequest Error");
            })

            phSim.send();

        })
    }).then(function(){

        return new Promise(function(resolve,reject){
            
            var a = session_session.phStaticRender.spriteImgObj.urls;
            
            var loaded = 0;
            var nameMap = {}
            var requests = [];
    
            for(var i = 0; i < a.length; i++) {
    
                requests[i] = new XMLHttpRequest();
                requests[i].responseType = "blob";
                requests[i].open("get",a[i]);
                requests[i]._index = i;

                var names = [];
    
                requests[i].addEventListener("load",function(){
                    
                    var urlParts = requests[this._index].responseURL.split("/");
                    var name = urlParts[urlParts.length - 1];
    
                    imgs.file(name,this.response);
                    
                    loaded++;
    
                    if(loaded === a.length) {
                        resolve();
                    }
    
                });
    
                requests[i].addEventListener("error",function(){
                    reject("XMLHttpRequest Error:");
                });

                PhSim.ObjLoops.global(simObj,function(o){
                    if(o.sprite) {

                        var urlParts = o.sprite.src.split("/");
                        var name = urlParts[urlParts.length - 1];

                        o.sprite.src = "./img/" + name;
                    }
                });
    
                requests[i].send();
    
            }

            if(a.length === 0) {
                resolve();
            }
            
        }); 
    
    
    }).then(function(){

        return new Promise(function(resolve,reject){
            resolve();
        });

    }).then(function() {

        return new Promise(function(resolve,reject){

            var t = txtSim({
                i:2,
                sim: simObj
            });

            js.file("config.js",t);
            resolve();

        });

    })
    .then(
        function() {
            return new Promise(function(resolve,reject){

                var html = new XMLHttpRequest()
                html.open("get","./generator/exported-sim-template.html");

                html.addEventListener("load",function() {
                    zip.file("index.html",html.response);
                    resolve();
                });

                html.addEventListener("error",function(){
                    reject();
                })

                html.send();

            });
        }
    ).then(function(){
        return zip.generateAsync({type: "blob"}).then(function(blob){
            saveAs(blob,"project.zip");
        });
    }).catch(function(o){
        console.error(o)
    });

}

function txtSim(options) {

    var a = [];
    var newSim = PhSim.Query.deepClone(options.sim);



    objloops.subglobal_widgets(function(o){
        if(o.type === "wFunction") {
            a.push(o.function.split("\n"))
        }
    });

    for(var i = 0; i < a.length; i++) {
        
        for(var j = 0; j < a[i].length; j++) {
            a[i][j].padStart(options.i," ");
        }

        a[i] = a[i].join("\n");
    }

    var wFunctions = 0;
    var sprites = 0;

    var s = getWFunctionTxtArr("wFunctions",options.i) + "\n // PhSim Configuration \n\nvar o = " + JSON.stringify(newSim,function(key,value){
        if(key === "function" && this.type === "wFunction") {
            return wFunctions++;
        }

        else {
            return value;
        }

    },options.i);

    s = s + "\n\no.wFunctions = wFunctions \n\n"

    s = s + "\n\n// PhSim new Object \n\nvar phSim = new PhSim(o); \n\n//Target Element\n\nvar targetElement = document.body  \n\ntargetElement.appendChild(phSim.container)";

    s = s + "\n\n// Play PhSim automatically. \n\nphSim.play(); \n\n"

    return s;

}

//document.querySelector(".generate-zip").addEventListener("click",generateZipFolder)
;// CONCATENATED MODULE: ./src/gradientEditor.js
/*** Gradient Editor ***/

function gradEditor(gradient) {

    var gradient = gradient;

    var stopI = null;
    var oldStopI = null;
    
    var body = document.createElement("div")
    var bodyW = 300;

    // HTML Window

    var w = new HTMLWin("Gradient Editor","gradeditor-win","superWin");
    w.winBody.appendChild(body);
    w.appendToDocumentBody(); // Open Window
    var winBox = w.winBody.getBoundingClientRect();
    
    body.style.width = bodyW + "px";
    var canvas =  document.createElement("canvas")
    var stops = gradient.stops;
    
    body.appendChild(canvas);
    
    // Stop Constructor
    
    function Stop(pos,color) {
        this.pos = pos;
        this.color = color;
    }
    
    
    /* 
    
    Adding Stops
    
    */
    
    var adder = document.createElement("div");
    adder.className = "canvaseditor-adder";
    adder.innerText = "Add New Stop";
    
    adder.addEventListener("click",function(){
        stops.push(new Stop(1,"green"));
        genStopEditor(stops.length - 1);
        genGrad();
    })
    
    // Fix Stop Overflow
    
    function fixStopOverflow() {
        for(var i = 0; i < stops.length; i++) {
        
        if(stops[i].pos < 0) {
            stops[i].pos = 0;
            stopPointsDiv.children[i].style.left = "0px";
            document.querySelectorAll(".gradient-stop-pos")[i].value = 0;
        }
        
            if(stops[i].pos > 1) {
            stops[i].pos = 1;
            stopPointsDiv.children[i].style.left = bodyW + "px";
            document.querySelectorAll(".gradient-stop-pos")[i].value = 1;
        }
        
        }
    }
    
    /*** 
    
    Stop Points 
    
    ***/
    
    var stopPointsDiv = document.createElement("div");
    stopPointsDiv.className = "stoppoints-area";
    body.appendChild(stopPointsDiv);
    var pointsDivBox = stopPointsDiv.getBoundingClientRect();
    
    // Check if mouse is in stop points element
    
    var mouseInPointsDiv = false;
    
    stopPointsDiv.addEventListener("mouseout",function(){
        mouseInPointsDiv = false;
    });
    
    stopPointsDiv.addEventListener("mouseover",function(){
        mouseInPointsDiv = true;
    });

    var stopPointsDivStyle = window.getComputedStyle(stopPointsDiv)
    
    function genStopPoint(i) {
        var stopPoint = document.createElement("span");
        stopPoint.dataset.stop_id = i;
        stopPoint.className = "stoppoint-draggable";
        stopPoint.style.width = "8px";
        stopPoint.style.height = "8px";
        stopPoint.style.position = "absolute";
        
        var getThisIndex = function() {
        return Array.from(stopPointsDiv.childNodes).indexOf(stopPoint);
        }
    
        
        var onmousemove = function() { 
    
        //if(event.clientX >= pointsDivBox.left && event.clientX <= pointsDivBox.right) {
            stopPoint.style.left = (event.clientX - stopPointsDiv.getBoundingClientRect().left) + "px";
            stops[getThisIndex()].pos = (Number.parseInt(stopPoint.style.left)/3) * 0.01;
            editors.children[getThisIndex()].querySelector(".gradient-stop-pos").value = stops[getThisIndex()].pos;
            genGrad();
            fixStopOverflow();
        //}
        
        }
        
        stopPoint.addEventListener("mousedown",function(){
        window.addEventListener("mousemove",onmousemove);
        });
        
        stopPoint.addEventListener("mouseup",function(){
        window.removeEventListener("mousemove",onmousemove);
        });
        
        stopPointsDiv.appendChild(stopPoint);
        
        stopPoint.style.left = stops[getThisIndex()].pos * bodyW + "px";
        
        return stopPoint;
    }
    
    // Retrieve Stop Point Fields
    
    function retrieveColorField(i) {
        return editors.children[i].querySelector(".gradienteditor-field");
    }
    
    function retrievePosField(i) {
        return editors.children[i].querySelector(".gradient-stop-pos");
    }
    
    // Generate Stop Editor
    
    
    function genStopEditor(i) {
    
        var o = stops[i];
        
        // Editor Element
        
        var editorBody = document.createElement("div");
        editorBody.className = "stopeditor-div";
        
        editorBody.addEventListener("click",function(){
        oldStopI = stopI;
        document.querySelector(".selected-grad-elm").classList.remove("selected-grad-elm");
        this.classList.add("selected-grad-elm");
        stopI = Array.from(editors.children).indexOf(editorBody);
        })
        
        editors.appendChild(editorBody);
    
        // Stop Color

        var gradColor = new ColorField(o.color,"Gradient Stop",function(){
        o.color = gradColor.value;
        genGrad()
        })


    
        //var canvasColorField = document.createElement("input");

        var canvasColorFieldLabel = document.createElement("span");
        canvasColorFieldLabel.innerText = "Color:";

        //canvasColorField.value = o.color;

        var canvasColorPair = document.createElement("div");
    
        canvasColorPair.appendChild(canvasColorFieldLabel);
        
        //canvasColorPair.appendChild(canvasColorField);

        canvasColorPair.appendChild(gradColor.container);
        
        editorBody.appendChild(canvasColorPair);

    
        // Stop Position
    
        var canvasPosField = document.createElement("input");
        canvasPosField.type = "number";
        var canvasPosFieldLabel = document.createElement("span");
        canvasPosField.value = o.pos;
        canvasPosFieldLabel.innerText = "Stop Position:";
        canvasPosFieldLabel.className = "gradienteditor-label";
        var canvasPosPair = document.createElement("div");
    
        canvasPosField.step = 1/canvas.width;
        canvasPosField.min = 0;
        canvasPosField.max = 1;
        canvasPosField.className = "gradient-stop-pos"
        canvasPosPair.appendChild(canvasPosFieldLabel);
        canvasPosPair.appendChild(canvasPosField);
        editorBody.appendChild(canvasPosPair);
    
        // Editing Events
    
        canvasPosField.addEventListener("input",function(){
            o.pos = Number.parseFloat(this.value);
            genGrad()
        });
        
        // Generate Draggable Point
        
        genStopPoint(i)
    
    }
    
    function genInitalEditors() {
        for(var i = 0; i < stops.length; i++) {
        genStopEditor(i);
        }
    }
    
    var editors = document.createElement("div");
    editors.className = "editors-container";
    body.appendChild(editors);
    
    genInitalEditors();
    
    editors.childNodes[editors.childNodes.length - 1].classList.add("selected-grad-elm");
    
    function CanvasStop(pos,color) {
        this.pos = pos;
        this.color = color;
    }
    
    
    var ctx = canvas.getContext("2d");
    
    // Canvas Editor Width and Height
    
    canvas.width = bodyW;
    canvas.height = "50"
    
    
    body.className = "canvaseditor-body"
    
    // Generate Canvas Gradient
    
    function genGrad() {
        
        fixStopOverflow();
    
        var grad = ctx.createLinearGradient(0,0.5 * canvas.height,canvas.width,0.5 * canvas.height)
    
        for(var i = 0; i < stops.length; i++) {
        grad.addColorStop(stops[i].pos,stops[i].color)
    
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,canvas.width,canvas.height)
    
        }
    }
    
    genGrad();
    
    body.appendChild(adder);
    
    // Removal of selected gradient
    
    var remSel = document.createElement("div");
    remSel.innerText = "Remove Selection";
    
    remSel.addEventListener("click",function(){
        if(stops.length > 2) {
        stops.splice(stopI,1);
        
        // Modify HTML
        
        document.querySelector(".selected-grad-elm").classList.remove("selected-grad-elm");
        editors.removeChild(document.querySelectorAll(".stopeditor-div")[stopI]);
        stopPointsDiv.removeChild(stopPointsDiv.childNodes[stopI]);
        
        stopI = stopI - 1;
        
        // Update Selection Class
        
        editors.childNodes[stopI].classList.add("selected-grad-elm");
        
        genGrad();
        
        }
        
    })
    
    body.appendChild(remSel);
    
    return w;
    
}


function gradientExp() {
    
    var a = document.createElement("div");
    a.className = "gradient-exp-container";

    var w = new HTMLWin("Gradient Explorer","gradident-exp","superWin");

    for(var i = 0; i < sim.gradients.length; i++) {
        
        var elm = document.createElement("div");
        elm.className = "grad-exp-element";
    
        var label = document.createElement("div");
        label.innerText = sim.gradients[i].name;
        label.className = "grad-element-label";
        elm.appendChild(label);

        var editButton = document.createElement("div");
        editButton.innerText = "Edit";
        editButton.className = "grad-element-edit-button";

        var func = function() {
            
            var n = i;

            var f = function() {
                gradEditor(sim.gradients[n]);
            }
            return f;

        }

        editButton.addEventListener("click",func())

        elm.appendChild(editButton);
        
        a.appendChild(elm);
    }

    w.appendChild(a);
    w.appendToDocumentBody();

    return w;

}

/* harmony default export */ const src_gradientEditor = (gradEditor);
;// CONCATENATED MODULE: ./src/htmlFactory.js
// Create html element from tag and text

function elementFromHTML(tag,html) {
    var e = document.createElement(tag);
    e.innerHTML = html;
    return e;
}

// Create html object from object

function elementFromObject(tag,o) {

    var e = document.createElement(tag);

    if(o.childNodes) {
        for(var i = 0; i < childNodes.length; i++) {
            e.appendChild(o.childNodes[i]);
        }
    }

    if(o.parentNode) {
        o.parentNode.appendChild(e);
    }

    if(o.innerHTML) {
        e.innerHTML = o.innerHTML;
    }

    if(o.innerText) {
        e.innerText = o.innerText;
    }

}

;// CONCATENATED MODULE: ./src/xSelectionMenu.js
/** 
 * 
 * X_SelectionMenu Option
 * 
 * @class X_SelectionMenuOption
 * @param value - A Value.
 * @param {string} innerText - The InnerText 
 * 
*/

function X_SelectionMenuOption(value,innerText) {
    this.value = value;
    this.innerText = innerText;
}

/**
 * 
 * XSelectionMenu
 * An extension of the Selection Menu.
 * 
 * @class XSelectionMenu
 * 
 */

function XSelectionMenu() {

    var self = this;

    this.value = null;
    this.htmlList = document.createElement("ul");

    this.container = document.createElement("div");
    this.container.classList.add("x-selection-menu-container");

    this.label = document.createElement("span");
    this.label.classList.add("x-selection-menu-label");

    var arrow = document.createElement("span");
    arrow.classList.add("x-selection-menu-arrow")
    
    var field = document.createElement("div");
    field.classList.add("x-selection-menu-field");

    this.htmlList.classList.add("x-selection-menu-list");


    field.addEventListener("click",function() {

        if(self.htmlList.classList.contains("opened")) {
            self.htmlList.classList.remove("opened");
            self.htmlList.classList.add("closed");
            return false;
        }

        else {

            if(self.htmlList.classList.contains("closed")) {
                self.htmlList.classList.remove("closed");
            }

            self.htmlList.classList.add("opened");
            return true;
        }

    })

    field.appendChild(this.label);
    field.appendChild(arrow);

    this.container.appendChild(field);
    this.container.appendChild(this.htmlList);

    this.htmlList.addEventListener("mouseenter", function() {
        self.inHTMLList = true;
    });

    this.htmlList.addEventListener("mouseout", function() {
        self.inHTMLList = false;
    });

    field.addEventListener("mouseenter", function() {
        self.inField = true;
    });

    field.addEventListener("mouseout", function() {
        self.inField = false;
    });

    this.htmlList.style.width = window.getComputedStyle(this.htmlList).width;

}

XSelectionMenu.prototype.onchange = function() {}

XSelectionMenu.prototype.toggle = function() {
    
}

XSelectionMenu.prototype.add = function(value,innerText) {

    var self = this;

    var newElement = document.createElement("li");
    newElement.innerText = innerText;
    newElement.dataset.x_value = value;

    newElement.addEventListener("click", function() {

        self.value = this.dataset.x_value;
        self.label.innerText = this.innerText;

        var onchange = self.onchange.bind(self);
        onchange();

        if(self.htmlList.classList.contains("opened")) {
            self.htmlList.classList.remove("opened");
            self.htmlList.classList.add("closed");
            return false;
        }

    })

    this.htmlList.appendChild(newElement);
}

/**
 * 
 * Function for selecting the option by index
 * 
 * @function selectOptionByIndex
 * @param {Number} i - The Index for the option. 
 */

XSelectionMenu.prototype.selectOptionByIndex = function(i) {
    this.htmlList.childNodes[i].click();
}

/**
 * 
 * Function for selecting option by value
 * 
 * @function selectOptionByValue
 * @param {string} value - The string representing the option.
 * 
 */

XSelectionMenu.prototype.selectOptionByValue = function(value) {
    for(var i = 0; i < this.htmlList.childNodes.length; i++) {
        if(this.htmlList.childNodes[i].dataset.x_value === value) {
            this.htmlList.childNodes[i].click();
        }
    }
}

XSelectionMenu.prototype.getElement = function() {
    return this.container;
}

/* harmony default export */ const xSelectionMenu = (XSelectionMenu);
;// CONCATENATED MODULE: ./src/objectEditor.js














function toRadians(degrees) {
    return ((2 * Math.PI)/360) * degrees;
}

function toDegrees(radians) {
    return radians * (360/ Math.PI);
}

function SpriteSelect() {

}

function helpLink(href) {

    var c = document.createElement("span");

    var e = document.createElement("a");
    e.href = href;
    e.innerText = "?";
    e.target = "_blank"; 
    e.classList.add("editor-help-link");

    c.innerHTML = "(" + e.outerHTML + ")";
    c.classList.add("editor-help-link-span");

    return c;
}

function label(text,href) {
    var s = document.createElement("span");
    s.innerText = text + " ";
    s.appendChild(helpLink(href));
    return s;
}


SpriteSelect.getSelectionMenu = function () {


    var select = new xSelectionMenu();

    select.add(-1,"None");

    for(var i = 0; i < sim.sprites.length; i++) {
        select.add(i,sim.sprites[i].name);
    }

    return select

}

/**
 * Ace Editor
 */

function wFunctionEditor(widget) {

    var txt = document.createElement("div");
    txt.id = "wfunction-code";
    txt.style = "height: 600px; width: 800px;";
    
    ace.require("ace/ext/language_tools");

    var editor = ace.edit(txt);

    if(widget.function) {
        editor.setValue(widget.function);
    }

    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    var txtWrap = document.createElement("div");
    txtWrap.className = "txtwrap-wfunction-editor"
    txtWrap.appendChild(txt);

    // Save button

    var sb = xLabeledButton("Save",function(){
        widget.function = editor.getValue();
    });

    // HTMLWindow

    var htmlWin = new htmlwin("wFunction Editor","wfunction-editor-win","superWin");
    htmlWin.winBody.appendChild(txtWrap);
    htmlWin.winBody.appendChild(sb);

    htmlWin.appendToDocumentBody();

    return htmlWin;
} 

window.openObjectEditor = function() {
    new ObjectEditor(src_multiSelect.selectedObjects[0]);
    return;
}

function ObjectEditor(object) {

    var o = document.createElement("div");
    document.body.appendChild(o)
    var myModal = new bootstrap.Modal(o);

    //return;

    var guiTabber = new GuiTabber();
    this.guiTabber = guiTabber;

    var handler = {

        set: function(key,value) {

        },
        
        get: function() {

        }
    }

    //var proxy = new Proxy(object,handler);

    var self = this;
    this.subject = object;
    this.object = object;

    // Force the mouse transform to stop when opening.

    if(src_multiSelect.mouseTransform.active) {
        src_multiSelect.onmouseup();
    }

    this.htmlWin = new htmlwin("Object Editor","object-editor","superWin");


    if(this.subject.shape === "circle" || this.subject.shape === "rectangle" || this.subject.shape === "polygon" || this.subject.shape === "regPolygon" || typeof this.subject === "array") {
        guiTabber.addPanel(this.addMainPanel(),elementFromHTML("span","Main Settings"));
        guiTabber.addPanel(this.addGraphicsPanel(),elementFromHTML("span","Graphics Settings"));
    }

    if(this.subject.simulation) {
        guiTabber.addPanel(this.addMainsimulationPanel(),elementFromHTML("span","simulation Settings"));
        guiTabber.addPanel(this.gamePanel(),elementFromHTML("span","Game Settings"));
    }

    guiTabber.addPanel(this.addWidgetsPanel(),elementFromHTML("span","Widgets"));
    
    if(this.subject.shape === "circle") {
        guiTabber.addPanel(this.addCirclePanel(),elementFromHTML("span","Circle Settings"));
    }

    if(this.subject.shape === "regPolygon") {
        guiTabber.addPanel(this.addRegPolygonPanel(),elementFromHTML("span","Regular Polygon Settings"));
    }

    //guiTabber.addPanel(this.addJSONPanel(),elementFromHTML("span","Edit .data Object"));

    guiTabber.appendToElement(this.htmlWin.winBody);

    this.htmlWin.appendToDocumentBody();

}

ObjectEditor.prototype.updateAce = function() {
    this.jsonEditor.setValue(JSON.stringify(this.subject,null,4));
    this.jsonEditorDiv.click();
}

ObjectEditor.prototype.addJSONPanel = function() {

    this.subject.data = this.subject.data || {}

    //var textArea = document.createElement("pre");
    //textArea.innerText = JSON.stringify(this.subject,null,4);

    var self = this;

    var txt = document.createElement("div");
    txt.style = "height: 600px; width: 800px;";
    txt.className = "json-panel";

    this.jsonEditorDiv = txt;

    ace.require("ace/ext/language_tools");

    var editor = ace.edit(txt);

    if(this.subject) {
        editor.setValue(JSON.stringify(this.subject.data,null,4));
    }

    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/json");

    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    var saveButton = xLabeledButton("Save JSON",function(){

        try {

            var o = JSON.parse(editor.getValue());

            Object.assign(self.subject.data,o);

            session_session.syn.layers();

        }

        catch (e) {
            new htmlAlert("Error:" + e.message);
        }


    }

    

    );


    this.jsonEditor = editor;


    return compositeHTMLElement("div",txt,saveButton);


    //var elm = compositeHTMLElement("div",textArea);

    //return elm;


}

ObjectEditor.prototype.addMainPanel = function() {

    var self = this;

    var name = new tr_xLabeledInput(label("Name:","./help/objects.html#object_names"),"text",this.subject.name || "","name",function() {
        
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o,i){
                o.name = this.value + i;
            });
        }

        else {
            self.subject.name = this.value;
        }

    });

    /*** Locked Element ***/

    var locked = new tr_xLabeledInput("Locked:","checkbox","lock-checkbox","lock-status",function() {
        
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o){
                o.locked = locked.querySelector(".xlabeled-input").checked;
            });
        }

        else {
            self.subject.locked = locked.querySelector(".xlabeled-input").checked;
        }
        
    });

    locked.querySelector(".xlabeled-input").checked = !!this.subject.locked;


    /*** Semi-locked element ***/

    var semiLocked = tr_xLabeledInput("Semi-Locked:","checkbox","","semi-lock-checkbox",function(){
        
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o){
                o.semiLocked = semiLocked.querySelector(".xlabeled-input").checked;
            });
        }

        else {
            self.subject.semiLocked = semiLocked.querySelector(".xlabeled-input").checked;
        }
        
    });

    semiLocked.querySelector(".xlabeled-input").checked = !!this.subject.semiLocked;


    /*** Non-interactive Object ***/

    var noDyn = new tr_xLabeledInput("Non-Dynamic:","checkbox","lock-checkbox","perm-static-status",function() {
        
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o){
                o.noDyn = noDyn.querySelector(".xlabeled-input").checked;
            });
        }

        else {
            self.subject.noDyn = noDyn.querySelector(".xlabeled-input").checked;
        }
        
    });

    noDyn.querySelector(".xlabeled-input").checked = !!this.subject.noDyn;

    /*** Non-interactive Object ***/

    var noCollision = new tr_xLabeledInput("No Collision:","checkbox","lock-checkbox","no-col",function() {
    
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o){
                o.noCollision = noCollision.querySelector(".xlabeled-input").checked;
            });
        }

        else {
            self.subject.noCollision = noCollision.querySelector(".xlabeled-input").checked;
        }
        
    });

    noCollision.querySelector(".xlabeled-input").checked = !!this.subject.noCollision;

    /*** Non-interactive Object [END] ***/

    /**
     * Density
     */

    var densityVal;

    if(typeof self.subject.density === "number") {
        densityVal = self.subject.density;
    }

    else {
        densityVal = 0.001
    }

    var density = tr_xLabeledInput("Density","number",densityVal,"density-value",function(){
        
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o){
                o.density = Number.parseInt(this.value);
            });
        }

        else {
            self.subject.density = Number.parseFloat(this.value);
        }
        
    })

    /**
     * Mass
     */

    var mass = tr_xLabeledInput("Mass","number",self.subject.mass,"mass-value",function(){
        
        if(typeof self.subject === "array") {
            self.subject.forAll(function(o){
                o.density = Number.parseInt(this.value);
            });
        }
        
        self.subject.mass = Number.parseFloat(this.value);
    });

    var mass_desc = elementFromHTML("div","This mass field overides the density field.")


    /*** Sensor Class***/

    var sensor_class = new tr_xLabeledInput(label("Sensor Class:","./help/objects.html#sensor_classes"),"text", self.subject.sensorClass || "","sensor-class",function() {
        self.subject.sensorClass = this.value;
    });

    if(self.subject.sensorClass) {
        sensor_class.querySelector(".xlabeled-input").value = self.subject.sensorClass;
    }

    /***  Collision Class ***/

    var collision_class = new tr_xLabeledInput(label("Collision Class:","./help/objects.html#collision_classes"),"text","","collision-class",function(){
        self.subject.collisionClass = this.value;
    });

    if(self.subject.collisionClass) {
        collision_class.querySelector(".xlabeled-input").value = self.subject.collisionClass;
    }

    /** Sensor Settings */

    var sensorSettingsTable = compositeHTMLElement("table",sensor_class);
    var sensorSettingsHeader = elementFromHTML("h3","Sensor Settings");
    var sensorSettings = compositeHTMLElement("div",sensorSettingsHeader,sensorSettingsTable);

    /** Collision Settings */

    var colSettingsTable = compositeHTMLElement("table",collision_class,noCollision);
    var colSettingsHeader = elementFromHTML("h3","Collision Settings:");
    var colSettings = compositeHTMLElement("div",colSettingsHeader,colSettingsTable);

    /** Lock Settings */

    var lockSettingsTable = compositeHTMLElement("table",locked,semiLocked);
    var lockSettingsHeader = compositeHTMLElement("h3",label("Lock Settings:","./help/objects.html#locked_semilocked"));
    var lockSettings = compositeHTMLElement("div",lockSettingsHeader,lockSettingsTable);

    /** Mass Settings */

    var massSettingsHeader = compositeHTMLElement("h3",label("Mass Settings:","./help/objects.html#mass_density"))
    var massSettingsTable = compositeHTMLElement("table",massSettingsHeader,mass,density);
    var massSettings = compositeHTMLElement("div",massSettingsHeader,massSettingsTable);

    /** Basic Settings */

    var basicSettingsHeader = elementFromHTML("h3","Basic Settings:");
    var basicSettingsTable = compositeHTMLElement("table",name,noDyn);
    var basicSettings = compositeHTMLElement("div",basicSettingsHeader,basicSettingsTable);

    var table = compositeHTMLElement("table",basicSettings,sensorSettings,colSettings,lockSettings,massSettings);

    var main = compositeHTMLElement("div",table);

    main.id = "main-panel";

    return main;

}

ObjectEditor.prototype.addMainsimulationPanel = function() {

    var self = this;

    var name = tr_xLabeledInput("Name:","input",this.subject.name,"sl-name",function(){
        self.subject.name = this.value;
    });

    var grav = tr_xLabeledInput("Gravity y-direction:","number",this.subject.world.grav,"sl-grav-num",function(){
        self.subject.world.grav = Number.parseFloat(this.value);
    });

    var bg = new colorField(this.subject.world.bg,"simulation Background Color",function(){
        self.subject.world.bg = bg.value;
    });

    var bgTr = tr_xLabeledElement("Color:",bg.container);

    var table1 = compositeHTMLElement("table",name,grav,bgTr);

    var main = compositeHTMLElement("div",table1);

    return main;

}

ObjectEditor.prototype.simulationTreePanel = function() {
    
    var self = this;

    var layerList = document.createElement("ul");
    
    for(var i = 0; i < shortcuts_getSelectedSimulation().layers.length; i++) {

        var layer = document.createElement("li");
        layerList.appendChild(layer);
        layer.className = "sl-tree-layer";
        layer.dataset.layerIndex = i;

        var label = document.createElement("span");
        label.className = "sl-tree-layer-label";
        label.innerText = "Layer" + i;
        layer.appendChild(layer);

        for(var j = 0; j < shortcuts_getSelectedSimulation().layers[i].objUniverse[j].length; j++) {
            
            var obj = document.createElement("li");
            obj.className = "sl-tree-object";

            var objLabel = document.createElement("span");
            objLabel.innerText = ""
            objLabel.className = "sl-tree-object-label";
            obj.appendChild(objLabel);

        }


    }
}

ObjectEditor.prototype.addGraphicsPanel = function() {

    var self = this;

    // Fill Color

    var fillColor = new colorField(this.subject.fillStyle,"Fill Color",function(){
        self.subject.fillStyle = fillColor.value;
    })

    var fillColorTr = tr_xLabeledElement("Fill Color:",fillColor.container);

    // Border Color

    var borderColor = new colorField(this.subject.strokeStyle,"Border Color",function(){
        self.subject.strokeStyle = borderColor.value;
    });

    var borderColorTr = tr_xLabeledElement("Border Color:",borderColor.container);

    // Border Weight

    var borderWeight = new tr_xLabeledInput("Border Weight:","text",this.subject.lineWidth,"fill-color",function() {
        self.subject.lineWidth = Number.parseInt(this.value);
    });

    // Global Alpha

    var globalAlphaValue;

    if(self.subject.globalAlpha === 0) {
        globalAlphaValue = 0;
    }

    else if(self.subject.globalAlpha === 1 || typeof self.subject.globalAlpha === "undefined") {
        globalAlphaValue = 1;
    }

    else {
        globalAlphaValue = self.subject.globalAlpha;
    }

    var globalAlpha = tr_xLabeledInput("Global Alpha","number",globalAlphaValue,"global-alpha",function(){
    
        let v = parseFloat(this.value);

        if(v > 1) {
            this.value = 1;
        }

        if(v < 0) {
            this.value = 0;
        }

        if(v === 1) {
            delete self.subject.globalAlpha;
        }

        else {
            self.subject.globalAlpha = v;
        }

    });

    globalAlpha.querySelector(".xlabeled-input").min = 0;
    globalAlpha.querySelector(".xlabeled-input").max = 1;
    globalAlpha.querySelector(".xlabeled-input").step = 0.01;

    var panelTable = compositeHTMLElement("table",fillColorTr,borderColorTr,borderWeight,globalAlpha);
    
    // Sprite 

    var spriteDiv = document.createElement("div");
    this.spriteDiv = spriteDiv;

    var spriteHeader = elementFromHTML("h3","Sprite Settings");

    // Gradient Editor

    var gradientEditor = document.createElement("div");

    var getGradEditingButton = function() {
        
        var elm = xLabeledButton("Edit Gradient",function(){
            src_gradientEditor(self.subject.gradient);
        });

        elm.className = "button xlabeled-button grad-editing-button";

        return elm;

    }

    var getGradDeleteButton = function() {

        var elm = xLabeledButton("Delete Gradient",function(){
            gradientEditor.removeChild(gradientEditor.querySelector(".grad-editing-button"));
            gradientEditor.removeChild(elm);
            self.subject.gradient = null;
        });

        elm.className = "button xlabeled-button grad-delete-button";

        return elm;

    }

    var getGradEditingButtons = function() {
        gradientEditor.appendChild(getGradEditingButton());
        gradientEditor.appendChild(getGradDeleteButton());
    }

    var getGradCreationButton = function() {
        var elm = xLabeledButton("Create Gradient",function(){
            
            this.parentNode.removeChild(this);
            getGradEditingButtons();

            var o = new PhSim.Static.Gradient();
            o.stops.push(new PhSim.Static.GradientStop(0,"black"));
            o.stops.push(new PhSim.Static.GradientStop(1,"white"));

            var c = PhSim.Centroid.shape(self.subject);
            var b = PhSim.BoundingBox.fromShape(self.subject);

            o.limits.start.x = 0 - b.w * 0.5;
            o.limits.start.y = 0

            o.limits.end.x = 0 + b.w * 0.5;
            o.limits.end.y = 0;

            self.subject.gradient = o;

        })

        elm.className = "button xlabeled-button get-grad-editing-button";

        return elm;
    }

    if(this.subject.gradient) {
        getGradEditingButtons();
    }

    else {
        gradientEditor.appendChild(getGradCreationButton());
    }
    
    if(this.subject.sprite) {
        spriteDiv.appendChild(this.getSpriteEditingDiv(this.subject.sprite));
    }


    else {
        this.addSpriteEnableButton();
    }

    var panel = compositeHTMLElement("div",panelTable,spriteHeader,spriteDiv,gradientEditor);

    panel.id = "graphics-panel";


    return panel;

}

ObjectEditor.prototype.addSpriteEnableButton = function() {

    var self = this;
    
    var addSprite = xLabeledButton("Add Sprite",function(){
        addSprite.parentNode.removeChild(addSprite);
        var newSprite = {};
        var e = self.getSpriteEditingDiv(newSprite);
        self.spriteDiv.appendChild(e);
    })

    this.spriteDiv.appendChild(addSprite);
}

ObjectEditor.prototype.getSpriteEditingDiv = function(sprite) {

    var self = this;

    var o = sprite;
    var target = sprite;

    var srcNew;

    var name = tr_xLabeledInput("Name","input",o.name,"spriteeditor-name-field",function(){
        o.name = this.value;
    });

    var src = tr_xLabeledInput("Source:","input",o.src,"spriteeditor-name-src",function(){
        srcNew = this.value;
    });

    var width = tr_xLabeledInput("Width:","number",o.w,"spriteeditor-width",function(){
        
        if( isNaN(Number.parseFloat(this.value)) ) {
            delete o.w;
        }

        else {
            o.w = Number.parseFloat(this.value);
        }

    });

    var height = tr_xLabeledInput("Height:","number",o.h,"spriteeditor-height",function(){

        if( isNaN(Number.parseFloat(this.value)) ) {
            delete o.h;
        }

        else {
            o.h = Number.parseFloat(this.value);
        }

    });

    var smooth = tr_xLabeledInput("Smooth:","checkbox",o.smooth,"spriteeditor-smoothbool",function(){
        o.smooth = this.checked;
    });

    smooth.querySelector(".xlabeled-input").checked = o.smooth;

    var repeat = xLabeledInput("Repeat:","checkbox",o.repeat,"spriteeditor-repeatbool",function(){
        o.repeat = this.checked;
    });

    repeat.querySelector(".xlabeled-input").checked = o.repeat;

    var fit = xLabeledInput("Fit to object:","checkbox",o.fit,"spriteeditor-fitbool",function(){
        o.fit = this.checked;
    });

    fit.querySelector(".xlabeled-input").checked = o.fit;

    var b = xLabeledButton("Set New URL",function(){

        new Promise(function(resolve,reject){

            var newImg = document.createElement("img");
            newImg.src = srcNew;

            newImg.addEventListener("load",function(){
                
                session_session.phStaticRender.spriteImgObj.addSprite(srcNew,function(){
                    resolve();
                });
    
            });
    
            newImg.addEventListener("error",function(e){
                reject(e);
            });

        }).then(function(){
            target.src = srcNew;
        }).catch(function(e){
            new htmlAlert("Error: " + e);
        });




    });

    var uploadImg = xLabeledButton("Upload Sprite",function(){

        session_session.sim.base64imgurls = session_session.sim.base64imgurls || [];
        session_session.tempimgurls = session_session.tempimgimgs || [];

        var w = new htmlwin("Upload Image","upload-img","superWin");

        var elm = document.createElement("input");
        elm.type = "file";

        var add = xLabeledButton("Add",function(){

            new Promise(function(resolve,reject){

                var r = new FileReader();

                r.onload = function() {

                    session_session.sim.base64imgurls.push(this.result);

                    var st = URL.createObjectURL(elm.files[0]);
                    session_session.tempimgurls.push(st);
                    target.base64 = session_session.sim.base64imgurls.length - 1;

                    session_session.phStaticRender.spriteImgObj.addSprite(st);

                    target.src = st;

                    //Object.defineProperty(target,"src",{
                      //  writable: true,
                        //enumerable: false,
                        //value: st
                    //});

                    resolve();
                };

                r.readAsDataURL(elm.files[0]);
    
            }).then(function(){
                new htmlAlert("Succesfully Added file" + elm.files[0].name + "to Project");
            }).catch(function(a){
                new htmlAlert("Error:" + a)
            });

        });

        w.appendToDocumentBody();

        var p = document.createElement("p");
        p.innerText = "Upload the image:";

        w.winBody.append(p,elm,add);

    })

    var currentSrc = xLabeledButton("Go To Current Source",function(){
        window.open(target.src);
    })

    var deleteThis = xLabeledButton("Delete",function(){
        div.parentNode.removeChild(div);
        //self.addSpriteEnableButton();

        if(typeof self.subject.sprite === "object") {

            if(Array.isArray(self.subject.sprite)) {
                var i = self.subject.sprite.indexOf(target);
                self.subject.sprite.splice(i,1);

                if(self.subject.sprite.length === 1) {
                    self.subject.sprite = self.subject.sprite[0];
                }

            }

            else {
                self.subject.sprite = undefined;
            }
        }

        else {
            throw "The delete button shouldn't be visible if the sprite is is an object."
        }

        self.addSpriteEnableButton();

    })

    var table = compositeHTMLElement("table",name,src,width,height,smooth,repeat,fit);
    var div = compositeHTMLElement("div",table,currentSrc,uploadImg,b,deleteThis);

    div.classList.add("sprite-sub-editor-div-1");

    return div;

}

ObjectEditor.prototype.triggerTable = function() {
    
}

ObjectEditor.prototype.generateWidgetEditor = function(widget) {

    var self = this;
    var widgetI = self.subject.widgets.indexOf(widget);

    var widgetForm = document.createElement("form");
    widgetForm.className = "widget-form";

    var hl = helpLink("./help/objects.html#widget_" + widget.type);

    var widgetFormTitle = document.createElement("h3");
    widgetFormTitle.className = "widget-form-title-h3"
    widgetFormTitle.innerText = widget.type + " ";
    widgetFormTitle.appendChild(hl);
    widgetForm.appendChild(widgetFormTitle);

    var name_input = xLabeledInput("Widget Name:","text",(widget.name || ""),"object-editor-wname",function(){
        widget.name = this.value;
    });

    widgetForm.appendChild(name_input);

    var sewa = ["velocity","force","translate","position",
    "clone","rotation","setAngle","deleteSelf","objLink",
    "setColor","setBorderColor","setLineWidth","playAudio",
    "wFunction","toggleLock","toggleSemiLock"]

    if(sewa.includes(widget.type)) {
        
        var widget_trigger = elementFromHTML("span","Trigger:");
        widgetForm.appendChild(widget_trigger);

        var triggers = new xSelectionMenu();
        triggers.add("","--None--");
        triggers.add("key","Key");
        triggers.add("update","Simulation Update");
        triggers.add("time","Time Interval");
        
        triggers.add("sensor","Sensor");
        triggers.add("sensor_global","Sensor (Global)");

        triggers.add("objclick","Object Click");
        triggers.add("objclick_global","Object Click (Global)");

        triggers.add("objmousedown","Mouse pressing down on object");
        triggers.add("objmousedown_global","Mouse pressing down on object (Global)");

        triggers.add("objmouseup","Letting go of mouse while over object");
        triggers.add("objmouseup_global","Letting go of mouse while over object (Global)");
        
        triggers.add("objlink","Object Link");
        triggers.add("firstslupdate","First Simulation Update");

        if(widget.trigger) {
            triggers.selectOptionByValue(widget.trigger);
        }

        else {
            triggers.selectOptionByValue("");
        }

        widgetForm.appendChild(triggers.container);

        triggers.onchange = function() {
            widget.trigger = this.value;
            setTrigger(this.value);
        }

        var triggerContainer = document.createElement("div");

        widgetForm.appendChild(triggerContainer);

        var addKeyTrigger = function() {

            var keyLabel = elementFromHTML("span","Key:");

            triggerContainer.appendChild(keyLabel);

            var keyField = document.createElement("input");

            if(widget.key) {
                keyField.value = widget.key;
            }

            keyField.className = "objecteditor-widget-input keyfield"
            
            /*keyField.addEventListener("input",function() {
                
            });*/

            var chooseKey = function(event) {
                keyField.value = event.key;
                widget.key = event.key;
            }

            keyField.addEventListener("focusin",function(){
                keyField.addEventListener("keyup",chooseKey);
            })

            keyField.addEventListener("focusout",function(){
                keyField.removeEventListener("keyup",chooseKey);
            })

            triggerContainer.appendChild(keyField);

        }

        var addTimeTrigger = function() {

            // Label

            var timeIntervalLabel = elementFromHTML("span","Time Interval:");

            triggerContainer.appendChild(timeIntervalLabel);
            
            // Input
            
            var timeInterval = document.createElement("input");

            timeInterval.addEventListener("input",function(e){
                widget.time = Number.parseFloat(this.value);
            })

            if(typeof widget.time === "number") {
                timeInterval.value = widget.time;
            }

            triggerContainer.appendChild(timeInterval);

        }

        var setTrigger = function(str) {

            triggerContainer.innerHTML = "";
            
            if(str === "key") {
                addKeyTrigger();
            }

            if(str === "time") {
                addTimeTrigger();
            }
            
        }

        setTrigger(widget.trigger);


        widgetForm.appendChild(document.createElement("br"));


    }

    if(widget.type === "circularConstraint") {

    }

    if(widget.type === "wFunction") {
        
        var wfe_button = xLabeledButton("Widget Function Editor",function(){
            wFunctionEditor(widget);
        });

        widgetForm.appendChild(wfe_button);
    }

    if(widget.type === "playAudio") {

        var src = document.createElement("input");

        if(widget.src) {
            src.value = widget.src;
        }

        var audioButton = xLabeledButton("Set Source",function(){
            
            var a =  new Audio(src.value);

            a.addEventListener("canplaythrough",function(){
                widget.src = src.value;
                new htmlAlert("Audio \"" + src.value + "\" loaded successfully.");
            });

            a.addEventListener("error",function(){
                new htmlAlert("Error loading audio \"" + src.value + "\".");
            });

        });

        var uploadAudio = xLabeledButton("Upload",function(){

            var w = new htmlwin("Upload Audio","upload-audio","superWin");

            var p = document.createElement("p");
            p.innerText = "Upload Audio:"

            var i = document.createElement("input");
            i.type = "upload";

            var b = xLabeledButton("Upload",function(){

                i.files[0];

                var r = new FileReader();

                r.addEventListener("load",function(){

                    var u = URL.createObjectURL(i.files[0]);
                    session_session.tempaudiosrcs = session_session.tempaudiosrcs || [];
                    session_session.tempaudiosrcs.push(u);

                    widget.base64 = session_session.tempaudiosrcs.length - 1;


                });

            });

        });

        var loopLabel = document.createElement("label");
        loopLabel.innerText = "Loop:";

        var loop = document.createElement("input");
        loop.type = "checkbox";
        loop.checked = widget.checked; 

        loop.addEventListener("change",function(){
            widget.loop = this.checked;
        });

        loopLabel.appendChild(loop);

        var audioSettings = compositeHTMLElement("div",src,audioButton,loopLabel);

        widgetForm.appendChild(audioSettings);

    }

    var ma = ["velocity","force","translate","position","clone"]

    if(ma.includes(widget.type)) {

        if(!widget.vector) {
            widget.vector = new PhSim.Vector(0,0);
        }

        var xCord = document.createElement("input");
        var yCord = document.createElement("input");
        xCord.value = widget.vector.x;
        yCord.value = widget.vector.y;

        var xLabel = elementFromHTML("span","Vector X Coordinate:");
        var yLabel = elementFromHTML("span","Vector Y Coordinate:");

        xCord.addEventListener("input",function() {
            widget.vector.x = Number.parseFloat(this.value);
        });

        
        yCord.addEventListener("input",function() {
            widget.vector.y = Number.parseFloat(this.value);
        });

        widgetForm.appendChild(xLabel);
        widgetForm.appendChild(xCord);
        widgetForm.appendChild(document.createElement("br"));
        widgetForm.appendChild(yLabel);
        widgetForm.appendChild(yCord);
        widgetForm.appendChild(document.createElement("br"));

    }

    if(widget.type === "keyboardControls") {
        
        var up = xLabeledInput("Up","number",widget.up,"up-key-obj",function(){
            widget.up = Number.parseFloat(this.value);
        });

        var down = xLabeledInput("Down","number",widget.down,"down-key-obj",function(){
            widget.down = Number.parseFloat(this.value);
        });

        var left = xLabeledInput("Left","number",widget.left,"left-key-obj",function(){
            widget.left = Number.parseFloat(this.value);
        });

        var right = xLabeledInput("Right","number",widget.right,"right-key-obj",function(){
            widget.right = Number.parseFloat(this.value);
        });

        var a = compositeHTMLElement("div",up,down,left,right);

        widgetForm.appendChild(a);


    }

    if(widget.type === "elevator") {
        var elements = {

            "table": document.createElement("table"),

            "pointA": {
                "x": tr_xLabeledInput("Point A X-Coordinate","number",widget.pointA.x,"elevator-coordinate",function(){
                    widget.pointA.x = this.value;
                }),
                "y": tr_xLabeledInput("Point A Y-Coordinate","number",widget.pointA.y,"elevator-coordinate",function(){
                    widget.pointA.y = this.value;
                }) 
            },
            "pointB": {
                "x": tr_xLabeledInput("Point B X-Coordinate","number",widget.pointB.x,"elevator-coordinate",function(){
                    widget.pointB.x = this.value;
                }),
                "y": tr_xLabeledInput("Point B Y-Coordinate","number",widget.pointB.y,"elevator-coordinate",function(){
                    widget.pointB.y = this.value;
                }) 
            },

            "type": new xSelectionMenu()

        }

        elements.type.add("x","X-Bounded");
        elements.type.add("y","Y-Bounded");

        elements.type.onchange = function() {
            widget.bounding = elements.type.value;
        }

        elements.type.selectOptionByValue(widget.type)

        elements.typeTr = tr_xLabeledElement("Type:",elements.type.container)

        elements.table = compositeHTMLElement("table",elements.pointA.x,elements.pointA.y,elements.pointB.x,elements.pointB.y,elements.typeTr)
        
        widgetForm.appendChild(elements.table);
    }

    if(widget.type === "rotation" || widget.type === "setAngle") {

        var angle = document.createElement("input");
        angle.type = "number";
        angle.value = toDegrees(widget.cycle);

        angle.addEventListener("input",function(){
            widget.cycle = toRadians(this.value);
        });

        var circularConstraintLabel = document.createElement("label");
        circularConstraintLabel.innerText = "Rotate around circular constraint:"

        var circularConstraint = document.createElement("input");
        circularConstraint.type = "checkbox";
        circularConstraint.checked = !!widget.circularConstraintRotation;

        circularConstraint.addEventListener("change",function(event){
            widget.circularConstraintRotation = this.checked;
        });

        circularConstraintLabel.appendChild(circularConstraint);

        widgetForm.appendChild(circularConstraintLabel)
        widgetForm.appendChild(angle)

    }

    if(widget.type === "setColor" || widget.type === "setBorderColor") {

        var clrForm = new colorField(widget.color,"Widget",function(){
            widget.color = clrForm.value;
        });

        var clrTr = tr_xLabeledElement("Color",clrForm.container);

        widgetForm.appendChild(clrTr)

    }

    if(widget.type === "alert" || widget.type === "inputBox") {
        var table1 = document.createElement("table");

    }

    if(widget.type === "simpleEvent") {

        var simpleEventPanel = document.createElement("div");

        var eventClass = new xSelectionMenu();
        var a = Object.keys(PhSim.DynEventTarget.prototype.eventStack);

        for(var i = 0; i < a.length; i++) {
            eventClass.add(a[i],a[i]);
        }

        simpleEventPanel.appendChild(eventClass.container);

        widgetForm.appendChild(impoPanel);

    }

    if(widget.type === "objLink") {

        widget.target = widget.target || { L: null, O: null}

        var objAList = new xSelectionMenu();

        for(var i = 0; i < sim.simulations[session_session.selectedLayerI].layers.length; i++) {
            for(var j = 0; j < sim.simulations[session_session.selectedLayerI].layers[i].objUniverse.length; j++) {
                objAList.add(i + "," + j, sim.simulations[session_session.selectedLayerI].layers[i].objUniverse[j].name);
            }
        }

        objAList.selectOptionByValue(widget.target.L + "," + widget.target.O);

        objAList.onchange = function() {
            var a = objAList.value.split(",");
            widget.target.L = Number.parseInt(a[0]);
            widget.target.O = Number.parseInt(a[1]);
        }


        widgetForm.appendChild(objAList.container);

    }

    if(widget.type === "elevator") {
        var table = document.createElement("table");
    }

    if(widget.type === "rectText") {
    
            var textPanel = document.createElement("table");
            
            // Text Form
    
            var textForm = document.createElement("textarea");
            var textFormTr = tr_xLabeledElement("Text:",textForm);
    
            if(widget.content) {
                textForm.value = widget.content;
            }
    
            textForm.addEventListener("input",function(){
                widget.content = this.value;
            });
    
            textPanel.appendChild(textFormTr);
    
            // Font Size
    
            var fontSizeInput = tr_xLabeledInput("Font Size:","number",widget.size || 13,"fontsize-text-vale",function() {
                widget.size = Number.parseInt(this.value);
            })
    
            textPanel.appendChild(fontSizeInput);

            // Font Fill Color

            var fontFill = new colorField(widget.fill || "#000000","Font Fill",function(){
                widget.fill = fontFill.value;
            })

            var fontFillTr = tr_xLabeledElement("Font Fill Color",fontFill.container);

            textPanel.appendChild(fontFillTr);

            // Font Border Color

            var borderColor = new colorField(widget.borderColor || "#000000","Border Color",function(){
                widget.borderColor = borderColor.value;
            })

            var borderColorTr = tr_xLabeledElement("Border Color",borderColor.container);

            textPanel.appendChild(borderColorTr);

            // Font Line Width

            var lineWidthForm = tr_xLabeledInput("Border Width","number",widget.lineWidth || 5,"line-width-form",function(){
                widget.lineWidth = Number.parseInt(this.value);
            });

            textPanel.appendChild(lineWidthForm);

            // Font Face
    
            var fontInput = new xSelectionMenu();
    
            fontInput.add("Arial","Arial");
            fontInput.add("Times New Roman","Times New Roman");
            fontInput.add("Trebuchet MS","Trebuchet MS");
    
            fontInput.onchange = function() {
                widget.font = this.value;
            }
    
            fontInput.selectOptionByIndex(0);

            var fontFaceTr = tr_xLabeledElement("Font Face:",fontInput.container);

            textPanel.appendChild(fontFaceTr);
    
            widgetForm.appendChild(textPanel);
    
    }

    // Widget Deleting

    var delWidget = xLabeledButton("Delete",function(){
        var win = new src_htmlConfirm("Are you sure you want to delete this widget?",function(){
            self.subject.widgets.splice(widgetI,1);
            self.widgetEditors.removeChild(widgetForm);

            if(self.subject.widgets.length === 0) {
                delete self.subject.widgets
            }

        });
    })

    widgetForm.appendChild(delWidget);

    // Widget Cloning

    var cloneWidget = xLabeledButton("Clone",function(){
        var o = JSON.parse(JSON.stringify(self.subject.widgets[widgetI]));
        self.subject.widgets.push(o);
        self.widgetEditors.appendChild(self.generateWidgetEditor(o));
    })

    widgetForm.appendChild(cloneWidget);



    return widgetForm;

}


ObjectEditor.prototype.addWidgetsPanel = function() {

    var widgetPanel = document.createElement("div");
    var widgetAdder = document.createElement("div");

    widgetPanel.className = "phsim-widget-panel";
    widgetAdder.className = "phsim-widget-adder";

    var self = this;

    var availableWidgets = new xSelectionMenu();

    widgetAdder.appendChild(availableWidgets.container);

    if(this.subject.shape) {
        availableWidgets.add("keyboardControls","Keyboard Controls");
        availableWidgets.add("velocity","Velocity");
        availableWidgets.add("translate","Translate");
        availableWidgets.add("position","Position");
        availableWidgets.add("force","Force");
        availableWidgets.add("clone","Clone");
        availableWidgets.add("draggable","Draggable");
        
        if(shortcuts_getSelectedSimulation().game) {
            availableWidgets.add("coin","Coin");
            availableWidgets.add("hazard","Hazard");
            availableWidgets.add("health","Health");
        }

        availableWidgets.add("rotation","Rotation");
        availableWidgets.add("setAngle","Set Angle");
        availableWidgets.add("deleteSelf","Delete Self");
        availableWidgets.add("noRotation","No Rotation");
        availableWidgets.add("toggleLock","Toggle Lock");
        availableWidgets.add("toggleSemiLock","Toggle Semi-Lock");
        availableWidgets.add("objLink","Object Link");
        availableWidgets.add("setColor","Set Color");
        availableWidgets.add("setBorderColor","Set Border Color");
        availableWidgets.add("setLineWidth","Set Border Width");
        availableWidgets.add("elevator","Elevator");
        availableWidgets.add("circularConstraint","Circular Constraint");
        availableWidgets.add("transformCameraByObj","Transform Camera by Object");
        availableWidgets.add("transformAgainstCamera","Transform Object by Camera");

    }
    if(this.subject.shape === "rectangle") {
        availableWidgets.add("rectText","Rectangular Text");
    }

    if(this.subject.simulation) {
        availableWidgets.add("connection","Connection");
    }

    availableWidgets.add("playAudio","Audio Player");
    availableWidgets.add("wFunction","Widget Function");

    var addButton = document.createElement("span");
    addButton.innerText = "Add Widget";
    addButton.className = "button";
    addButton.addEventListener("click",function(){

        if(!self.subject.widgets) {
            self.subject.widgets = [];
        }
        
        var o = {}

        o.type = availableWidgets.value;

        if(o.type === "elevator") {

            var v = PhSim.Centroid.shape(self.subject);
            var d = PhSim.BoundingBox.fromShape(self.subject);

            o.pointA = {
                "x": v.x + d.w,
                "y": v.y
            };

            o.pointB = {
                "x": v.x - d.w,
                "y": v.y
            };

            o.bounding = "x";

        }

        if(o.type === "objLink") {
            
        }

        if(o.type === "circularConstraint") {
            modalContent = PhSim.Centroid.shape(self.subject);
            o.x = modalContent.x;
            o.y = modalContent.y;
        }

        self.subject.widgets.push(o);

        if(self.subject.widgets[self.subject.widgets.length - 1].vector) {
            self.subject.widgets[self.subject.widgets.length - 1].vector.x = 10;
            self.subject.widgets[self.subject.widgets.length - 1].vector.y = 10;
        }

        var e  = self.generateWidgetEditor(self.subject.widgets[self.subject.widgets.length - 1]);
        widgetEditors.appendChild(e);

    });

    var widgetEditors = document.createElement("div");
    this.widgetEditors = widgetEditors;

    widgetEditors.className = "phsim-widget-editors";

    if(self.subject.widgets) {
        for(var i = 0; i < self.subject.widgets.length; i++) {
            var e  = this.generateWidgetEditor(self.subject.widgets[i]);
            widgetEditors.appendChild(e);
        }
    }

    widgetAdder.appendChild(addButton);
    widgetPanel.appendChild(widgetAdder);
    widgetPanel.appendChild(widgetEditors)

    return widgetPanel;

}

ObjectEditor.prototype.tr_spriteOptions = function() {

    var self = this;

    var tr = document.createElement("tr");
    var td1 = tr.insertCell();
    var td2 = tr.insertCell();

    // XSelectionMenu

    var spriteOptions = SpriteSelect.getSelectionMenu();

    spriteOptions.onchange = function() {

        if(this.value === "-1") {
            self.subject.sprite = null;
        } 

        else {
            self.subject.sprite = Number.parseInt(this.value);
        }
    };

    td1.innerHTML = "Sprite:"
    td2.appendChild(spriteOptions.container);

    this.spriteOptions = spriteOptions

    if(Number.isInteger(this.subject.sprite)) {
        spriteOptions.selectOptionByIndex(this.subject.sprite + 1);
    }

    else {
        spriteOptions.selectOptionByIndex(0)
    }

    return tr;

}


ObjectEditor.prototype.addCirclePanel = function() {

    var self = this;

    var cycle = new tr_xLabeledInput("Angle:","text",toDegrees(this.subject.cycle),"cycle",function() {
        self.subject.cycle = toRadians(Number.parseInt(this.value));
    });

    var x = new tr_xLabeledInput("Center X-Coordinate:","text",this.subject.x,"center-x",function() {
        self.subject.x = Number.parseInt(this.value);
    });

    var y = new tr_xLabeledInput("Center Y-Coordinate","text",this.subject.y,"center-y",function() {
        self.subject.y = Number.parseInt(this.value);
    });

    var radius = new tr_xLabeledInput("Radius:","text",this.subject.radius,"radius",function() {
        self.subject.radius = Number.parseInt(this.value);
    });

    var panel = compositeHTMLElement("div",cycle,x,y,radius);

    panel.id = "circle-panel";

    return panel;
}

ObjectEditor.prototype.addRegPolygonPanel = function() {

    var self = this;

    var cycle = new tr_xLabeledInput("Angle:","text",toDegrees(this.subject.cycle),"cycle",function() {
        self.subject.cycle = toRadians(Number.parseInt(this.value));
    });

    var x = new tr_xLabeledInput("Center X-Coordinate:","text",this.subject.x,"center-x",function() {
        self.subject.x = Number.parseInt(this.value);
    });

    var y = new tr_xLabeledInput("Center Y-Coordinate","text",this.subject.y,"center-y",function() {
        self.subject.y = Number.parseInt(this.value);
    });

    var n = new tr_xLabeledInput("Sides:","text",this.subject.sides,"reg-polygon-sides",function() {
        self.subject.sides = Number.parseInt(this.value);
    });

    var radius = new tr_xLabeledInput("Radius:","text",this.subject.radius,"radius",function() {
        self.subject.radius = Number.parseInt(this.value);
    });

    var panel = compositeHTMLElement("div",cycle,x,y,n,radius);

    panel.id = "circle-panel";

    return panel;
}

ObjectEditor.prototype.gamePanel = function() {

    var panel = document.createElement("div");

    if(this.subject.game) {
        panel.appendChild(this.gameEditingForm(this.subject.game));
    }

    else {
        panel.appendChild(this.gamePanelEnableButton());
    }

    return panel;
}

ObjectEditor.prototype.gamePanelEnableButton = function() {

    var self = this;

    var b = xLabeledButton("Enable Game",function(){
        self.subject.game = new PhSim.Game.Options(0,0,0);
        b.parentNode.appendChild(self.gameEditingForm(self.subject.game))
        b.parentNode.removeChild(b);
    })

    return b;
}

ObjectEditor.prototype.gameEditingForm = function(game) {

    var self = this;
    
    var a = document.createElement("div");

    var intScore = tr_xLabeledInput("Inital Score:","number",game.score,"intscore-game-phobject",function(){
        game.score = Number.parseInt(this.value);
    });

    var goal = tr_xLabeledInput("Goal:","number",game.goal,"goal-game-phobject",function(){
        game.goal = Number.parseInt(this.value);
    });

    var intLife = tr_xLabeledInput("Life:","number",game.life,"life-game-phobject",function(){
        game.life = Number.parseInt(this.value);
    });

    var table = compositeHTMLElement("table",intScore,goal,intLife);

    var del = xLabeledButton("Delete Game",function(){
        self.subject.game = null;
        
    });

    a.appendChild(table);
    a.appendChild(del);

    return a;
}

ObjectEditor.prototype.open = function() {
    this.htmlWin.appendToDocumentBody();
    $(this.dom_c).accordion();
    this.htmlWin.beforewindowremoval = this.onclose;
    ObjectEditor.instance = this;
}

ObjectEditor.prototype.onclose = function() {
    ObjectEditor.instance = null;
}

ObjectEditor.instance = null;

ObjectEditor.prototype.addRectanglePanel = function() {

}

/* harmony default export */ const objectEditor = (ObjectEditor);
;// CONCATENATED MODULE: ./src/stringifyProjectJSON.js
function stringifyProjectJSON(o) {
    return JSON.stringify(o,function(key,value){
        if(typeof value === "string" && value.match(/^blob:/)) {
            return undefined;
        }

        else {
            return value;
        }
    });
}

/* harmony default export */ const src_stringifyProjectJSON = (stringifyProjectJSON);
;// CONCATENATED MODULE: ./src/file.js







var file = {}

file.exportEntity = function(fileName,object) {

    return new Promise(function(resolve,reject){   
        var data = src_stringifyProjectJSON(object);
        var blob = new Blob([data]);
        var dataURL = URL.createObjectURL(blob);

        var link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName + ".json";
        link.click();
        resolve();
    })
 
}

file.export = function(fileName) {

    /*

    var data = JSON.stringify(sim);
    var blob = new Blob([data]);
    var dataURL = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName + ".json";
    link.click();

    */

    return file.exportEntity(fileName,session_session.sim)
}

file.import = function(fileInput) {

    

}

/****** 

File Code

******/

file.gui = {}
file.gui.import = {}
file.gui.export = {}

file.gui.import.htmlWin = new htmlwin("Import File","importFile","superWin");
file.gui.export.htmlWin = new htmlwin("Export File","exportFile","superWin");

// Export Description

file.gui.export.desc = document.createElement("div");
file.gui.export.desc.innerHTML = "Type in the name for the file you want to save:"

// Export Input

file.gui.export.exportInput = document.createElement("input");
file.gui.export.exportInput.type = "text";

// Export Button

file.gui.export.exportButton = document.createElement("span");
file.gui.export.exportButton.className = "exportButton button";
file.gui.export.exportButton.innerHTML = "Save File";

file.gui.export.exportButton.addEventListener('click', function() {

    file.export(file.gui.export.exportInput.value);

});

// Appending Objects to export
file.gui.export.htmlWin.winBody.appendChild(file.gui.export.desc);
file.gui.export.htmlWin.winBody.appendChild(file.gui.export.exportInput);
file.gui.export.htmlWin.winBody.appendChild(file.gui.export.exportButton);

// Make htmlWin accessable via the menu bar

/** 
document.querySelector(".file-save").addEventListener('click', function() {
    file.gui.export.htmlWin.appendToDocumentBody();
});

**/

//Import Description

file.gui.import.desc = document.createElement("div");
file.gui.import.desc.innerHTML = "Select a file to open:"

// import Input

file.gui.import.importInput = document.createElement("input");
file.gui.import.importInput.type = "file";

file.gui.import.importInput.addEventListener("change",function(){

    var fileReader = new FileReader();

    fileReader.addEventListener("load",function(){
        
        file.gui.import.htmlWin.winBody.appendChild(file.gui.import.importButton);

        file.gui.import.importButton.addEventListener('click', function() {
            src_loadSim(JSON.parse(fileReader.result));
        });

    })

    fileReader.readAsText(this.files[0]);

})

// import Button

file.gui.import.importButton = document.createElement("span");
file.gui.import.importButton.className = "importButton button";
file.gui.import.importButton.innerHTML = "Open File";

// Appending Objects to import
file.gui.import.htmlWin.winBody.appendChild(file.gui.import.desc);
file.gui.import.htmlWin.winBody.appendChild(file.gui.import.importInput);

/**

session.actions.openFile = function() {
    file.gui.import.htmlWin.appendToDocumentBody();
};

**/

/* harmony default export */ const src_file = (file);
;// CONCATENATED MODULE: ./src/toolbar.js














// Toolbar Layer Selection

var layerSelection = document.querySelector("#layer-selection");
var layerOptionMap = new Map();

layerSelection.addEventListener("change",function(event){
    session_session.selectedLayerI = layerSelection.selectedIndex;
});

function addLayerOption(layer) {
    var e = document.createElement("option");
    e.innerText = layer.name;
    layerSelection.appendChild(e);
    layerOptionMap.set(layer,e);
    return e;
}

function generateLayerSelection() {

    var s = session_session.getSelectedSimulation();

    for(let i = 0; i < s.layers.length; i++) {
        addLayerOption(s.layers[i])
    }

}

// Simulation Selection Toolbar

var simulationSelection = document.querySelector("#simulation-selection"); 
var simOptionMap = new Map();

simulationSelection.addEventListener("change",function(event){
    session_session.simulationI = simulationSelection.selectedIndex;
    session_session.selectedLayerI = 0;
});

function addSimulationSelection(simulation) {
    var e = document.createElement("option");
    e.innerText = simulation.name;
    simulationSelection.appendChild(e);
    simOptionMap.set(simulation,e);
    return e;
}

function generateSimulationSelection() {
    

    // Add selection options

    for(let i = 0; i < session_session.sim.simulations.length; i++) {
        addSimulationSelection(session_session.sim.simulations[i])
    }

    // Generate layer selection

    generateLayerSelection();

}

/*** 
 * 
 * 
 * Some Toolbar Options
 * @
 * 
 * ***/

// ADDING AND REMOVING SIMULATIONS

document.querySelector("#sim-add-button").addEventListener("click",function(){
    addBlankSimulation(session_session.sim);
});

document.querySelector("#sim-remove-button").addEventListener("click",function(){

    var f = function() {
        var i = session_session.simulationI;

        simulationSelection.removeChild(simOptionMap.get(session_session.sim.simulations[i]));

        session_session.sim.simulations.splice(i,1);
        session_session.simulationI--;
        session_session.selectedLayerI = 0;


        session_session.syn.layers();
    }

    var c = new src_htmlConfirm("Are you sure you want to delete simulation" + shortcuts_getSelectedSimulation().name + "?",f);

});

// ADDING AND REMOVING LAYERS

document.querySelector("#layer-add-button").addEventListener("click",function(){
    addBlankLayer(shortcuts_getSelectedSimulation());
});

document.querySelector("#layer-remove-button").addEventListener("click",function(){

    var i = session_session.selectedLayerI;
    var l = session_session.sim.simulations[session_session.simulationI].layers[session_session.selectedLayerI];
    var e = layerOptionMap.get(l);

    layerSelection.removeChild(e);

    session_session.sim.simulations[session_session.simulationI].layers.splice(i,1);

    session_session.selectedLayerI--;
    session_session.syn.layers();

});



document.querySelector(".simulation-settings").addEventListener("click",function(){
    var a = new objectEditor(session_session.sim.simulations[session_session.simulationI]);
    a.open();
});


/*** Composite Simulation Settings ***/


document.querySelector(".comp-settings").addEventListener("click",function(){
    var a = new objectEditor(session_session.sim);
    a.open();
});

document.querySelector(".file-open").addEventListener('click', function() {
    src_file.gui["import"].htmlWin.appendToDocumentBody();
});

document.querySelector(".file-save").addEventListener('click', function() {
    src_file.gui["export"].htmlWin.appendToDocumentBody();
});


document.querySelector(".generate-zip").addEventListener("click",generateZipFolder)

document.querySelector(".guide").addEventListener("click",function(){
    window.open("./help")
});



/*** Menu Color Fields ***/

var fillcolorCtrl = new colorField("#333333","Fill Color",function(){

    if(src_multiSelect.selectedObjects.length > 0) {
        src_multiSelect.forAll(function(o){
            
            o.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            
            if(src_dynSimEdit.phSim) {
                src_dynSimEdit.map.get(o).object.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            }

            src_render_static();
        })
    }

});

document.querySelector(".fillcolor-ctrl").appendChild(fillcolorCtrl.container);

var strokecolorCtrl = new colorField("#000000","Stroke Color",function(){

    if(src_multiSelect.selectedObjects.length > 0) {
        src_multiSelect.forAll(function(o){
            o.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            
            if(src_dynSimEdit.phSim) {
                src_dynSimEdit.map.get(o).object.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"];
            }
            
            src_render_static();
        });
    }

});

document.querySelector(".strokecolor-ctrl").appendChild(strokecolorCtrl.container);

document.querySelector(".lineWidth").addEventListener("input",function() {

    var self = this;

    src_multiSelect.recordStateForAll("lineWidth");

    if(src_multiSelect.selectedObjects.length > 0) {
        src_multiSelect.forAll(function(o) {

            o.lineWidth = Number.parseInt(self.value);

            if(src_dynSimEdit.phSim) {
                src_dynSimEdit.map.get(o).object.lineWidth = Number.parseInt(self.value);
            }

            src_render_static();

        });
    }

});

/**

/**
 * Dropdown Menus
 

document.querySelector(".dropdown-item.new-file").addEventListener("click",function(){
    session.actions.createNewSim();
});

document.querySelector(".dropdown-item.open-file").addEventListener("click",function(){
    session.actions.openFile();
});

document.querySelector(".dropdown-item.open-file").addEventListener("click",function(){
    session.actions.openFile();
});

**/

/** 

session.testSimulation()

session.actions.createShape.polygon()

session.actions.createShape.circle()

session.actions.createShape.rectangle()
session.actions.createShape.regPolygon()


**/

function toggleQSettings(event) {

    if(event.checked) {
        document.querySelector('.quick-settings').style.display = 'block'
    }
    
    else {
        document.querySelector('.quick-settings').style.display = 'none' 
    }

}

function toggleStatusBar(event) {

    if(event.checked) {
        document.querySelector('.statusBar').style.display = 'block' 
    }
    
    else {
        document.querySelector('.statusBar').style.display = 'none' 
    }

}

;// CONCATENATED MODULE: ./src/loadSim.js











function loadSim(argument) {

    session_session.jszip = new JSZip();

    var spriteCanidates = [];
    var deletedSpriteSrc = [];
    session_session.tempimgurls = [];

    return new Promise(function(resolve,reject){

        session_session.msg.innerText = "Loading Simulation..."

        if(!Array.isArray(argument.simulations)) {
            throw "Error: Invalid value for property 'simulations'. Property must be an array";
        }

        else {
            for(var i = 0; i < argument.simulations; i++) {
                
                var simulation = argument.simulations[i];

                if(!Array.isArray(simulation.layers)) {
                    throw "The layers property must be an array in simulation " + i;
                }

                else {

                    for(var j = 0; j < simulation.layers.length; j++) {

                        var layer = simulation.layers[j];

                        if(!Array.isArray(layer.objUniverse)) {
                            throw "The objUniverse property in layer object " + j + ", simulation object" + i + ", must be an array";
                        }

                    }

                }

            }
        }


        if(selectionObject.selected) {
            multiSelect.deselect()
        }

        session_session.loaded = false;

        //sim = new Proxy(argument,simProxyHandler)
        session_session.sim = argument;
        session_session.sim_proxy = new Proxy(argument,simproxyhandler);
        session_session.sim_dir = argument;
        
        shortcuts_selectsimulation(0);
        session_session.selectedLayerI = 0;
        session_session.phStaticRender = new PhSim.PhRender(elements_ctx);

        session_session.initStaticSprites = [];

        resolve();

    }).then(function(){

        return new Promise(function(resolve,reject){

            session_session.msg.innerText = "Loading embedded sprites..."

            if(Array.isArray(session_session.sim.base64imgurls)) {
                for(var i = 0; i < session_session.sim.base64imgurls.length; i++) {
                    session_session.msg.innerText = "Processing embedded sprite " + i + "...";
                    var url = src_createTempImgURL(session_session.sim.base64imgurls[i]);
                    session_session.tempimgurls.push(url);
                }
            }

            var checked = 0;

            objloops.global(function(obj){

                if(obj.sprite) {
                    spriteCanidates.push(obj.sprite);

                    if(typeof obj.sprite.base64 === "number") {
                        obj.sprite.src = session_session.tempimgurls[obj.sprite.base64];
                    }

                }
            });

            if(spriteCanidates.length === 0) {
                resolve();
            }
    
            else for(var i = 0; i < spriteCanidates.length; i++) {
    
                var obj = spriteCanidates[i];
    
                session_session.msg.innerText = "Attempting to load sprite \" " + obj.src + "\""
    
                var xhr = new XMLHttpRequest();
    
                xhr._sprite = obj;
    
                xhr.open("get",obj.src);
    
                xhr.addEventListener("load",function(){

                    if(this.status === 404) {

                        session_session.msg.innerText = "Sprite \" " + this._sprite.src + "\" deleted due to sprite error."
                        deletedSpriteSrc.push(this._sprite.src);

                        xhr._sprite.src = "";
                        reject("Error 404 for url \"" + this._sprite.src + "\".");

                    }

                    else {
                        session_session.initStaticSprites.push(this._sprite);
                        session_session.initStaticSpriteUrls.add(this._sprite.src);
                        session_session.msg.innerText = "Sprite \" " + this._sprite.src + "\" loaded."
                    }

                    checked++;

                    if(checked === spriteCanidates.length) {
                        resolve();
                    }

                });

                xhr.addEventListener("error",function(e){
                    reject(e)
                })
    
                xhr.send();

            }
            
        });

    }).then(function(){
        return new Promise(function(resolve,reject){

            objloops.global(function(o){

                session_session.msg.innerText = "Checking for boolean defintions in object \"" + o.name + "\"";

                if(o.rectangle) {
                    o.shape = "rectangle";
                }

                if(o.circle) {
                    o.shape = "circle";
                }

                if(o.regPolygon) {
                    o.shape = "regPolygon";
                }

                if(o.polygon) {
                    o.shape = "polygon";
                }

            })

            session_session.msg.innerText = "Assigning sprites to sprite catche"

            session_session.phStaticRender.spriteImgObj = new PhSim.Sprites.spriteImgObj(Array.from(session_session.initStaticSpriteUrls.values()),function(){
                resolve();
            });

        });
    }).then(function(){

        return new Promise(function(resolve,reject){

            session_session.phStaticRender.sim = session_session.sim;
    
            session_session.loaded = true;
    
            session_session.layers = session_session.sim.simulations.layers;
    
            session_session.syn.layers();
    
            generateSimulationSelection()
    
            src_render_static();
    
            resolve();
    
        });
        
    }).catch(function(e){
        new htmlAlert("Error:" + e);
    })

}

/* harmony default export */ const src_loadSim = (loadSim);
;// CONCATENATED MODULE: ./src/session.js






var session_session = {};

window.session = session_session;

session_session.loaded = false;
session_session.selectedLayerI;
session_session.sim;
session_session.spriteImgObj;
session_session.phStaticRender;
session_session.sim_proxy;
session_session.layers;
session_session.sim_raw;
session_session.msg = document.querySelector("#msg");
session_session.initStaticSprites = [];
session_session.sim_dir;
session_session.simulationI;
session_session.selectionRadius = 10;
session_session.initStaticSpriteUrls = new Set();
session_session.tool = "rectangle_multiselect";
session_session.usrPref = usrpref

session_session.getSelectedLayer = function() {
    return session_session.sim.simulations[session_session.simulationI].layers[session_session.selectedLayerI];
}

session_session.getSelectedSimulation = function() {
    return session_session.sim.simulations[session_session.simulationI];
}

session_session.actions = {

    createShape: {

    }

}

session_session.actions.createNewSim = function() {
    
    new src_htmlConfirm("Do you really want to create a new simulation?",function() {      
        src_loadSim(new PhSim.Static());
        session_session.syn.layers();
    });
}

session_session.syn = {
    layers: function() {
        src_render_static();
    }
}

function session_getSelectionRadius() {

    return (session_session.selectionRadius / src_box.scaleFactor);
}
;// CONCATENATED MODULE: ./src/draggablePoint.js



// New function for rendering parts that can be edited.

function draggablePoint(x,y) {

    elements_ctx.globalAlpha = 1;
    elements_ctx.fillStyle = "orange";
    elements_ctx.strokeStyle = "transparent";
    
    elements_ctx.beginPath();

    elements_ctx.arc(x,y,session_getSelectionRadius() * 0.5,0,2*Math.PI);
    elements_ctx.stroke();
    elements_ctx.fill();


    elements_ctx.globalAlpha = 0.5;
    elements_ctx.beginPath();
    elements_ctx.arc(x,y,session_getSelectionRadius(),0,2*Math.PI);
    elements_ctx.stroke();
    elements_ctx.fill();

}

/* harmony default export */ const src_draggablePoint = (draggablePoint);
;// CONCATENATED MODULE: ./src/focusObject.js




// Focus Object

function renderEditPoints(object) {

    if(object.shape === "polygon") {

        for(var i = 0; i < object.verts.length; i++) {
            src_draggablePoint(object.verts[i].x,object.verts[i].y);
        }

    }

    if(object.shape === "circle" || object.shape === "regPolygon") {
        var m = retrieveCircumPoint(object);
        var c = PhSim.Centroid.shape(object);
        
        src_draggablePoint(m.x,m.y);
        src_draggablePoint(c.x,c.y);

        // Draw Lines

        elements_ctx.strokeStyle = "orange";
        elements_ctx.lineWidth = 2;

        elements_ctx.beginPath();
        elements_ctx.moveTo(m.x,m.y);
        elements_ctx.lineTo(c.x,c.y);
        elements_ctx.closePath();
        elements_ctx.stroke();


    }

    if(object.shape === "rectangle") {

        var m = retrieveCircumPoint(object);

        src_draggablePoint(m.x,m.y);

        var a = PhSim.Vertices.getRectangleCorners(object);

        src_draggablePoint(a.topLeft.x,a.topLeft.y);
        src_draggablePoint(a.topRight.x,a.topRight.y);
        src_draggablePoint(a.bottomLeft.x,a.bottomLeft.y);
        src_draggablePoint(a.bottomRight.x,a.bottomRight.y);



    }

}

function focusObject(o) {

    // Render Edit Points

    renderEditPoints(o);

    // Render Box

    var m = PhSim.BoundingBox.fromShape(o);

    elements_ctx.beginPath();
    elements_ctx.rect(m.x,m.y,m.w,m.h);
    elements_ctx.closePath();
    elements_ctx.stroke();

    renderEditPoints(o);
}
;// CONCATENATED MODULE: ./src/getmouse.js



var getmouse_event;

window.addEventListener("mousemove",function(e){
    getmouse_event = e;
})

function trueMouseX() {
    return getmouse_event.pageX - document.querySelector(elmName).getBoundingClientRect().left;
}

function trueMouseY() {
    return getmouse_event.pageY - document.querySelector(elmName).getBoundingClientRect().top;
}

function getmouse_getMouseX() {
    return Math.floor((trueMouseX() / src_box.scaleFactor) - src_box.offsetX);
}

function getmouse_getMouseY() {
    return Math.floor((trueMouseY() / src_box.scaleFactor) - src_box.offsetY);
}

function getmouse_getMouse() {
    return new PhSim.Vector(getmouse_getMouseX(),getmouse_getMouseY());
}

/* Mouse Recording */

var getmouse_mousePrev = {
    x: null,
    y: null
}

var oldMouse = {
    x: 0,
    y: 0
}

var getmouse_a = 0;
var getmouse_b = 0;

function tracMouse() {

    // X-Direction

    if(getmouse_getMouseX() < oldMouse.x) {
        getmouse_a = -1;
    }

    if(getmouse_getMouseX() > oldMouse.x) {
        getmouse_a = 1;
    }

    // Y-Direction

    if(getmouse_getMouseY() < oldMouse.y) {
        getmouse_b = -1;
    }

    if(getmouse_getMouseY() > oldMouse.y) {
        getmouse_b = 1;
    }

    // Record Mouse Directions

    getmouse_mousePrev.x = oldMouse.x;
    getmouse_mousePrev.y = oldMouse.y;

    oldMouse.x = getmouse_getMouseX();
    oldMouse.y = getmouse_getMouseY();
    
    return {x:getmouse_a,y:getmouse_b};

}
;// CONCATENATED MODULE: ./src/getPath.js
function getPath(path,x,y) {

    var line = {
        pointA: null,
        pointB: null
    }

    var localCanvas = document.createElement("canvas");
    var localCtx = localCanvas.getContext("2d");

    localCtx.lineWidth = path.lineWidth;

    // Checks all sides except for the last line

    for(var i = 0; i < path.verts.length - 1; i++) {

        localCtx.moveTo(path.verts[i].x, path.verts[i].y);
        localCtx.lineTo(path.verts[i+1].x, path.verts[i+1].y);;
        localCtx.stroke();
        var cond = localCtx.isPointInStroke(x,y);

        if(cond) {
            line.pointA = path.verts[i];
            line.pointB = path.verts[i+1];
            return line;
        }

    }

    // Checks if point is in final side

    localCtx.moveTo(path.verts[path.verts.length - 1].x, path.verts[path.verts.length - 1].y);
    localCtx.lineTo(path.verts[0].x, path.verts[0].y);;
    localCtx.stroke();
    var cond = localCtx.isPointInStroke(x,y);

    if(cond) {
        line.pointA = path.verts[path.verts.length - 1];
        line.pointB = path.verts[0];
        line.pointA.last = true;
        return line;
    }


}

/* harmony default export */ const src_getPath = (getPath);
;// CONCATENATED MODULE: ./src/vertices.js


// Get Universal Vertex Array

function getUniversalVertexArray() {
    var a = [];
    objLoops.rel_index_subglobal(function(obj){
        if(obj.shape === "polygon") {
            for(var i = 0; i < obj.verts.length; i++) {
                a.push(obj.verts[i]);
            }
        }
    },simulationI)
    return a;
}

// Get Universal Vertex Set By Radius

function getVertsByCircle(r,x,y) {

    var a = getUniversalVertexArray();
    var b = [];

    for(var i = 0; i < a.length; i++) {
        if(calc_vert_distance(x,y,a[i].x,a[i].y) < r) {
            b.push(a[i])
        }
    }

    return b;

}


function vertices_getVertsByCircleAndObj(obj,r,x,y) {
    var a = obj.verts;
    var b = [];

    for(var i = 0; i < a.length; i++) {
        if(calc_vert_distance(x,y,a[i].x,a[i].y) < r) {
            b.push(a[i])
        }
    }

    return b;

}

function calc_vert_distance(a, b, c, d) {
		
    var x = a - c;
    var y = b - d;
    
    return Math.sqrt(x*x + y*y);
}


function transformVertices(verts,x,y) {
	for(var m = 0; m < verts.length; m++) {
		verts[m].x += x;
		verts[m].y += y;
	}

	return verts;
}

function findCentroidOfVertices(a) {
	
	var v = {
		x: 0,
		y: 0,
	}
	
	for(var j = 0; j < a.length; j++) { 
	    v.x += a[j].x;
		v.y += a[j].y;
	}
	
	v.x = (1/a.length) * v.x;
	v.y = (1/a.length) * v.y;
	
	return v;
}

function vertices_rotateAroundO(argx,argy,angle) {
    var m = {
        x: argx * Math.cos(angle) - argy * Math.sin(angle),
        y: argx * Math.sin(angle) + argy * Math.cos(angle)
    }
    
    return m;
}

// Vector objects

function v_calc_vert_distance(vector1,vector2) {
    return calc_vert_distance(vector1.x,vector1.y,vector2.x,vector2.y)
};

/*** Rotate Object around Centroid by angle ***/

function v_rotateAroundCentroid(vertices,angle) {
	
	var cent = findCentroidOfVertices(a);
	
	// Transform all points to origin point of canvas
	
	transformVertices(vertices,-cent.x,-cent.y);
	
	for(var i = 0; i < vertices.length; i++) {
		var k = vertices_rotateAroundO(vertices[i].x, vertices[i].y,angle);
		vertices[i].x = k.x;
		vertices[i].y = k.y;
	}
	
	// Transform all points to centroid point of path
	
	transformVertices(a,cent.x,cent.y);
	
	return a;
}
;// CONCATENATED MODULE: ./src/regPolygonCreator.js







/*** 
 * 
 * Regular Polygon Creator
 * 
 * 
*/

var regPolygonCreator = {
    
    regPolygon: {},

    canvas_onmouseclick: function() {

        // Second Stage Click
        
        if(typeof regPolygonCreator.regPolygon.x === "number" && typeof regPolygonCreator.regPolygon.y === "number") {
            elements_elm.removeEventListener("mousemove",regPolygonCreator.stage2_onmousemove);
            elements_elm.removeEventListener("click",regPolygonCreator.canvas_onmouseclick);
            getSelectedLayer().objUniverse.push(regPolygonCreator.regPolygon);

            if(src_dynSimEdit.phSim) {
                src_dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(regPolygonCreator.regPolygon));
            }

            regPolygonCreator.regPolygon = {};
        }

        // First Stage Click

        else {
            regPolygonCreator.regPolygon = new PhSim.Static.RegPolygon(getmouse_getMouseX(),getmouse_getMouseY(),0,6);
            elements_elm.addEventListener("mousemove",regPolygonCreator.stage2_onmousemove);
        }

    },


    stage2_onmousemove: function() {
        
        // Set Special Point

        regPolygonCreator.regPolygon.radius = calc_vert_distance(regPolygonCreator.regPolygon.x,regPolygonCreator.regPolygon.y,getmouse_getMouseX(),getmouse_getMouseY());
        regPolygonCreator.regPolygon.cycle = Math.atan2( getmouse_getMouseY() - regPolygonCreator.regPolygon.y , getmouse_getMouseX() - regPolygonCreator.regPolygon.x );
    
        // Color Value

        regPolygonCreator.regPolygon.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        regPolygonCreator.regPolygon.lineWidth = document.querySelector(".lineWidth").value;
        regPolygonCreator.regPolygon.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];
    
        // Preview 

        session_session.phStaticRender.renderRegPolygon(regPolygonCreator.regPolygon);

    },

    activate: function() {
        elements_elm.addEventListener("click",regPolygonCreator.canvas_onmouseclick);
    }
}

document.querySelector(".addRegpoly.button-2").addEventListener('click',regPolygonCreator.activate);

session_session.actions.createShape.regPolygon = regPolygonCreator.activate;

/* harmony default export */ const src_regPolygonCreator = (regPolygonCreator);
;// CONCATENATED MODULE: ./src/shapewin.js


/*** Shape Window ***/

var shapeWindow = {
    htmlWin: new htmlwin("Add Objects"),
    addPathButton: document.createElement('span'),
    addCircleButton: document.createElement('span'),
    addRect: document.createElement('span'),
    addConstraint: document.createElement('span'),
    append: function() {
        this.htmlWin.appendToDocumentBody();
    }
}

// Content and classes for the buttons

shapeWindow.addPathButton.innerHTML = "Add Polygon";
shapeWindow.addPathButton.className = "addPath button";

shapeWindow.addCircleButton.innerHTML = "Add Circle";
shapeWindow.addCircleButton.className = "addCircle button";

shapeWindow.addRect.innerHTML = "Add Rectangle";
shapeWindow.addRect.className = "addRect button";

shapeWindow.addConstraint.innerHTML = "Add Constraint";
shapeWindow.addConstraint.className = "addRect button";

// Append buttons to shape window body

shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addPathButton);
shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addCircleButton);
shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addRect);
shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addConstraint);

// Make it so that the shapes window can be accessed from the toolbar.

/**document.querySelector('.add-shape').addEventListener('click', function() {
    shapeWindow.append();	
});

**/

/* harmony default export */ const shapewin = (shapeWindow);
;// CONCATENATED MODULE: ./src/vertpen.js








/*** 

Path Creator v2
Copyright Mjduniverse.com

****/

var vertPen = {

    i: null,

    obj: null,

    verts: [],

    toggle: function() {

        if(vertPen.activated === true) {
            vertPen.deactivate();
        }
        
        else {
            vertPen.activate();
        }

    },

    onmouseclick: function() {
        vertPen.verts.push(new PhSim.Vector(getmouse_getMouseX(),getmouse_getMouseY()));
        src_render_static();
    },

    preview: function() {

        if(vertPen.verts.length > 0) {

            elements_ctx.lineWidth = 1;
            elements_ctx.strokeStyle = 'red';
            elements_ctx.beginPath();
            elements_ctx.fillStyle = 'red';
            
            // Path Preview
            
            elements_ctx.moveTo(vertPen.verts[0].x,vertPen.verts[0].y)

            for(var i = 0; i < vertPen.verts.length; i++) {
                elements_ctx.lineTo(vertPen.verts[i].x,vertPen.verts[i].y);
            }

            if(vertPen.verts.length > 1) {
                elements_ctx.lineTo(vertPen.verts[0].x,vertPen.verts[0].y);
            }

            elements_ctx.stroke();

        }

    },

    activated: false,

    activate: function() {
        elements_elm.style.cursor = "crosshair";
        elements_elm.onmousemove = null;
        elements_elm.addEventListener('click', vertPen.onmouseclick);
        elements_elm.addEventListener('dblclick', vertPen.deactivate);
        document.querySelector("#msg").innerHTML = "Click to add a point. Double click to finish.";
        vertPen.activated = true;
    },

    deactivate: function() {
        elements_elm.style.cursor = "default";
        
        /*** Add Vertices to settings object, clear the temporary path variables and refresh canvas ***/
        
        vertPen.save();
        vertPen.verts = []
        
        
        /*** Makes elm.onmousedown EventListener go back to ordinary eventListener. ***/
        
        elements_elm.removeEventListener('click', vertPen.onmouseclick);
        elements_elm.removeEventListener('dblclick', vertPen.deactivate);
        
        vertPen.activated = false;

        elements_elm.style.cursor = "default";
        src_render_static();
    },

    save: function() {

        // Remove end clone element.

        var test1 = (vertPen.verts[0].x === vertPen.verts[vertPen.verts.length - 1].x) && (vertPen.verts[0].y === vertPen.verts[vertPen.verts.length - 1].y);
        var test2 = (vertPen.verts[vertPen.verts.length - 2].x === vertPen.verts[vertPen.verts.length - 1].x) && (vertPen.verts[vertPen.verts.length - 2].y === vertPen.verts[vertPen.verts.length - 1].y);

        if(test1 || test2) {
            vertPen.verts.pop();
        }

        vertPen.obj = new PhSim.Static.Polygon(vertPen.verts);

        vertPen.obj.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        vertPen.obj.lineWidth = document.querySelector(".lineWidth").value;
        vertPen.obj.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];

        shortcuts_getSelectedSimulation().layers[session_session.selectedLayerI].objUniverse.push(vertPen.obj);

        if(src_dynSimEdit.phSim) {
            src_dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(vertPen.obj));
        }

        document.querySelector("#msg").innerHTML = "Polygon Added";

    }
}

shapewin.addPathButton.addEventListener('click', function() {
    vertPen.toggle();
});

document.querySelector(".addPath.button-2").addEventListener('click', function() {
    vertPen.toggle();
});



session_session.actions.createShape.polygon = function() {
    vertPen.toggle();
}

/* harmony default export */ const vertpen = (vertPen);
;// CONCATENATED MODULE: ./src/render_static.js















function arrowDraw4(ctx,x1,y1,x2,y2) {
		
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.arc(x1,y1,5 / src_box.scaleFactor,0,2*Math.PI);
    ctx.fill();
    
    ctx.lineWidth = 3 / src_box.scaleFactor;

    var m = Math.atan2((y2 - y1),(x2 - x1)) - 0.5 * Math.PI;

    var bw = 9 / src_box.scaleFactor;
    var bh = 18 / src_box.scaleFactor;

    ctx.translate(x2,y2);
    ctx.rotate(m);
    ctx.translate(0,-bh);

    ctx.beginPath();
    ctx.moveTo(-bw,0);
    ctx.lineTo(bw,0);
    ctx.lineTo(0,bh);
    ctx.lineTo(-bw,0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.translate(0,bh);
    ctx.rotate(-m);
    ctx.translate(-x2,-y2);


}

function renderWidgets(object) {
    for(var i = 0; i < object.widgets.length; i++) {

        var centroid = PhSim.Centroid.shape(object);

        if(object.widgets[i].vector) {

            elements_ctx.globalAlpha = 1;
            elements_ctx.fillStyle = "orange";
            elements_ctx.strokeStyle = "orange";

            arrowDraw4(elements_ctx,centroid.x,centroid.y,centroid.x + object.widgets[i].vector.x,centroid.y + object.widgets[i].vector.y);

    
        }

        if(object.widgets[i].type === "elevator") {

            src_draggablePoint(object.widgets[i].pointA.x,object.widgets[i].pointA.y);
            src_draggablePoint(object.widgets[i].pointB.x,object.widgets[i].pointB.y);
    
            elements_ctx.globalAlpha = 1;
            elements_ctx.strokeStyle = "orange";
    
            elements_ctx.beginPath();
            elements_ctx.moveTo(object.widgets[i].pointA.x,object.widgets[i].pointA.y);
            elements_ctx.lineTo(object.widgets[i].pointB.x,object.widgets[i].pointB.y);
            elements_ctx.closePath();
            elements_ctx.stroke();

        }

        if(object.widgets[i].type === "circularConstraint") {
            
            elements_ctx.globalAlpha = 1;
            elements_ctx.strokeStyle = "orange";

            var r = calc_vert_distance(centroid.x,centroid.y,object.widgets[i].x,object.widgets[i].y)


            elements_ctx.beginPath();
            elements_ctx.arc(object.widgets[i].x,object.widgets[i].y,r,0,2 * Math.PI);
            elements_ctx.stroke();
            elements_ctx.closePath();
            
            src_draggablePoint(object.widgets[i].x,object.widgets[i].y);
        }

    }
}

function renderCurrentWidgets(layer) {
    for(var i = 0; i < layer.objUniverse.length; i++) {
        if(layer.objUniverse[i].widgets) {
            renderWidgets(layer.objUniverse[i]);
        }
    }
}

function renderConstraint(constraint) {

    var a = getConstraintPoints(constraint);

    src_draggablePoint(a[0].x,a[0].y);
    src_draggablePoint(a[1].x,a[1].y);

    elements_ctx.globalAlpha = 1;
    elements_ctx.strokeStyle = "orange";

    elements_ctx.beginPath();
    elements_ctx.moveTo(a[0].x,a[0].y);
    elements_ctx.lineTo(a[1].x,a[1].y);
    elements_ctx.closePath();
    elements_ctx.stroke();

}

function renderConstraints(simulation) {

    for(var i = 0; i < simulation.widgets.length; i++) {
        if(simulation.widgets[i].type === "constraint") {
            renderConstraint(simulation.widgets[i]);
        }
    }
}

function getConstraintPoints(constraint) {

    var firstPoint = null;
    var secondPoint = null;


    firstPoint = constraint.pointA;
    
    secondPoint = constraint.pointB;

    return [firstPoint,secondPoint];
}

function render_static_render_static() {

    if(session_session.render_static_disabled) {
        return;
    }

    let selS = shortcuts_getSelectedSimulation()


    elements_ctx.globalAlpha = 1;
    elements_ctx.fillStyle = "black";
    elements_ctx.strokeStyle = "black";


    elements_ctx.clearRect(-src_box.offsetX,-src_box.offsetY, elements_elm.width / src_box.scaleFactor, elements_elm.height / src_box.scaleFactor);

    document.body.style.background = selS?.world.bg || "transparent";

    if(usrpref.renderColored) {
        for(var i = 0; i < selS.layers.length; i++) {
            session_session.phStaticRender.renderStaticLayer(shortcuts_getSelectedSimulation().layers[i]);
        }
    }
    
    //ctx.drawImage(phStaticCanvas,0,0);

    if(shortcuts_getSelectedSimulation().layers && shortcuts_getSelectedSimulation().layers[session_session.selectedLayerI]) {
        renderCurrentWidgets(shortcuts_getSelectedSimulation().layers[session_session.selectedLayerI]);
    }
    
    for(i = 0; i < src_multiSelect.selectedObjects.length; i++) {

        focusObject(src_multiSelect.selectedObjects[i]);

        if(src_multiSelect.selectedObjects.length > 0 && mouseObject_sObj().shape === "polygon") {
            
            var path = src_getPath(mouseObject_sObj(),getmouse_getMouseX(),getmouse_getMouseY())

            if(path) {
                elements_ctx.globalAlpha = 1;
                elements_ctx.strokeStyle = "orange";

                elements_ctx.beginPath();
                elements_ctx.moveTo(path.pointA.x,path.pointA.y);
                elements_ctx.lineTo(path.pointB.x,path.pointB.y);
                elements_ctx.closePath();
                elements_ctx.stroke();
            }

        }

    }


    if(vertpen.activated === true && vertpen.verts.length > 2) {
        vertpen.preview();
    }

    if(shortcuts_getSelectedSimulation().widgets) {
        renderConstraints(shortcuts_getSelectedSimulation());
    }


    if(vertpen.activated === true) {
        vertpen.preview();
    }

    if(src_regPolygonCreator.active) {
        src_regPolygonCreator.preview();
    }

    var w = session_session.sim.box.w || session_session.sim.box.width;
    var h = session_session.sim.box.h || session_session.sim.box.height;
    var x = session_session.sim.box.x || 0;
    var y = session_session.sim.box.y || 0;

    elements_ctx.setLineDash([14,14]);

    elements_ctx.globalAlpha = 1;
    elements_ctx.strokeStyle = "orange";

    elements_ctx.beginPath();
    elements_ctx.rect(x,y,w,h);
    elements_ctx.closePath();
    elements_ctx.stroke();

    elements_ctx.setLineDash([]);
    
    
    
}

/* harmony default export */ const src_render_static = (render_static_render_static);
;// CONCATENATED MODULE: ./src/box.js



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
        elements_elm.width = width;
        elements_elm.height = height;
        src_render_static();
    },
    setCanvasHeight: function(height) {
        this.resizeCanvas(elements_elm.width,height);
    }
}

/* harmony default export */ const src_box = (box);
;// CONCATENATED MODULE: ./src/changeSpecialPoint.js


function changeSpecialPoint(object,x,y) {

    if(object.shape === "circle" || object.shape === "regPolygon") {
        var r = calc_vert_distance(object.x,object.y,x,y);
        var a = Math.atan2((y - object.y),(x - object.x));


        object.radius = r;
        object.cycle = a;

    }

    if(object.shape === "rectangle") {

        var c = PhSim.Centroid.shape(object);
        var r = calc_vert_distance(c.x,c.y,x,y);
        var a = Math.atan2((y - c.y),(x - c.x));
        object.cycle = a;

    }

}
;// CONCATENATED MODULE: ./src/editConstraint.js







/*** 
 * 
 * Edit constraint
 * 
*/

var editConstraint = {

    active: false,
    point: null,
    initObj: null,

    target: null,

    transformPointByMouse: function() {
        editConstraint.point.x = editConstraint.point.x + (getmouse_getMouseX() - getmouse_mousePrev.x);
        editConstraint.point.y = editConstraint.point.y + (getmouse_getMouseY() - getmouse_mousePrev.y);
    },

    onmousedown: function() {
        if(mouseObject_mouseObject.constraint.point) {
            editConstraint.target =  mouseObject_mouseObject.constraint;
            editConstraint.point = editConstraint.target.point;
            elements_elm.addEventListener("mousemove",editConstraint.onmousemove);
            elements_elm.addEventListener("mouseup",editConstraint.onmouseup);
            editConstraint.active = true;
            editConstraint.initObj = mouseObject_mouseObject.mObj;
        }
    },

    onmousemove: function() {
        
        editConstraint.transformPointByMouse();

        src_render_static();

        if(mouseObject_mouseObject.cond) {
            focusObject(mouseObject_mouseObject.mObj);
        }

    },

    onmouseup: function() {

        //if(mouseObject.mObj && editConstraint.target.point) {
        //	editConstraint.target.point.x = editConstraint.target.point.x - PhSim.Centroid.shape(mouseObject.mObj).x;
        //	editConstraint.target.point.y = editConstraint.target.point.y - PhSim.Centroid.shape(mouseObject.mObj).y; 
        //}

        //else if(editConstraint.initObj && editConstraint.target.point) {
        //	editConstraint.target.point.x = editConstraint.target.point.x + PhSim.Centroid.shape(editConstraint.initObj).x;
        //	editConstraint.target.point.y = editConstraint.target.point.y + PhSim.Centroid.shape(editConstraint.initObj).y; 
        //}

        if(editConstraint.target.point === editConstraint.target.widget.pointA) {

            if(mouseObject_mouseObject.mObj) {
                editConstraint.target.widget.objectA = {
                    L: mouseObject_mouseObject.gLayer,
                    O: mouseObject_mouseObject.gObject
                };

            }

            else {
                delete editConstraint.target.widget.objectA;
            }

        }

        else if(editConstraint.target.point === editConstraint.target.widget.pointB) {
            
            if(mouseObject_mouseObject.mObj) {
                editConstraint.target.widget.objectB = {
                    L: mouseObject_mouseObject.gLayer,
                    O: mouseObject_mouseObject.gObject
                };
            }

            else {
                delete editConstraint.target.widget.objectB;
            }

        }

        //multiSelect.deselect();
        
        elements_elm.removeEventListener("mousemove",editConstraint.onmousemove);
        elements_elm.removeEventListener("mouseup",editConstraint.onmouseup);
        editConstraint.target = null;
        editConstraint.active = false;
        editConstraint.point = null;
    },

}

elements_elm.addEventListener("mousedown",editConstraint.onmousedown);

/* harmony default export */ const src_editConstraint = ((/* unused pure expression or super */ null && (editConstraint)));
;// CONCATENATED MODULE: ./src/followMeRect.js




/*** Follow Me Rectangle ***/


function FollowMeRect(rectArg) {

    this.rect = rectArg;
    this.execRef = this.exec.bind(this);

    elements_ctx.canvas.addEventListener('mousemove',this.execRef);

}

FollowMeRect.prototype.exec = function() {

    src_render_static();
    this.rect.setByDiag(this.rect.x, this.rect.y, getmouse_getMouseX() , getmouse_getMouseY() );

    if(this.rect.drawFollowMe === true) {
        this.rect.draw();
    }

}

FollowMeRect.prototype.unset = function() {
    elements_ctx.canvas.removeEventListener('mousemove', this.execRef);
}

/* harmony default export */ const followMeRect = (FollowMeRect);
;// CONCATENATED MODULE: ./src/iframeWindow.js


function createIFrameWindow(src,title) {
    var o = new htmlwin(title,"iframe-window","superWin",);
    var iframe = document.createElement("iframe");
    o.appendChild(iframe);
    iframe.src = src;
    return o;
}

/* harmony default export */ const iframeWindow = (createIFrameWindow);
;// CONCATENATED MODULE: ./src/simTest.js






/******************** Simulation Testing *****************/

var simTest = {}

session_session.testSimulation = function() {

    window.addEventListener("unload",onunload);

    session_session.iframe_sim_test_ref = null;

    var c = "width=800,height=600";

    var a = window.open("./simtest.html","_blank",c);
    a.parent_window = window;


    var toggleButton = new xLabeledButton("Toggle",function(){
        session_session.iframe_sim_test_ref.toggle();
    });


}

document.querySelector(".testGame").addEventListener("click",session_session.testSimulation);

/* harmony default export */ const src_simTest = (simTest);
;// CONCATENATED MODULE: ./src/rectangleEditor.js







var rectangleEditor = {

    activate: function(subject) {

    },

    shiftRect: function(rectangle,mode,vector) {

        //if(rectangle.w > 0 && rectangle.h > 0) {

            var a1 = rectangle.cycle;

            if(mode === "topLeft") {
                rectangle.w = rectangle.w - vector.x;
                rectangle.h = rectangle.h - vector.y;
                rectangle.x = rectangle.x + vector.x;
                rectangle.y = rectangle.y + vector.y;
            }
    
            if(mode === "topRight") {
                rectangle.w = rectangle.w + vector.x;
                rectangle.h = rectangle.h - vector.y;
                rectangle.y = rectangle.y + vector.y;
            }
    
            if(mode === "bottomLeft") {
                rectangle.w = rectangle.w - vector.x;
                rectangle.h = rectangle.h + vector.y;
                rectangle.x = rectangle.x + vector.x;
            }
    
            if(mode === "bottomRight") {
                rectangle.w = rectangle.w + vector.x;
                rectangle.h = rectangle.h + vector.y;
            }

            if(mode === "stretchX") {
                rectangle.w = rectangle.w - vector.x;
                rectangle.x = rectangle.x + vector.x;
            }

            if(mode === "!stretchX") {
                rectangle.w = rectangle.w + vector.x;
                rectangle.x = rectangle.x - vector.x;
            }

            rectangle.cycle = a1;

        //}

        //else {
            
        //}
    },

    getPositionVectors: function(rectangle) {

        /*

        var z = {

            "topLeft": {
                "x": rectangle.x,
                "y": rectangle.y
            },

            "topRight": {
                "x": rectangle.x + rectangle.w,
                "y": rectangle.y
            },

            "bottomLeft": {
                "x": rectangle.x,
                "y": rectangle.y + rectangle.h
            },

            "bottomRight": {
                "x": rectangle.x + rectangle.w,
                "y": rectangle.y + rectangle.h
            }

        }

        return z;

        */

        return PhSim.Vertices.getRectangleCorners(rectangle);

    },

    pointWithinEditPoint(rectangle,corner,x,y) {
        var o = rectangleEditor.getPositionVectors(rectangle)[corner];
        return calc_vert_distance(o.x,o.y,x,y) < session_getSelectionRadius();
    },

    getEditPointByPoint(rectangle,x,y) {

        if(rectangleEditor.pointWithinEditPoint(rectangle,"topLeft",x,y)) {
            return "topLeft";
        }

        if(rectangleEditor.pointWithinEditPoint(rectangle,"topRight",x,y)) {
            return "topRight";
        }

        if(rectangleEditor.pointWithinEditPoint(rectangle,"bottomLeft",x,y)) {
            return "bottomLeft";
        }

        if(rectangleEditor.pointWithinEditPoint(rectangle,"bottomRight",x,y)) {
            return "bottomRight";
        }

    },

    corner: null,

    o: null,

    editCornerByMouse: function() {

        var rectangle = rectangleEditor.o;
        var corner = rectangleEditor.corner;

        var rect = new RectangleFrame(rectangle.x,rectangle.y,rectangle.w,rectangle.h);
        rect.rotateAroundCenter(rectangle.cycle);
        rect.setCorner(corner,getmouse_getMouseX(),getmouse_getMouseY());

        var pos = rect.getUnrotatedRawUpperPoint()
        
        rectangle.x = pos.x;
        rectangle.y = pos.y;
        rectangle.w = rect.w;
        rectangle.h = rect.h;
        rectangle.cycle = rect.angle;

        src_render_static();
    },

    setMouseCorner: function() {

        if(!src_simTest.active) {

            if(Number.isInteger(mouseObject_mouseObject.gObject) && mouseObject_mouseObject.mObj.shape === "rectangle") {
                mouseObject_mouseObject.corner = rectangleEditor.getEditPointByPoint(mouseObject_mouseObject.mObj,getmouse_getMouseX(),getmouse_getMouseY());
            }

            else {
                mouseObject_mouseObject.corner = null;
            }

        }

    },

    funcRef: null,

    active: false,

    activate: function() {

        if(mouseObject_mouseObject.corner) {

            rectangleEditor.o = mouseObject_mouseObject.mObj;
            rectangleEditor.corner = mouseObject_mouseObject.corner;
            rectangleEditor.active = true;

            window.addEventListener("mousemove",rectangleEditor.editCornerByMouse);
            window.addEventListener("mouseup",rectangleEditor.deactivate);
            window.addEventListener("contextmenu",rectangleEditor.deactivate);
        }

    },

    deactivate: function() {
        window.removeEventListener("mousemove",rectangleEditor.editCornerByMouse);
        window.removeEventListener("mouseup",rectangleEditor.deactivate);
        window.removeEventListener("contextmenu",rectangleEditor.deactivate);
        //rectangleEditor.funcRef = null;
        rectangleEditor.active = false;
    }

}

window.addEventListener("mousemove",rectangleEditor.setMouseCorner);
window.addEventListener("mousedown",rectangleEditor.activate);

/* harmony default export */ const src_rectangleEditor = (rectangleEditor);
;// CONCATENATED MODULE: ./src/transformShapes.js








/***** Transforming Circles *****/

var transformCircle = {}

transformCircle.center = function(object,x,y) {
    object.x = object.x + x;
    object.y = object.y + y;
}

transformCircle.modifyRadius = function() {

}

transformCircle.transformByMouse = function(object) {
    transformCircle.center(object,getmouse_getMouseX() - getmouse_mousePrev.x ,getmouse_getMouseY() - getmouse_mousePrev.y);

}

/***** Transforming Rectangles *****/

var transformRectangle = {}

transformRectangle.upperLeftCorner = function(object, x,y) {
    object.x = object.x + x;
    object.y = object.y + y;
}

transformRectangle.byMouse = {}

transformRectangle.byMouse.modifyPosition = function(object) {

    if(!mouseObject_mouseObject.corner && !src_rectangleEditor.active) {
        transformRectangle.upperLeftCorner(object,getmouse_getMouseX() - getmouse_mousePrev.x ,getmouse_getMouseY() - getmouse_mousePrev.y);

    }

}

/***

Transform Path j of layer i in the x direction by P.

***/


function transformPathX(i, j, x) {
    
    for(var m = 0; m < getSelectedSimulation().layers[i].objUniverse[j].verts.length; m++) {
        getSelectedSimulation().layers[i].objUniverse[j].verts[m].x += x;
    }
    
    ctx.clearRect(0, 0, elm.width, elm.height);
    render_static();
    
}


/***

Transform Path j of layer i in the y direction by P.

***/

function transformPathY(i, j, y) {
    
    for(var m = 0; m < getSelectedSimulation().layers[i].objUniverse[j].verts.length; m++) {
        getSelectedSimulation().layers[i].objUniverse[j].verts[m].y += y;
    }
    
    ctx.clearRect(0, 0, elm.width, elm.height);
    render_static();
    
}



/***

Move path j of layer i in the (x,y) direction.

***/

function transformPathXY(i, j, x, y) {
    transformPathX(i, j, x);
    transformPathY(i, j, y);
}

function transformPath(a,x,y) {
    
    for(var m = 0; m < a.verts.length; m++) {
        a.verts[m].x += x;
        a.verts[m].y += y;
    }
    
    return a;
}

function transformObj(object,vx,vy) {

    if(object.shape === "polygon") {
        transformPath(object,vx,vy);
    }

    if(object.shape === "circle" || object.shape === "regPolygon" || object.shape === "rectangle") {
        object.x += vx;
        object.y += vy;
    }

    if(object.shape === "composite") {
        for(var i = 0; i < object.objUniverse.length; i++) {
            transformObj(object.objUniverse[i],vx,vy)
        }
    }

}

/*** Move Path to Origin  ***/

function transformToOrigin(path) {
    var cent = PhSim.Centroid.polygon(path);
    transformPath(path,-cent.x,-cent.y);
    return path;
}

/*** Move Path to point (x,y) ***/

function transformToPoint(path,x,y) {
    transformToOrigin(path);
    transformPath(x,y);
    return path;
}


/*** Rotate Object around Centroid by angle ***/

function rotateAroundCentroid(a,angle) {
		
    var cent = PhSim.Centroid.polygon(a);
    
    // Transform all points to origin point of canvas
    
    transformPath(a,-cent.x,-cent.y);
    
    for(var i = 0; i < a.verts.length; i++) {
        var k = rotateAroundO(a.verts[i].x, a.verts[i].y,angle);
        a.verts[i].x = k.x;
        a.verts[i].y = k.y;
    }
    
    // Transform all points to centroid point of path
    
    transformPath(a,cent.x,cent.y);
    
    return a;
}

;// CONCATENATED MODULE: ./src/unitCircle.js
// Get unit vector representing angle

function getUnitCircleVector(radians) {
    var x = Math.cos(radians);
    var y = Math.sin(radians);

    return new PhSim.Vector(x,y);
}

function getAngleVector(radians,length) {
    var vector = getUnitCircleVector(radians);

    vector.x = vector.x * length;
    vector.y = vector.y * length;

    return vector;
}
;// CONCATENATED MODULE: ./src/multiSelect.js















function changeIndexes(simulation,action) {
    for(var i = 0; i < simulation.layers.length; i++) {

        var layer = simulation.layers[i];
            
        var oldLayerObjUniverse = [...layer.objUniverse];

        action();

        for(var k = 0; k < simulation.widgets.length; k++) {
            var widget = simulation.widgets[k];
            
            if(widget.objectA) {
                if(widget.objectA.L === i) {
                    widget.objectA.O = layer.objUniverse.indexOf(oldLayerObjUniverse[widget.objectA.O]);
                }
            }

            if(widget.objectB) {
                if(widget.objectB.L === i) {
                    widget.objectB.O = layer.objUniverse.indexOf(oldLayerObjUniverse[widget.objectB.O]);
                }
            }

        }

    }
}

// Multiple Selection

function SubjectElement(S,L,O) {
    this.s = s;
    this.l = l;
    this.o = o;
    this.simulation = sim.simulations[S];
    this.layer = sim.simulations[S].layers[L];
    this.object = sim.simulations[S].layers[L].objUniverse[O];
}

function retrieveCircumPoint(object) {

    if(object.shape === "circle" || object.shape === "regPolygon") {
        var z = getUnitCircleVector(object.cycle);

        z.x = z.x * object.radius;
        z.y = z.y * object.radius;

        z.x += object.x;
        z.y += object.y;

        

        return z;
    }

    if(object.shape === "rectangle") {

        var c = PhSim.Centroid.rectangle(object);
        var z = getUnitCircleVector(object.cycle);
        z = PhSim.Vector.scale(z,object.w * 0.5);
        z = PhSim.Vector.add(z,c);

        return z;

    }

    else {
        console.log("Object not supported");
    }
    
}

function pointInSpecialPoint(object,x,y) {
    var specialPoint = retrieveCircumPoint(object);
    var dist = calc_vert_distance(x,y,specialPoint.x,specialPoint.y);

    if(dist < session_getSelectionRadius()) {
        return true;
    }

    else {
        return false;
    }

}

var multiSelect_multiSelect = {

    transformAll: function(dx,dy) {
        for(var i = 0; i < this.selectedObjects.length; i++) {
            transformObj(this.selectedObjects[i],dx,dy);
        }
    },

    selectAll: function() {
        var array1 = [];
        var array2 = [];

        for(var L = 0; L < shortcuts_getSelectedSimulation().layers.length; L++) {

            for(var i = 0; i < shortcuts_getSelectedSimulation().layers[L].objUniverse.length; i++) {
                array1.push({"L": L, "O": i});
                array2.push(SLO(session_session.simulationI,L,i));
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

        }

        multiSelect_multiSelect.subjectIndexes = array1;
        multiSelect_multiSelect.selectedObjects = array2;
    },

    moveToTop: function() {

        changeIndexes(shortcuts_getSelectedSimulation(),function(){

            var a = [];

            for(let i = multiSelect_multiSelect.subjectIndexes.length - 1; i > -1 ; i--) {
                
                var o = multiSelect_multiSelect.subjectIndexes[i];
                a.push(shortcuts_getSelectedSimulation().layers[o.L].objUniverse.splice(o.O,1)[0]);

            }

            a.reverse();

            for(let i = 0; i < a.length; i++) {
                shortcuts_getSelectedSimulation().layers[shortcuts_getSelectedSimulation().layers.length -1].objUniverse.push(a[i]);
            }
    
        });

        multiSelect_multiSelect.deselect();

        src_render_static();
    },

    deleteAll: function() {

        changeIndexes(shortcuts_getSelectedSimulation(),function(){
            //multiSelect.forAll(function(obj){

                for(var i = multiSelect_multiSelect.subjectIndexes.length - 1; i > -1 ; i--) {
                    
                    var o = multiSelect_multiSelect.subjectIndexes[i];
                    shortcuts_getSelectedSimulation().layers[o.L].objUniverse.splice(o.O,1);

                }

            //});
        });

        multiSelect_multiSelect.deselect();

        src_render_static();

    },


    preceedingLayerIndexes: function(l,o) {

        var a = [];

        multiSelect_multiSelect.forAllIndexes(function(b){
            if(b.L === l && b.O < o) {
                a.push(b);
            }
        })

        return a;

    },

    forAll: function(func) {
        for(var i = 0; i < this.selectedObjects.length; i++) {
            func.call(this,this.selectedObjects[i],i);
        }
    },

    forAllIndexes: function(func) {
        for(var i = 0; i < this.subjectIndexes.length; i++) {
            func(this.subjectIndexes[i]);
        }
    },

    mouseTransform: {

        specialPoint: false,
        vertActive: false,
        vertex: null,
        moved: false,

        firstObj: {
            centroidInital: null,
            centroidFinal: null
        },

        unlockedDynObjects: [],

        recordState: function() {
            
            var newState = new CompositeState();

            for(var i = 0; i < multiSelect_multiSelect.selectedObjects.length; i++) {

                var o = multiSelect_multiSelect.selectedObjects[i];
                
                if(o.shape === "polygon") {

                    for(var j = 0; j < o.verts[j].length; j++) {
                        var v = o.verts[j];
                        newState.states.push(new AtomicState(v,"x"),new AtomicState(v,"y"));
                    }
                }

                else {
                    newState.states.push(new AtomicState(o,"x"),new AtomicState(o,"y"));
                }

            };

            return newState;

        },

        active: false

    },

    selected: false,

    // Store indexs of subject.
    // For example, the object i in simulation j would be multiSelect.subjectIndexes[i][j]

    subjectIndexes: [],

    selectedObjects: [],

    followMeRect: null,

    recordStateForAll: function(key) {

        if(this.selectedObjects.length > 0) {

            var compositeState = new CompositeState();

            this.forAll(function(obj){
                compositeState.states.push(new AtomicState(obj,key));
            });

        }

    },

    rectangle: {

        x: null,
        y: null,
        w: null,
        h: null,

        enabled: true,

        /**
         * Checks if point is inside selection rectangle
         * @param {Number} x 
         * @param {Number} y 
         */

        isInteriorPoint: function(x,y) {

            var c = document.createElement("canvas");
            var ctx = c.getContext("2d");
            ctx.rect(this.x,this.y,this.w,this.h);
            return ctx.isPointInPath(x,y);

            if(this.x < x && x < this.x + this.w && this.y < y && y < this.y + this.h) {
                return true;
            }

            else {
                return false;
            }

            
        },

        /**
         * Checks if the object o is within the rectangle
         * @param {object} o 
         */

        isNeighborhood: function(o) {

            if(o.shape === "polygon") {
                for(let i = 0; i < o.verts.length; i++) {
                    if(!this.isInteriorPoint(o.verts[i].x,o.verts[i].y)) {
                        return false;
                    }
                }

                return true;
            }

            else {
                let boundingRect = PhSim.BoundingBox.fromShape(o);
                return this.isInteriorPoint(boundingRect.x,boundingRect.y) && this.isInteriorPoint(boundingRect.x + boundingRect.w,boundingRect.y + boundingRect.h);
            }

        },

        getObjects: {
            layer: function() {
    
                var array1 = [];
                var array2 = [];
    
                for(var L = 0; L < shortcuts_getSelectedSimulation().layers.length; L++) {
    
                    for(var i = 0; i < shortcuts_getSelectedSimulation().layers[L].objUniverse.length; i++) {
    
                        let o = SLO(session_session.simulationI,L,i);
                        let cond = multiSelect_multiSelect.rectangle.isNeighborhood(o);
                        
                        if(cond) {
                            array1.push({"L": L, "O": i});
                            array2.push(o);
                        }

                    }
    
                }
    
                multiSelect_multiSelect.subjectIndexes = array1;
                multiSelect_multiSelect.selectedObjects = array2;

                return array2;
    
            },
    
        },
    },

    onmousedown: function() {

        if(multiSelect_multiSelect.selectedObjects.length) {

            multiSelect_multiSelect.mouseTransform.active = true;
            multiSelect_multiSelect.mouseTransform.firstObj.centroidInital = PhSim.Centroid.shape(multiSelect_multiSelect.selectedObjects[0]);
        
            if(src_dynSimEdit.phSim) {
                multiSelect_multiSelect.forAll(function(o){

                    var d = src_dynSimEdit.map.get(o);

                    if(!d.matter.isStatic) {
                        multiSelect_multiSelect.mouseTransform.unlockedDynObjects.push(d);
                        Matter.Body.setStatic(d.matter,true);
                    }

                });
            }
        
        }

        else {
            
            multiSelect_multiSelect.rectangle.x = getmouse_getMouseX();
            multiSelect_multiSelect.rectangle.y = getmouse_getMouseY();

        }

        window.addEventListener("mouseup",multiSelect_multiSelect.onmouseup);
        window.addEventListener("mousemove",multiSelect_multiSelect.onmousemove);

    },

    /**
     * 
     * @param {MouseEvent} event 
     * @returns 
     */

    onmousemove: function(event) {

        if(multiSelect_multiSelect.mouseTransform.active) {

            if(multiSelect_multiSelect.selectedObjects.length === 1) {

                let obj = multiSelect_multiSelect.selectedObjects[0];

                if(obj.shape === "polygon") {
        
                    if(multiSelect_multiSelect.mouseTransform.vertActive === true || vertices_getVertsByCircleAndObj(obj,session_getSelectionRadius(),getmouse_getMouseX(),getmouse_getMouseY()).length > 0) {
    
                        if(!multiSelect_multiSelect.mouseTransform.vertex) {
                            multiSelect_multiSelect.mouseTransform.vertex = vertices_getVertsByCircleAndObj(obj,session_getSelectionRadius(),getmouse_getMouseX(),getmouse_getMouseY())[0];
                        }
    
                        multiSelect_multiSelect.mouseTransform.vertex.x = getmouse_getMouseX();
                        multiSelect_multiSelect.mouseTransform.vertex.y =  getmouse_getMouseY();
    
                        src_render_static();
    
                        multiSelect_multiSelect.mouseTransform.vertActive = true;
    
                        return null;
                    }
            
                    else {
                        if(!multiSelect_multiSelect.mouseTransform.vertActive) {
                            transformPath(obj,event.movementX / src_box.scaleFactor, event.movementY / src_box.scaleFactor)
                            src_render_static();
                        }
                        return null;
                    }
                }
            
                if( (obj.shape === "circle" || obj.shape === "regPolygon" || obj.shape === "rectangle") ) {
            
                    if(pointInSpecialPoint(obj,getmouse_getMouseX(),getmouse_getMouseY()) || multiSelect_multiSelect.mouseTransform.specialPoint) {
                        changeSpecialPoint(obj,getmouse_getMouseX(),getmouse_getMouseY());
                        src_render_static();
                        multiSelect_multiSelect.mouseTransform.specialPoint = true;
                        return null;
                    }
            
                    else {
                        obj.x += event.movementX / src_box.scaleFactor;
                        obj.y += event.movementY / src_box.scaleFactor;
                    }
    
                }
            
                if(obj.shape === "composite") {
                    
                    for(var i = 0; i < obj.parts.length; i++) {
                        //transformObjByMouse.main(obj.objUniverse[i]);
                        transformObj(obj.parts[i],getmouse_getMouseX() - getmouse_mousePrev.x ,getmouse_getMouseY() - getmouse_mousePrev.y)
                        src_render_static();
                    }
    
                }

                multiSelect_multiSelect.mouseTransform.singularMain(mouseObject_sObj());
            }

            if(multiSelect_multiSelect.selectedObjects.length > 1) {
                multiSelect_multiSelect.transformAll(event.movementX / src_box.scaleFactor,event.movementY / src_box.scaleFactor);
            }

            if(multiSelect_multiSelect.selectedObjects.length && src_dynSimEdit.phSim) {
                multiSelect_multiSelect.forAll(function(o){
                    src_dynSimEdit.phSim.translate(src_dynSimEdit.map.get(o),{
                        "x": event.movementX,
                        "y": event.movementY
                    });
                });
            }

            src_render_static();

        }

        else {

            multiSelect_multiSelect.rectangle.w = getmouse_getMouseX() - multiSelect_multiSelect.rectangle.x;
            multiSelect_multiSelect.rectangle.h = getmouse_getMouseY() - multiSelect_multiSelect.rectangle.y;
    
            multiSelect_multiSelect.rectangle.getObjects.layer()

            src_render_static();
    
            if(multiSelect_multiSelect.rectangle.w && multiSelect_multiSelect.rectangle.h) {
                elements_ctx.lineWidth = 1;
                elements_ctx.beginPath();
                elements_ctx.rect(multiSelect_multiSelect.rectangle.x,multiSelect_multiSelect.rectangle.y,multiSelect_multiSelect.rectangle.w,multiSelect_multiSelect.rectangle.h);
                elements_ctx.closePath();
                elements_ctx.stroke();

                elements_ctx.globalAlpha = 0.3;
                elements_ctx.fill();
                elements_ctx.globalAlpha = 1;

            }

        }

    },

    onmouseup: function() {

        window.removeEventListener("mousemove",multiSelect_multiSelect.onmousemove);
        window.removeEventListener("mouseup",multiSelect_multiSelect.onmouseup);

        if(multiSelect_multiSelect.mouseTransform.active) {
            multiSelect_multiSelect.mouseTransform.active = false;
            multiSelect_multiSelect.mouseTransform.specialPoint = false;
            multiSelect_multiSelect.mouseTransform.vertActive = false;
            multiSelect_multiSelect.mouseTransform.vertex = null;
        
            if(src_dynSimEdit.phSim) {
                for(b of multiSelect_multiSelect.mouseTransform.unlockedDynObjects) {
                    Matter.Body.setStatic(b.matter,false);
                }
            }
    
            multiSelect_multiSelect.mouseTransform.unlockedDynObjects = [];
        }

        src_render_static();
    },

    onshiftkeydown: function(e) {
        if(e.key === "Shift") {
            elements_elm.addEventListener("click",multiSelect_multiSelect.addbymouse);
            src_render_static();
        }
    },

    onshiftkeyup: function(e) {
        if(e.key === "Shift") {
            elements_elm.removeEventListener("click",multiSelect_multiSelect.addbymouse);
            src_render_static();
        }
    },

    ondblclick: function() {

        if(multiSelect_multiSelect.selectedObjects.length) {
            multiSelect_multiSelect.deselect();
        }

        else {
            multiSelect_multiSelect.addbymouse();
        }

        src_render_static();
    },

    /**
     * 
     * Add object by mouse if not included in array.
     * 
     */

    addbymouse: function() {
        if(mouseObject_mouseObject.mObj && !multiSelect_multiSelect.selectedObjects.includes(mouseObject_mouseObject.mObj)) {
            multiSelect_multiSelect.subjectIndexes.push({"L": mouseObject_mouseObject.gLayer, "O": mouseObject_mouseObject.gObject});
            multiSelect_multiSelect.selectedObjects.push(mouseObject_mouseObject.mObj);
        }
    },



    deselect: function() {
        multiSelect_multiSelect.subjectIndexes = [];
        multiSelect_multiSelect.selectedObjects = [];
        //multiSelect.rectangle.enabled = true;
    }

}

elements_elm.addEventListener("mousedown",multiSelect_multiSelect.onmousedown);

elements_elm.addEventListener("dblclick",multiSelect_multiSelect.ondblclick);

window.addEventListener("keydown",multiSelect_multiSelect.onshiftkeydown);
window.addEventListener("keyup",multiSelect_multiSelect.onshiftkeyup);

window.multiSelect = multiSelect_multiSelect;

/* harmony default export */ const src_multiSelect = (multiSelect_multiSelect);
;// CONCATENATED MODULE: ./src/navigation.js




/* 

Zoom in and out Functions and navigation functions 
These are glitchy, so they are disabled until further notice

*/

function zoomIn() {

    /* 

    Untranslate canvas, to make sure that the scaling does not happen 
    while the rendering is translated.
    Otherwise, a glitch happens.

    */

    elements_ctx.translate(-src_box.offsetX,-src_box.offsetY); 

    elements_ctx.scale(src_box.zoomFactor,src_box.zoomFactor);

    src_box.recordPrev();

    src_box.scaleFactor = src_box.scaleFactor * src_box.zoomFactor;

    elements_ctx.translate(src_box.offsetX,src_box.offsetY); // Restore translation

    //render_static();
}

function zoomOut() {


    /* 

    Untranslate canvas, to make sure that the scaling does not happen 
    while the rendering is translated.
    Otherwise, a glitch happens.

    */

    elements_ctx.translate(-src_box.offsetX,-src_box.offsetY);

    elements_ctx.scale(1/src_box.zoomFactor,1/src_box.zoomFactor);

    src_box.recordPrev();

    src_box.scaleFactor = src_box.scaleFactor / src_box.zoomFactor;

    elements_ctx.translate(src_box.offsetX,src_box.offsetY); // Restore translation

    //render_static();
}

function up() {

    //ctx.scale(1/scaleFactor,1/scaleFactor);

    src_box.recordPrev();

    elements_ctx.translate(0,src_box.delta);
    src_box.offsetY = src_box.offsetY + src_box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

function down() {

    src_box.recordPrev();

    //ctx.scale(1/scaleFactor,1/scaleFactor);

    elements_ctx.translate(0,-src_box.delta);
    src_box.offsetY = src_box.offsetY - src_box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

function left() {

    src_box.recordPrev();

    //ctx.scale(1/scaleFactor,1/scaleFactor);

    elements_ctx.translate(-src_box.delta,0);
    src_box.offsetX = src_box.offsetX - src_box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

function right() {

    src_box.recordPrev();

    //ctx.scale(1/box.scaleFactor,1/box.scaleFactor);

    elements_ctx.translate(src_box.delta,0);
    src_box.offsetX = src_box.offsetX + src_box.delta;

    //ctx.scale(box.scaleFactor,box.scaleFactor);

    //render_static();
}

function transform(x,y) {

    var prevDelta = src_box.delta;

    src_box.delta = 1;

    if(x > 0) {
        for(var i = 0; i < x; i++) {
            right();
        }
    }

    else {
        for(var i = 0; i < Math.abs(x); i++) {
            left();
        }
    }

    if(y > 0) {

        for(var i = 0; i < y; i++) {
            up();
        }

    }

    else {
        for(var i = 0; i < Math.abs(y); i++) {
            down();
        }
    }

    src_box.delta = prevDelta;

}

function transformAndZoom(x,y) {
    zoomIn();
    transform(x,y);
}

function zoomIntoMouse() {

    var preMX = getmouse_getMouseX();
    var preMY = getmouse_getMouseY();

    zoomIn();

    var postMX = getmouse_getMouseX();
    var postMY = getmouse_getMouseY();

    var vecX = postMX - preMX;
    var vecY = postMY - preMY;

    transform(vecX,vecY);
}

function zoomOutofMouse() {

    var preMX = getmouse_getMouseX();
    var preMY = getmouse_getMouseY();

    zoomOut();

    var postMX = getmouse_getMouseX();
    var postMY = getmouse_getMouseY();

    var vecX = postMX - preMX;
    var vecY = postMY - preMY;

    transform(vecX,vecY);

}
;// CONCATENATED MODULE: ./src/keyinputs.js







window.addEventListener('keydown', function(e) {
    if(e.key === "+" && !objectEditor.instance && !src_simTest.dynSim) {
        zoomIntoMouse();
        src_render_static();
    }

    if(e.key === "-" && !objectEditor.instance && !src_simTest.dynSim) {
        zoomOutofMouse();
        src_render_static();
    }

    if(e.key === "ArrowRight") {
        
        if(!objectEditor.instance && !src_simTest.dynSim && src_multiSelect.selectedObjects.length === 0) {
            right();
            src_render_static();
        }

        if(src_multiSelect.selectedObjects.length > 0) {
            src_multiSelect.transformAll(1,0);
            src_render_static();
        }

    }	

    if(e.key === "ArrowLeft") {

        if(!objectEditor.instance && !src_simTest.dynSim && src_multiSelect.selectedObjects.length === 0) {
            left();
            src_render_static();
        }

        if(src_multiSelect.selectedObjects.length > 0) {
            src_multiSelect.transformAll(-1,0);
            src_render_static();
        }
    }

    if(e.key === "ArrowUp") {

        if(!objectEditor.instance && !src_simTest.dynSim && src_multiSelect.selectedObjects.length === 0) {
            up();
            src_render_static();
        }

        if(src_multiSelect.selectedObjects.length > 0) {
            src_multiSelect.transformAll(0,-1);
            src_render_static();
        }

    }

    if(e.key === "ArrowDown") {

        if(!objectEditor.instance && !src_simTest.dynSim && src_multiSelect.selectedObjects.length === 0) {
            down();
            src_render_static();
        }

        if(src_multiSelect.selectedObjects.length > 0) {
            src_multiSelect.transformAll(0,1);
            src_render_static();
        }

    }
});

elements_elm.addEventListener("wheel", function(e) {
    if(e.deltaY < 0) {
        zoomIntoMouse();
        src_render_static();
        return null;
    }

    if(e.deltaY > 0) {
        zoomOutofMouse();
        src_render_static();
        return null;
    }
});
;// CONCATENATED MODULE: ./src/getArrayCentroid.js
function getArrCentroid(array) {

    var a = [];

    var s = {
        "x": 0,
        "y": 0
    };

    for(var i = 0; i < array.length; i++) {
        a.push(PhSim.Centroid.shape(array[i]));
    }

    for(var i = 0; i < a.length; i++) {
        s.x = s.x + a[i].x;
        s.y = s.y + a[i].y;
    }

    s.x = s.x / a.length;
    s.y = s.y / a.length;

    return s;
}

/* harmony default export */ const getArrayCentroid = (getArrCentroid);
;// CONCATENATED MODULE: ./src/clipboard.js







var Clipboard = {
    array: [],
    transformAll: function(dx,dy) {
        for(var i = 0; i < this.array.length; i++) {
            transformObj(this.array[i],dx,dy);
        }
    },
    copy: function() {

        this.array = [];

        if(src_multiSelect.selectedObjects.length > 0) {
            for(var i = 0; i < src_multiSelect.selectedObjects.length; i++) {
                this.array.push( JSON.parse(JSON.stringify(src_multiSelect.selectedObjects[i])) );
            }
        }

    },

    cut: function() {
        Clipboard.copy();
        src_multiSelect.deleteAll();
        src_multiSelect.deselect();
    },

    paste: function() {

        var a = [];

        for(var i = 0; i < this.array.length; i++) {
            var o = JSON.parse(JSON.stringify(this.array[i]));
            a.push(o);
            SL(session_session.simulationI,session_session.selectedLayerI).objUniverse.push(o)
            //o.parentObj = SL(session.simulationI,selectedLayerI).objUniverse;
        }

        return a;

    },

    paste_from_menu: function() {

        if(Clipboard.array.length > 0) {
                
            var c = getArrayCentroid(Clipboard.array);
            Clipboard.transformAll(-c.x,-c.y);
            Clipboard.transformAll(getmouse_mousePrev.x,getmouse_mousePrev.y);

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

/* harmony default export */ const clipboard = (Clipboard);
;// CONCATENATED MODULE: ./src/getObjectByMouse.js







function isPointInObject(arg) {

    var x = arg.x;
    var y = arg.y;
    var l = arg.layerIndex;
    var o = arg.objectIndex;

    var a = null;

    if(Number.isInteger(l) && Number.isInteger(o)) {
        a = shortcuts_LO(l,o);
    }

    if(arg.object) {
        a = arg.object;
    }

    var localCanvas = document.createElement("canvas");
    var localCtx = localCanvas.getContext("2d");
    
    if(a.shape === "polygon") {
            
        localCtx.beginPath();
        localCtx.moveTo(a.verts[0].x, a.verts[0].y);
        
        for(var j = 0; j < a.verts.length; j++) {
            localCtx.lineTo(a.verts[j].x , a.verts[j].y);
        }
        
        var vrlo = false;

        if(Number.isInteger(l) && Number.isInteger(o)) {
            vrlo = vertRangeLO(l,o);
        }

        if(localCtx.isPointInPath(x,y) || vrlo) {
            return true;		
        }

        localCtx.fill();
        localCtx.closePath();
        
        localCtx.stroke();

        return false;
    
    }
    
    if(a.shape === "circle") {
        
        localCtx.beginPath();
    
        localCtx.arc(a.x, a.y, a.radius, 0, 2*Math.PI);
    
        if(localCtx.isPointInPath(x,y)) {
            return true;
        }

        localCtx.fill();
        localCtx.stroke();
            
        return false;
    }

    if(a.shape === "rectangle") {

        var ePoints = src_rectangleEditor.getEditPointByPoint(a,x,y);

        if(PhSim.Query.pointInRectangle(a,x,y) || ePoints) {
            return true;
        }

        else {
            return false;
        }

    }

    if(a.shape === "regPolygon") {

        var vertSet = PhSim.Vertices.regPolygon(a);
    
        localCtx.moveTo(vertSet[0].x, vertSet[0].y);
    
        for(var j = 0; j < vertSet.length; j++) {
        localCtx.lineTo(vertSet[j].x, vertSet[j].y);
        }

        if(localCtx.isPointInPath(x,y)) {
            return true;
        }

        localCtx.closePath();
        localCtx.stroke();
        localCtx.fill();

        return false;
    }

    if(a.shape === "composite") {

        var b = false;

        for(var i = 0; i < a.parts.length && !b; i++) {
            b = isPointInObject({
                x: arg.x,
                y: arg.y,
                object: a.parts[i]
            })
        }

        return b;

    }

    return null;

}

function getObjectByMouse() {

    for(var i = shortcuts_getSelectedSimulation().layers.length - 1; i >=0 ; i--) {
        if(shortcuts_getSelectedSimulation().layers[i].objUniverse) {
            for(var j = shortcuts_getSelectedSimulation().layers[i].objUniverse.length - 1; j >= 0 ; j--) {

                var a = isPointInObject({
                    layerIndex: i,
                    objectIndex: j,
                    x: getmouse_getMouseX(),
                    y: getmouse_getMouseY()
                })
                
                if(a) {
                    mouseObject_mouseObject.gLayer = i;
                    mouseObject_mouseObject.gObject = j;
                    mouseObject_mouseObject.cond = true;
                    mouseObject_mouseObject.mObj = shortcuts_LO(i,j);
                    return true;
                }

                else {
                    mouseObject_mouseObject.gLayer = null;
                    mouseObject_mouseObject.gObject = null;
                    mouseObject_mouseObject.cond = false;
                    mouseObject_mouseObject.mObj = null;
                }

            }
        }

    }

}

// Sees if the mouse is in the range of at least one vertex of the object in layer L and object O.

function vertRangeLO(L,O) {
    
    var k = false;
    
    for(var i = 0; i < shortcuts_getSelectedSimulation().layers[L].objUniverse[O].verts.length; i++) {
        if(mouseWithinVertex(L,O,i) === true) {
            var k = true;
        }
    }
    
    return k;
}

/*** Sees if the mouse is within a certain distance of a vertex, and returns "true" if it happens. ***/

function mouseWithinVertex(L,O,V, radius = session_getSelectionRadius()) {
    
    var r = calc_vert_distance(shortcuts_getSelectedSimulation().layers[L].objUniverse[O].verts[V].x, shortcuts_getSelectedSimulation().layers[L].objUniverse[O].verts[V].y, getmouse_getMouseX(), getmouse_getMouseY());
    
    if(r < radius) {
        return true;
    }
    
    else {
        return false;
    }
    
}

;// CONCATENATED MODULE: ./src/canvasFunctionMouse.js





/********************* Default Event Listeners for canvas ********************/

function canvasFunctionMouse() {
    tracMouse();
    getObjectByMouse();
    document.querySelector('.mousePos').innerHTML = getmouse_getMouseX() + "," + getmouse_getMouseY()
}

session_session.canvasFunctionMouse = canvasFunctionMouse;

elements_elm.addEventListener('mousemove', canvasFunctionMouse);

/* harmony default export */ const src_canvasFunctionMouse = ((/* unused pure expression or super */ null && (canvasFunctionMouse)));
;// CONCATENATED MODULE: ./src/pform.js
function PForm(htmlClass) {
		
    // Main Element
        
    this.elm = document.createElement('div');
    this.elm.className = htmlClass;
    
    // Table
    this.table = document.createElement('table');
    this.table.className = "pFormTable";
    this.elm.appendChild(this.table);
    
    // tBody
    
    this.tBody = document.createElement('tbody');
    this.tBody.className = "pFormTBody";
    this.table.appendChild(this.tBody);
    
}



// Method for adding tabular data input. Returns a closure that returns the HTML Object for the row.

PForm.prototype.addPair = function(arg_label, default_value, arg_type, oninput = function() {},inputClass = "") {
    
var row = document.createElement("tr");
var col_1 = document.createElement('td');
var col_2 = document.createElement('td');
var input = document.createElement('input');
var label = document.createElement('label');

label.innerText = arg_label;
input.type = arg_type;
input.value = default_value;
input.className = inputClass;
input.addEventListener('input', oninput);

col_1.appendChild(label);
col_2.appendChild(input);

row.appendChild(col_1);
row.appendChild(col_2);

this.tBody.appendChild(row);

return row;

};

PForm.prototype.appendTo = function(element) {
element.appendChild(this.elm);
};

/* harmony default export */ const pform = ((/* unused pure expression or super */ null && (PForm)));
;// CONCATENATED MODULE: ./src/rectCalc.js
/*** RectCalc - Used for dealing with rectangles ***/

var RectCalc = function(ctx,x,y,w,h) {

    this.ctx = ctx;

    this.setDimensions(x,y,w,h);

    var this_a = this;

    this.drawFollowMe = true;
    
    this.followMeDiagRect = function() {
        
    }

}

// Setting dimensions of the rectangle

RectCalc.prototype.setDimensions = function (x,y,w,h) {

    this.strokeStyle = "black";
    this.lineWidth = 3;
    this.fillStyle = "gray";

    var thisAlias = this;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.upperLeftCorner = {x: thisAlias.x, y: thisAlias.y};
    this.upperRightCorner = {x: thisAlias.x + thisAlias.w, y: thisAlias.y + thisAlias.h};
    this.lowerLeftCorner = {x: thisAlias.x, y: thisAlias.y + thisAlias.h};
    this.upperLeftCornder = {x: thisAlias.x + thisAlias.w, y: thisAlias.y};
    this.centroid = {x: 0.5 * thisAlias.w,  y: 0.5 * thisAlias.h};

    this.objUpdate();
}

// Draw the rectangle.

RectCalc.prototype.beforeDraw = function() {}
RectCalc.prototype.afterDraw = function() {}

RectCalc.draw = function(rectangleCalc,ctxArg) {
    this.beforeDraw()


    this.ctx.strokeStyle = rectangleCalc.strokeStyle;
    this.ctx.lineWidth = rectangleCalc.lineWidth;
    this.ctx.fillStyle = rectangleCalc.fillStyle;

    this.ctx.rotate(this.cycle)
    this.ctx.beginPath();
    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.stroke();

    this.afterDraw();
}

RectCalc.prototype.draw = function() {

    this.beforeDraw()

    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.fillStyle = this.fillStyle;

    this.ctx.beginPath();
    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.stroke();
    this.ctx.fill();

    this.afterDraw();
}

// Set the rectangle's dimension using a line such that the two ends of the line form a diagonal from the upper left corner to the lower right corner.

RectCalc.prototype.setByDiag = function (a,b,c,d) {
    
    var w = c-a;
    var h = d-b;

    this.setDimensions(a,b,w,h);

}

RectCalc.prototype.beforeUpdate = function() {}
RectCalc.prototype.afterUpdate = function() {}

RectCalc.prototype.objUpdate = function() {

    this.beforeUpdate();

    this.obj = new PhSim.Static.Rectangle(this.x,this.y,this.w,this.h);

    this.obj.strokeStyle = this.strokeStyle
    this.obj.lineWidth = this.lineWidth
    this.obj.fillStyle = this.fillStyle

    this.afterUpdate();

}

RectCalc.prototype.addToLayer = function(layer) {
    layer.objUniverse.push(this.obj);
}

/**
 * 
 * Check if a point is in a path, utilizing the JavaScript canvas API.
 * 
 * @function isPointInPath
 * @param {Number} x - The x-coordinate of the point.
 * @param {Number} y - The y-coordinate of the point.
 */

RectCalc.prototype.isPointInPath = function(x,y) {

    var v_canvas = document.createElement("canvas");
    var v_ctx = v_canvas.getContext("2d");

    var c = PhSim.Centroid.rectangle(this);

    v_ctx.translate(c.x,c.y);
    v_ctx.rotate(this.cycle);
    v_ctx.beginPath();
    v_ctx.rect(-this.w / 2,-this.h / 2,this.w,this.h);
    var z = v_ctx.isPointInPath(x,y);
    v_ctx.stroke();

    return z;

}

/**
 * 
 * Check if a point (px,py) is in the rectangle, not utulizing the HTML canvas.
 * 
 * @function isPointInRaw
 * @param {Number} px - The x-coordinate of the point.
 * @param {Number} py - The y-coordinate of the point.
 */

RectCalc.prototype.isPointInRaw = function(px,py) {
    
    var cond = (this.obj.x < px) && (px < this.obj.x + this.obj.w) && (this.obj.y < py) && (py < this.obj.y + this.obj.h) 

    if(cond) {
        return true;
    }

    else {
        return false;
    }
}

RectCalc.prototype.isObjectInRectangleRaw = function(object) {

        var cond = true;
        
        if(object.shape === "polygon") {
            for(i = 0; i < object.verts.length; i++) {
                if(this.isPointInRaw(object.verts[i].x,object.verts[i].y)) {
                    cond = cond && false;
                }
            }
        }

        if(object.shape === "rectangle") {
            return this.isPointInRaw(object.x,object.y) && this.isPointInRaw(object.x + object.w,object.y + object.h);
        }

        // Reverse the conditional, 
        // because the loop checks for the existence of a point that is not in 

        cond = !cond;

        return cond;

}

/**
 * @function isObjectInRectangle
 * @param {Object} object - Static object to be checked.
 */

RectCalc.prototype.isObjectInRectangle = function(object) {
        
        if(object.shape === "polygon") {

            for(var i = 0; i < object.verts.length; i++) {
                if(!this.isPointInPath(object.verts[i].x,object.verts[i].y)) {
                    return false;
                }
            }

            return true
        }

        if(object.shape === "rectangle") {
            return this.isPointInPath(object.x,object.y) && this.isPointInPath(object.x + object.w,object.y + object.h);
        }

        if(object.shape === "circle" || object.shape === "regPolygon") {
            var boundingRect = PhSim.BoundingBox.fromShape(object);
            return this.isPointInPath(boundingRect.x,boundingRect.y) && this.isPointInPath(boundingRect.x + boundingRect.w,boundingRect.y + boundingRect.h);

        }

}

/* harmony default export */ const rectCalc = (RectCalc);
;// CONCATENATED MODULE: ./src/constraintAdder.js






function ConstraintAdder() {
    ConstraintAdder.ref = this;
    this.objectA = null;
    this.objectB = null;
    this.pointA = null;
    this.pointB = null;
    this.first = false;
    this.second = false;
    this.activate();
}

ConstraintAdder.prototype.pointSelected = false;

ConstraintAdder.prototype.onmouseclick = function() {

    if(this.first === false) {

        if(mouseObject_mouseObject.cond) {

            var lo = {
                L: mouseObject_mouseObject.gLayer,
                O: mouseObject_mouseObject.gObject
            }

            this.objectA = lo;
        }

        this.pointA = getmouse_getMouse();

        document.querySelector("#msg").innerHTML = "Now, select another object or point"

        this.first = true;

        return 0;
    }

    if(this.second === false) {

        var lo = {
            L: mouseObject_mouseObject.gLayer,
            O: mouseObject_mouseObject.gObject
        }

        if(mouseObject_mouseObject.cond) {
            this.objectB = lo;
        }


        this.pointB = getmouse_getMouse();

        var m = new PhSim.Constraints.Static.Constraint();
        m.pointA = this.pointA;
        m.pointB = this.pointB;
        m.objectA = this.objectA;
        m.objectB = this.objectB;

        shortcuts_getSelectedSimulation().widgets = shortcuts_getSelectedSimulation().widgets || [];

        shortcuts_getSelectedSimulation().widgets.push(m)

        this.second = true;

        elements_elm.removeEventListener("click",this.func);
        ConstraintAdder.ref = null;

        return 0;

    }

}

ConstraintAdder.prototype.activate = function() {
    this.func = this.onmouseclick.bind(this);
    elements_elm.addEventListener("click",this.func);
    document.querySelector("#msg").innerHTML = "First, select an object or point";
}

ConstraintAdder.prototype.deactivate = function() {
    elements_elm.removeEventListener("click",this.onmouseclick);
    ConstraintAdder.ref = null;
}

ConstraintAdder.ref = null;

shapewin.addConstraint.addEventListener('click',function() {
    var a = new ConstraintAdder();
});
;// CONCATENATED MODULE: ./src/rectangleCreator.js










/***

Rectangle Creator
Used for creating and loading rectangles.

**/

var rectangleCreatorObj = {
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

function rectangleCreator() {

    if(rectangleCreatorObj.lowerCornerSelected === false) {

        rectangleCreatorObj.x = getmouse_getMouseX();
        rectangleCreatorObj.y = getmouse_getMouseY();

        rectangleCreatorObj.lowerCornerSelected = true;

        rectangleCreatorObj.rectangle = new rectCalc(elements_ctx,rectangleCreatorObj.x,rectangleCreatorObj.y,10,10);

        rectangleCreatorObj.followMeRect = new followMeRect(rectangleCreatorObj.rectangle);
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

        rectangleCreatorObj.rectangle.addToLayer(SL(session_session.simulationI,session_session.selectedLayerI));

        
        if(src_dynSimEdit.phSim) {
            src_dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(rectangleCreatorObj.rectangle.obj));
        }

        src_render_static();

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

        elements_elm.removeEventListener('click', rectangleCreator);

        document.querySelector('#msg').innerHTML = "A new rectangle has been created."

        return rectangleCreatorObj;

    }
}

function rectangleCreatorEvent() {

    if(rectangleCreatorObj.activated === false) {
        elements_elm.addEventListener('click', rectangleCreator);
        rectangleCreatorObj.activated = true;
        document.querySelector('#msg').innerHTML = "First, click on a point to define the upper left corner of the rectangle."
        return rectangleCreatorObj;
    }

    if(rectangleCreatorObj.activated === true) {
        elements_elm.removeEventListener('click', rectangleCreator);
        rectangleCreatorObj.activated = false;
        return rectangleCreatorObj;
    }
}

shapewin.addRect.addEventListener('click',rectangleCreatorEvent);

document.querySelector(".addRectangle.button-2").addEventListener('click',rectangleCreatorEvent);

session_session.actions.createShape.rectangle = rectangleCreatorEvent;
;// CONCATENATED MODULE: ./src/circleCreator.js









var verts = [];

/*** Creates a circle whose center is (x,y) and radius is equal to the Euclidean distance between (x,y) and the cursor. ***/

function followMeCircle(x,y, drawRadius = true, drawCenter = true, drawPointInCircle = true, lineWidth = 1, padding = 3, strokeStyle = "red") {
    
    elements_ctx.lineWidth = lineWidth;
    elements_ctx.strokeStyle = strokeStyle;
    
    elements_ctx.beginPath();
    elements_ctx.arc(x,y, calc_vert_distance(getmouse_getMouseX(), getmouse_getMouseY(), x , y),0, 2*Math.PI );
    elements_ctx.fill();
    elements_ctx.stroke();
    
    if(drawRadius) {
        elements_ctx.beginPath();
        elements_ctx.moveTo(x,y);
        elements_ctx.lineTo(getmouse_getMouseX(), getmouse_getMouseY());
        elements_ctx.stroke();
    }
    
    if(drawCenter) {
        elements_ctx.beginPath();
        elements_ctx.arc(x,y,lineWidth + padding,0,2*Math.PI);
        elements_ctx.fill();
        elements_ctx.stroke();
    }
    
    if(drawPointInCircle) {
        elements_ctx.beginPath();
        elements_ctx.arc(getmouse_getMouseX(),getmouse_getMouseY(),lineWidth + padding,0,2*Math.PI);
        elements_ctx.stroke();
        elements_ctx.fill();
    }
    
}

/*** Circle Creator ***/

function followFromFirstPoint() {
    src_render_static();
    followMeCircle(verts[0].x, verts[0].y);
}

function circleCreator() {
    
    verts.push({x:getmouse_getMouseX(),y:getmouse_getMouseY()});
    
    document.querySelector('#msg').innerHTML = "Point (" + verts[verts.length - 1].x + "," + verts[verts.length - 1].y + ") Selected. Now, click when the mouse is at the desired radius and the circle will be created.";
    

    if(verts[0]) {
        elements_elm.addEventListener('mousemove', followFromFirstPoint);
    }
    
    if(verts[1]) {
        elements_elm.removeEventListener('mousemove', followFromFirstPoint);
        document.querySelector("#msg").innerHTML = "Confirm Circle";
        saveCircle();
    }
    
}

function saveCircle() {
        // Calculate radius
        
        var m = calc_vert_distance(verts[0].x, verts[0].y, verts[1].x, verts[1].y); // Calculate Radius
        var a = Math.atan2( verts[1].y - verts[0].y,verts[1].x - verts[0].x );

        // New Object
        
        var newObject = new PhSim.Static.Circle();
        newObject.x = verts[0].x;
        newObject.y = verts[0].y;
        newObject.radius = m;
        newObject.name = "untitled_(" + shortcuts_getSelectedSimulation().layers.length + ")";

        newObject.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        newObject.lineWidth = document.querySelector(".lineWidth").value;
        newObject.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];

        newObject.cycle = a;
        
        shortcuts_getSelectedSimulation().layers[session_session.selectedLayerI].objUniverse.push(newObject); // Push new object into universe array
                        
        verts =[];
        
        /*** Clear Everything and update canvas with new object ***/
        
        elements_ctx.clearRect(0, 0, elements_elm.width, elements_elm.height);
        src_render_static();
        
        document.querySelector('#msg').innerHTML = "Circle has been created.";
        
        elements_elm.removeEventListener('click', saveCircle); // Removal of saveCircle function from the onclick event listener
        elements_elm.removeEventListener('click', circleCreator); 
        
        /*
        
        Add circle to phsim if the dyn editor is active

        **/ 

        if(src_dynSimEdit.phSim) {
            src_dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(newObject));
        }
        
        circleCreatorActivated = false;
}

var circleCreatorActivated = false;

function toggleCircleCreator() {
    if (circleCreatorActivated === true && verts.length === 2) {
        saveCircle();
    }
    
    else {
        circleCreatorActivated = true;
        document.querySelector('#msg').innerHTML = "Click on a point to select ";
        elements_elm.addEventListener('click', circleCreator);
    }
}

shapewin.addCircleButton.addEventListener('click',toggleCircleCreator);

document.querySelector(".addCircle.button-2").addEventListener('click',toggleCircleCreator);

session_session.actions.createShape.circle = toggleCircleCreator;

;// CONCATENATED MODULE: ./src/insertPointByMouse.js









function insertPointByMouse() {

	var x = getmouse_getMouseX();
	var y = getmouse_getMouseY();

	var line = src_getPath(mouseObject_sObj(),x,y);

	if(line && line.pointA && line.pointB && line.pointA.x && line.pointA.y) {
		
		var a_i = mouseObject_sObj().verts.indexOf(line.pointA);
		var b_i = mouseObject_sObj().verts.indexOf(line.pointB);

		mouseObject_sObj().verts.splice(a_i+1,0,{
			"x": x,
			"y": y
		})
	}

	src_render_static();
}

elements_elm.addEventListener("click",function(){
	if(src_multiSelect.selectedObjects.length === 1 && mouseObject_sObj().shape === "polygon" && vertices_getVertsByCircleAndObj(mouseObject_sObj(),session_getSelectionRadius() ,getmouse_getMouseX(),getmouse_getMouseY()).length === 0) {
		insertPointByMouse();
	}
})

/* harmony default export */ const src_insertPointByMouse = ((/* unused pure expression or super */ null && (insertPointByMouse)));
;// CONCATENATED MODULE: ./src/editElevatorByMouse.js





// Elevator Editor

var editElevatorByMouse = {

    "onmousedown": function() {
        if(mouseObject_mouseObject.elevatorPoint) {
            elements_elm.addEventListener("mousemove",editElevatorByMouse.onmousemove);
            elements_elm.addEventListener("mouseup",editElevatorByMouse.onmouseup);
            editElevatorByMouse.active = true;
            editElevatorByMouse.elevatorPoint = mouseObject_mouseObject.elevatorPoint;
        }
    },

    "onmouseup": function() {
        elements_elm.removeEventListener("mousemove",editElevatorByMouse.onmousemove);
        elements_elm.removeEventListener("mouseup",editElevatorByMouse.onmouseup);
        editElevatorByMouse.elevatorPoint = null;
        editElevatorByMouse.active = false;
    },

    "onmousemove": function() {
        editElevatorByMouse.elevatorPoint.x = getmouse_getMouseX();
        editElevatorByMouse.elevatorPoint.y = getmouse_getMouseY();
        src_render_static();
    },

    "active": false,
    "elevatorPoint": null

}

elements_elm.addEventListener("mousedown",editElevatorByMouse.onmousedown);

/* harmony default export */ const src_editElevatorByMouse = ((/* unused pure expression or super */ null && (editElevatorByMouse)));
;// CONCATENATED MODULE: ./src/ctrlShortcuts.js





var ctrlShortcuts = function(e) {

    if( (e.key === "c" || e.key === "C") && e.ctrlKey) {
        clipboard.copy();		
    }

    if( (e.key === "x" || e.key === "X") && e.ctrlKey ) {
        clipboard.cut();
    }

    if( (e.key === "v" || e.key === "V") && e.ctrlKey) {
        var c = getArrayCentroid(clipboard.array);
        clipboard.transformAll(-c.x,-c.y);
        clipboard.transformAll(mousePrev.x,mousePrev.y);
        clipboard.paste();
        src_render_static();
    }

    if( (e.key === "a" || e.key === "A") && e.ctrlKey ) {
        src_multiSelect.selectAll();
        src_render_static();
        e.preventDefault();
    }

}

window.addEventListener("keydown",ctrlShortcuts);

/* harmony default export */ const src_ctrlShortcuts = ((/* unused pure expression or super */ null && (ctrlShortcuts)));

;// CONCATENATED MODULE: ./src/delete.js






function delete_deletesimulation(i) {
    session.sim.simulations.splice(i,1);	
}

function deleteLayerFromSL(SL,L) {
    session_session.sim.simulations[SL].splice(L,1);
}

function delete_deleteObjectSLO(S,L,O) {
    session_session.sim.simulations[S].layers[L].objUniverse.splice(O,1);
}

function deleteByIndex(S,L,O) {
    session.sim.simulations[S].layers[L].objUniverse.splice(O,1);
}

// Delete Selected Object

function del_sObj() {
    deleteByIndex(session.simulationI,session.selectedLayerI,multiSelect.subjectIndexes[0].O);
    multiSelect.deselect();
}

function gui_del_object(object) {
    new HTMLConfirm("Are you sure you want to delete \"" + object.name + "\"?", del_sObj);
}

function gui_del_sObj() {
    new HTMLConfirm("Are you sure you want to delete \"" + sObj().name + "\"?", del_sObj);
}

window.addEventListener("keydown", function(e) {
    if(e.key === "Delete") {		
        if(src_multiSelect.selectedObjects.length > 0) {
            new src_htmlConfirm("Are you sure you want to delete the selected object(s)?",function(){
                if(mouseObject_mouseObject.cond && src_multiSelect.selectedObjects.length === 0) {
                    delete_deleteObjectSLO(session_session.simulationI,selectedLayerI,mouseObject_mouseObject.gObject);
                    src_multiSelect.deselect()
                }

                if(src_multiSelect.selectedObjects.length > 0) {
                    src_multiSelect.deleteAll();
                }
                
            })
        }
    }
})
;// CONCATENATED MODULE: ./src/layerTree.js



var getObjByStr = function(str) {
	
    var array = getStrAddrArray(str);

    if(array.length === 1) {
        return sim.simulations[array[0]]
    }

    if(array.length === 2) {
        return sim.simulations[array[0]].layers[array[1]]
    }

    if(array.length === 3) {
        return sim.simulations[array[0]].layers[array[1]].objUniverse[array[2]]
    }
}

var getStrAddrArray = function(str) {
    str = str.split(",");
    return str;
}


/*** simulation Selection ***/

function lowerIndexSLO(SL = null ,L = null, O = null) {

    if(SL !== null && L !== null && O !== null) {
        if(sim.simulations[SL].layers[L].objUniverse[O-1].objUniverse) {
            swapArrayElements(sim.simulations[SL].layers[L].objUniverse,O,O-1);
            return sim.simulations[SL].layers[L].objUniverse[O];
        }

        else {
            console.error("Attempted to swap outside array.")
        }
    }


    if(SL !== null && L !== null) {

        if(sim.simulations[SL].layers[L-1].objUniverse) {
            swapArrayElements(sim.simulations[SL].layers,L,L-1);
            return sim.simulations[SL].layers[L];
        }

        else {
            console.error("Attempted to swap outside array.")
        }

    }


    if(SL !== null) {

        if(sim.simulations[SL-1]) {
            swapArrayElements(sim.simulations,SL,SL-1);
            return sim.simulations[SL];
        }

        else {
            console.error("Attempted to swap outside array.")			
        }

    }


}

function LayerTree(sim) {

    LayerTree.instances.push(this);

    this.layerTree = document.createElement('div');
    this.layerTree.className = "layertree";

    this.sim = sim;
    this.update();

    this.ctrls = document.createElement("div");
    this.ctrls.className = "ctrls"

    this.htmlWin = new htmlwin("Layer Tree","layer-tree");
    this.htmlWin.winBody.appendChild(this.layerTree);
    this.htmlWin.winBody.appendChild(this.ctrls);

    this.deleteButton = document.createElement("span");
    this.deleteButton.addEventListener("click",this.deleteSelectedEntity);


    this.incrementIndexButton = document.createElement("span");

    this.decrementIndexButton = document.createElement("span");
    this.decrementIndexButton.addEventListener("click",this.decrementIndex);

    this.ctrls.appendChild(this.deleteButton);
    this.ctrls.appendChild(this.incrementIndexButton);
    this.ctrls.appendChild(this.decrementIndexButton);
    
}

LayerTree.prototype.decrementIndex = function() {
    
    if(this.arrayAddr.length === 1) {
        lowerIndexSLO(this.arrayAddr[0]);
    }

    if(this.arrayAddr.length === 2) {
        lowerIndexSLO(this.arrayAddr[0],this.arrayAddr[1]);
    }

    if(this.arrayAddr.length === 3) {
        lowerIndexSLO(this.arrayAddr[0],this.arrayAddr[1],this.arrayAddr[2]);
    }
}

LayerTree.prototype.update = function() {

    this.layerTree.innerHTML = null;

    var this_a = this;

    this.selectByClick = function() {


    
        // Here, "this" refers to the HTML element,
        // not an object constructed using LayerTree.

        if(this_a.subjectEl) {
            this_a.subjectEl.classList.remove("selected");
            this_a.subjectEl.querySelector('.label').style = null;
        }
    
        this_a.subject = getObjByStr(this.dataset.phAddr);
        this_a.arrayAddr = getStrAddrArray(this.dataset.phAddr);
        this_a.subjectEl = this;
        this_a.subjectSL = sim.simulations[this_a.arrayAddr[0]];

        if(this_a.arrayAddr[1]) {
            this_a.subjectL = sim.simulations[this_a.arrayAddr[0]].layers[this_a.arrayAddr[1]]
        }

        this.className = this.className + " selected";
        this.querySelector('.label').style = "border: 5px solid orange";
    
    }

    this.ondblclk = function() {
        var arrayAddrLocal = getStrAddrArray(this.dataset.phAddr);

        if(arrayAddrLocal.length === 1) {
            selectsimulation(arrayAddrLocal[0]);
        }

        if(arrayAddrLocal.length === 2) {
            selectsimulation(arrayAddrLocal[0]);
            session.selectedLayerI = arrayAddrLocal[1];
        }

        if(arrayAddrLocal.length === 3) {
            selectsimulation(arrayAddrLocal[0]);
            session.selectedLayerI = arrayAddrLocal[1];

        }
    }

    for(var SL = 0; SL < this.sim.simulations.length; SL++) {

        var simulationBranch = document.createElement("div");
        simulationBranch.className = "branch simulation"
        simulationBranch.innerHTML = "<span class=\"label simulation\">" + this.sim.simulations[SL].name + "</span>";

        simulationBranch.dataset.phAddr = SL;
        simulationBranch.addEventListener('click',this.selectByClick, true)

        var layerList = document.createElement('div');
        simulationBranch.appendChild(layerList);


        for(var L = 0; L < this.sim.simulations[SL].layers.length; L++) {
            var layerBranch = document.createElement('div');
            layerBranch.className = "branch layer"
            layerBranch.dataset.phAddr = SL + ',' + L;
            layerBranch.addEventListener('click',this.selectByClick,true)
            layerBranch.innerHTML = "<span class=\"label layer\"> Layer " + L + "</span>";
            layerList.appendChild(layerBranch);

            var enableObjList = false;
            
            if(enableObjList === true) {

                var objectList = document.createElement("div");

                for(var O = 0; O < this.sim.simulations[SL].layers[L].objUniverse.length; O++) {
                    var objectBranch = document.createElement('div');
                    objectBranch.className = "branch object"
                    objectBranch.dataset.phAddr = SL + ',' + L + ',' + O;
                    objectBranch.addEventListener('click',this.selectByClick,true)
                    objectBranch.innerHTML = "<span class=\"label\"> Object " + O + "</span>";
                    objectList.appendChild(objectBranch);
                }

                layerBranch.appendChild(objectList);

            }

            
        }

        this.layerTree.appendChild(simulationBranch);

    }

}

LayerTree.prototype.pushLayerDownI = function(i) {
    if((i-1) > 0) {
        swapArrayElements(this.sim.simulations,i,i-1);
        this.update();
    }

    else {
        console.error("Error: Element at index " + (i-1) + " is less than 0");
    }
}


LayerTree.prototype.selectedObject = null;

LayerTree.prototype.deleteSelectedEntity = function() {

    if(this.arrayAddr.length === 1) {
        deletesimulation(this.arrayAddr[0]);
    }

    if(this.arrayAddr.length === 2) {
        deleteLayerFromSL(this.arrayAddr[0],this.arrayAddr[1]);
    }

    if(this.arrayAddr.length === 3) {
        delete_deleteObjectSLO(this.arrayAddr[0],this.arrayAddr[1],this.arrayAddr[2]);
    }

    this.update();

}

// Synchronize all instances of LayerTree

LayerTree.instances = []
LayerTree.syn = function() {
    for(var i = 0; i < LayerTree.instances.length; i++) {
        LayerTree.instances[i].update();
    }
}

;// CONCATENATED MODULE: ./src/jsonViewer.js



function JSONViewer(o) {

    // Open Window

    var w = window.open("");
    w.document.title = this.name = o.name || "";

    // Textarea

    this.textArea = w.document.createElement("textarea");
    this.textArea.readOnly = "true";
    this.textArea.value = JSON.stringify(o,null," ");
    this.textArea.classList.add("jsonviewer-textarea");
   
    w.document.body.appendChild(this.textArea);

}

session_session.JSONViewer = JSONViewer;

/* harmony default export */ const jsonViewer = (JSONViewer);
;// CONCATENATED MODULE: ./src/widgets.js









function WidgetMouseCord(vectorIndex,objectIndex) {
    this.vectorIndex = vectorIndex;
    this.objectIndex = objectIndex;
}

var widgets = {

    getWidgetByArgAddr: function(S,L,O,W) {
        return SLO(S,L,O).widgets[W];
    },

    mouseObject: new WidgetMouseCord(null,null),

    pointinwidgetvector: function (objectArg,w,x,y) {

        if(objectArg.widgets && objectArg.widgets[w].vector) {

            if(PhSim.Vector.distance(new PhSim.Vector(x,y),PhSim.Vector.add(objectArg.widgets[w].vector,PhSim.Centroid.shape(objectArg))) < session_getSelectionRadius()) {
                return true;
            }
        
            else {
                return false;
            }
        
        }

        if(objectArg.widgets && objectArg.widgets[w].circularConstraint) {
            
            if(calc_vert_distance(objectArg.widgets[w].x,objectArg.widgets[w].y,x,y ) < session_getSelectionRadius() ) {
                return true;
            }
        
            else {
                return false;
            }

        }

        else {
            return null;
        }
    },
    
    getVectorIndexByPoint: function(object,x,y) {

        var returnIndex = null;

        if(object.widgets) {

            for(var i = 0; i < object.widgets.length; i++) {
                if(this.pointinwidgetvector(object,i,x,y)) {
                    returnIndex = i;
                }
            }

        }

        return returnIndex;

    },

    getIndexPair: function(x,y) {

        var p_vectorIndex = null;
        var p_objectIndex = null;

        var layerU = session_session.sim.simulations[session_session.simulationI].layers[session_session.selectedLayerI].objUniverse;

        for(var i = 0; i < layerU.length; i++) {

            if(layerU[i].widgets) {

                for(var j = 0; j < layerU[i].widgets.length; j++) {
                    if(this.pointinwidgetvector(layerU[i],j,x,y)) {
                            p_vectorIndex = j;
                            p_objectIndex = i;
                        }
                    }
        
            }

        }

        return new WidgetMouseCord(p_vectorIndex,p_objectIndex);

    },

    getIndexPairByMouse: function() {
        return this.getIndexPair(getmouse_getMouseX(),getmouse_getMouseY());
    },

    mWidgetObject: function() {
        return SLO(session_session.simulationI,session_session.selectedLayerI,this.mouseObject.objectIndex);
    },

    mWidget: function() {

        var w = this.mWidgetObject();

        if(w) {

            if(w.widgets) {

                if(w.widgets[this.mouseObject.vectorIndex]) {
                    return w.widgets[this.mouseObject.vectorIndex];
                }

                else { 
                    return null;
                }

            }

            else {
                return null;
            }

        }

        else {
            return null;
        }

    },

    editor: {
        target: null,
        targetObject: null,
        onmousedown: function() {
            if(widgets.mWidget()) {
                elements_elm.addEventListener("mousemove",widgets.editor.onmousemove);
                elements_elm.addEventListener("mouseup",widgets.editor.onmouseup);
                widgets.editor.targetObject = widgets.mWidgetObject();
                widgets.editor.target = widgets.mWidget();
            }
        },
        onmousemove: function() {
            
            if(widgets.editor.target.vector) {
                widgets.editor.target.vector = PhSim.Vector.subtract(getmouse_getMouse(),PhSim.Centroid.shape(widgets.editor.targetObject));
            }

            if(widgets.editor.target.circularConstraint) {
                widgets.editor.target.x = getmouse_getMouseX();
                widgets.editor.target.y = getmouse_getMouseY();
            }

        },
        onmouseup: function() {
            elements_elm.removeEventListener("mousemove",widgets.editor.onmousemove);
            elements_elm.removeEventListener("mouseup",widgets.editor.onmouseup);
            widgets.editor.targetObject = null;
            widgets.editor.target = null;
        },
    }

}

elements_elm.addEventListener("mousemove",function() {
    if(!src_simTest.active && shortcuts_getSelectedSimulation() && shortcuts_getSelectedSimulation().widgets) {
        widgets.mouseObject = widgets.getIndexPairByMouse();
        getConstraintByMouse();
    }
});

elements_elm.addEventListener("mousedown",function() {
    widgets.editor.onmousedown();
});

	/*** 
	 * 
	 * Function for detecting constraints by mouse
	 * 
	*/

	function getConstraintByMouse() {
		for(var i = 0; i < shortcuts_getSelectedSimulation().widgets.length; i++) {
			
			var o = shortcuts_getSelectedSimulation().widgets[i];
			mouseObject_mouseObject.constraint.widget = o;

			if(o.type === "constraint") {

				if(o.pointA) {

						if(calc_vert_distance(getmouse_getMouseX(),getmouse_getMouseY(),o.pointA.x,o.pointA.y) < session_getSelectionRadius() ) {
							mouseObject_mouseObject.constraint.point = o.pointA;
							return null;
						}

						else {
							mouseObject_mouseObject.constraint.point = null;
						}

						mouseObject_mouseObject.constraint.object = null;
						mouseObject_mouseObject.constraint.objectCord = null;



				}

				if(o.pointB) {

						if(calc_vert_distance(getmouse_getMouseX(),getmouse_getMouseY(),o.pointB.x,o.pointB.y) < session_getSelectionRadius() ) {
							mouseObject_mouseObject.constraint.point = o.pointB;
							return null;
						}

						else {
							mouseObject_mouseObject.constraint.point = null;
						}

						mouseObject_mouseObject.constraint.object = null;
						mouseObject_mouseObject.constraint.objectCord = null;

				}

			}

			// Assign widget and break loop when constraint point is detected.

		}
	}

	// Get Elevator Point by mouse

	function getElevatorByMouse() {

		mouseObject_mouseObject.elevatorPoint = null // Reset elevator point

		objloops.subglobal(function(obj){
			if(obj.widgets) {
				for(var i = 0; i < obj.widgets.length; i++) {
					if(obj.widgets[i].type === "elevator") {

						if( calc_vert_distance(obj.widgets[i].pointA.x,obj.widgets[i].pointA.y,getmouse_getMouseX(),getmouse_getMouseY()) < session_getSelectionRadius() ) {
							mouseObject_mouseObject.elevatorPoint = obj.widgets[i].pointA; 
						}

						if( calc_vert_distance(obj.widgets[i].pointB.x,obj.widgets[i].pointB.y,getmouse_getMouseX(),getmouse_getMouseY()) < session_getSelectionRadius() ) {
							mouseObject_mouseObject.elevatorPoint = obj.widgets[i].pointB;
						}

					}
				}
			}
		})
	}

	elements_elm.addEventListener("mousemove",getElevatorByMouse);

/* harmony default export */ const src_widgets = (widgets);
;// CONCATENATED MODULE: ./src/contextMenu.js

















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
        src_multiSelect.selectAll();
        src_render_static();
    });

    this.addSeperator();

    if(mouseObject_mouseObject.cond && !src_widgets.mouseObject.vectorIndex && src_multiSelect.selectedObjects.length > 0) {

        this.object = mouseObject_mouseObject.mObj;
        var self = this;

        this.addListItem("Object Properties",function() {
            var a = new objectEditor(self.object);
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

    if(mouseObject_mouseObject.cond) {

            if(mouseObject_mouseObject.mObj.shape === "polygon") {

            var mouseVert = vertices_getVertsByCircleAndObj(mouseObject_mouseObject.mObj,session_getSelectionRadius(),getmouse_getMouseX(),getmouse_getMouseY())[0];

            if(mouseVert) {

                var vStr = "(" + mouseVert.x + "," + mouseVert.y + ")";

                this.addListItem("Delete point" + vStr,function() {
                    var m = new HTMLAlert("Are you sure you want to delete " + vStr + "?",function(){
                        mouseObject_mouseObject.mObj.verts.splice(mouseObject_mouseObject.mObj.verts.indexOf(mouseVert),1);
                        src_render_static();
                    })
                });
            }

        }

    }

    if(mouseObject_mouseObject.cond || src_multiSelect.selectedObjects.length > 0) {

        var del_obj_txt_str = "";

        if(src_multiSelect.selectedObjects.length > 0) {
            var del_obj_txt_str = "Delete Selected Items";
        }

        else {
            del_obj_txt_str = "Delete Object"
        }


        
        this.addListItem(del_obj_txt_str,function() {

            var objName = null;

            if(src_multiSelect.selectedObjects.length > 0) {
                objName = "(" + src_multiSelect.selectedObjects.length + ") selected items"
            }

            else {
                objName = mouseObject_mouseObject.mObj.name;
            }

            new htmlConfirm("Are you sure you want to delete \"" + objName + "\"?", function(){

                if(mouseObject_mouseObject.cond && src_multiSelect.selectedObjects.length === 0) {
                    delete_deleteObjectSLO(session.simulationI,session.selectedLayerI,mouseObject_mouseObject.gObject);
                    src_multiSelect.deselect()
                }

                if(src_multiSelect.selectedObjects.length > 0) {
                    src_multiSelect.deleteAll();
                }

            });
        });

        this.addListItem("Move to top of layer",function(){
            src_multiSelect.moveToTop();
        });

        this.addListItem("See Source",function(){
            src_multiSelect.forAll(function(o){
                new jsonViewer(o);
            })
        })

        if(src_multiSelect.selectedObjects.length > 0) {

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

                src_multiSelect.forAll(function(o){
                    var li = document.createElement("li");
                    l.appendChild(li);
                    li.innerText = o.name;
                })

                d.appendChild(l);

                // Apply Button

                var b = new xLabeledButton("Change Censor Classes",function(){
                    src_multiSelect.forAll(function(o){
                        o.sensorClass = e.value;
                    });
                });

                d.appendChild(b);

                // HTMLWin

                var csc = new htmlwin("Change Sensor Class","change-sensor-class","superWin");
                
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

                src_multiSelect.forAll(function(o){
                    var li = document.createElement("li");
                    l.appendChild(li);
                    li.innerText = o.name;
                })

                d.appendChild(l);

                // Apply Button

                var b = new xLabeledButton("Change Collision Classes",function(){
                    src_multiSelect.forAll(function(o){
                        o.collisionClass = e.value;
                    });
                });

                d.appendChild(b);

                // HTMLWin

                var csc = new htmlwin("Change Collision Class","change-collision-class","superWin");
                
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

            src_multiSelect.forAll(function(o){
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
                src_multiSelect.forAll(function(o){
                    o.sensorClass = e.value;
                });
            });

            d.appendChild(b);

            // Lock All Objects

            var lao = new xLabeledButton("Lock",function(){
                src_multiSelect.forAll(function(o){
                    o.locked = true;
                });
            });

            // unlock All Objects

            var uao = new xLabeledButton("Unlock",function(){
                src_multiSelect.forAll(function(o){
                    o.locked = false;
                });
            })

            // toggle lock status

            var tls = new xLabeledButton("Toggle Lock",function(){
                src_multiSelect.forAll(function(o){
                    o.locked = !o.locked;
                });
            })

            // HTMLWin

            var csc = new htmlwin("Change Sensor Class","change-sensor-class","superWin");
            
            csc.winBody.appendChild(d);
            csc.winBody.appendChild(lao);
            csc.winBody.appendChild(uao);

            csc.appendToDocumentBody();	

        });



    }

    if(Number.isInteger(src_widgets.mouseObject.vectorIndex)) {

        this.addListItem("Widget Properties",function() {
            
        })

    }

    if(clipboard.array.length > 0) {
        this.addListItem("Paste",function() {
            
            var c = getArrayCentroid(clipboard.array);
            clipboard.transformAll(-c.x,-c.y);
            clipboard.transformAll(getmouse_mousePrev.x,getmouse_mousePrev.y);

            clipboard.paste.call(clipboard);
            src_render_static();
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

elements_elm.addEventListener("contextmenu", function(e) {

    if(ContextMenu.inst === null) {
        ContextMenu.inst = new ContextMenu(mouseObject_mouseObject.mObj,e.pageX,e.pageY);
    }

    else {
        ContextMenu.inst.remove();
        ContextMenu.inst = new ContextMenu(mouseObject_mouseObject.mObj,e.pageX,e.pageY);
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



/* harmony default export */ const contextMenu = ((/* unused pure expression or super */ null && (ContextMenu)));
;// CONCATENATED MODULE: ./src/about.js


function aboutPhSimEditor() {

	var startupHtmlAlert = document.createElement("div");
	startupHtmlAlert.style = "text-align: center;";
			
	var htmlAlertLogo = document.createElement("img");
	htmlAlertLogo.src = "./img/phsim-logo.svg";
	htmlAlertLogo.style = "width: 300px;";
		
	htmlAlertLogo.addEventListener("load",function(){
		m.setToCenter();
	});
		
	startupHtmlAlert.appendChild(htmlAlertLogo);
		
	var m = new htmlwin("","","superWin");
	m.winBody.appendChild(startupHtmlAlert);
		
	// Description
		
	var desc = document.createElement("div");
		
	desc.style = "margin: 20px;"
		
	desc.innerHTML = `
			
		<h3>Welcome to the PhSim editor!</h3>

		<p>Welcome to the PhSim editor. It is currently in alpha testing.</p>
		<p>If there are any bugs, you can contact the creator at webmaster@mjduniverse.com.</p>
			
		<p><strong>Do not forget to save your creations. I will not be hosting them.</strong></p>

		<h3>Credits</h3>

		Copyright 2020 Mjduniverse.com <br>
		<a href="https://brm.io/matter-js/">Matter.js</a> is created by liabru.

		<p>The PhSim editor currently uses PhSim v0.2.2-alpha.</p>

		<p><a href="https://mjduniverse.com/terms-of-service">Mjduniverse.com Terms of Service</a> | <a href="https://mjduniverse.com/privacy-policy">Mjdunvierse.com Privacy Policy</a></p>

			
	`;
		
	m.winBody.appendChild(desc);
		
	m.appendToDocumentBody();
		
	m.setToCenter();

}

document.querySelector(".about").addEventListener("click",aboutPhSimEditor);

/* harmony default export */ const about = (aboutPhSimEditor);
;// CONCATENATED MODULE: ./src/index.js
/***

Physics Simulator 1.0
Copyright 2019-2020 Mjduniverse.com

@author Mjduniverse.com
@version 1.0

***/

/**
 * Make it so it asks before the user leaves.
 */

window.onbeforeunload = function(){
	return false;
};

/**
 * Make HTMLWin draggable
 */

$(".winWrapper.htmlWin").draggable({
	containment: "window"
});

/**
 * Use phsim as a matter plugin.
 */

Matter.use(PhSim.matterPlugin);

// User Preferences



// HTML Elements



// Swaping Array Elements



// Get centroid of array



// Top Menu Bar



// Inputs



// Shape Window



// FollowMeRect



// Clipboard



// Canvas Function Mouse



// Get Path



// Generate Simulation



// Get Vertices by Circle



// multiSelect



// HTML Modals





// PForm Module



// HTML Factory Modules



// RectCalc



// vertpen



// Constraint Adder



// Rectangle Creator



// Circle Creator



// rectangleditor



// Insert Point By Mouse



// Edit Constraint



// Elevator Editor



// Regular Polygon Creator



// DynSimEdit



// Render Static


elements_elm.addEventListener("mousemove",src_render_static);

// XSelectionMenu



// xlabeled Library



// HTML Factory 2



// Toolbar 



// Object Editor



// File Operations



// Color Form



// Color Field



// ctrlShortcuts



// Layer Tree



// Context Menu



// Widgets Object



// simtest object



// Session Variables



// box Object



// JSON viewer



// Getting Mouse



// Session Object



// 



// About Message



// Multiselect



// createIFRameWindow


window.createIFrameWindow = iframeWindow;

//



// Load Sim





	var ahddConstraint = {

		type: null,

		single: {
			object: null,
			point: null,
			rel: null
		},

		onmouseclick: function() {
			if(addConstraint.mode === "single") {

				if(!addConstraint.object && !addConstraint.point) {
					addConstraint.single.object = mouseObject_mouseObject.mObj;
					addConstraint.single.rel = PhSim.Vector.subtract(getMouse(),PhSim.Centroid.shape(this.single.object))
					return true;
				}

				if(addConstraint.object && !addConstraint.point) {
					addConstraint.single.object = new PhSim.Constraints.Static.Constraint(getmouse_getMouseX(),getmouse_getMouseY());
					return true;
				}

			}
		}
	}



	/*** 
	 * 
	 * Generate menus for 
	 * 
	*/

	/*** Error Handling ***/

	window.addEventListener("error",function(err) {

		var mainScriptCond = (document.querySelector(".main-script") === err.filename);
		var clagetSelectedSimulationibCond = (document.querySelector(".class-lib-js-script") === err.filename)

		if(mainScriptCond || clagetSelectedSimulationibCond) {
			var errMsg = new htmlwin("Error:","js-error","superwin",false);
			errMsg.appendToDocumentBody();
		}

	})

	// Generate Irregular Polygon From shapes

	function genPath(regPolygon) {

		regPolygon.verts = JSON.parse(JSON.stringify(PhSim.Vertices.regPolygon(regPolygon)));
		
		delete regPolygon.x;
		delete regPolygon.y;
		delete regPolygon.cycle;
		delete regPolygon.radius;
		delete regPolygon.n;
		delete regPolygon.shape;

		regPolygon.shape = "polygon";
	}


// Object Loops

//

document.querySelector(".phsim-docs").addEventListener("click",function(){
	window.open("https://dev.mjduniverse.com/phsim/docs/")
});

/***
* 
*  Autosave
* 
****/

if(session_session.usrPref.autosave) {
	setInterval(function(){
		if(typeof session_session.sim === "object" && !src_simTest.active) {
			localStorage.setItem("phsim_autosave", src_stringifyProjectJSON(session_session.sim));
		}
	},10 * 1000);
}

/**
 * Error message
 */

window.createErrorAlert = function(s) {
	new htmlAlert("Error:" + s);
}

/*** 
 * 
 * Load default or autosave
 * Render everything. 
 * Always before the logo window.
 * 
***/

msg.innerText = "Checking for autosaved simulation..."

if(usrpref.autosave && localStorage["phsim_autosave"] && localStorage["phsim_autosave"] !== "undefined") {
	new src_htmlConfirm("A simulation has been autosaved. Do you want to load it?",function(){
		src_loadSim(JSON.parse(localStorage["phsim_autosave"]),function(key,value){
			if(typeof this[key] === "function" && key === "function") {

			}
		});
	},function(){
		src_loadSim(new PhSim.Static());		
	})
}

else {
	src_loadSim(new PhSim.Static());
}

// Execute 

about();
/******/ })()
;