import HTMLWin from "./htmlwin.js";

function HTMLConfirm(message,onok = function() {} ,oncancel = function() {} ) {
		
    var this_a = this;
    
    var messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;

    this.htmlWin = new HTMLWin("Message:","alert","superWin",false);

    this.okButton = document.createElement("span");
    this.okButton.className = "button ok";
    this.okButton.innerText = "OK";
    this.okButton.addEventListener('click', function() {
        this_a.htmlWin.remove();
        onok();
    });
    
    this.htmlWin.winBody.appendChild(messageDiv);

    this.htmlWin.winBody.appendChild(this.okButton);

    this.cancelButton = document.createElement("span");
    this.cancelButton.className = "button red";
    this.cancelButton.innerText = "Cancel";
    this.cancelButton.addEventListener('click', function() {
        this_a.htmlWin.remove();
        oncancel();
    });

    this.htmlWin.winBody.appendChild(this.cancelButton);

    this.htmlWin.appendTo(document.body);
}

export default HTMLConfirm;