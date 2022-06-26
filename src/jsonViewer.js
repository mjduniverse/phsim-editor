import HTMLWin from "./htmlwin.js";
import { session } from "./session.js";

function JSONViewer(o) {

    // Open Window

    var w = window.open("");
    w.document.title = this.name = o.name || "";

    // Textarea

    this.textArea = w.document.createElement("textarea");
    this.textArea.readOnly = "true";
    this.textArea.value = JSON.stringify(o,null," ");
    this.textArea.classList.add("jsonviewer-textarea");
   
    w.document.body.appendChild(this.textArea);

}

session.JSONViewer = JSONViewer;

export default JSONViewer;