/*** 

Color Conversion Module
Copyright Mjduniverse.com

***/

var Color = {}

Color.hexToDec = function(hexstr) {
    var colorHex = {
        r: hexstr[1] + hexstr[2],
        g: hexstr[3] + hexstr[4],
        b: hexstr[5] + hexstr[6],
    }

    var colorDec = {
        r: parseInt(colorHex.r, 16),
        g: parseInt(colorHex.g, 16),
        b: parseInt(colorHex.b, 16),
    }

    return colorDec;
}

export default Color;