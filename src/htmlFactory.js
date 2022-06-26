// Create html element from tag and text

export function elementFromHTML(tag,html) {
    var e = document.createElement(tag);
    e.innerHTML = html;
    return e;
}

// Create html object from object

export function elementFromObject(tag,o) {

    var e = document.createElement(tag);

    if(o.childNodes) {
        for(var i = 0; i < childNodes.length; i++) {
            e.appendChild(o.childNodes[i]);
        }
    }

    if(o.parentNode) {
        o.parentNode.appendChild(e);
    }

    if(o.innerHTML) {
        e.innerHTML = o.innerHTML;
    }

    if(o.innerText) {
        e.innerText = o.innerText;
    }

}
