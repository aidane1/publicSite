function muteFunction(text) {

  var form = document.createElement("form");
  form.method = "POST";
  form.action = "/chatroom";
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = "mutedUser";
  input.value = text.parentNode.childNodes[0].childNodes[0].innerHTML;
  form.appendChild(input);
  document.body.appendChild(form);

  form.submit();
}
let socket = io.connect("https://pvstudents.ca", {secure: true, rejectUnauthorized: false});
var message = document.getElementById("message");
var btn = document.getElementById("send");
var output = document.getElementById("outPut");
// if (output.children.length > 3) {
//   output.lastChild.scrollIntoView();
// }
// let back = document.getElementById("back");
var feedbackTest = document.getElementById("feedback");
// output.lastChild.scrollIntoView();
let permissions = output.className;






btn.addEventListener("click", function() {

  let info = {message:message.value, id:document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1], chatroom: currentChatRoom};
  if (message.value != "" && message.value != " " && permissions != "muted") {
    message.value  = "";

    socket.emit("chat", info);
  }

});

message.addEventListener("keypress", function() {

  const key = event.keyCode;

  if (key === 13) {
    let info = {message:message.value, id:document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1]};
    message.value  = "";
    if (permissions != "muted") {
      socket.emit("chat", info);
      socket.emit("typing", {id: document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1], typing: false});
    }
  }



  if (message.value != "" && message.value != " " && permissions != "muted") {

    socket.emit("typing", {id: document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1], typing: true, chatroom: currentChatRoom});
  } else if (permissions != "muted"){

    socket.emit("typing", {id: document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1], typing: false});
  }
});

let currentTypers = [];
socket.on("typing" + "_" + currentChatRoom, function(data) {
  if (currentTypers.indexOf(data.username) > -1) {
    if (!data.typing) {

      currentTypers.splice(currentTypers.indexOf(data.username), 1);
      addTypeFunction();
    } else {

    }
  } else {
    currentTypers.push(data.username);

    addTypeFunction();
  }
});

function addTypeFunction() {
  feedbackTest.innerHTML = "";
  currentTypers.forEach(function(data) {
    feedbackTest.innerHTML += "<div class = 'typing' id  = '" + data + "'><i>" + data + " is typing a message...</i></div>";
  });

  if (currentTypers.length != 0) {
    feedbackTest.lastChild.scrollIntoView();
  }
}



socket.on("chat" + "_" + currentChatRoom, function(data) {
  if (currentTypers.indexOf(data.username) > -1) {
    currentTypers.splice(currentTypers.indexOf(data.username), 1);
    addTypeFunction();
  } else {

  }
  if (permissions === "admin") {
    output.innerHTML += '<div class = "messageHolder"><p><strong>' + data.username + "</strong>: " + data.message + "</p><div class = 'name'>" + data.firstName + " " + data.lastName + "</div><div class = 'mute' onclick = 'muteFunction(this)'>mute</div></div>";
    output.lastChild.scrollIntoView();
  } else if (permissions === "user"){
    output.innerHTML += '<div class = "messageHolder"><p><strong>' + data.username + "</strong>: " + data.message + "</p><div class = 'name'>" + data.firstName + " " + data.lastName + "</div></div>";
    output.lastChild.scrollIntoView();
  } else if (permissions === "muted") {

  }

});
