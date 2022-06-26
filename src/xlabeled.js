function xLabeledInput(label,type,defaultValue,inputClass,oninput) {
    var a = document.createElement("div");
    var b = document.createElement("span");
    var c = document.createElement("input");

    a.appendChild(b);
    a.appendChild(c);
    a.classList.add("xlabeled-container");

    b.innerText = label;
    b.classList.add("xlabeled-label");

    c.type = type;
    c.addEventListener("input",oninput);
    c.value = defaultValue;

    c.classList = inputClass;
    c.classList.add("xlabeled-input");

    return a;
}

function tr_xLabeledInput(label,type,defaultValue,inputClass,oninput) {

    var a = document.createElement("tr");
    var b = document.createElement("span");
    var c = document.createElement("input");

    var tr_1 = a.insertCell();
    var tr_2 = a.insertCell();

    tr_1.appendChild(b);
    tr_2.appendChild(c);

    a.classList.add("xlabeled-container");

    if(typeof label === "string") {
        b.innerText = label;
    }

    else if(label instanceof HTMLElement) {
        b.appendChild(label);
    }

    b.classList.add("xlabeled-label");

    c.type = type;
    c.addEventListener("input",oninput);
    c.value = defaultValue;

    c.classList.add(inputClass);
    c.classList.add("xlabeled-input");

    return a;
}

function tr_xLabeledElement(label,element) {
    
    var tr = document.createElement("tr");

    var td_1 = document.createElement("td");
    var td_2 = document.createElement("td");

    tr.appendChild(td_1);
    tr.appendChild(td_2);

    td_1.innerText = label;
    td_2.appendChild(element);

    return tr;
}

function xLabeledButton(label,onclick) {
    var button = document.createElement("span");
    button.innerText = label;
    button.classList.add("button");
    button.addEventListener("click",onclick);
    button.classList.add("xlabeled-button");
    return button;
}

export {xLabeledButton,tr_xLabeledElement,tr_xLabeledInput,xLabeledInput};