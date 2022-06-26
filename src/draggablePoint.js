import { ctx } from "./elements.js";
import { getSelectionRadius } from "./session.js";

// New function for rendering parts that can be edited.

function draggablePoint(x,y) {

    ctx.globalAlpha = 1;
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "transparent";
    
    ctx.beginPath();

    ctx.arc(x,y,getSelectionRadius() * 0.5,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();


    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(x,y,getSelectionRadius(),0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

}

export default draggablePoint;