const { response } = require("express");
const fetch = require("node-fetch");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {

    const api_key = process.env.TICKETMASTER_KEY;
    const zipcode = req.query.zip;
    var url = ``;
    console.log("zipcode: " + zipcode);
   
    if(req.query.genreId){
        //SEARCHING FOR GENRES IN ZIPCODE CASE
        const genreString = req.query.genreId;
         url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${api_key}&genreId=${genreString}&postalCode=${zipcode}`;

    }
    else{
        url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${api_key}&postalCode=${zipcode}`;
    }

    fetch(url).then(
        response => response.json()
    ).then(json => {
        res.send(json);
    })

});


module.exports = router;