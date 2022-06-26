import { elm } from "./elements.js";
import { getMouse, getMouseX, getMouseY } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import objLoops from "./objloops.js";
import {session, getSelectionRadius } from "./session.js";
import { getSelectedSimulation, SLO } from "./shortcuts.js";
import simTest from "./simTest.js";
import { calc_vert_distance } from "./vertices.js";

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

            if(PhSim.Vector.distance(new PhSim.Vector(x,y),PhSim.Vector.add(objectArg.widgets[w].vector,PhSim.Centroid.shape(objectArg))) < getSelectionRadius()) {
                return true;
            }
        
            else {
                return false;
            }
        
        }

        if(objectArg.widgets && objectArg.widgets[w].circularConstraint) {
            
            if(calc_vert_distance(objectArg.widgets[w].x,objectArg.widgets[w].y,x,y ) < getSelectionRadius() ) {
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

        var layerU = session.sim.simulations[session.simulationI].layers[session.selectedLayerI].objUniverse;

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
        return this.getIndexPair(getMouseX(),getMouseY());
    },

    mWidgetObject: function() {
        return SLO(session.simulationI,session.selectedLayerI,this.mouseObject.objectIndex);
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
                elm.addEventListener("mousemove",widgets.editor.onmousemove);
                elm.addEventListener("mouseup",widgets.editor.onmouseup);
                widgets.editor.targetObject = widgets.mWidgetObject();
                widgets.editor.target = widgets.mWidget();
            }
        },
        onmousemove: function() {
            
            if(widgets.editor.target.vector) {
                widgets.editor.target.vector = PhSim.Vector.subtract(getMouse(),PhSim.Centroid.shape(widgets.editor.targetObject));
            }

            if(widgets.editor.target.circularConstraint) {
                widgets.editor.target.x = getMouseX();
                widgets.editor.target.y = getMouseY();
            }

        },
        onmouseup: function() {
            elm.removeEventListener("mousemove",widgets.editor.onmousemove);
            elm.removeEventListener("mouseup",widgets.editor.onmouseup);
            widgets.editor.targetObject = null;
            widgets.editor.target = null;
        },
    }

}

elm.addEventListener("mousemove",function() {
    if(!simTest.active && getSelectedSimulation() && getSelectedSimulation().widgets) {
        widgets.mouseObject = widgets.getIndexPairByMouse();
        getConstraintByMouse();
    }
});

elm.addEventListener("mousedown",function() {
    widgets.editor.onmousedown();
});

	/*** 
	 * 
	 * Function for detecting constraints by mouse
	 * 
	*/

	function getConstraintByMouse() {
		for(var i = 0; i < getSelectedSimulation().widgets.length; i++) {
			
			var o = getSelectedSimulation().widgets[i];
			mouseObject.constraint.widget = o;

			if(o.type === "constraint") {

				if(o.pointA) {

						if(calc_vert_distance(getMouseX(),getMouseY(),o.pointA.x,o.pointA.y) < getSelectionRadius() ) {
							mouseObject.constraint.point = o.pointA;
							return null;
						}

						else {
							mouseObject.constraint.point = null;
						}

						mouseObject.constraint.object = null;
						mouseObject.constraint.objectCord = null;



				}

				if(o.pointB) {

						if(calc_vert_distance(getMouseX(),getMouseY(),o.pointB.x,o.pointB.y) < getSelectionRadius() ) {
							mouseObject.constraint.point = o.pointB;
							return null;
						}

						else {
							mouseObject.constraint.point = null;
						}

						mouseObject.constraint.object = null;
						mouseObject.constraint.objectCord = null;

				}

			}

			// Assign widget and break loop when constraint point is detected.

		}
	}

	// Get Elevator Point by mouse

	function getElevatorByMouse() {

		mouseObject.elevatorPoint = null // Reset elevator point

		objLoops.subglobal(function(obj){
			if(obj.widgets) {
				for(var i = 0; i < obj.widgets.length; i++) {
					if(obj.widgets[i].type === "elevator") {

						if( calc_vert_distance(obj.widgets[i].pointA.x,obj.widgets[i].pointA.y,getMouseX(),getMouseY()) < getSelectionRadius() ) {
							mouseObject.elevatorPoint = obj.widgets[i].pointA; 
						}

						if( calc_vert_distance(obj.widgets[i].pointB.x,obj.widgets[i].pointB.y,getMouseX(),getMouseY()) < getSelectionRadius() ) {
							mouseObject.elevatorPoint = obj.widgets[i].pointB;
						}

					}
				}
			}
		})
	}

	elm.addEventListener("mousemove",getElevatorByMouse);

export default widgets;