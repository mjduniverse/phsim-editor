import box from "./box.js";
import changeSpecialPoint from "./changeSpecialPoint.js";
import dynSimEdit from "./dynSimEdit.js";
import editConstraint from "./editConstraint.js";
import { ctx, elm } from "./elements.js";
import FollowMeRect from "./followMeRect.js";
import { getMouseX, getMouseY, mousePrev } from "./getmouse.js";
import { mouseObject, sObj } from "./mouseObject.js";
import render_static from "./render_static.js";
import { getSelectionRadius, session } from "./session.js";
import { getSelectedSimulation, SLO } from "./shortcuts.js";
import { transformCircle, transformRectangle, transformPath, transformObj } from "./transformShapes.js";
import { getUnitCircleVector } from "./unitCircle.js";
import { calc_vert_distance, getVertsByCircleAndObj } from "./vertices.js";

export function changeIndexes(simulation,action) {
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

export function SubjectElement(S,L,O) {
    this.s = s;
    this.l = l;
    this.o = o;
    this.simulation = sim.simulations[S];
    this.layer = sim.simulations[S].layers[L];
    this.object = sim.simulations[S].layers[L].objUniverse[O];
}

export function retrieveCircumPoint(object) {

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

export function pointInSpecialPoint(object,x,y) {
    var specialPoint = retrieveCircumPoint(object);
    var dist = calc_vert_distance(x,y,specialPoint.x,specialPoint.y);

    if(dist < getSelectionRadius()) {
        return true;
    }

    else {
        return false;
    }

}

var multiSelect = {

    transformAll: function(dx,dy) {
        for(var i = 0; i < this.selectedObjects.length; i++) {
            transformObj(this.selectedObjects[i],dx,dy);
        }
    },

    selectAll: function() {
        var array1 = [];
        var array2 = [];

        for(var L = 0; L < getSelectedSimulation().layers.length; L++) {

            for(var i = 0; i < getSelectedSimulation().layers[L].objUniverse.length; i++) {
                array1.push({"L": L, "O": i});
                array2.push(SLO(session.simulationI,L,i));
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

        }

        multiSelect.subjectIndexes = array1;
        multiSelect.selectedObjects = array2;
    },

    moveToTop: function() {

        changeIndexes(getSelectedSimulation(),function(){

            var a = [];

            for(let i = multiSelect.subjectIndexes.length - 1; i > -1 ; i--) {
                
                var o = multiSelect.subjectIndexes[i];
                a.push(getSelectedSimulation().layers[o.L].objUniverse.splice(o.O,1)[0]);

            }

            a.reverse();

            for(let i = 0; i < a.length; i++) {
                getSelectedSimulation().layers[getSelectedSimulation().layers.length -1].objUniverse.push(a[i]);
            }
    
        });

        multiSelect.deselect();

        render_static();
    },

    deleteAll: function() {

        changeIndexes(getSelectedSimulation(),function(){
            //multiSelect.forAll(function(obj){

                for(var i = multiSelect.subjectIndexes.length - 1; i > -1 ; i--) {
                    
                    var o = multiSelect.subjectIndexes[i];
                    getSelectedSimulation().layers[o.L].objUniverse.splice(o.O,1);

                }

            //});
        });

        multiSelect.deselect();

        render_static();

    },


    preceedingLayerIndexes: function(l,o) {

        var a = [];

        multiSelect.forAllIndexes(function(b){
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

            for(var i = 0; i < multiSelect.selectedObjects.length; i++) {

                var o = multiSelect.selectedObjects[i];
                
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
    
                for(var L = 0; L < getSelectedSimulation().layers.length; L++) {
    
                    for(var i = 0; i < getSelectedSimulation().layers[L].objUniverse.length; i++) {
    
                        let o = SLO(session.simulationI,L,i);
                        let cond = multiSelect.rectangle.isNeighborhood(o);
                        
                        if(cond) {
                            array1.push({"L": L, "O": i});
                            array2.push(o);
                        }

                    }
    
                }
    
                multiSelect.subjectIndexes = array1;
                multiSelect.selectedObjects = array2;

                return array2;
    
            },
    
        },
    },

    onmousedown: function() {

        if(multiSelect.selectedObjects.length) {

            multiSelect.mouseTransform.active = true;
            multiSelect.mouseTransform.firstObj.centroidInital = PhSim.Centroid.shape(multiSelect.selectedObjects[0]);
        
            if(dynSimEdit.phSim) {
                multiSelect.forAll(function(o){

                    var d = dynSimEdit.map.get(o);

                    if(!d.matter.isStatic) {
                        multiSelect.mouseTransform.unlockedDynObjects.push(d);
                        Matter.Body.setStatic(d.matter,true);
                    }

                });
            }
        
        }

        else {
            
            multiSelect.rectangle.x = getMouseX();
            multiSelect.rectangle.y = getMouseY();

        }

        window.addEventListener("mouseup",multiSelect.onmouseup);
        window.addEventListener("mousemove",multiSelect.onmousemove);

    },

    /**
     * 
     * @param {MouseEvent} event 
     * @returns 
     */

    onmousemove: function(event) {

        if(multiSelect.mouseTransform.active) {

            if(multiSelect.selectedObjects.length === 1) {

                let obj = multiSelect.selectedObjects[0];

                if(obj.shape === "polygon") {
        
                    if(multiSelect.mouseTransform.vertActive === true || getVertsByCircleAndObj(obj,getSelectionRadius(),getMouseX(),getMouseY()).length > 0) {
    
                        if(!multiSelect.mouseTransform.vertex) {
                            multiSelect.mouseTransform.vertex = getVertsByCircleAndObj(obj,getSelectionRadius(),getMouseX(),getMouseY())[0];
                        }
    
                        multiSelect.mouseTransform.vertex.x = getMouseX();
                        multiSelect.mouseTransform.vertex.y =  getMouseY();
    
                        render_static();
    
                        multiSelect.mouseTransform.vertActive = true;
    
                        return null;
                    }
            
                    else {
                        if(!multiSelect.mouseTransform.vertActive) {
                            transformPath(obj,event.movementX / box.scaleFactor, event.movementY / box.scaleFactor)
                            render_static();
                        }
                        return null;
                    }
                }
            
                if( (obj.shape === "circle" || obj.shape === "regPolygon" || obj.shape === "rectangle") ) {
            
                    if(pointInSpecialPoint(obj,getMouseX(),getMouseY()) || multiSelect.mouseTransform.specialPoint) {
                        changeSpecialPoint(obj,getMouseX(),getMouseY());
                        render_static();
                        multiSelect.mouseTransform.specialPoint = true;
                        return null;
                    }
            
                    else {
                        obj.x += event.movementX / box.scaleFactor;
                        obj.y += event.movementY / box.scaleFactor;
                    }
    
                }
            
                if(obj.shape === "composite") {
                    
                    for(var i = 0; i < obj.parts.length; i++) {
                        //transformObjByMouse.main(obj.objUniverse[i]);
                        transformObj(obj.parts[i],getMouseX() - mousePrev.x ,getMouseY() - mousePrev.y)
                        render_static();
                    }
    
                }

                multiSelect.mouseTransform.singularMain(sObj());
            }

            if(multiSelect.selectedObjects.length > 1) {
                multiSelect.transformAll(event.movementX / box.scaleFactor,event.movementY / box.scaleFactor);
            }

            if(multiSelect.selectedObjects.length && dynSimEdit.phSim) {
                multiSelect.forAll(function(o){
                    dynSimEdit.phSim.translate(dynSimEdit.map.get(o),{
                        "x": event.movementX,
                        "y": event.movementY
                    });
                });
            }

            render_static();

        }

        else {

            multiSelect.rectangle.w = getMouseX() - multiSelect.rectangle.x;
            multiSelect.rectangle.h = getMouseY() - multiSelect.rectangle.y;
    
            multiSelect.rectangle.getObjects.layer()

            render_static();
    
            if(multiSelect.rectangle.w && multiSelect.rectangle.h) {
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.rect(multiSelect.rectangle.x,multiSelect.rectangle.y,multiSelect.rectangle.w,multiSelect.rectangle.h);
                ctx.closePath();
                ctx.stroke();

                ctx.globalAlpha = 0.3;
                ctx.fill();
                ctx.globalAlpha = 1;

            }

        }

    },

    onmouseup: function() {

        window.removeEventListener("mousemove",multiSelect.onmousemove);
        window.removeEventListener("mouseup",multiSelect.onmouseup);

        if(multiSelect.mouseTransform.active) {
            multiSelect.mouseTransform.active = false;
            multiSelect.mouseTransform.specialPoint = false;
            multiSelect.mouseTransform.vertActive = false;
            multiSelect.mouseTransform.vertex = null;
        
            if(dynSimEdit.phSim) {
                for(b of multiSelect.mouseTransform.unlockedDynObjects) {
                    Matter.Body.setStatic(b.matter,false);
                }
            }
    
            multiSelect.mouseTransform.unlockedDynObjects = [];
        }

        render_static();
    },

    onshiftkeydown: function(e) {
        if(e.key === "Shift") {
            elm.addEventListener("click",multiSelect.addbymouse);
            render_static();
        }
    },

    onshiftkeyup: function(e) {
        if(e.key === "Shift") {
            elm.removeEventListener("click",multiSelect.addbymouse);
            render_static();
        }
    },

    ondblclick: function() {

        if(multiSelect.selectedObjects.length) {
            multiSelect.deselect();
        }

        else {
            multiSelect.addbymouse();
        }

        render_static();
    },

    /**
     * 
     * Add object by mouse if not included in array.
     * 
     */

    addbymouse: function() {
        if(mouseObject.mObj && !multiSelect.selectedObjects.includes(mouseObject.mObj)) {
            multiSelect.subjectIndexes.push({"L": mouseObject.gLayer, "O": mouseObject.gObject});
            multiSelect.selectedObjects.push(mouseObject.mObj);
        }
    },



    deselect: function() {
        multiSelect.subjectIndexes = [];
        multiSelect.selectedObjects = [];
        //multiSelect.rectangle.enabled = true;
    }

}

elm.addEventListener("mousedown",multiSelect.onmousedown);

elm.addEventListener("dblclick",multiSelect.ondblclick);

window.addEventListener("keydown",multiSelect.onshiftkeydown);
window.addEventListener("keyup",multiSelect.onshiftkeyup);

window.multiSelect = multiSelect;

export default multiSelect;