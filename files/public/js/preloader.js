

function preloadPage(url, callback) {
    let loadRequest;
    if (window.XMLHttpRequest) {
        loadRequest = new XMLHttpRequest();
    } else {
        loadRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    loadRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.response);
        }
    }
    loadRequest.open("GET", url, true);
    loadRequest.send(); 
}

let preloaded = {

}
preloadPage("/account", function(res) {
    preloaded["accountPage"] = res;
});
preloadPage("/courses", function(res) {
    preloaded["coursePage"] = res;
});
function renderPreloaded(page, path) {
    if (preloaded[page] && true) {
        document.open();
        document.write(preloaded[page]);
        document.close();
        window.history.pushState("", "", path);
    } else {
        window.location = path;
    }
}