var GeoCalc= require('./distanceCal');
var db= require('./data');
var loggerConfiguration = require('./logger');
const logger = loggerConfiguration.loggerob;
var tweetScraper = require("./matrix")

var ob =new GeoCalc()
var scraper = new tweetScraper();

scraper.flutracer((errormsg,coorList)=>{
    if(errormsg!=null){

        console.log(errormsg);

    }else if(coorList.length!=0){
        
        ob.geoCode("sipcot chennai",(err,data)=>{
            if(err){
                console.log(err);
            }else{
                
                var parsedData= JSON.parse(data);
                logger.debug("coordinates of chennai is ", parsedData.results[0].geometry.location); 
                var coordinates= parsedData.results[0].geometry.location;
    
                ob.calcNearest(coordinates,coorList,(dist,loc,add)=>{
                logger.info(dist,loc,add);
                })
            
            }
        })
    }else{
        console.log(errormsg);
    }    
})










