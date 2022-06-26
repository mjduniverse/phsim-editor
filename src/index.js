/***

Physics Simulator 1.0
Copyright 2019-2020 Mjduniverse.com

@author Mjduniverse.com
@version 1.0

***/

/**
 * Make it so it asks before the user leaves.
 */

window.onbeforeunload = function(){
	return false;
};

/**
 * Make HTMLWin draggable
 */

$(".winWrapper.htmlWin").draggable({
	containment: "window"
});

/**
 * Use phsim as a matter plugin.
 */

Matter.use(PhSim.matterPlugin);

// User Preferences

import usrPref from "./usrpref.js";

// HTML Elements

import {elm,ctx,elmName} from "./elements.js";

// Swaping Array Elements

import swapArrayElements from "./swapArrayElements.js";

// Get centroid of array

import getArrCentroid from "./getArrayCentroid.js"

// Top Menu Bar

import {items} from "./topMenuBar.js";

// Inputs

import "./keyinputs.js";

// Shape Window

import "./shapewin.js";

// FollowMeRect

import FollowMeRect from "./followMeRect.js";

// Clipboard

import Clipboard from "./clipboard.js"

// Canvas Function Mouse

import canvasFunctionMouse from "./canvasFunctionMouse.js";

// Get Path

import getPath from "./getPath.js";

// Generate Simulation

import "./gensim.js";

// Get Vertices by Circle

import {getVertsByCircleAndObj,calc_vert_distance} from "./vertices.js"

// multiSelect

import {sObj,mObj,mouseObject,selectionObject} from "./mouseObject.js"

// HTML Modals

import HTMLWin from "./htmlwin.js";
import HTMLAlert from "./htmlAlert.js";
import HTMLConfirm from "./htmlConfirm.js";

// PForm Module

import PForm from "./pform.js";

// HTML Factory Modules

import {elementFromHTML,elementFromObject} from "./htmlFactory.js"

// RectCalc

import RectCalc from "./rectCalc.js";

// vertpen

import vertPen from "./vertpen.js"

// Constraint Adder

import "./constraintAdder.js"

// Rectangle Creator

import "./rectangleCreator.js";

// Circle Creator

import "./circleCreator.js"

// rectangleditor

import rectangleEditor from "./rectangleEditor.js";

// Insert Point By Mouse

import insertPointByMouse from "./insertPointByMouse.js";

// Edit Constraint

import editConstraint from "./editConstraint.js";

// Elevator Editor

import "./editElevatorByMouse.js";

// Regular Polygon Creator

import regPolygonCreator from "./regPolygonCreator.js";

// DynSimEdit

import dynSimEdit from "./dynSimEdit.js";

// Render Static

import render_static from "./render_static.js"
elm.addEventListener("mousemove",render_static);

// XSelectionMenu

import XSelectionMenu from "./xSelectionMenu.js"

// xlabeled Library

import {tr_xLabeledInput,tr_xLabeledElement,xLabeledButton,xLabeledInput} from "./xlabeled.js";

// HTML Factory 2

import {compositeHTMLElement,createAppendElm,createAppendTxtElm,keyAndValueTxtRow} from "./htmlFactory2.js";

// Toolbar 

import "./toolbar.js";

// Object Editor

import ObjectEditor from "./objectEditor.js";

// File Operations

import file from "./file.js";

// Color Form

import colorForm from "./colorForm.js";

// Color Field

import ColorField from "./colorField.js";

// ctrlShortcuts

import ctrlShortcuts from "./ctrlShortcuts.js"

// Layer Tree

import LayerTree from "./layerTree.js";

// Context Menu

import ContextMenu from "./contextMenu.js";

// Widgets Object

import widgets from "./widgets.js"

// simtest object

import simTest from "./simTest.js"

// Session Variables

import objLoops from "./objloops.js"

// box Object

import box from "./box.js"

// JSON viewer

import "./jsonViewer.js";

// Getting Mouse

import {getMouseX,getMouseY,mousePrev} from "./getmouse.js"

// Session Object

import {session,getSelectionRadius} from "./session.js";

// 

import { getSelectedSimulation, LO, SL, SLO } from "./shortcuts.js";

// About Message

import aboutPhSimEditor from "./about.js"

// Multiselect

import multiSelect from "./multiSelect.js";

// createIFRameWindow

import createIFrameWindow from "./iframeWindow.js";
window.createIFrameWindow = createIFrameWindow;

//

import "./bar.js";

// Load Sim

import loadSim from "./loadSim.js";
import stringifyProjectJSON from "./stringifyProjectJSON.js";


	var ahddConstraint = {

		type: null,

		single: {
			object: null,
			point: null,
			rel: null
		},

		onmouseclick: function() {
			if(addConstraint.mode === "single") {

				if(!addConstraint.object && !addConstraint.point) {
					addConstraint.single.object = mouseObject.mObj;
					addConstraint.single.rel = PhSim.Vector.subtract(getMouse(),PhSim.Centroid.shape(this.single.object))
					return true;
				}

				if(addConstraint.object && !addConstraint.point) {
					addConstraint.single.object = new PhSim.Constraints.Static.Constraint(getMouseX(),getMouseY());
					return true;
				}

			}
		}
	}



	/*** 
	 * 
	 * Generate menus for 
	 * 
	*/

	/*** Error Handling ***/

	window.addEventListener("error",function(err) {

		var mainScriptCond = (document.querySelector(".main-script") === err.filename);
		var clagetSelectedSimulationibCond = (document.querySelector(".class-lib-js-script") === err.filename)

		if(mainScriptCond || clagetSelectedSimulationibCond) {
			var errMsg = new HTMLWin("Error:","js-error","superwin",false);
			errMsg.appendToDocumentBody();
		}

	})

	// Generate Irregular Polygon From shapes

	function genPath(regPolygon) {

		regPolygon.verts = JSON.parse(JSON.stringify(PhSim.Vertices.regPolygon(regPolygon)));
		
		delete regPolygon.x;
		delete regPolygon.y;
		delete regPolygon.cycle;
		delete regPolygon.radius;
		delete regPolygon.n;
		delete regPolygon.shape;

		regPolygon.shape = "polygon";
	}


// Object Loops

//

document.querySelector(".phsim-docs").addEventListener("click",function(){
	window.open("https://dev.mjduniverse.com/phsim/docs/")
});

/***
* 
*  Autosave
* 
****/

if(session.usrPref.autosave) {
	setInterval(function(){
		if(typeof session.sim === "object" && !simTest.active) {
			localStorage.setItem("phsim_autosave", stringifyProjectJSON(session.sim));
		}
	},10 * 1000);
}

/**
 * Error message
 */

window.createErrorAlert = function(s) {
	new HTMLAlert("Error:" + s);
}

/*** 
 * 
 * Load default or autosave
 * Render everything. 
 * Always before the logo window.
 * 
***/

msg.innerText = "Checking for autosaved simulation..."

if(usrPref.autosave && localStorage["phsim_autosave"] && localStorage["phsim_autosave"] !== "undefined") {
	new HTMLConfirm("A simulation has been autosaved. Do you want to load it?",function(){
		loadSim(JSON.parse(localStorage["phsim_autosave"]),function(key,value){
			if(typeof this[key] === "function" && key === "function") {

			}
		});
	},function(){
		loadSim(new PhSim.Static());		
	})
}

else {
	loadSim(new PhSim.Static());
}

// Execute 

aboutPhSimEditor();