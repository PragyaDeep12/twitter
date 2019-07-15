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
var filteredTweets = [];
var errorListenersInit = 0;
var prevStream1 = null;
var prevStream2 = null;
function initErrorListener(stream, count) {
  if (count == 1) {
    //we will work with prevStream 1
    //we will check if its inited
    if (prevStream1 === null) {
      //its not inited
      prevStream1 = stream;
      console.log("listner inited");
      prevStream1.on("error", function(error) {
        console.log("error");
      });
    } else {
      //its inited so remove previosly attached listerner
      prevStream1.removeAllListeners("error");
      //make it null
      prevStream1 = null;
      //now its null so if we call initErrorListner it will be reinitted
      console.log("listner removed");
      initErrorListener(stream, count);
    }
  }
  if (count == 2) {
    //we will work with prevStream2
    //we will check if its inited
    if (prevStream2 === null) {
      //its not inited
      prevStream2 = stream;
      console.log(prevStream2.listenerCount);
      prevStream2.on("error", function(error) {
        // stream.removeAllListeners("error");
        console.log("error");
      });
    } else {
      //its inited so remove previosly attached listerner
      prevStream2.removeAllListeners("error");
      //make it null
      prevStream2 = null;
      //now its null so if we call initErrorListner it will be reinitted
      initErrorListener(stream, count);
    }
  }
}
function initLatestTweets() {
  twitter.stream("statuses/sample", function(stream) {
    console.log("iniit");
    //callback recieves stream as socket
    initErrorListener(stream, 1);
    stream.on("data", function(tweet) {
      if (latestTweets.length < 100) {
        if (tweet && tweet.lang && tweet.lang === "en") {
          latestTweets.push(tweet);
        }
      } else {
        console.log("removed all listners");
        stream.removeAllListeners("data");
      }
    });
  });
}

function initFilterArray(track) {
  var promise = new Promise((resolve, reject) => {
    var filterTweets = [];
    twitter.stream("statuses/filter", { track: track }, function(stream) {
      console.log("init Filter Listners");
      initErrorListener(stream, 2);
      stream.on("data", function(tweet) {
        if (filterTweets.length <= 20) {
          if (tweet && tweet.lang && tweet.lang === "en") {
            filterTweets.push(tweet);
          }
        } else {
          filteredTweets = filterTweets;
          resolve(filterTweets);
          console.log("removed all Filter listners");
          stream.removeAllListeners("data");
        }
      });
    });
  });
  return promise;
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
