// Get unit vector representing angle

export function getUnitCircleVector(radians) {
    var x = Math.cos(radians);
    var y = Math.sin(radians);

    return new PhSim.Vector(x,y);
}

export function getAngleVector(radians,length) {
    var vector = getUnitCircleVector(radians);

    vector.x = vector.x * length;
    vector.y = vector.y * length;

    return vector;
}