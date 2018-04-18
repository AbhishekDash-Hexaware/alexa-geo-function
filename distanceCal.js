
var loggerConfiguration = require('./logger');
var config= require('./config');
const request = require('request');
const logger = loggerConfiguration.loggerob;

class GeoCalc{

    constructor(){
        this.points = [{lat:23.1815,long:79.9864},{lat:28.7041,long:77.1025}];
        this.earth_rad = 6371.00;
        this.kilometre = 1.60934

    }

    calcNearest(){
        
        var min = this.calcDistance(28.5355,77.3910,this.points[0].lat,this.points[0].long);
        logger.debug("Initial min :",min);
        this.points.forEach((ele)=>{
            
            var distance= this.calcDistance(28.5355,77.3910,ele.lat,ele.long);    
            logger.debug("Distance :", distance);
            if(distance<min){
                min = distance;
                
            }
       })
       logger.info("Nearest distance :",min);
    }

    
    
    calcDistance(latfrom,lonfrom,latto,lonto){

        var deltaLat = (latto - latfrom) * (Math.PI / 180)
        var deltaLon = (lonto - lonfrom) * (Math.PI / 180)
        
        var a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2)+Math.cos(latfrom*(Math.PI/180))*Math.cos(latto*(Math.PI/180))*Math.sin(deltaLon/2)*Math.sin(deltaLon/2);
        var c= Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    
        var distance = (this.earth_rad * c) * this.kilometre;
        return(distance);
    
    }

    
    revGeoCode(lat,long){

        var options={
            url : `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${config.map_key}`,
            method : "GET"
        }
        return new Promise((resolve,reject)=>{

            request(options,(req,res)=>{
                logger.debug(res.body);
            });

        });
        
    }


    geoCode(placeName){

        var options={
            url : `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${config.map_key}`,
            method : "GET"
        }
        return new Promise((resolve,reject)=>{

            request(options,(req,res)=>{
                logger.debug(res.body);
            });

        });
        
    }



}

module.exports = GeoCalc;




