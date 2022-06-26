/*** Create SVG Object ***/

var svgGen = {
	verts: function(obj) {

		var str = "";

		for(var i = 0; i < verts.length; i++) {
			strpart = verts[i].x + "," + verts.y + "";
			str = str + strpart;
		}

		var elm = document.createElement("polygon");
		elm.points = str;
		return elm;

	}
}