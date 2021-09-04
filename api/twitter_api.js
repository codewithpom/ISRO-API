const Twit = require('twit');
const express = require('express')
const app = express.Router()
const fs = require('fs')
const cors = require('cors')
app.use(cors())

require('dotenv').config(); // config for dotenv
// create twiter client for information
var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.token,
    access_token_secret: process.env.token_secret,
})

// create option with ISRO name for that data
var options = {
    screen_name: 'isro',
};

// get the tweets and even put them in the response
function tweets(res) {
    T.get('statuses/user_timeline', options, function (err, data) {
        // fs.writeFile("data.json", JSON.stringify(data), () => { console.log("Written to file") })
        return_data = [];
        for (const element of data) {
            // console.log(element);
            return_data.push(
                {
                    'created_at': element.created_at,
                    'id_str': element.id_str,
                    'text': element.text,
                    'entities': element.entities,

                })
        }
        res.removeHeader('x-powered-by')
        res.json({ 'tweets': return_data })
    })


}

// get the followers and put them in the response
function followers(res) {
    res.removeHeader("x-powered-by");
    T.get("followers/list", function (err, data) {
        if (Object.keys(data).length == 1) {
            const cache_data = fs.readFileSync("twitter_cache/followers.json").toString()
            // console.log(cache_data)
            res.json(JSON.parse(cache_data));

        } else {
            fs.writeFileSync("twitter_cache/followers.json", JSON.stringify(data))
            res.json(data);
        }
    });
}

// create route for tweets
app.get("/tweets", (req, res) => {
    tweets(res)
});

// create routes for profile
app.get("/profile", (req, res) => {
    T.get("/users/show", options, function (err, data) {
        res.removeHeader('x-powered-by')
        res.json({
            'profile': data.entities,
            'description': data.description,
            'name': data.name,
            "screen_name": data.screen_name,
            "location": data.location,
            'id_str': data.id_str
        })
    });

});

// create route for followers
app.get("/followers", (req, res) => {
    followers(res);
})

module.exports = app;