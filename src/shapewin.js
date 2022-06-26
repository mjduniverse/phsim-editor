import HTMLWin from "./htmlwin.js";

/*** Shape Window ***/

var shapeWindow = {
    htmlWin: new HTMLWin("Add Objects"),
    addPathButton: document.createElement('span'),
    addCircleButton: document.createElement('span'),
    addRect: document.createElement('span'),
    addConstraint: document.createElement('span'),
    append: function() {
        this.htmlWin.appendToDocumentBody();
    }
}

// Content and classes for the buttons

shapeWindow.addPathButton.innerHTML = "Add Polygon";
shapeWindow.addPathButton.className = "addPath button";

shapeWindow.addCircleButton.innerHTML = "Add Circle";
shapeWindow.addCircleButton.className = "addCircle button";

shapeWindow.addRect.innerHTML = "Add Rectangle";
shapeWindow.addRect.className = "addRect button";

shapeWindow.addConstraint.innerHTML = "Add Constraint";
shapeWindow.addConstraint.className = "addRect button";

// Append buttons to shape window body

shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addPathButton);
shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addCircleButton);
shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addRect);
shapeWindow.htmlWin.winBody.appendChild(shapeWindow.addConstraint);

// Make it so that the shapes window can be accessed from the toolbar.

/**document.querySelector('.add-shape').addEventListener('click', function() {
    shapeWindow.append();	
});

**/

export default shapeWindow;