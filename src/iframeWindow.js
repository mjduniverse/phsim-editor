import HTMLWin from "./htmlwin.js";

function createIFrameWindow(src,title) {
    var o = new HTMLWin(title,"iframe-window","superWin",);
    var iframe = document.createElement("iframe");
    o.appendChild(iframe);
    iframe.src = src;
    return o;
}

export default createIFrameWindow;