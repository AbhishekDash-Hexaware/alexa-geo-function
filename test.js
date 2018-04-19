var GeoCalc= require('./distanceCal');
var db= require('./data');
var loggerConfiguration = require('./logger');
const logger = loggerConfiguration.loggerob;
var tweetScraper = require("./matrix")

var ob =new GeoCalc()
var scraper = new tweetScraper();

scraper.flutracer()
.catch((error)=>{
    console.log(error);
})
.then((coorList)=>{

    ob.geoCode("sipcot chennai")
    .catch((err)=>{
        console.log(err);
    })
    .then((data)=>{

        var parsedData= JSON.parse(data);
        logger.debug("coordinates of chennai is ", parsedData.results[0].geometry.location) 
        var coordinates= parsedData.results[0].geometry.location;
    
        ob.calcNearest(coordinates,coorList,(dist,loc,add)=>{
        logger.info(dist,loc,add);
        })
    
    })


})









