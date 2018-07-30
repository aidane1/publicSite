let express = require("express");


let app = exress();

app.listen(3000, function() {
  console.log("listening for requests");
});

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});
