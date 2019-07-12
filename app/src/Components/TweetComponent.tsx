import React, { useState } from "react";
import tweetsReducer from "../Reducer/TweetsReducer";
import store from "../Reducer/Store";
import EachTweetCompnent from "./EachTweetCompnent";
export default function TweetComponent() {
  const [tweets, setTweets] = useState([]);
  store.subscribe(() => {
    console.log(store.getState().tweets);
    setTweets([...store.getState().tweets]);
  });

  // getState().tweets.map((tweet, index) => {
  // console.log(tweet);
  // return <div>{tweet.tweet}</div>;

  return (
    <div>
      Hello Tweets
      {tweets.map((tweet, index) => {
        return <EachTweetCompnent tweet={tweet} />;
      })}
    </div>
  );
}
