window.onscroll = function () { myFunction() };

var header = document.getElementById("theHeader");
var sticky;
sticky = header.offsetTop;


function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("pad-t1");
        header.classList.add("navbar-small");
    } else {
        header.classList.remove("pad-t1");
        header.classList.remove("navbar-small");
    }
}

