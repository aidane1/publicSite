let parser = require("csv-parse");
let fs = require("fs");

let input = fs.readFileSync("../../../depositTest/depositedFiles/master.csv");

parser(input, {
  comment: '#'
}, function(err, output){
  console.log(output);
})