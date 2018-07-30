//makes connection
let socket = io.connect("https://pvstudents.ca:80", {secure: true, rejectUnauthorized: false});
let message = document.getElementById("message");
let btn = document.getElementById("send");
let output = document.getElementById("outPut");

message.addEventListener('keydown', function(event) {

    const key = event.keyCode;

    if (key === 13) {
      let info = {message:message.value, id:document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1]};
      message.value  = "";
      socket.emit("chat", info);
    }
});

btn.addEventListener("click", function() {
  let info = {message:message.value, id:document.cookie.match(/sessionID=j%3A%22(.+?)%22/)[1]};
  message.value  = "";
  socket.emit("chat", info);
});

socket.on("chat", function(data) {
  output.innerHTML += '<div class = "messageHolder"<p><strong>' + data.username + "</strong>: " + data.message + "</p><div class = 'name'>" + data.firstName + " " + data.lastName + "</div></div>";
  output.lastChild.scrollIntoView();
})
