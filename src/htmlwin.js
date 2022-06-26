function HTMLWin(title = "", htmlClass = "", species = "htmlWin", closeable = true, startHidden = false) {
		
    HTMLWin.instances.push(this);

    this.win = document.createElement('div');
    this.h3 = document.createElement('h3');
    this.winBody = document.createElement('div');
    this.win = document.createElement('div');

    this.winWrapper = document.createElement('div');

    this.closeButton = document.createElement('span');

    /**
     * Minimize Button
     */

    this.minimizeButton = document.createElement('span');
    this.minimizeButton.className = "htmlwin-min-button";

    this.minimizeButton.addEventListener("click",function(){
        thisAlias.minimizeToggle();
    })

    this.h3.className = "htmlwin-h3-header";
    
    this.closeButton.className = "htmlwin-close-button";
    
    var thisAlias = this; // Used as an alias for the "this" keyword.
    
    this.closeButton.addEventListener('click', function() {
        thisAlias.remove();
    });
    
    this.winWrapper.className = "winWrapper " + species;
        
    if(species === "htmlWin") {
        this.win.className = "win " + htmlClass;
    }
    
    if(species === "superWin") {
        this.win.className = "superWin " + htmlClass;
    }
    
    if(species === "fullScreenWin") {
        this.win.className = "fullScreenWin " + htmlClass;
    }
    
    this.winBody.className = "winBody ";
    
    this.h3.innerText = title;

    if(closeable === true) {
        this.h3.appendChild(this.closeButton);
        this.h3.appendChild(this.minimizeButton);
    }

    
    this.win.appendChild(this.h3);
    this.win.appendChild(this.winBody);
    
    this.winWrapper.appendChild(this.win);
    
    this.species = species;
}

HTMLWin.instances = [];

HTMLWin.baseZIndex = 1000;

HTMLWin.creationMethods = {
    "int": []
};

HTMLWin.addCreationEvent = function(eventClass,call) {
    HTMLWin.creationMethods[eventClass].push(call);
},

HTMLWin.prototype.getWinBodyWidth = function() {
    return this.winBody.getBoundingClientRect().width;
}

HTMLWin.execCreationEventClass = function(eventStr,eventArg) {
    for(var i = 0; i < HTMLWin.creationMethods[eventStr].length; i++) {
        HTMLWin.creationMethods[eventStr].call(this,(eventArg));
    }
}

HTMLWin.prototype.makeZIndexGreatest = function() {

    var a = Array.from(document.querySelectorAll(".winWrapper"));
    a.pop(this.winWrapper);

    for(var i = 0; i < a.length; i++) {
        a[i].style.zIndex = HTMLWin.baseZIndex + i;
    }
}

HTMLWin.prototype.prevWinbodyDisplay = "";

HTMLWin.prototype.minimizeToggle = function() {

    if(this.winBody.classList.contains("min")) {
        this.winBody.classList.remove("min");
        this.winBody.style.display = "inline-block";
        this.h3.style.width = this.getWinBodyWidth() + "px";
    }

    else {
        this.h3.style.width = this.getWinBodyWidth();
        this.prevWinbodyDisplay = this.winBody.style.display + "px";
        this.winBody.classList.add("min");
        this.winBody.style.display = "none";
    }
}

HTMLWin.prototype.getInstanceID = function() {
    return HTMLWin.instances.indexOf(this);
}

HTMLWin.prototype.setToCenter = function() {
    this.win.style.top =  ((0.5 * window.innerHeight) - (0.5 * this.win.clientHeight)) + "px";
}

HTMLWin.prototype.appendTo = function (element) {
    
    var self = this;

    element.appendChild(this.winWrapper);
    this.appended = element;

    if(this.species === "superWin") {
        this.win.style.position =  "relative";
        
        this.setToCenter();

        this.winWrapper.addEventListener("click",function(){
            self.makeZIndexGreatest();
        })
    }

    if(this.species === "htmlWin") {

        var self = this;

        $(this.winWrapper).draggable({
            containment: "window"
        }).css("position", "absolute");;

        $(this.winBody).resizable();

        this.winBody.addEventListener("click",function(){
            
        });

    }

}

HTMLWin.prototype.remove = function() {
    this.beforewindowremoval();
    this.removeFromParent();
    HTMLWin.instances.splice(HTMLWin.instances.indexOf(this),1);
}

HTMLWin.prototype.removeFromParent = function () {
    this.winWrapper.parentNode.removeChild(this.winWrapper);
}

HTMLWin.prototype.appendToDocumentBody = function() {
    this.appendTo(document.body);
}

HTMLWin.prototype.toggle = function (remove = false) {
    
    if(this.winWrapper.style.display === "none") {
        this.winWrapper.style.display = "inline-block";
        return null;
    }
    
    else {
        this.winWrapper.style.display = "none";
        return null;
    }
    
}

HTMLWin.prototype.onwindowtoggle = function() {};
HTMLWin.prototype.beforewindowtoggle = function() {};

HTMLWin.prototype.onwindowmin = function() {};

HTMLWin.prototype.onwindowremoval = function() {};
HTMLWin.prototype.beforewindowremoval = function() {};

HTMLWin.prototype.closeButtonClass = "close-button";
HTMLWin.prototype.minimizeButtonClass = "minimize";

HTMLWin.prototype.addCloseButton = function() {
    this.closeButton = document.createElement('span');
}

// Append node to window body.

HTMLWin.prototype.appendChild = function(node) {
    this.winBody.appendChild(node);
}

HTMLWin.prototype.removeChild = function(node) {
    this.winBody.removeChild(node);
}

export default HTMLWin;