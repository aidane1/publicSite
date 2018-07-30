let express = require("express");


let app = express();

app.listen(4000, function() {
  console.log("listening for requests");
});

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});
