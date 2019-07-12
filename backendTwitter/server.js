const io = require("socket.io")();

io.set("origins", "*:*");
const twit = require("twitter");
// const express = require("express")();
// var server = require("http").Server(express);

const port = process.env.PORT || 4000;
// const server = require("http").Server(app);
// const util = require("util");
const CONSUMER_KEY = "0XG5299e6oSESyHvLGIMGmwW3";
const CONSUMER_SECRET = "kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW";
const ACCESS_TOKEN = "3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h";
const count = 0;

const ACCESS_TOKEN_SECRET = "TPnK7IgPW0TB0m9NemXiyKAlZC6rBRpqi56w7sDhVxEgl";
const twitter = new twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});
// var tweets = [];

var stream = twitter.stream("statuses/sample");
io.on("connection", socket => {
  console.log("connected");
  socket.on("disconnect", data => {
    console.log("disconnected");
  });
  socket.on("checkData", data => {
    var count = 0;
    var s = stream.on("data", tweet => {
      if (count < data.limit) {
        console.log(tweet);
        socket.emit("newtweet", { text: tweet.text, time: tweet.timestamp_ms });
        count++;
      } else {
        console.log("removed all listners");
        s.removeAllListeners();
      }
    });

    // stream.setMaxListeners(60);
    // stream.once(data.url, tweets => {
    //   socket.emit("newtweet", tweets);
    //   console.log(tweets);
    // });
    // twitter.get(data.url, data.params, (err, tweets, response) => {
    //   if (!err) {
    //     console.log(data);
    //     socket.emit("newtweet", tweets);
    //   } else {
    //     console.log(err);
    //   }
    // });
  });
  // var filter = false;
  // while (!filter) {
  //   try {
  //     // socket.emit("newtweet", tweets);
  //     filter = true;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
});
// stream.on("data", function(tweet) {
//   // console.log(tweet);

//   var t=setTimeout(()=>{
//     tweets.push(tweet);
//     filter = true;
//     io.sockets.emit("newtweet", tweets);
//   },2000);
//   // console.log(tweet);
// });

io.listen(process.env.PORT || 4000);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(express.static(__dirname + "/dist"));

// server.listen(port, function() {
//   console.log("App running on port " + port);
// });

// PathLocationStrategy

// app.get("", function(req, res) {
//   res.sendFile(path.join(__dirname, "src", "index.html"));
// });
// app.get("/getRequest", function(req, res) {
//   console.log("here");
//   try {
//     twitter.get("/favorites/list", function(err, tweets, response) {
//       if (err) throw err;
//       console.log(response);
//       console.log(tweets);
//       res.send(tweets);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });
// app.get("/javascript", function(req, res) {
//   console.log("here");
//   try {
//     twitter.post("statuses/filter", { track: "World Cup" }, function(
//       err,
//       tweets,
//       response
//     ) {
//       console.log(response);

//       //   if (err) throw err;
//       //   console.log(response);
//       //   console.log(tweets);
//       //   res.send(tweets);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });
// app.get("/", function(req, res) {
//   try {
//     twitter.stream("statuses/filter", { track: "World Cup" }, function(stream) {
//       stream.on("data", function(data) {
//         // Raw JSON that gets sent back
//         tweets.push(data);
//       });
//       console.log("Collected " + tweets.length + " tweets.");
//       console.log(tweets[0]);
//       res.send(tweets[0]);
//       //   setTimeout(function() {

//       //   }, 5000);
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   //   res.sendFile(path.join(__dirname, "src", "index.html"));
// });
// var stream = twitter.stream("statuses/sample");

// stream.on("data", function(tweet) {
//   console.log(tweet);
// });
// const express = require("express");
// const app = express();
// const axios = require("axios");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// const CONSUMER_KEY = "0XG5299e6oSESyHvLGIMGmwW3";
// const CONSUMER_SECRET = "kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW";
// const ACCESS_TOKEN = "3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h";

// const ACCESS_TOKEN_SECRET = "TPnK7IgPW0TB0m9NemXiyKAlZC6rBRpqi56w7sDhVxEgl";
// const port = process.env.PORT || 4000;
// const api = axios.create({
//   baseURL: "https://api.twitter.com/1.1",
//   headers: {
//     // Authorization was copied from the Postman headers
//     Authorization:
//       'OAuth oauth_consumer_key="0XG5299e6oSESyHvLGIMGmwW3",oauth_token="3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h",,oauth_signature_method="H,MAC-SHA1",,oauth_timestamp="1,515677408",,oauth_nonce="nonce",,oauth_version="1,.0",,oauth_signature="signature"'
//   },
//   withCredentials: true
// });
// app.get("/", async function(req, res) {
//   var response = await api.get("/lists/statuses.json");
//   res.send(response);
// });
// // console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));
