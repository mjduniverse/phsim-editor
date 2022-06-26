/** 
 * 
 * X_SelectionMenu Option
 * 
 * @class X_SelectionMenuOption
 * @param value - A Value.
 * @param {string} innerText - The InnerText 
 * 
*/

function X_SelectionMenuOption(value,innerText) {
    this.value = value;
    this.innerText = innerText;
}

/**
 * 
 * XSelectionMenu
 * An extension of the Selection Menu.
 * 
 * @class XSelectionMenu
 * 
 */

function XSelectionMenu() {

    var self = this;

    this.value = null;
    this.htmlList = document.createElement("ul");

    this.container = document.createElement("div");
    this.container.classList.add("x-selection-menu-container");

    this.label = document.createElement("span");
    this.label.classList.add("x-selection-menu-label");

    var arrow = document.createElement("span");
    arrow.classList.add("x-selection-menu-arrow")
    
    var field = document.createElement("div");
    field.classList.add("x-selection-menu-field");

    this.htmlList.classList.add("x-selection-menu-list");


    field.addEventListener("click",function() {

        if(self.htmlList.classList.contains("opened")) {
            self.htmlList.classList.remove("opened");
            self.htmlList.classList.add("closed");
            return false;
        }

        else {

            if(self.htmlList.classList.contains("closed")) {
                self.htmlList.classList.remove("closed");
            }

            self.htmlList.classList.add("opened");
            return true;
        }

    })

    field.appendChild(this.label);
    field.appendChild(arrow);

    this.container.appendChild(field);
    this.container.appendChild(this.htmlList);

    this.htmlList.addEventListener("mouseenter", function() {
        self.inHTMLList = true;
    });

    this.htmlList.addEventListener("mouseout", function() {
        self.inHTMLList = false;
    });

    field.addEventListener("mouseenter", function() {
        self.inField = true;
    });

    field.addEventListener("mouseout", function() {
        self.inField = false;
    });

    this.htmlList.style.width = window.getComputedStyle(this.htmlList).width;

}

XSelectionMenu.prototype.onchange = function() {}

XSelectionMenu.prototype.toggle = function() {
    
}

XSelectionMenu.prototype.add = function(value,innerText) {

    var self = this;

    var newElement = document.createElement("li");
    newElement.innerText = innerText;
    newElement.dataset.x_value = value;

    newElement.addEventListener("click", function() {

        self.value = this.dataset.x_value;
        self.label.innerText = this.innerText;

        var onchange = self.onchange.bind(self);
        onchange();

        if(self.htmlList.classList.contains("opened")) {
            self.htmlList.classList.remove("opened");
            self.htmlList.classList.add("closed");
            return false;
        }

    })

    this.htmlList.appendChild(newElement);
}

/**
 * 
 * Function for selecting the option by index
 * 
 * @function selectOptionByIndex
 * @param {Number} i - The Index for the option. 
 */

XSelectionMenu.prototype.selectOptionByIndex = function(i) {
    this.htmlList.childNodes[i].click();
}

/**
 * 
 * Function for selecting option by value
 * 
 * @function selectOptionByValue
 * @param {string} value - The string representing the option.
 * 
 */

XSelectionMenu.prototype.selectOptionByValue = function(value) {
    for(var i = 0; i < this.htmlList.childNodes.length; i++) {
        if(this.htmlList.childNodes[i].dataset.x_value === value) {
            this.htmlList.childNodes[i].click();
        }
    }
}

XSelectionMenu.prototype.getElement = function() {
    return this.container;
}

export default XSelectionMenu;