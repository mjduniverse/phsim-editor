export var elmName = '.bbb';

export var elm = document.querySelector(elmName);

elm.style.position = "absolute";
elm.style.top = "0px";

export var ctx = elm.getContext('2d');

function setCanvasSizeToWindow() {
    elm.width = window.screen.width;
    elm.height =  window.screen.height;
}

setCanvasSizeToWindow();

//window.addEventListener("resize",setCanvasSizeToWindow);