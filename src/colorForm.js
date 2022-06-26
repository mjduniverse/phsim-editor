	/*** 
	 * 
	 * Code for generating an image containing all HSL hues on color wheel
	 * Copyright Mjduniverse.com
	 * 
	*/

	var HSLCanvas = {

		h: function(w,h) {
			var hueCanvas = document.createElement("canvas");
			var hueCtx = hueCanvas.getContext("2d");
		
			hueCanvas.width = w;
			hueCanvas.height = h;
		
			var grad = hueCtx.createLinearGradient(0,hueCanvas.height * 0.5,hueCanvas.width,hueCanvas.height * 0.5)
		
			for(var h = 0; h < 361; h++) {
				grad.addColorStop(h/360,"hsl(" + h + ",100%,50% )");
			}
		
			hueCtx.fillStyle = grad
		
			hueCtx.fillRect(0,0,hueCanvas.width,hueCanvas.height);
		
			return hueCanvas
		},

		s: function(w,h,hue) {
			var satCanvas = document.createElement("canvas");
			var satCtx = satCanvas.getContext("2d");
		
			satCanvas.width = w;
			satCanvas.height = h;
		
			var grad = satCtx.createLinearGradient(0,satCanvas.height * 0.5,satCanvas.width,satCanvas.height * 0.5)
		
			for(var s = 0; s < 101; s++) {
				grad.addColorStop(s/101,"hsl(" + hue + "," + s + "%,50%)");
			}
		
			satCtx.fillStyle = grad
		
			satCtx.fillRect(0,0,satCanvas.width,satCanvas.height);
		
			return satCanvas
		},

		l: function(w,h,hue) {
			var lCanvas = document.createElement("canvas");
			var lCtx = lCanvas.getContext("2d");
		
			lCanvas.width = w;
			lCanvas.height = h;
		
			var grad = lCtx.createLinearGradient(0,lCanvas.height * 0.5,lCanvas.width,lCanvas.height * 0.5)
		
			for(var s = 0; s < 101; s++) {
				grad.addColorStop(s/101,"hsl(" + hue + ",50%," + s + "%)");
			}
		
			lCtx.fillStyle = grad
		
			lCtx.fillRect(0,0,lCanvas.width,lCanvas.height);
		
			return lCanvas
		}
	}



export default function colorForm(hexStr) {

    var body = document.createElement("div");
    body.className = "colorform-body";

    var clr = {
        parseInt: function(a) {
            
            var s = a.toString("16")
            
            if(a < 15) {
            s = "0" + s;
            }
            
            return s;
            
        },
        r: 0,
        g: 0,
        b: 0,
        hexStr: function() {
            return "#" + this.parseInt(clr.r) + this.parseInt(clr.g) + this.parseInt(clr.b)
        },
        "container": body,
        onupdateClr: function() {}
    }

    var container = document.createElement("div");

    function setHex(hexStr) {
        ctx.fillStyle = hexStr;                 
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        var imgData = ctx.getImageData(0,0,1,1).data;
        
        clr.r = imgData[0];
        clr.g = imgData[1];
        clr.b = imgData[2];
                        
        rNum.value = imgData[0];
        gNum.value = imgData[1];
        bNum.value = imgData[2];
    
        r.value = imgData[0];
        g.value = imgData[1];
        b.value = imgData[2];
    }

    
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.className = "clrCanvas";

    var hexInput = document.createElement("input");
    hexInput.className = "hexInput";
    hexInput.value = hexStr;
    hexInput.addEventListener("input",function(){
        setHex(this.value);
    });

    body.appendChild(canvas);

    body.appendChild(hexInput)

    body.appendChild(container);

    function onupdateClr() {
        ctx.fillStyle = clr.hexStr(); ctx.fillRect(0,0,canvas.width,canvas.height);
        hexInput.value = clr.hexStr();
        clr.onupdateClr();
    }

    function partialHex(str) {
        if(str.length === 0 || str.length === 1) {
            return "#000000"
        }
        
        if(str.length === 2) {
            return "#" + str[1] + "00000"
        }
        
        if(str.length === 3) {
            return "#" + str[1] + str[2] + "0000"
        }
        
        if(str.length === 4) {
            return "#" + str[1] + str[2] + str[3]+ "000"
        }
        
        if(str.length === 5) {
            return "#" + str[1] + str[2] + str[3]+ str[4] + "00"
        }
        
        if(str.length === 6) {
            return "#" + str[1] + str[2] + str[3]+ str[4] + str[5] + "0"
        }
        
        if(str.length === 7) {
            return str;
        }
    }

    var rgbHeader = document.createElement("h3");
    rgbHeader.innerText = "RGB:"

    /*** Text Inputs ***/

    var rNum = document.createElement("input");
    var gNum = document.createElement("input");
    var bNum = document.createElement("input");

    rNum.type = "number";
    gNum.type = "number";
    bNum.type = "number";

    rNum.min = 0;
    rNum.max = 255;

    gNum.min = 0;
    gNum.max = 255;

    bNum.min = 0;
    bNum.max = 255;

    rNum.addEventListener("input",function(){
        clr.r = Number.parseInt(this.value);
        r.value = Number.parseInt(this.value);
        onupdateClr();
    })

    bNum.addEventListener("input",function(){
        clr.b = Number.parseInt(this.value);
        b.value = Number.parseInt(this.value);
        onupdateClr();
    })

    gNum.addEventListener("input",function(){
        clr.g = Number.parseInt(this.value);
        g.value = Number.parseInt(this.value);
        onupdateClr();
    })

    /*** Range Inputs ***/

    var r = document.createElement("input");
    var g = document.createElement("input");
    var b = document.createElement("input");

    r.addEventListener("input",function(){
        clr.r = Number.parseInt(this.value);
        rNum.value = Number.parseInt(this.value);
        onupdateClr();
    })

    g.addEventListener("input",function(){
        clr.g = Number.parseInt(this.value);
        gNum.value = Number.parseInt(this.value);
        onupdateClr();
    })

    b.addEventListener("input",function(){
        clr.b = Number.parseInt(this.value);
        bNum.value = Number.parseInt(this.value);
        onupdateClr();
    })

    r.className = "colorRange red";
    g.className = "colorRange green";
    b.className = "colorRange blue";

    r.type = "range";
    g.type = "range";
    b.type = "range";

    r.min = 0;
    r.max = 255;

    g.min = 0;
    g.max = 255;

    b.min = 0;
    b.max = 255;

    /*** Input Pairs ***/

    var rPair = document.createElement("div");
    var bPair = document.createElement("div");
    var gPair = document.createElement("div");

    var rLabel = document.createElement("label");
    rLabel.className = "rgbLabel";
    rLabel.innerText = "Red:"
    rPair.appendChild(rLabel);
    rPair.appendChild(r);
    rPair.appendChild(rNum);

    var gLabel = document.createElement("label");
    gLabel.className = "rgbLabel";
    gLabel.innerText = "Green:"
    gPair.appendChild(gLabel);
    gPair.appendChild(g);
    gPair.appendChild(gNum);

    var bLabel = document.createElement("label");
    bLabel.className = "rgbLabel";
    bLabel.innerText = "Blue:"
    bPair.appendChild(bLabel);
    bPair.appendChild(b);
    bPair.appendChild(bNum);


    container.appendChild(rgbHeader);
    container.appendChild(rPair);
    container.appendChild(gPair);
    container.appendChild(bPair);



    /*** HSL Functions ***/

    var HSLCanvas = {

            h: function(w,h) {
                var hueCanvas = document.createElement("canvas");
                var hueCtx = hueCanvas.getContext("2d");
            
                hueCanvas.width = w;
                hueCanvas.height = h;
            
                var grad = hueCtx.createLinearGradient(0,hueCanvas.height * 0.5,hueCanvas.width,hueCanvas.height * 0.5)
            
                for(var h = 0; h < 361; h++) {
                    grad.addColorStop(h/360,"hsl(" + h + ",100%,50% )");
                }
            
                hueCtx.fillStyle = grad
            
                hueCtx.fillRect(0,0,hueCanvas.width,hueCanvas.height);
            
                return hueCanvas
            },

            s: function(w,h,hue) {
                var satCanvas = document.createElement("canvas");
                var satCtx = satCanvas.getContext("2d");
            
                satCanvas.width = w;
                satCanvas.height = h;
            
                var grad = satCtx.createLinearGradient(0,satCanvas.height * 0.5,satCanvas.width,satCanvas.height * 0.5)
            
                for(var s = 0; s < 101; s++) {
                    grad.addColorStop(s/101,"hsl(" + hue + "," + s + "%,50%)");
                }
            
                satCtx.fillStyle = grad
            
                satCtx.fillRect(0,0,satCanvas.width,satCanvas.height);
            
                return satCanvas
            },

            l: function(w,h,hue) {
                var lCanvas = document.createElement("canvas");
                var lCtx = lCanvas.getContext("2d");
            
                lCanvas.width = w;
                lCanvas.height = h;
            
                var grad = lCtx.createLinearGradient(0,lCanvas.height * 0.5,lCanvas.width,lCanvas.height * 0.5)
            
                for(var s = 0; s < 101; s++) {
                    grad.addColorStop(s/101,"hsl(" + hue + ",50%," + s + "%)");
                }
            
                lCtx.fillStyle = grad
            
                lCtx.fillRect(0,0,lCanvas.width,lCanvas.height);
            
                return lCanvas
            }
        }

    /*** HSL Form ***/

    var hslStruct = {
    h: "0",
    s: "100%",
    l: "50%"
    }

    function hsl2hex() {
        
    ctx.fillStyle = "hsl(" + hslStruct.h + "," + hslStruct.s + "," + hslStruct.l + ")";                 ctx.fillRect(0,0,canvas.width,canvas.height);
        
        var imgData = ctx.getImageData(0,0,1,1).data;
        
        clr.r = imgData[0];
        clr.g = imgData[1];
        clr.b = imgData[2];
                        
        rNum.value = imgData[0];
        gNum.value = imgData[1];
        bNum.value = imgData[2];
    
        r.value = imgData[0];
        g.value = imgData[1];
        b.value = imgData[2];

        onupdateClr()
    }

    var h3hsl = document.createElement("h3");
    h3hsl.innerText = "HSL"
    container.appendChild(h3hsl);

    var h = document.createElement("input");
    var s = document.createElement("input");
    var l = document.createElement("input");

    h.style = "background-image: url('" + HSLCanvas.h(400,20).toDataURL() + "')"

    h.addEventListener("input",function(){
        hslStruct.h = Number.parseInt(this.value);
        hNum.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
        s.style = "background-image: url('" + HSLCanvas.s(400,20,hslStruct.h).toDataURL() + "')"
        l.style = "background-image: url('" + HSLCanvas.l(400,20,hslStruct.h).toDataURL() + "')"
    })

    s.addEventListener("input",function(){
        hslStruct.s = Number.parseInt(this.value) + "%";
        sNum.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    l.addEventListener("input",function(){
        hslStruct.l = Number.parseInt(this.value) + "%";
        lNum.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    h.className = "colorRange h";
    s.className = "colorRange s";
    l.className = "colorRange l";

    h.type = "range";
    s.type = "range";
    l.type = "range";

    h.min = 0;
    h.max = 360;

    s.min = 0;
    s.max = 100;

    l.min = 0;
    l.max = 100;

    // HSL Number Inputs

    var hNum = document.createElement("input");
    var sNum = document.createElement("input");
    var lNum = document.createElement("input");

    hNum.type = "number";
    sNum.type = "number";
    lNum.type = "number";

    hNum.min = 0;
    hNum.max = 360;

    sNum.min = 0;
    sNum.max = 100;

    lNum.min = 0;
    lNum.max = 100;

    hNum.addEventListener("input",function(){
        hslStruct.h = Number.parseInt(this.value);
        h.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
        s.style = "background-image: url('" + HSLCanvas.s(400,20,hslStruct.h).toDataURL() + "')"
        l.style = "background-image: url('" + HSLCanvas.l(400,20,hslStruct.h).toDataURL() + "')"
    })

    sNum.addEventListener("input",function(){
        hslStruct.s = Number.parseInt(this.value) + "%";
        s.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    lNum.addEventListener("input",function(){
        hslStruct.l = Number.parseInt(this.value) + "%";
        l.value = Number.parseInt(this.value);
        hsl2hex();
        onupdateClr();
    })

    // Hex to HSL

    function getHSLFromRGB(r,g,b) {

        var k = {
            "r": r/255,
            "g": g/255,
            "b": b/255
        }

        var a = [k.r,k.g,k.b];

        var min = Math.min.apply(this,a);
        var max = Math.max.apply(this,a);

        var l = (min + max)/2

        var s = 0;

        if(l < 0.5) {
            var s = (max-min)/(max+min);
        }

        if(l > 0.5) {
            var s = (max-min)/(2-max-min);
        }

        var h = 0;

        if(max === k.r) {
            h = (k.g-k.b)/(max-min)
        } 

        if(max === k.g) {
            h = 2 + (k.b-k.r)/(max-min)
        } 

        if(max === k.b) {
            h = 4 + (k.r-k.g)/(max-min)
        } 

        h = h * 60

        return {
            "h": Math.round(h * 10),
            "s": Math.round(s * 10),
            "l": Math.round(l * 10)
        }

    }

    // HSL Pairs

    var hPair = document.createElement("div");
    hPair.className = "hPair";
    var hLabel = document.createElement("label");
    hLabel.innerText = "Hue:"
    hLabel.className = "rgbLabel h"
    hPair.appendChild(hLabel);
    hPair.appendChild(h);
    hPair.appendChild(hNum);
    container.appendChild(hPair);

    var sPair = document.createElement("div");
    sPair.className = "sPair";
    var sLabel = document.createElement("label");
    sLabel.innerText = "Saturation:"
    sLabel.className = "rgbLabel s"
    sPair.appendChild(sLabel);
    sPair.appendChild(s);
    sPair.appendChild(sNum);
    container.appendChild(sPair);

    var lPair = document.createElement("div");
    lPair.className = "lPair";
    var lLabel = document.createElement("label");
    lLabel.innerText = "Light:"
    lLabel.className = "rgbLabel l"
    lPair.appendChild(lLabel);
    lPair.appendChild(l);
    lPair.appendChild(lNum);
    container.appendChild(lPair);

    setHex(hexStr);

    return clr;
}