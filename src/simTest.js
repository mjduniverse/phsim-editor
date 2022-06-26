import HTMLWin from "./htmlwin.js";
import createIFrameWindow from "./iframeWindow.js";
import { session } from "./session.js";
import { xLabeledButton } from "./xlabeled.js";


/******************** Simulation Testing *****************/

var simTest = {}

session.testSimulation = function() {

    window.addEventListener("unload",onunload);

    session.iframe_sim_test_ref = null;

    var c = "width=800,height=600";

    var a = window.open("./simtest.html","_blank",c);
    a.parent_window = window;


    var toggleButton = new xLabeledButton("Toggle",function(){
        session.iframe_sim_test_ref.toggle();
    });


}

document.querySelector(".testGame").addEventListener("click",session.testSimulation);

export default simTest;