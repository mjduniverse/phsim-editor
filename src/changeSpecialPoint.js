import { calc_vert_distance } from "./vertices.js";

export default function changeSpecialPoint(object,x,y) {

    if(object.shape === "circle" || object.shape === "regPolygon") {
        var r = calc_vert_distance(object.x,object.y,x,y);
        var a = Math.atan2((y - object.y),(x - object.x));


        object.radius = r;
        object.cycle = a;

    }

    if(object.shape === "rectangle") {

        var c = PhSim.Centroid.shape(object);
        var r = calc_vert_distance(c.x,c.y,x,y);
        var a = Math.atan2((y - c.y),(x - c.x));
        object.cycle = a;

    }

}