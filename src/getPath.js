function getPath(path,x,y) {

    var line = {
        pointA: null,
        pointB: null
    }

    var localCanvas = document.createElement("canvas");
    var localCtx = localCanvas.getContext("2d");

    localCtx.lineWidth = path.lineWidth;

    // Checks all sides except for the last line

    for(var i = 0; i < path.verts.length - 1; i++) {

        localCtx.moveTo(path.verts[i].x, path.verts[i].y);
        localCtx.lineTo(path.verts[i+1].x, path.verts[i+1].y);;
        localCtx.stroke();
        var cond = localCtx.isPointInStroke(x,y);

        if(cond) {
            line.pointA = path.verts[i];
            line.pointB = path.verts[i+1];
            return line;
        }

    }

    // Checks if point is in final side

    localCtx.moveTo(path.verts[path.verts.length - 1].x, path.verts[path.verts.length - 1].y);
    localCtx.lineTo(path.verts[0].x, path.verts[0].y);;
    localCtx.stroke();
    var cond = localCtx.isPointInStroke(x,y);

    if(cond) {
        line.pointA = path.verts[path.verts.length - 1];
        line.pointB = path.verts[0];
        line.pointA.last = true;
        return line;
    }


}

export default getPath;