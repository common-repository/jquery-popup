/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/;" ;
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
    return null;
}
//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = getCookie('casanovaPopup')=='on' ? 1 : 0;
/*if(document.documentElement.clientWidth<1024) 
	popupStatus = 1;*/
//loading popup with jQuery magic!
function loadPopup() {
    //loads popup only if it is disabled
    if (popupStatus == 0) {
        jQuery("#backgroundPopup").css({
            "opacity": "0.7"
            //"opacity": "0"
        });
        jQuery("#backgroundPopup").fadeIn("slow");
        jQuery("#popupContact").fadeIn("slow");
        popupStatus = 1;
		setCookie('casanovaPopup', 'on', 1);
    }
}

//disabling popup with jQuery magic!
function disablePopup() {
    //disables popup only if it is enabled
    if (popupStatus == 1) {
        jQuery("#backgroundPopup").fadeOut("slow");
        jQuery("#popupContact").fadeOut("slow");
        popupStatus = 0;
		//setCookie('casanovaPopup', 'off', 1);
    }
}

//centering popup
function centerPopup() {
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = jQuery("#popupContact").height();
    var popupWidth = jQuery("#popupContact").width();
    //centering
	
    jQuery("#popupContact").css({
        "position": "fixed",
        //"top": windowHeight / 2 - popupHeight / 2,
        "top": 50,
        "left": windowWidth / 2 - popupWidth / 2
    });
    //only need force for IE6

    jQuery("#backgroundPopup").css({
        "height": windowHeight
    });

}


//CONTROLLING EVENTS IN jQuery
jQuery(function(){
    //LOADING POPUP
	centerPopup();
	loadPopup();
    //CLOSING POPUP
    jQuery("#popupContactClose").click(function() {
        disablePopup();
    });
    //Click out event!
    jQuery("#backgroundPopup").click(function() {
        disablePopup();
    });
    //Press Escape event!
    jQuery(document).keypress(function(e) {
        if (e.keyCode == 27 && popupStatus == 1) {
            disablePopup();
        }
    });

});
