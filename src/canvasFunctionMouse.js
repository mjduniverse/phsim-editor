import { elm } from "./elements.js";
import { getMouseX, getMouseY, tracMouse } from "./getmouse.js";
import { getObjectByMouse } from "./getObjectByMouse.js";
import { session } from "./session.js";

/********************* Default Event Listeners for canvas ********************/

function canvasFunctionMouse() {
    tracMouse();
    getObjectByMouse();
    document.querySelector('.mousePos').innerHTML = getMouseX() + "," + getMouseY()
}

session.canvasFunctionMouse = canvasFunctionMouse;

elm.addEventListener('mousemove', canvasFunctionMouse);

export default canvasFunctionMouse;