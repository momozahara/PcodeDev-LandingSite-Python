const menulinebtn = $("menu-line-btn")[0];
const navmenuw = $("nav-menu-w")[0];
const navmenuc = $("nav-menu-c")[0];
const body = $("body")[0];
let container = $(".container")[0];

function test() {};

function navShow() {
    navmenuw.classList.add("expland");
    navmenuc.classList.add("expland");
    body.classList.add("unc");
};

function navHide() {
    navmenuw.classList.remove("expland");
    navmenuc.classList.remove("expland");
    body.classList.remove("unc");
};

function navControl() {
    navmenuc.addEventListener("click", function() {
        navHide();
    });
    menulinebtn.addEventListener("click", function() {
        if(navmenuw.classList[0] == "expland") {
            navHide();
        } else {
            navShow();
        };
    });
};

navControl();

const ie = $("ie");

ie[1].children[0].children[1].addEventListener("click", function() {
    ie.css({display: 'none'});
    body.classList.remove("unc");
});

function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
    };
/* Create an alert to show if the browser is IE or not */

if (isIE()){
        ie.css({
                display: "block"
            });
        body.classList.add("unc");
} else {
    let ielen = ie.length;
        ie.remove();
};

const menus = $("menu");

function root() {
    let root = window.location.pathname.split('/')[2]
    if(root == "") {
        root = "official";
    };
    return root
}

function Push(path) {
    path = path.toLowerCase();
    let text = path;
    let host = window.location.host;
    let protocal = window.location.protocol;
    host = protocal + "//api." + host.replace("www.", "")
    if(path == "official") {
        path = "/official/";
    } else {
        path = "/" + path + "/"
    };
    $("#container").load(host +"/page" + path, function(e, s) {
	if(s == "error") {
            let title = text[0].toUpperCase() + text.substring(1);
            let url = text + "/";
            if(text == "official") {
                url = ""
            };
            document.title = title;
            //window.history.pushState({}, "", "/" + url);
            $("#container")[0].outerHTML = `<div id="container"><div class="container"><div class="content top bottom"></>`
            $("#container").css({ opacity: 1, transition: "opacity .15s ease-in-out" });
        } else {
            if(path == "/media/") {
                $.getScript("/static/official/js/media.control.js");
            };
            let title = text[0].toUpperCase() + text.substring(1);
            let url = text + "/";
            if(text == "official") {
                url = "";
            };
            document.title = title;
            //window.history.pushState({}, "", "/" + url);
            $("#container").css({ opacity: 1, transition: "opacity .15s ease-in-out" });
        };
    });
};

Push(root());
function commitPush(path) {
    path = path.toLowerCase();
    let text = path;
    let host = window.location.host;
    let protocal = window.location.protocol;
    host = protocal + "//api." + host.replace("www.", "")
    if(path == "official") {
        path = "/"
    } else {
        path = "/" + path + "/"
    };
    if(path.replaceAll("/", "") != window.location.pathname.split("/")[2]) {
        $("#container").css({ opacity: 0, transition: "opacity .15s ease-in-out" });
        setTimeout(function(){
            if(text == "official") {
                path = "/official/"
            };
            $("#container").load(host +"/page" + path, function(e, s) {
                if(s == "error") {
                    let title = text[0].toUpperCase() + text.substring(1);
                    let url = "official/" + text + "/";
                    if(text == "official") {
                        url = "official/"
                    };
                    document.title = title;
                    window.history.pushState({}, "", "/" + url);
                    $("#container")[0].outerHTML = `<div id="container"><div class="container"><div class="content top bottom"></>`
                    $("#container").css({ opacity: 1, transition: "opacity .15s ease-in-out" });
                } else {
                    if(path == "/media/") {
                        $.getScript("/static/official/js/media.control.js");
                    };
                    let title = text[0].toUpperCase() + text.substring(1);
                    let url = "official/" + text + "/";
                    if(text == "official") {
                        url = "official/"
                    };
                    document.title = title;
                    window.history.pushState({}, "", "/" + url);
                    $("#container").css({ opacity: 1, transition: "opacity .15s ease-in-out" });
                }
            });
        }, 150);
    }
}

menus.each(function() {
    this.addEventListener("click", function(e) {
        let text = e.currentTarget.innerText.toLowerCase();
        commitPush(text)
    });
});

window.addEventListener("popstate", function() {
    Push(root());
});

