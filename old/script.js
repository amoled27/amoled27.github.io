window.onscroll = function () { myFunction() };
window.onscroll = function () { headerBack(); topHead(); };

// var header = document.getElementById("theHeader");
var slimHeader = document.getElementById("slimHeader")
var topHeader = document.getElementById("topHeader")
var sticky;
// if (header) {
    // sticky = header.offsetTop;
// }
var slimSticky;
// if (slimSticky) {
    slimSticky = slimHeader.offsetTop;
// }
var topSticky;
// if (topSticky) {
    topSticky = topHeader.offsetTop;
// }

function myFunction() {
    // if (header) {
        // if (window.pageYOffset > sticky) {
        //     header.classList.add("pad-t1");
        // } else {
        //     header.classList.remove("pad-t1");
        // }
    // }


}


function headerBack() {
    // if (slimHeader) {
        // if (window.pageYOffset > slimSticky) {
        //     slimHeader.classList.add("pad-t1");
        // } else {
        //     slimHeader.classList.remove("pad-t1");
        // }
    // }
}

function topHead() {
    // if (slimHeader) {
        if (window.pageYOffset > topSticky) {
            slimHeader.classList.add("marg");
        } else {
            slimHeader.classList.remove("marg");
        }
    // }
}



