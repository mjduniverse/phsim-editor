import createTempImgURL from "./createTempImgURL.js";
import { ctx } from "./elements.js";
import HTMLAlert from "./htmlAlert.js";
import { selectionObject } from "./mouseObject.js";
import objLoops from "./objloops.js";
import render_static from "./render_static.js";
import {session} from "./session.js";
import { selectsimulation } from "./shortcuts.js";
import simProxyHandler from "./simproxyhandler.js";
import { generateSimulationSelection } from "./toolbar.js";

function loadSim(argument) {

    session.jszip = new JSZip();

    var spriteCanidates = [];
    var deletedSpriteSrc = [];
    session.tempimgurls = [];

    return new Promise(function(resolve,reject){

        session.msg.innerText = "Loading Simulation..."

        if(!Array.isArray(argument.simulations)) {
            throw "Error: Invalid value for property 'simulations'. Property must be an array";
        }

        else {
            for(var i = 0; i < argument.simulations; i++) {
                
                var simulation = argument.simulations[i];

                if(!Array.isArray(simulation.layers)) {
                    throw "The layers property must be an array in simulation " + i;
                }

                else {

                    for(var j = 0; j < simulation.layers.length; j++) {

                        var layer = simulation.layers[j];

                        if(!Array.isArray(layer.objUniverse)) {
                            throw "The objUniverse property in layer object " + j + ", simulation object" + i + ", must be an array";
                        }

                    }

                }

            }
        }


        if(selectionObject.selected) {
            multiSelect.deselect()
        }

        session.loaded = false;

        //sim = new Proxy(argument,simProxyHandler)
        session.sim = argument;
        session.sim_proxy = new Proxy(argument,simProxyHandler);
        session.sim_dir = argument;
        
        selectsimulation(0);
        session.selectedLayerI = 0;
        session.phStaticRender = new PhSim.PhRender(ctx);

        session.initStaticSprites = [];

        resolve();

    }).then(function(){

        return new Promise(function(resolve,reject){

            session.msg.innerText = "Loading embedded sprites..."

            if(Array.isArray(session.sim.base64imgurls)) {
                for(var i = 0; i < session.sim.base64imgurls.length; i++) {
                    session.msg.innerText = "Processing embedded sprite " + i + "...";
                    var url = createTempImgURL(session.sim.base64imgurls[i]);
                    session.tempimgurls.push(url);
                }
            }

            var checked = 0;

            objLoops.global(function(obj){

                if(obj.sprite) {
                    spriteCanidates.push(obj.sprite);

                    if(typeof obj.sprite.base64 === "number") {
                        obj.sprite.src = session.tempimgurls[obj.sprite.base64];
                    }

                }
            });

            if(spriteCanidates.length === 0) {
                resolve();
            }
    
            else for(var i = 0; i < spriteCanidates.length; i++) {
    
                var obj = spriteCanidates[i];
    
                session.msg.innerText = "Attempting to load sprite \" " + obj.src + "\""
    
                var xhr = new XMLHttpRequest();
    
                xhr._sprite = obj;
    
                xhr.open("get",obj.src);
    
                xhr.addEventListener("load",function(){

                    if(this.status === 404) {

                        session.msg.innerText = "Sprite \" " + this._sprite.src + "\" deleted due to sprite error."
                        deletedSpriteSrc.push(this._sprite.src);

                        xhr._sprite.src = "";
                        reject("Error 404 for url \"" + this._sprite.src + "\".");

                    }

                    else {
                        session.initStaticSprites.push(this._sprite);
                        session.initStaticSpriteUrls.add(this._sprite.src);
                        session.msg.innerText = "Sprite \" " + this._sprite.src + "\" loaded."
                    }

                    checked++;

                    if(checked === spriteCanidates.length) {
                        resolve();
                    }

                });

                xhr.addEventListener("error",function(e){
                    reject(e)
                })
    
                xhr.send();

            }
            
        });

    }).then(function(){
        return new Promise(function(resolve,reject){

            objLoops.global(function(o){

                session.msg.innerText = "Checking for boolean defintions in object \"" + o.name + "\"";

                if(o.rectangle) {
                    o.shape = "rectangle";
                }

                if(o.circle) {
                    o.shape = "circle";
                }

                if(o.regPolygon) {
                    o.shape = "regPolygon";
                }

                if(o.polygon) {
                    o.shape = "polygon";
                }

            })

            session.msg.innerText = "Assigning sprites to sprite catche"

            session.phStaticRender.spriteImgObj = new PhSim.Sprites.spriteImgObj(Array.from(session.initStaticSpriteUrls.values()),function(){
                resolve();
            });

        });
    }).then(function(){

        return new Promise(function(resolve,reject){

            session.phStaticRender.sim = session.sim;
    
            session.loaded = true;
    
            session.layers = session.sim.simulations.layers;
    
            session.syn.layers();
    
            generateSimulationSelection()
    
            render_static();
    
            resolve();
    
        });
        
    }).catch(function(e){
        new HTMLAlert("Error:" + e);
    })

}

export default loadSim;