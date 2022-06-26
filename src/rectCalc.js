/*** RectCalc - Used for dealing with rectangles ***/

var RectCalc = function(ctx,x,y,w,h) {

    this.ctx = ctx;

    this.setDimensions(x,y,w,h);

    var this_a = this;

    this.drawFollowMe = true;
    
    this.followMeDiagRect = function() {
        
    }

}

// Setting dimensions of the rectangle

RectCalc.prototype.setDimensions = function (x,y,w,h) {

    this.strokeStyle = "black";
    this.lineWidth = 3;
    this.fillStyle = "gray";

    var thisAlias = this;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.upperLeftCorner = {x: thisAlias.x, y: thisAlias.y};
    this.upperRightCorner = {x: thisAlias.x + thisAlias.w, y: thisAlias.y + thisAlias.h};
    this.lowerLeftCorner = {x: thisAlias.x, y: thisAlias.y + thisAlias.h};
    this.upperLeftCornder = {x: thisAlias.x + thisAlias.w, y: thisAlias.y};
    this.centroid = {x: 0.5 * thisAlias.w,  y: 0.5 * thisAlias.h};

    this.objUpdate();
}

// Draw the rectangle.

RectCalc.prototype.beforeDraw = function() {}
RectCalc.prototype.afterDraw = function() {}

RectCalc.draw = function(rectangleCalc,ctxArg) {
    this.beforeDraw()


    this.ctx.strokeStyle = rectangleCalc.strokeStyle;
    this.ctx.lineWidth = rectangleCalc.lineWidth;
    this.ctx.fillStyle = rectangleCalc.fillStyle;

    this.ctx.rotate(this.cycle)
    this.ctx.beginPath();
    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.stroke();

    this.afterDraw();
}

RectCalc.prototype.draw = function() {

    this.beforeDraw()

    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.fillStyle = this.fillStyle;

    this.ctx.beginPath();
    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.stroke();
    this.ctx.fill();

    this.afterDraw();
}

// Set the rectangle's dimension using a line such that the two ends of the line form a diagonal from the upper left corner to the lower right corner.

RectCalc.prototype.setByDiag = function (a,b,c,d) {
    
    var w = c-a;
    var h = d-b;

    this.setDimensions(a,b,w,h);

}

RectCalc.prototype.beforeUpdate = function() {}
RectCalc.prototype.afterUpdate = function() {}

RectCalc.prototype.objUpdate = function() {

    this.beforeUpdate();

    this.obj = new PhSim.Static.Rectangle(this.x,this.y,this.w,this.h);

    this.obj.strokeStyle = this.strokeStyle
    this.obj.lineWidth = this.lineWidth
    this.obj.fillStyle = this.fillStyle

    this.afterUpdate();

}

RectCalc.prototype.addToLayer = function(layer) {
    layer.objUniverse.push(this.obj);
}

/**
 * 
 * Check if a point is in a path, utilizing the JavaScript canvas API.
 * 
 * @function isPointInPath
 * @param {Number} x - The x-coordinate of the point.
 * @param {Number} y - The y-coordinate of the point.
 */

RectCalc.prototype.isPointInPath = function(x,y) {

    var v_canvas = document.createElement("canvas");
    var v_ctx = v_canvas.getContext("2d");

    var c = PhSim.Centroid.rectangle(this);

    v_ctx.translate(c.x,c.y);
    v_ctx.rotate(this.cycle);
    v_ctx.beginPath();
    v_ctx.rect(-this.w / 2,-this.h / 2,this.w,this.h);
    var z = v_ctx.isPointInPath(x,y);
    v_ctx.stroke();

    return z;

}

/**
 * 
 * Check if a point (px,py) is in the rectangle, not utulizing the HTML canvas.
 * 
 * @function isPointInRaw
 * @param {Number} px - The x-coordinate of the point.
 * @param {Number} py - The y-coordinate of the point.
 */

RectCalc.prototype.isPointInRaw = function(px,py) {
    
    var cond = (this.obj.x < px) && (px < this.obj.x + this.obj.w) && (this.obj.y < py) && (py < this.obj.y + this.obj.h) 

    if(cond) {
        return true;
    }

    else {
        return false;
    }
}

RectCalc.prototype.isObjectInRectangleRaw = function(object) {

        var cond = true;
        
        if(object.shape === "polygon") {
            for(i = 0; i < object.verts.length; i++) {
                if(this.isPointInRaw(object.verts[i].x,object.verts[i].y)) {
                    cond = cond && false;
                }
            }
        }

        if(object.shape === "rectangle") {
            return this.isPointInRaw(object.x,object.y) && this.isPointInRaw(object.x + object.w,object.y + object.h);
        }

        // Reverse the conditional, 
        // because the loop checks for the existence of a point that is not in 

        cond = !cond;

        return cond;

}

/**
 * @function isObjectInRectangle
 * @param {Object} object - Static object to be checked.
 */

RectCalc.prototype.isObjectInRectangle = function(object) {
        
        if(object.shape === "polygon") {

            for(var i = 0; i < object.verts.length; i++) {
                if(!this.isPointInPath(object.verts[i].x,object.verts[i].y)) {
                    return false;
                }
            }

            return true
        }

        if(object.shape === "rectangle") {
            return this.isPointInPath(object.x,object.y) && this.isPointInPath(object.x + object.w,object.y + object.h);
        }

        if(object.shape === "circle" || object.shape === "regPolygon") {
            var boundingRect = PhSim.BoundingBox.fromShape(object);
            return this.isPointInPath(boundingRect.x,boundingRect.y) && this.isPointInPath(boundingRect.x + boundingRect.w,boundingRect.y + boundingRect.h);

        }

}

export default RectCalc;