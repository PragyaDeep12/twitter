import React, { useState, useEffect } from "react";
import tweetsReducer from "../Reducer/TweetsReducer";
import store from "../Reducer/Store";
import EachTweetCompnent from "./EachTweetCompnent";
import { fetchData, socket } from "../Dao/SocketDao";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../icons/rolling.svg";
export default function TweetComponent() {
  const [search, setSearch] = useState("");
  const [tweets, setTweets] = useState([]);
  const [updated, setUpdated] = useState(false);
  // fetchData(20);
  // var count = 10;
  const [searchText, setSearchText] = useState();
  useEffect(() => {
    setUpdated(!updated);
  }, [tweets]);
  store.subscribe(() => {
    console.log("rendered");
    console.log(...store.getState().tweets);
    setTweets(...store.getState().tweets);
  });
  return (
    <div>
      <h4>Hello Tweets</h4>
      {console.log(tweets)}
      <div className="row mb-2">
        <div className="col-md-10">
          <input
            className="form-control"
            placeholder="Search here"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="button"
            className="btn btn-primary text-left"
            value="search"
            onClick={() => {
              fetchData(searchText);
            }}
          />
        </div>
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          console.log("here");
          // count = count + 10;
          fetchData();
        }}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            <img src={Loading} />
          </div>
        }
      >
        {tweets.map((tweet, index) => {
          return <EachTweetCompnent tweet={tweet} key={index} count={index} />;
        })}
      </InfiniteScroll>
    </div>
  );
}
