const fs = require('fs');
var readProvincesFile = fs.readFileSync("provinces.json");
var provinces = JSON.parse(readProvincesFile);
var readPlaceFile = fs.readFileSync("place.json");
var places = JSON.parse(readPlaceFile);
var readAccomodationFile = fs.readFileSync('accomodation.json');
var accomodation = JSON.parse(readAccomodationFile);

var recommended = places.slice().sort((placeA,placeB)=>{
  return parseFloat(placeB.rate) - parseFloat(placeA.rate);
}).slice(0,9);

var provinces = places.map(function(a) {return a.province;})
provinces=provinces.sort((a,b)=>{
              if(a < b) return -1;
              if(a > b) return 1;
              return 0;
          });

exports.provinces = provinces
exports.places=places;
exports.recommendeds=recommended;
exports.accomodations=accomodation;
module.export=exports
