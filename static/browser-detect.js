function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true
    else return false;
}

if (isIE() != false) {
    if (window.location.pathname != "/unsupported-browser") window.location = "/unsupported-browser";
}