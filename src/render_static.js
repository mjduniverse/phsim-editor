import box from "./box.js";
import draggablePoint from "./draggablePoint.js";
import { ctx, elm } from "./elements.js";
import { focusObject } from "./focusObject.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import getPath from "./getPath.js";
import { sObj } from "./mouseObject.js";
import multiSelect from "./multiSelect.js";
import regPolygonCreator from "./regPolygonCreator.js";
import {session} from "./session.js";
import { getSelectedSimulation } from "./shortcuts.js";
import usrPref from "./usrpref.js";
import { calc_vert_distance } from "./vertices.js";
import vertPen from "./vertpen.js";

function arrowDraw4(ctx,x1,y1,x2,y2) {
		
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.arc(x1,y1,5 / box.scaleFactor,0,2*Math.PI);
    ctx.fill();
    
    ctx.lineWidth = 3 / box.scaleFactor;

    var m = Math.atan2((y2 - y1),(x2 - x1)) - 0.5 * Math.PI;

    var bw = 9 / box.scaleFactor;
    var bh = 18 / box.scaleFactor;

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

            ctx.globalAlpha = 1;
            ctx.fillStyle = "orange";
            ctx.strokeStyle = "orange";

            arrowDraw4(ctx,centroid.x,centroid.y,centroid.x + object.widgets[i].vector.x,centroid.y + object.widgets[i].vector.y);

    
        }

        if(object.widgets[i].type === "elevator") {

            draggablePoint(object.widgets[i].pointA.x,object.widgets[i].pointA.y);
            draggablePoint(object.widgets[i].pointB.x,object.widgets[i].pointB.y);
    
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "orange";
    
            ctx.beginPath();
            ctx.moveTo(object.widgets[i].pointA.x,object.widgets[i].pointA.y);
            ctx.lineTo(object.widgets[i].pointB.x,object.widgets[i].pointB.y);
            ctx.closePath();
            ctx.stroke();

        }

        if(object.widgets[i].type === "circularConstraint") {
            
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "orange";

            var r = calc_vert_distance(centroid.x,centroid.y,object.widgets[i].x,object.widgets[i].y)


            ctx.beginPath();
            ctx.arc(object.widgets[i].x,object.widgets[i].y,r,0,2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            
            draggablePoint(object.widgets[i].x,object.widgets[i].y);
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

    draggablePoint(a[0].x,a[0].y);
    draggablePoint(a[1].x,a[1].y);

    ctx.globalAlpha = 1;
    ctx.strokeStyle = "orange";

    ctx.beginPath();
    ctx.moveTo(a[0].x,a[0].y);
    ctx.lineTo(a[1].x,a[1].y);
    ctx.closePath();
    ctx.stroke();

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

function render_static() {

    if(session.render_static_disabled) {
        return;
    }

    let selS = getSelectedSimulation()


    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";


    ctx.clearRect(-box.offsetX,-box.offsetY, elm.width / box.scaleFactor, elm.height / box.scaleFactor);

    document.body.style.background = selS?.world.bg || "transparent";

    if(usrPref.renderColored) {
        for(var i = 0; i < selS.layers.length; i++) {
            session.phStaticRender.renderStaticLayer(getSelectedSimulation().layers[i]);
        }
    }
    
    //ctx.drawImage(phStaticCanvas,0,0);

    if(getSelectedSimulation().layers && getSelectedSimulation().layers[session.selectedLayerI]) {
        renderCurrentWidgets(getSelectedSimulation().layers[session.selectedLayerI]);
    }
    
    for(i = 0; i < multiSelect.selectedObjects.length; i++) {

        focusObject(multiSelect.selectedObjects[i]);

        if(multiSelect.selectedObjects.length > 0 && sObj().shape === "polygon") {
            
            var path = getPath(sObj(),getMouseX(),getMouseY())

            if(path) {
                ctx.globalAlpha = 1;
                ctx.strokeStyle = "orange";

                ctx.beginPath();
                ctx.moveTo(path.pointA.x,path.pointA.y);
                ctx.lineTo(path.pointB.x,path.pointB.y);
                ctx.closePath();
                ctx.stroke();
            }

        }

    }


    if(vertPen.activated === true && vertPen.verts.length > 2) {
        vertPen.preview();
    }

    if(getSelectedSimulation().widgets) {
        renderConstraints(getSelectedSimulation());
    }


    if(vertPen.activated === true) {
        vertPen.preview();
    }

    if(regPolygonCreator.active) {
        regPolygonCreator.preview();
    }

    var w = session.sim.box.w || session.sim.box.width;
    var h = session.sim.box.h || session.sim.box.height;
    var x = session.sim.box.x || 0;
    var y = session.sim.box.y || 0;

    ctx.setLineDash([14,14]);

    ctx.globalAlpha = 1;
    ctx.strokeStyle = "orange";

    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.stroke();

    ctx.setLineDash([]);
    
    
    
}

export default render_static;