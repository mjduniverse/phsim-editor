function getArrCentroid(array) {

    var a = [];

    var s = {
        "x": 0,
        "y": 0
    };

    for(var i = 0; i < array.length; i++) {
        a.push(PhSim.Centroid.shape(array[i]));
    }

    for(var i = 0; i < a.length; i++) {
        s.x = s.x + a[i].x;
        s.y = s.y + a[i].y;
    }

    s.x = s.x / a.length;
    s.y = s.y / a.length;

    return s;
}

export default getArrCentroid;