function start_simtest() {

    simTest.active = true;
    render_static_enabled = false;
    
    var htmlWin = new HTMLWin("Simulation Test","simtest","superWin");

    var dynSim = new PhSim(sim);

    simTest.dynSim = dynSim;


    htmlWin.winBody.appendChild(dynSim.simContainer);

    htmlWin.appendToDocumentBody();
    dynSim.play();

    htmlWin.closeButton.addEventListener("click",function(){
        simTest.active = false;
        render_static_enabled = true;
        delete simTest.dynSim;
        dynSim.exit();
    })

}