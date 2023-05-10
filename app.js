const { response } = require("express");
const express= require("express");
const https= require("https");
const bodyParser=require("body-parser");
const { raw } = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/index.html");

   
});

app.post("/",(req,res)=>{
 
  const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid=3e2e2f817d1cca0851e76d8baa82a429&units=metric";

    https.get(url,(response)=>{
        console.log(response.statusCode);

        response.on("data",(data)=>{
         const weatherData=  JSON.parse(data);
         const temp=weatherData.main.temp;
         const descc=weatherData.weather[0].description;
         const icon=weatherData.weather[0].icon;
         const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
          
            res.write("<h1>The tempreature in "+query+" is "+temp+" degree Celcius.</h1>");
            res.write("The weather is currently "+descc);
            res.write("<img src="+imageURL+">");z
          
         res.send()
        })
    })

})






app.listen(3000,()=>{
    console.log("Server is live on port 3000.");
})
