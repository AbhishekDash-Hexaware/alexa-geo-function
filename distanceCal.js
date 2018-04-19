

var loggerConfiguration = require('./logger');
var config= require('./config');
const request = require('request');
const logger = loggerConfiguration.loggerob;

class GeoCalc{

    constructor(){
        
        this.earth_rad = 6371.00;
        this.kilometre = 1.60934

    }

    calcNearest(userLoc,affectedLoc,callback){
        
        var min = this.calcDistance(userLoc.lat,userLoc.lng,affectedLoc[0].lat,affectedLoc[0].long);
        logger.debug("Initial min :",min);
        var nearestLoc;

        affectedLoc.forEach(element => {
            var newDis =  this.calcDistance(userLoc.lat,userLoc.lng,element.lat,element.long);
            
            if(newDis < min){
                min = newDis;
                nearestLoc={
                    "lat":element.lat,
                    "long":element.long
                }
            }

        });

       logger.info("Nearest distance :",min);
       logger.info("Nearest location :",nearestLoc.lat,nearestLoc.long);
       
       this.revGeoCode(nearestLoc.lat,nearestLoc.long)
       .catch((error)=>{
           logger.error(error);
       })
       .then((data)=>{
           var parseData=JSON.parse(data);
           logger.info(parseData.results[0].formatted_address);
           callback(min,nearestLoc,parseData.results[0].formatted_address);
       })
    }

    
    
    calcDistance(latfrom,lonfrom,latto,lonto){
        

        var deltaLat = (latto - latfrom) * (Math.PI / 180)
        var deltaLon = (lonto - lonfrom) * (Math.PI / 180)
        
        var a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2)+Math.cos(latfrom*(Math.PI/180))*Math.cos(latto*(Math.PI/180))*Math.sin(deltaLon/2)*Math.sin(deltaLon/2);
        var c= Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    
        var distance = (this.earth_rad * c) * this.kilometre;
        logger.silly(distance);
        return(distance);
    
    }

    
    revGeoCode(lat,long){

        var options={
            url : `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${config.map_key}`,
            method : "GET"
        }
        return new Promise((resolve,reject)=>{

            request(options,(error,response,body)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(body);
                }
            });

        });
        
    }


    geoCode(placeName){

        logger.debug(placeName);
        var options={
            url : `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${config.map_key}`,
            method : "GET"
        }
        return new Promise((resolve,reject)=>{

            request(options,(error,response,body)=>{
                if(error){
                    // logger.error(error);
                    reject(error);
                }else{
                    // logger.debug(body);
                    resolve(body);
                }
            })
        });
        
    }



}



module.exports = GeoCalc;




