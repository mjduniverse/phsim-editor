import { ctx } from "./elements.js";
import { getMouseX, getMouseY } from "./getmouse.js";
import render_static from "./render_static.js";

/*** Follow Me Rectangle ***/


function FollowMeRect(rectArg) {

    this.rect = rectArg;
    this.execRef = this.exec.bind(this);

    ctx.canvas.addEventListener('mousemove',this.execRef);

}

FollowMeRect.prototype.exec = function() {

    render_static();
    this.rect.setByDiag(this.rect.x, this.rect.y, getMouseX() , getMouseY() );

    if(this.rect.drawFollowMe === true) {
        this.rect.draw();
    }

}

FollowMeRect.prototype.unset = function() {
    ctx.canvas.removeEventListener('mousemove', this.execRef);
}

export default FollowMeRect;