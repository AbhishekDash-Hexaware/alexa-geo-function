var GeoCalc= require('./distanceCal');
var db= require('./data');
var loggerConfiguration = require('./logger');
const logger = loggerConfiguration.loggerob;

var ob =new GeoCalc()

ob.geoCode("odisha")
.catch((err)=>{
    console.log(err);
})
.then((data)=>{

    var parsedData= JSON.parse(data);
    console.log("coordinates of chennai is ", parsedData.results[0].geometry.location) 
    var coordinates= parsedData.results[0].geometry.location;
    
    ob.calcNearest(coordinates,db.data,(dist,loc,add)=>{
        logger.info(dist,loc,add);
    })
    
})





