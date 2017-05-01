const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const fs = require('fs');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var readProvincesFile = fs.readFileSync("provinces.json");
var provinces = JSON.parse(readProvincesFile);
var readPlaceFile = fs.readFileSync("place.json");
var places = JSON.parse(readPlaceFile);
console.log(places[0]);

app.get("/", (req,res)=>{
	res.render("index",{
		provinces:provinces,
		pic:[
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			},
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			},
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			},
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			},
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			},
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			},
			{
				link:"/search?place=เชียงใหม่",
				img:"/public/img/chiangmai.jpg",
				caption:"เชียงใหม่"
			}
	]
	});
})

app.get("/listsearch",(req,res)=>{
	if (req.query.place=='') {
    res.render('search',{search:false});
  }else {
    var data = fs.readFileSync("place.json");
    var place = JSON.parse(data);
    var jsonres = [];
    for (var i = 0; i < place.length; i++) {
      if(place[i].name.includes(req.query.place)){
        jsonres.push(place[i]);
      }else if (place[i].province.includes(req.query.place)) {
        jsonres.push(place[i]);
      }
    }
		res.json(jsonres);
	}
});

app.get("/search",(req,res)=>{
	res.render('search',{places:places});
	// console.log(req.query);
  // if (req.query.place=='') {
  //   res.render('search',{search:false});
  // }else {
  //   var data = fs.readFileSync("place.json");
  //   var place = JSON.parse(data);
  //   var jsonres = [];
  //   for (var i = 0; i < place.length; i++) {
  //     if(place[i].name.includes(req.query.place)){
  //       jsonres.push(place[i]);
  //     }else if (place[i].province.includes(req.query.place)) {
  //       jsonres.push(place[i]);
  //     }
  //   }
	// 	if(jsonres.length>0){
	// 		res.render('search',{
	// 			search:true,
	// 			datas:jsonres
	// 		});
	// 	}else{
	// 		res.render('search',{search:false});
	// 	}

  // }

 });


app.listen(3000,()=>{
	console.log('Listening on port 3000 ');
});
