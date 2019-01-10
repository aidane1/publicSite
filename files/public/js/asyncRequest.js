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
        } else {
            callback([false, "An unknown error occured. please refresh and try again."]);
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
        } else {
            callback([false, "An unknown error occured. please refresh and try again."]);
        }
    }
    loadRequest.open("GET", path + "?" + string, true);
    loadRequest.send(); 
}