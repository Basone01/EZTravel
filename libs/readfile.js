const fs = require('fs');
var readProvincesFile = fs.readFileSync("provinces.json");
var provinces = JSON.parse(readProvincesFile);
var readPlaceFile = fs.readFileSync("place.json");
var places = JSON.parse(readPlaceFile);

var recommended = places.slice().sort((placeA,placeB)=>{
  return parseFloat(placeB.rate) - parseFloat(placeA.rate);
}).slice(0,9);

exports.provinces=provinces;
exports.places=places;
exports.recommended=recommended;
module.export=exports
