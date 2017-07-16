const express = require("express");
const hbs = require("hbs");
var app = express();

var fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set("view engine" ,"hbs");

app.use((req,res,next)=>
{ var now = new Date().toString();
  var log = `${now}:${req.method},${req.url}`;
  console.log(log);
   fs.appendFile('server.log',log +"\n",(err) =>{
     if(err)
  console.log("unable to perform request");
    });
  next();
});
//app.use((req,res,next)=>
//{
  //res.render("maintenance.hbs");

//}); this is use to say that site is at maintenance
app.use(express.static(__dirname+'/public')); // maintenance was override du to this
hbs.registerHelper("x",()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamit",(text) =>{
   return text.toUpperCase();
});

app.get("/",(req,res) => {
    // res.send("</h1> world</h1>");
    res.render('home.hbs',{
      title:"home page" ,
      msg :"hey bud u wanna get some ",
     port : port,
    });
 });
 app.get("/about",(req,res)=>
 {
  res.render('about.hbs',{
  pagetitle:"aboutpage",

  });
 });
 app.get("/bad" ,(req,res)=>
{

  res.send("sorry buddy  cant send it");
});
 app.listen(port,()=>{
 console.log(`server is up on port ${port}`);
  });
