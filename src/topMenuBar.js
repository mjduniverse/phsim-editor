export var items = document.querySelectorAll('.item');

for(var i = 0; i < items.length; i++) {
    
    items[i].addEventListener('mouseover', function() {
        this.querySelector('.submenu').style.display = "block";
    });
    
    items[i].addEventListener('mouseout', function() {
        this.querySelector('.submenu').style.display = "none";
    });
    
}