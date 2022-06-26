/*** 
 * 
 * GuiTabber 1.0
 * Copyright 2019 Mjduniverse.com
 * 
 * @author webmaster@mjduniverse.com
 * @version 1.0
 * 
 * ***/

/**** Tab Interface ****/

function GuiTabber() {

	this.tabLinks = document.createElement("ul");
    this.tabPanels = document.createElement("div");
    this.tabContainer = document.createElement("div");

    this.tabLinks.classList.add("gui-tabber-tabs");
    this.tabPanels.classList.add("gui-tabber-panels");
    this.tabContainer.classList.add("gui-tabber-tabs");

	this.disabledStyle = "display: none";

    var self = this;
    
    this.tabContainer.appendChild(this.tabLinks);
    this.tabContainer.appendChild(this.tabPanels);

    this.length = 0;

    this.custom = {}

}

GuiTabber.prototype.addCustomProperty = function(key,value) {
    this.custom[key] = value;
}

GuiTabber.prototype.removeCustomProperty = function(key) {
    delete this.custom[key];
}


GuiTabber.prototype.addPanel = function(innerPanelElement,innerTabElement) {

    var self = this;
	
    var tab = document.createElement("li");
    tab.appendChild(innerTabElement);
    tab.dataset.gui_tabber_id = this.length;
    tab.classList.add("gui-tabber-tab");

	var panel = document.createElement("div");
    panel.appendChild(innerPanelElement);
    panel.dataset.gui_tabber_id = this.length;
    panel.style.display = "none";
    panel.classList.add("gui-tabber-panel");

	tab.addEventListener("click",function() {

        for(var i = 0; i < self.tabPanels.childNodes.length; i++) {

            if(this.dataset.gui_tabber_id === self.tabPanels.childNodes[i].dataset.gui_tabber_id) {
                
                self.tabPanels.childNodes[i].style.display = "inline-block";
                self.tabPanels.childNodes[i].classList.add("selected");
                self.tabPanels.childNodes[i].classList.remove("unselected");
                
                self.tabLinks.childNodes[i].classList.add("selected");
                self.tabLinks.childNodes[i].classList.remove("unselected");

            }

            else {

                self.tabPanels.childNodes[i].style.display = "none";
                self.tabPanels.childNodes[i].classList.remove("selected");
                self.tabPanels.childNodes[i].classList.add("unselected");

                self.tabLinks.childNodes[i].classList.remove("selected");
                self.tabLinks.childNodes[i].classList.add("unselected");

            }

            //alert(this.dataset.gui_tabber_id === self.tabPanels.childNodes[i].dataset.gui_tabber_id);

        }

	});

    this.tabLinks.appendChild(tab);
    this.tabPanels.appendChild(panel);

    this.length++;

}

GuiTabber.prototype.appendToElement = function(target) {
    this.parent = target;
    target.appendChild(this.tabContainer);
    return this.tabContainer;
}

GuiTabber.prototype.getTabContainer = function() {
    return this.tabContainer;
}