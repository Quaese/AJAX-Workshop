const express = require("express");
const app = express();

var bodyParser = require("body-parser");
// get response JSON
const responseJSON = require("./assets/request.json");

// body-parser configuration
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  const id = req.query.id
    ? req.query.id
    : responseJSON[Object.keys(responseJSON)[0]];
  const response = responseJSON[id]
    ? { ...responseJSON[id], error: false }
    : { error: true, message: "Record not found!" };

  res.json(response);
});

app.post("/json", (req, res) => {
  const id = req.body.id
    ? req.body.id
    : responseJSON[Object.keys(responseJSON)[0]];
  const response = responseJSON[id]
    ? { ...responseJSON[id], error: false }
    : { error: true, message: "Record not found!" };

  res.json(response);
});

app.listen(3000, err => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Server is up!");
  }
});
