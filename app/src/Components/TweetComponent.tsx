import React, { useState, useEffect } from "react";
import tweetsReducer from "../Reducer/TweetsReducer";
import store from "../Reducer/Store";
import EachTweetCompnent from "./EachTweetCompnent";
import { fetchData, socket } from "../Dao/SocketDao";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../icons/rolling.svg";
import { NavLink } from "react-router-dom";
import { getCurrentRequestList } from "../Actions/TweetsAction";
export default function TweetComponent() {
  const [tweets, setTweets] = useState([]);
  store.subscribe(() => {
    console.log("rendered");
    setTweets(getCurrentRequestList());
  });
  return (
    <div className="full-page-height bg-dark">
      <div className="bg-dark full-page">
        <div className="row">
          <span className="page-heading">Latest Tweets</span>

          <span className="page-heading-link ">
            {" "}
            <NavLink to="/search">Search Tweets </NavLink>
          </span>
        </div>
        <div className="full-page">
          <div className="showTweets">
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchData}
              hasMore={tweets.length < 100}
              loader={
                <div className="loader" key={0}>
                  <img src={Loading} />
                </div>
              }
            >
              {tweets.map((tweet, index) => {
                return (
                  <EachTweetCompnent tweet={tweet} key={index} count={index} />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
