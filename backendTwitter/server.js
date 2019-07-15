const io = require("socket.io")();
io.set("origins", "*:*");
const twit = require("twitter");
const port = process.env.PORT || 4000;
const CONSUMER_KEY = "0XG5299e6oSESyHvLGIMGmwW3";
const CONSUMER_SECRET = "kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW";
const ACCESS_TOKEN = "3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h";
const ACCESS_TOKEN_SECRET = "TPnK7IgPW0TB0m9NemXiyKAlZC6rBRpqi56w7sDhVxEgl";
const twitter = new twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});
var latestTweets = [];
function initLatestTweets() {
  twitter.stream("statuses/sample", function(stream) {
    console.log("iniit");
    //callback recieves stream as socket
    stream.on("data", function(tweet) {
      if (latestTweets.length < 100) {
        if (tweet && tweet.lang && tweet.lang === "en") {
          latestTweets.push(tweet);
        }
      } else {
        console.log("removed all listners");
        stream.removeAllListeners();
      }
    });
    stream.on("error", function(error) {
      stream.removeAllListeners();
      console.log("error");
    });
  });
}

function initFilterArray(track) {
  var promise = new Promise((resolve, reject) => {
    var filterTweets = [];
    twitter.stream("statuses/filter", { track: track }, function(stream) {
      console.log("init Filter Listners");
      //callback recieves stream as socket
      stream.on("data", function(tweet) {
        if (filterTweets.length <= 20) {
          if (tweet && tweet.lang && tweet.lang === "en") {
            filterTweets.push(tweet);
          }
        } else {
          resolve(filterTweets);
          console.log("removed all Filter listners");
          stream.removeAllListeners();
        }
      });
      stream.on("error", function(error) {
        stream.removeAllListeners();
        console.log("error", error);
      });
    });
  });
  return promise;
}
function initNewTweetsArrived() {
  twitter.stream("statuses/sample", function(stream) {
    console.log("init New tweet");
    //callback recieves stream as socket
    var prev = null;
    setInterval(() => {
      stream.once("data", function(tweet) {
        if (prev != tweet && tweet.lang === "en") {
          //not same as previous tweets push as new arrived
          console.log("new tweet arrived");
          prev = tweet;
          io.sockets.emit("newtweet", [tweet, ...latestTweets]);
          stream.removeAllListeners();
        } else {
          console.log("same tweet arrived");
        }
      });
    }, 1000);
    stream.on("error", function(error) {
      // stream.removeAllListeners();
      console.log("error");
    });
  });
}
initLatestTweets();
// initNewTweetsArrived();
io.on("connection", socket => {
  //fetches filtered tweets
  socket.on("filterTweets", data => {
    if (data) {
      if (data.track && data.limit) {
        try {
          initFilterArray(data.track)
            .then(filterTweets => {
              socket.emit("filteredTweets", filterTweets.slice(0, data.limit));
            })
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
  //fetches all data
  socket.on("latestData", data => {
    try {
      console.log(data);
      if (data && data.limit) {
        if (latestTweets.length >= data.limit)
          socket.emit("latesttweet", latestTweets.slice(0, data.limit));
      }
    } catch (err) {
      console.log("Error", err);
    }
  });
});
io.listen(port);
