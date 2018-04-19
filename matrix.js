

var request = require("request");

class tweetScraper{
    
    constructor(){
        this.time = 5;
        this.limit = 300; 
    }

    flutracer(){
        var options={
            url:`http://api.flutrack.org/?time=${this.time}`,
            method:'GET'
        }
        return new Promise((resolve,reject)=>{
            
            request(options,(error,response,body)=>{
                if(error){
                    reject(error)
                }else{
            
                    var parseData = JSON.parse(body);
                    var locList=[];
                    
                    parseData.forEach(element => {
                        locList.push({"lat":element.latitude,"long":element.longitude})
                    });
                    // console.log(locList)
                    resolve(locList);   
                }    
            });

        })

    }
}

var ob = new tweetScraper();
ob.flutracer();

module.exports= tweetScraper;