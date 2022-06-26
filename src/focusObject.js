import draggablePoint from "./draggablePoint.js";
import { ctx } from "./elements.js";
import { retrieveCircumPoint } from "./multiSelect.js";

// Focus Object

export function renderEditPoints(object) {

    if(object.shape === "polygon") {

        for(var i = 0; i < object.verts.length; i++) {
            draggablePoint(object.verts[i].x,object.verts[i].y);
        }

    }

    if(object.shape === "circle" || object.shape === "regPolygon") {
        var m = retrieveCircumPoint(object);
        var c = PhSim.Centroid.shape(object);
        
        draggablePoint(m.x,m.y);
        draggablePoint(c.x,c.y);

        // Draw Lines

        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(m.x,m.y);
        ctx.lineTo(c.x,c.y);
        ctx.closePath();
        ctx.stroke();


    }

    if(object.shape === "rectangle") {

        var m = retrieveCircumPoint(object);

        draggablePoint(m.x,m.y);

        var a = PhSim.Vertices.getRectangleCorners(object);

        draggablePoint(a.topLeft.x,a.topLeft.y);
        draggablePoint(a.topRight.x,a.topRight.y);
        draggablePoint(a.bottomLeft.x,a.bottomLeft.y);
        draggablePoint(a.bottomRight.x,a.bottomRight.y);



    }

}

export function focusObject(o) {

    // Render Edit Points

    renderEditPoints(o);

    // Render Box

    var m = PhSim.BoundingBox.fromShape(o);

    ctx.beginPath();
    ctx.rect(m.x,m.y,m.w,m.h);
    ctx.closePath();
    ctx.stroke();

    renderEditPoints(o);
}