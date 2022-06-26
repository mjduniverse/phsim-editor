function PForm(htmlClass) {
		
    // Main Element
        
    this.elm = document.createElement('div');
    this.elm.className = htmlClass;
    
    // Table
    this.table = document.createElement('table');
    this.table.className = "pFormTable";
    this.elm.appendChild(this.table);
    
    // tBody
    
    this.tBody = document.createElement('tbody');
    this.tBody.className = "pFormTBody";
    this.table.appendChild(this.tBody);
    
}



// Method for adding tabular data input. Returns a closure that returns the HTML Object for the row.

PForm.prototype.addPair = function(arg_label, default_value, arg_type, oninput = function() {},inputClass = "") {
    
var row = document.createElement("tr");
var col_1 = document.createElement('td');
var col_2 = document.createElement('td');
var input = document.createElement('input');
var label = document.createElement('label');

label.innerText = arg_label;
input.type = arg_type;
input.value = default_value;
input.className = inputClass;
input.addEventListener('input', oninput);

col_1.appendChild(label);
col_2.appendChild(input);

row.appendChild(col_1);
row.appendChild(col_2);

this.tBody.appendChild(row);

return row;

};

PForm.prototype.appendTo = function(element) {
element.appendChild(this.elm);
};

export default PForm;