import { elm } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import getPath from "./getPath.js";
import { sObj } from "./mouseObject.js";
import multiSelect from "./multiSelect.js";
import render_static from "./render_static.js";
import { getSelectionRadius } from "./session.js";
import { getVertsByCircleAndObj } from "./vertices.js";

function insertPointByMouse() {

	var x = getMouseX();
	var y = getMouseY();

	var line = getPath(sObj(),x,y);

	if(line && line.pointA && line.pointB && line.pointA.x && line.pointA.y) {
		
		var a_i = sObj().verts.indexOf(line.pointA);
		var b_i = sObj().verts.indexOf(line.pointB);

		sObj().verts.splice(a_i+1,0,{
			"x": x,
			"y": y
		})
	}

	render_static();
}

elm.addEventListener("click",function(){
	if(multiSelect.selectedObjects.length === 1 && sObj().shape === "polygon" && getVertsByCircleAndObj(sObj(),getSelectionRadius() ,getMouseX(),getMouseY()).length === 0) {
		insertPointByMouse();
	}
})

export default insertPointByMouse;