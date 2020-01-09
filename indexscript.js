window.onscroll = function () { myFunction() };

var header = document.getElementById("theHeader");
var sticky;
    sticky = header.offsetTop;


function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("pad-t1");
        } else {
            header.classList.remove("pad-t1");
        }
}