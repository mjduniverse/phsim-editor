import dynSimEdit from "./dynSimEdit.js";
import { ctx, elm } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import render_static from "./render_static.js";
import { session } from "./session.js";
import shapeWindow from "./shapewin.js";
import { getSelectedSimulation } from "./shortcuts.js";
import { calc_vert_distance } from "./vertices.js";

var verts = [];

/*** Creates a circle whose center is (x,y) and radius is equal to the Euclidean distance between (x,y) and the cursor. ***/

function followMeCircle(x,y, drawRadius = true, drawCenter = true, drawPointInCircle = true, lineWidth = 1, padding = 3, strokeStyle = "red") {
    
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    
    ctx.beginPath();
    ctx.arc(x,y, calc_vert_distance(getMouseX(), getMouseY(), x , y),0, 2*Math.PI );
    ctx.fill();
    ctx.stroke();
    
    if(drawRadius) {
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(getMouseX(), getMouseY());
        ctx.stroke();
    }
    
    if(drawCenter) {
        ctx.beginPath();
        ctx.arc(x,y,lineWidth + padding,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    
    if(drawPointInCircle) {
        ctx.beginPath();
        ctx.arc(getMouseX(),getMouseY(),lineWidth + padding,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
    
}

/*** Circle Creator ***/

function followFromFirstPoint() {
    render_static();
    followMeCircle(verts[0].x, verts[0].y);
}

function circleCreator() {
    
    verts.push({x:getMouseX(),y:getMouseY()});
    
    document.querySelector('#msg').innerHTML = "Point (" + verts[verts.length - 1].x + "," + verts[verts.length - 1].y + ") Selected. Now, click when the mouse is at the desired radius and the circle will be created.";
    

    if(verts[0]) {
        elm.addEventListener('mousemove', followFromFirstPoint);
    }
    
    if(verts[1]) {
        elm.removeEventListener('mousemove', followFromFirstPoint);
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
        newObject.name = "untitled_(" + getSelectedSimulation().layers.length + ")";

        newObject.strokeStyle = document.querySelector(".strokecolor-ctrl").querySelector(".colorfield-container").dataset["value"]
        newObject.lineWidth = document.querySelector(".lineWidth").value;
        newObject.fillStyle = document.querySelector(".fillcolor-ctrl").querySelector(".colorfield-container").dataset["value"];

        newObject.cycle = a;
        
        getSelectedSimulation().layers[session.selectedLayerI].objUniverse.push(newObject); // Push new object into universe array
                        
        verts =[];
        
        /*** Clear Everything and update canvas with new object ***/
        
        ctx.clearRect(0, 0, elm.width, elm.height);
        render_static();
        
        document.querySelector('#msg').innerHTML = "Circle has been created.";
        
        elm.removeEventListener('click', saveCircle); // Removal of saveCircle function from the onclick event listener
        elm.removeEventListener('click', circleCreator); 
        
        /*
        
        Add circle to phsim if the dyn editor is active

        **/ 

        if(dynSimEdit.phSim) {
            dynSimEdit.phSim.addToOverlayer(new PhSim.DynObject(newObject));
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
        elm.addEventListener('click', circleCreator);
    }
}

shapeWindow.addCircleButton.addEventListener('click',toggleCircleCreator);

document.querySelector(".addCircle.button-2").addEventListener('click',toggleCircleCreator);

session.actions.createShape.circle = toggleCircleCreator;
