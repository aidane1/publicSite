function sendPostRequest(string, path, callback) {
    let loadRequest;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        loadRequest = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        loadRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    loadRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            callback(response);
        }
    }
    loadRequest.open("POST", path, true);
    loadRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    loadRequest.send(string); 
}

function sendGetRequest(string, path, callback) {
    let loadRequest;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        loadRequest = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        loadRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    loadRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            callback(response);
        }
    }
    loadRequest.open("GET", path + "?" + string, true);
    loadRequest.send(); 
}