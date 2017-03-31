const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

const province = mongoose.model(
  'province',
  {
    name:String, 
  },
  'provinces');


app.get("/", (req,res)=>{
	app.render("index");
})

app.get("/quicksearch",(req,res)=>{
	mongoose.connect('mongodb://test:test@ds143900.mlab.com:43900/eztravel');
   	province.find((err,province)=>{
     if(err){
       console.log(err);
     }else {
       res.send(province);
       
     };
   });
   mongoose.connection.close();
 });


app.listen(3000,()=>{
	console.log('Listening on port 3000 ');
});