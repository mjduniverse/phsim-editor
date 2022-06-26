function createTempImgURL(base64url) {

    var s = atob(base64url.split(",")[1]);

    var type = base64url.split(";")[0].split(":")[1]; 

    var a = [];

    for(var i = 0; i < s.length; i++) {
        a.push(s[i].codePointAt());
    }

    var uint8 = Uint8Array.from(a);

    var blob = new Blob([uint8],{
        type: type
    });

    return URL.createObjectURL(blob);
}

window.createTempImgURL = createTempImgURL;

export default createTempImgURL;