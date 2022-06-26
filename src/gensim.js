import objLoops from "./objloops.js";
import { session } from "./session.js";

/**
 * 
 * Get text array of wFunctions
 * 
 */

export function getWFunctionTxtArr(arrName,indent) {

    var a = [];
  
    a.push(`var ${arrName} = [];\n`);

    objLoops.subglobal_widgets(function(o){
        if(o.type === "wFunction") {
            
            var s = o.function;

            var n = "\n".padEnd(indent);

            s.replace(/\n/g,n)

            a.push(arrName + "[" + (a.length - 1) + "] = " + "function() {\n" + s + "\n};\n")
        }
    });

    return a.join("\n");

}

// Generate ZIP Folder

export function generateZipFolder() {

    var simObj = PhSim.Query.deepClone(session.sim);

    var zip = new JSZip();
    zip.file("saveFile.json",JSON.stringify(session.sim));

    // JavaScript files folder

    var js = zip.folder("js");

    // JavaScript audio folder

    var audio = zip.folder("audio");

    // Images folder

    var imgs = zip.folder("img");

    return new Promise(function(resolve,reject){

        var matter = new XMLHttpRequest();
        matter.open("get",document.querySelector("#matter-script").src);

        matter.addEventListener("load",function(){
            js.file("matter.js",matter.responseText);
            resolve();
        });

        matter.addEventListener("error",function(){
            reject("XMLHttpRequest Error");
        });

        matter.send();

    }).then(function(){
        return new Promise(function(resolve,reject){

            var polyDecomp = new XMLHttpRequest();
            polyDecomp.open("get",document.querySelector("#poly-decomp-script").src);

            polyDecomp.addEventListener("load",function(){
                js.file("poly-decomp.js",polyDecomp.responseText);
                resolve();
            });

            polyDecomp.addEventListener("error",function(){
                reject("XMLHttpRequest Error");
            });

            polyDecomp.send();

        }); 
    }).then(function(){
        return new Promise(function(resolve,reject){

            var phSim = new XMLHttpRequest();
            phSim.open("get",document.querySelector("#phsim-script").src);

            phSim.addEventListener("load",function(){
                js.file("phsim.js",phSim.responseText);
                resolve();
            });

            phSim.addEventListener("error",function(){
                reject("XMLHttpRequest Error");
            })

            phSim.send();

        })
    }).then(function(){

        return new Promise(function(resolve,reject){
            
            var a = session.phStaticRender.spriteImgObj.urls;
            
            var loaded = 0;
            var nameMap = {}
            var requests = [];
    
            for(var i = 0; i < a.length; i++) {
    
                requests[i] = new XMLHttpRequest();
                requests[i].responseType = "blob";
                requests[i].open("get",a[i]);
                requests[i]._index = i;

                var names = [];
    
                requests[i].addEventListener("load",function(){
                    
                    var urlParts = requests[this._index].responseURL.split("/");
                    var name = urlParts[urlParts.length - 1];
    
                    imgs.file(name,this.response);
                    
                    loaded++;
    
                    if(loaded === a.length) {
                        resolve();
                    }
    
                });
    
                requests[i].addEventListener("error",function(){
                    reject("XMLHttpRequest Error:");
                });

                PhSim.ObjLoops.global(simObj,function(o){
                    if(o.sprite) {

                        var urlParts = o.sprite.src.split("/");
                        var name = urlParts[urlParts.length - 1];

                        o.sprite.src = "./img/" + name;
                    }
                });
    
                requests[i].send();
    
            }

            if(a.length === 0) {
                resolve();
            }
            
        }); 
    
    
    }).then(function(){

        return new Promise(function(resolve,reject){
            resolve();
        });

    }).then(function() {

        return new Promise(function(resolve,reject){

            var t = txtSim({
                i:2,
                sim: simObj
            });

            js.file("config.js",t);
            resolve();

        });

    })
    .then(
        function() {
            return new Promise(function(resolve,reject){

                var html = new XMLHttpRequest()
                html.open("get","./generator/exported-sim-template.html");

                html.addEventListener("load",function() {
                    zip.file("index.html",html.response);
                    resolve();
                });

                html.addEventListener("error",function(){
                    reject();
                })

                html.send();

            });
        }
    ).then(function(){
        return zip.generateAsync({type: "blob"}).then(function(blob){
            saveAs(blob,"project.zip");
        });
    }).catch(function(o){
        console.error(o)
    });

}

export function txtSim(options) {

    var a = [];
    var newSim = PhSim.Query.deepClone(options.sim);



    objLoops.subglobal_widgets(function(o){
        if(o.type === "wFunction") {
            a.push(o.function.split("\n"))
        }
    });

    for(var i = 0; i < a.length; i++) {
        
        for(var j = 0; j < a[i].length; j++) {
            a[i][j].padStart(options.i," ");
        }

        a[i] = a[i].join("\n");
    }

    var wFunctions = 0;
    var sprites = 0;

    var s = getWFunctionTxtArr("wFunctions",options.i) + "\n // PhSim Configuration \n\nvar o = " + JSON.stringify(newSim,function(key,value){
        if(key === "function" && this.type === "wFunction") {
            return wFunctions++;
        }

        else {
            return value;
        }

    },options.i);

    s = s + "\n\no.wFunctions = wFunctions \n\n"

    s = s + "\n\n// PhSim new Object \n\nvar phSim = new PhSim(o); \n\n//Target Element\n\nvar targetElement = document.body  \n\ntargetElement.appendChild(phSim.container)";

    s = s + "\n\n// Play PhSim automatically. \n\nphSim.play(); \n\n"

    return s;

}

//document.querySelector(".generate-zip").addEventListener("click",generateZipFolder)