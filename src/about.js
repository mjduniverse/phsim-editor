import HTMLWin from "./htmlwin.js";

function aboutPhSimEditor() {

	var startupHtmlAlert = document.createElement("div");
	startupHtmlAlert.style = "text-align: center;";
			
	var htmlAlertLogo = document.createElement("img");
	htmlAlertLogo.src = "./img/phsim-logo.svg";
	htmlAlertLogo.style = "width: 300px;";
		
	htmlAlertLogo.addEventListener("load",function(){
		m.setToCenter();
	});
		
	startupHtmlAlert.appendChild(htmlAlertLogo);
		
	var m = new HTMLWin("","","superWin");
	m.winBody.appendChild(startupHtmlAlert);
		
	// Description
		
	var desc = document.createElement("div");
		
	desc.style = "margin: 20px;"
		
	desc.innerHTML = `
			
		<h3>Welcome to the PhSim editor!</h3>

		<p>Welcome to the PhSim editor. It is currently in alpha testing.</p>
		<p>If there are any bugs, you can contact the creator at webmaster@mjduniverse.com.</p>
			
		<p><strong>Do not forget to save your creations. I will not be hosting them.</strong></p>

		<h3>Credits</h3>

		Copyright 2020 Mjduniverse.com <br>
		<a href="https://brm.io/matter-js/">Matter.js</a> is created by liabru.

		<p>The PhSim editor currently uses PhSim v0.2.2-alpha.</p>

		<p><a href="https://mjduniverse.com/terms-of-service">Mjduniverse.com Terms of Service</a> | <a href="https://mjduniverse.com/privacy-policy">Mjdunvierse.com Privacy Policy</a></p>

			
	`;
		
	m.winBody.appendChild(desc);
		
	m.appendToDocumentBody();
		
	m.setToCenter();

}

document.querySelector(".about").addEventListener("click",aboutPhSimEditor);

export default aboutPhSimEditor;