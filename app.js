const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const https = require('https')





app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const place = req.body.cityName;
    const unit = "metric";
    const apiKey = "44f48b99f974ed678fa495013059ab1a";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
      console.log(response);
      response.on("data",function(data){
        const w = JSON.parse(data);
        const temprature = w.main.temp;
        const humidity = w.main.humidity;
        const weatherDes = w.weather[0].description;
        const icon = w.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<img src="+imageUrl+">");
        res.write("<h1>Temprature in "+place+" is "+temprature+"</h1>");
        res.write("Humidity = "+humidity+" and "+weatherDes);
        res.send();
      });
    });
});

app.listen(3000, function() {
  console.log("Server running at port 3000");
});
