import objLoops from "./objloops.js";

// Get Universal Vertex Array

export function getUniversalVertexArray() {
    var a = [];
    objLoops.rel_index_subglobal(function(obj){
        if(obj.shape === "polygon") {
            for(var i = 0; i < obj.verts.length; i++) {
                a.push(obj.verts[i]);
            }
        }
    },simulationI)
    return a;
}

// Get Universal Vertex Set By Radius

export function getVertsByCircle(r,x,y) {

    var a = getUniversalVertexArray();
    var b = [];

    for(var i = 0; i < a.length; i++) {
        if(calc_vert_distance(x,y,a[i].x,a[i].y) < r) {
            b.push(a[i])
        }
    }

    return b;

}


export function getVertsByCircleAndObj(obj,r,x,y) {
    var a = obj.verts;
    var b = [];

    for(var i = 0; i < a.length; i++) {
        if(calc_vert_distance(x,y,a[i].x,a[i].y) < r) {
            b.push(a[i])
        }
    }

    return b;

}

export function calc_vert_distance(a, b, c, d) {
		
    var x = a - c;
    var y = b - d;
    
    return Math.sqrt(x*x + y*y);
}


export function transformVertices(verts,x,y) {
	for(var m = 0; m < verts.length; m++) {
		verts[m].x += x;
		verts[m].y += y;
	}

	return verts;
}

export function findCentroidOfVertices(a) {
	
	var v = {
		x: 0,
		y: 0,
	}
	
	for(var j = 0; j < a.length; j++) { 
	    v.x += a[j].x;
		v.y += a[j].y;
	}
	
	v.x = (1/a.length) * v.x;
	v.y = (1/a.length) * v.y;
	
	return v;
}

export function rotateAroundO(argx,argy,angle) {
    var m = {
        x: argx * Math.cos(angle) - argy * Math.sin(angle),
        y: argx * Math.sin(angle) + argy * Math.cos(angle)
    }
    
    return m;
}

// Vector objects

export function v_calc_vert_distance(vector1,vector2) {
    return calc_vert_distance(vector1.x,vector1.y,vector2.x,vector2.y)
};

/*** Rotate Object around Centroid by angle ***/

export function v_rotateAroundCentroid(vertices,angle) {
	
	var cent = findCentroidOfVertices(a);
	
	// Transform all points to origin point of canvas
	
	transformVertices(vertices,-cent.x,-cent.y);
	
	for(var i = 0; i < vertices.length; i++) {
		var k = rotateAroundO(vertices[i].x, vertices[i].y,angle);
		vertices[i].x = k.x;
		vertices[i].y = k.y;
	}
	
	// Transform all points to centroid point of path
	
	transformVertices(a,cent.x,cent.y);
	
	return a;
}