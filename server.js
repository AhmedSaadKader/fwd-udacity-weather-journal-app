// Setup empty JS object to act as endpoint for all routes
let projectData = [{}];
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use("/", express.static("./website"));

const port = 8000;
// Setup Server
const server = app.listen(port, () => {
  console.log(`running on localhost:${port}`);
});
// Initialize all route with a callback function
app.get("/all", GetEndData);
// Callback function to complete GET '/all'
function GetEndData(req, res) {
  res.send(projectData);
}
// Post Route

app.post("/all", sendData);

function sendData(req, res) {
  console.log(req.body);
  console.log(req.body.date);
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
    name: req.body.name,
  };
  console.log(newEntry);
  projectData = Object.keys(newEntry).map((key) => {
    return { [key]: newEntry[key] };
  });
  res.send(projectData);
}
