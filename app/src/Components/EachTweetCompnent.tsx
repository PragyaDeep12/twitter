import React from "react";
import { formatTimeStamp } from "../utils";
import { format } from "date-fns";
export default function EachTweetCompnent(props) {
  const { tweet } = props;
  console.log(tweet);
  return (
    <div>
      <div className="each-tweet">
        <div>{tweet.text}</div>
        <div>{tweet.time}</div>
      </div>
    </div>
  );
}
