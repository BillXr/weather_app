require('dotenv').config()
const express=require("express");
const https=require("https");
const app=express();
const body_parser=require("body-parser");
app.use(body_parser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){

    const query=req.body.cityname;
    //const apikey="79cf63ddab64d22324999705c61c0154";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.apikey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const feel_like_temp=weatherdata.main.feels_like;
            const desc=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const iconurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"; 

            res.write("<h1>Temperature:"+temp+"&nbsp;celsius</h1>"+"<h2>Temperature feeling:"+feel_like_temp+"&nbsp;celsius</h2>"+"<h3>Weather description:"+desc+"</h3>");
            res.write("<img src=" +iconurl+ ">");
            res.send();
        });
    });
});


app.listen(3000,function (){
    console.log("server started at port 3000");   
})

