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

export default gradEditor;