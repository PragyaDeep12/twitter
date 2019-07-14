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
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState(false);
  // fetchData(20);
  // var count = 10;
  // const [searchText, setSearchText] = useState();
  useEffect(() => {
    setUpdated(!updated);
  }, [tweets]);
  store.subscribe(() => {
    console.log("rendered");
    // console.log(store.getState().tweets);
    setTweets(store.getState().tweets);
  });
  const filterTweets = () => {
    fetchData(search);
  };
  socket.on("filteredData", data => {
    console.log(data);
    setFilteredList(data);
    setFilter(true);
  });
  return (
    <div className="bg-dark">
      <h4>Hello Tweets</h4>

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
              filterTweets();
            }}
          />
        </div>
      </div>

      <div className="showTweets">
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            console.log("here");
            // count = count + 10;
            filter ? fetchData(search) : fetchData();
          }}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              <img src={Loading} />
            </div>
          }
        >
          {filter
            ? filteredList.map((tweet, index) => {
                return (
                  <EachTweetCompnent tweet={tweet} key={index} count={index} />
                );
              })
            : tweets.map((tweet, index) => {
                return (
                  <EachTweetCompnent tweet={tweet} key={index} count={index} />
                );
              })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
