// Composite HTML Element

export function compositeHTMLElement(tag) {
    var container = document.createElement(tag);

    for(var i = 1; i < arguments.length; i++) {
        container.appendChild(arguments[i]);
    }

    return container;
}

export function createAppendElm(tagStr,targetNode) {
    var e = document.createElement(tagStr);
    targetNode.appendChild(e);
    return e;
}

export function createAppendTxtElm(tagStr,targetNode,innerText) {
    var e = createAppendElm(tagStr,targetNode);
    e.innerText = innerText;
}

export function keyAndValueTxtRow(key,value) {
    var a = document.createElement("td");
    var b = document.createElement("td");
    a.innerText = key;
    b.innerText = value;
    return compositeHTMLElement("tr",a,b);
}
