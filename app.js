const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

const dataFromFile = require('./libs/readfile');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/", (req,res)=>{
	res.render("index",{
		recommendedPlace:dataFromFile.recommendeds,
		provinces:dataFromFile.provinces
	});
})

app.get("/listsearch",(req,res)=>{
	if (req.query.place=='') {
    res.render('search',{search:false});
  }else {
    var place = dataFromFile.places;
    var jsonres = [];
    for (var i = 0; i < place.length; i++) {
      if(place[i].name.includes(req.query.place)){
        jsonres.push(place[i]);
      }else if (place[i].province.includes(req.query.place)) {
        jsonres.push(place[i]);
      }
    }
		console.log(jsonres);
		res.json(jsonres);
	}
})

app.get("/searchplace",(req,res)=>{
	console.log(req.query);
  if (req.query.place=='') {
    res.render('search',{search:false});
  }else {
    var place = dataFromFile.places;
    var jsonres = [];
    for (var i = 0; i < place.length; i++) {
      if(place[i].name.includes(req.query.place)){
        jsonres.push(place[i]);
      }else if (place[i].province.includes(req.query.place)) {
        jsonres.push(place[i]);
      }
    }
		if(jsonres.length>0){
			res.render('search',{
				search:true,
				datas:jsonres
			});
		}else{
			res.render('searchplace',{search:false});
		}

  }
 });
app.get('/search',(req,res)=>{
	console.log(dataFromFile.accomodations);
	res.render('search',{
		accomodations:dataFromFile.accomodations
	});
})


app.listen(3000,()=>{
	console.log('Listening on port 3000 ');
});
