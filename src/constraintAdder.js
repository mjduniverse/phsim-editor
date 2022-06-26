import { elm } from "./elements.js";
import { getMouse } from "./getmouse.js";
import { mouseObject } from "./mouseObject.js";
import shapeWindow from "./shapewin.js";
import { getSelectedSimulation } from "./shortcuts.js";

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

        if(mouseObject.cond) {

            var lo = {
                L: mouseObject.gLayer,
                O: mouseObject.gObject
            }

            this.objectA = lo;
        }

        this.pointA = getMouse();

        document.querySelector("#msg").innerHTML = "Now, select another object or point"

        this.first = true;

        return 0;
    }

    if(this.second === false) {

        var lo = {
            L: mouseObject.gLayer,
            O: mouseObject.gObject
        }

        if(mouseObject.cond) {
            this.objectB = lo;
        }


        this.pointB = getMouse();

        var m = new PhSim.Constraints.Static.Constraint();
        m.pointA = this.pointA;
        m.pointB = this.pointB;
        m.objectA = this.objectA;
        m.objectB = this.objectB;

        getSelectedSimulation().widgets = getSelectedSimulation().widgets || [];

        getSelectedSimulation().widgets.push(m)

        this.second = true;

        elm.removeEventListener("click",this.func);
        ConstraintAdder.ref = null;

        return 0;

    }

}

ConstraintAdder.prototype.activate = function() {
    this.func = this.onmouseclick.bind(this);
    elm.addEventListener("click",this.func);
    document.querySelector("#msg").innerHTML = "First, select an object or point";
}

ConstraintAdder.prototype.deactivate = function() {
    elm.removeEventListener("click",this.onmouseclick);
    ConstraintAdder.ref = null;
}

ConstraintAdder.ref = null;

shapeWindow.addConstraint.addEventListener('click',function() {
    var a = new ConstraintAdder();
});