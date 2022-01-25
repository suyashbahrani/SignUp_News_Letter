//jshint eversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    //console.log("req::: " , req.body);
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields : {
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/4adc3182f1";

    const options = {
        method: "POST",
        auth: "suyashbahrani:ef5307cdc4cbdc6ad5b47dff47d887fa-us20"
    }



    const request  = https.request(url, options, function(response) {
        response.on("data", function(data){
            //console.log(JSON.parse(data));

        })

    })

    request.write(jsonData);
    request.end();

});

app.listen(3001, function(){
    //console.log("Server running on 3001");
});

//ef5307cdc4cbdc6ad5b47dff47d887fa-us20

//4adc3182f1