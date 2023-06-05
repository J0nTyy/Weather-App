const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/", function (req, res) {
    const city = req.body.city;
    const api = "a4e97d013aecee83b5b860025e9667a3";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + api;

  https.get(url, function (response) {

    response.on("data", function (data) {
      var weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const description = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>City: " + city + "</h1>");
      res.write("<h1>Temperature: " + temp + "</h1>");
      res.write("<h1>Description: " + description + "</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
