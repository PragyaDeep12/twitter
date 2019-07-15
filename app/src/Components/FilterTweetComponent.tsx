import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFilterTweets } from "../Dao/SocketDao";
import { TweetModel } from "../Models/TweetModel";
import Loading from "../icons/rolling.svg";
import InfiniteScroll from "react-infinite-scroller";
import store from "../Reducer/Store";

import { getCurrentFilterList } from "../Actions/TweetsAction";
import EachTweetCompnent from "./EachTweetCompnent";
export default function FilterTweetComponent() {
  const [searchTerm, setSearchTerm] = useState();
  const [list, setList] = useState<TweetModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  store.subscribe(() => {
    if (getCurrentFilterList() && searchTerm) {
      setIsLoading(false);
      setList(getCurrentFilterList());
    }
  });
  const search = () => {
    if (searchTerm && searchTerm.length > 0) {
      setIsLoading(true);
      getFilterTweets(searchTerm);
    }
  };
  return (
    <div className="full-page-height bg-dark">
      <div className="bg-dark full-page">
        <div className="row">
          <span className="page-heading">Search Tweets</span>

          <span className="page-heading-link">
            <NavLink to="/">Latest Tweets </NavLink>
          </span>
        </div>
        <div className="row mb-2  mt-3">
          <div className="col-md-10">
            <input
              className="form-control mb-2"
              placeholder="Search here"
              id="search_key"
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
              // value={searchTerm}
            />
          </div>
          <div className="col-md-2">
            <input
              type="button"
              className="btn btn-primary text-left"
              value="search"
              onClick={search}
            />
          </div>
        </div>
        <div className="showTweets bg-dark">
          {list ? (
            list.map((tweet, index) => {
              return (
                <EachTweetCompnent tweet={tweet} key={index} count={index} />
              );
            })
          ) : (
            <div>Hello</div>
          )}
        </div>
        <div>{isLoading ? <img src={Loading} alt="loading ..." /> : null}</div>
      </div>
    </div>
  );
}
