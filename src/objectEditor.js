import ColorField from "./colorField.js";
import gradEditor from "./gradientEditor.js";
import { elementFromHTML } from "./htmlFactory.js";
import { compositeHTMLElement } from "./htmlFactory2.js";
import HTMLWin from "./htmlwin.js";
import multiSelect from "./multiSelect.js";
import { session } from "./session.js";
import { getSelectedSimulation } from "./shortcuts.js";
import { tr_xLabeledElement, tr_xLabeledInput, xLabeledButton, xLabeledInput } from "./xlabeled.js";
import XSelectionMenu from "./xSelectionMenu.js";
import HTMLAlert from "./htmlAlert.js"
import HTMLConfirm from "./htmlConfirm.js";
import { mouseObject } from "./mouseObject.js";

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


    var select = new XSelectionMenu();

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

    var htmlWin = new HTMLWin("wFunction Editor","wfunction-editor-win","superWin");
    htmlWin.winBody.appendChild(txtWrap);
    htmlWin.winBody.appendChild(sb);

    htmlWin.appendToDocumentBody();

    return htmlWin;
} 

window.openObjectEditor = function() {
    new ObjectEditor(multiSelect.selectedObjects[0]);
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

    if(multiSelect.mouseTransform.active) {
        multiSelect.onmouseup();
    }

    this.htmlWin = new HTMLWin("Object Editor","object-editor","superWin");


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

            session.syn.layers();

        }

        catch (e) {
            new HTMLAlert("Error:" + e.message);
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

    var bg = new ColorField(this.subject.world.bg,"simulation Background Color",function(){
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
    
    for(var i = 0; i < getSelectedSimulation().layers.length; i++) {

        var layer = document.createElement("li");
        layerList.appendChild(layer);
        layer.className = "sl-tree-layer";
        layer.dataset.layerIndex = i;

        var label = document.createElement("span");
        label.className = "sl-tree-layer-label";
        label.innerText = "Layer" + i;
        layer.appendChild(layer);

        for(var j = 0; j < getSelectedSimulation().layers[i].objUniverse[j].length; j++) {
            
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

    var fillColor = new ColorField(this.subject.fillStyle,"Fill Color",function(){
        self.subject.fillStyle = fillColor.value;
    })

    var fillColorTr = tr_xLabeledElement("Fill Color:",fillColor.container);

    // Border Color

    var borderColor = new ColorField(this.subject.strokeStyle,"Border Color",function(){
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
            gradEditor(self.subject.gradient);
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
                
                session.phStaticRender.spriteImgObj.addSprite(srcNew,function(){
                    resolve();
                });
    
            });
    
            newImg.addEventListener("error",function(e){
                reject(e);
            });

        }).then(function(){
            target.src = srcNew;
        }).catch(function(e){
            new HTMLAlert("Error: " + e);
        });




    });

    var uploadImg = xLabeledButton("Upload Sprite",function(){

        session.sim.base64imgurls = session.sim.base64imgurls || [];
        session.tempimgurls = session.tempimgimgs || [];

        var w = new HTMLWin("Upload Image","upload-img","superWin");

        var elm = document.createElement("input");
        elm.type = "file";

        var add = xLabeledButton("Add",function(){

            new Promise(function(resolve,reject){

                var r = new FileReader();

                r.onload = function() {

                    session.sim.base64imgurls.push(this.result);

                    var st = URL.createObjectURL(elm.files[0]);
                    session.tempimgurls.push(st);
                    target.base64 = session.sim.base64imgurls.length - 1;

                    session.phStaticRender.spriteImgObj.addSprite(st);

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
                new HTMLAlert("Succesfully Added file" + elm.files[0].name + "to Project");
            }).catch(function(a){
                new HTMLAlert("Error:" + a)
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

        var triggers = new XSelectionMenu();
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
                new HTMLAlert("Audio \"" + src.value + "\" loaded successfully.");
            });

            a.addEventListener("error",function(){
                new HTMLAlert("Error loading audio \"" + src.value + "\".");
            });

        });

        var uploadAudio = xLabeledButton("Upload",function(){

            var w = new HTMLWin("Upload Audio","upload-audio","superWin");

            var p = document.createElement("p");
            p.innerText = "Upload Audio:"

            var i = document.createElement("input");
            i.type = "upload";

            var b = xLabeledButton("Upload",function(){

                i.files[0];

                var r = new FileReader();

                r.addEventListener("load",function(){

                    var u = URL.createObjectURL(i.files[0]);
                    session.tempaudiosrcs = session.tempaudiosrcs || [];
                    session.tempaudiosrcs.push(u);

                    widget.base64 = session.tempaudiosrcs.length - 1;


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

            "type": new XSelectionMenu()

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

        var clrForm = new ColorField(widget.color,"Widget",function(){
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

        var eventClass = new XSelectionMenu();
        var a = Object.keys(PhSim.DynEventTarget.prototype.eventStack);

        for(var i = 0; i < a.length; i++) {
            eventClass.add(a[i],a[i]);
        }

        simpleEventPanel.appendChild(eventClass.container);

        widgetForm.appendChild(impoPanel);

    }

    if(widget.type === "objLink") {

        widget.target = widget.target || { L: null, O: null}

        var objAList = new XSelectionMenu();

        for(var i = 0; i < sim.simulations[session.selectedLayerI].layers.length; i++) {
            for(var j = 0; j < sim.simulations[session.selectedLayerI].layers[i].objUniverse.length; j++) {
                objAList.add(i + "," + j, sim.simulations[session.selectedLayerI].layers[i].objUniverse[j].name);
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

            var fontFill = new ColorField(widget.fill || "#000000","Font Fill",function(){
                widget.fill = fontFill.value;
            })

            var fontFillTr = tr_xLabeledElement("Font Fill Color",fontFill.container);

            textPanel.appendChild(fontFillTr);

            // Font Border Color

            var borderColor = new ColorField(widget.borderColor || "#000000","Border Color",function(){
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
    
            var fontInput = new XSelectionMenu();
    
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
        var win = new HTMLConfirm("Are you sure you want to delete this widget?",function(){
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

    var availableWidgets = new XSelectionMenu();

    widgetAdder.appendChild(availableWidgets.container);

    if(this.subject.shape) {
        availableWidgets.add("keyboardControls","Keyboard Controls");
        availableWidgets.add("velocity","Velocity");
        availableWidgets.add("translate","Translate");
        availableWidgets.add("position","Position");
        availableWidgets.add("force","Force");
        availableWidgets.add("clone","Clone");
        availableWidgets.add("draggable","Draggable");
        
        if(getSelectedSimulation().game) {
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

export default ObjectEditor;