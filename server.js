const express = require("express");
const app = express();

// get response JSON
const responseJSON = require("./assets/request.json");

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

app.listen(3000, err => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Server is up!");
  }
});
