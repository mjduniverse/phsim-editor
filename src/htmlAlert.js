import HTMLWin from "./htmlwin.js";

function HTMLAlert(message, onok = function() {} ) {

    var this_a = this;
    
    var messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;

    this.messageDiv = messageDiv;

    this.htmlWin = new HTMLWin("Message:","alert","superWin",false);

    this.closeButton = document.createElement("span");
    this.closeButton.className = "button red";
    this.closeButton.innerText = "OK";
    this.closeButton.addEventListener('click', function() {
        this_a.htmlWin.remove();
        onok();
    });

    this.htmlWin.winBody.appendChild(messageDiv);
    this.htmlWin.winBody.appendChild(this.closeButton);

    this.htmlWin.appendTo(document.body);
}

export default HTMLAlert;