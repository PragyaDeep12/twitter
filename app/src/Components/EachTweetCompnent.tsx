import React from "react";
import { formatTimeStamp } from "../utils";
import { format } from "date-fns";
import { TweetModel } from "../Models/TweetModel";
export default function EachTweetCompnent(props) {
  const tweet: TweetModel = props.tweet;
  return (
    <div>
      <div className="each-tweet card text-left bg-light ml-1 mr-1">
        <div className="row">
          <div className="col-md-1">{props.count + 1}</div>
          <div className="col-md-1">
            <img
              src={tweet.user ? tweet.user.profile_image_url : ""}
              alt="profile-image"
            />
          </div>
          <div className="col-md-10">
            {" "}
            <h5>
              {tweet.user
                ? tweet.user.name
                  ? tweet.user.name
                  : "No Name"
                : "No Name"}
            </h5>
          </div>
        </div>
        <div>{tweet.text}</div>
        <h6 className="text-right">
          {tweet.timestamp_ms
            ? format(
                Number.parseInt(tweet.timestamp_ms.toString()),
                "DD,MMM hh:mm a"
              )
            : ""}
        </h6>
        <div />
      </div>
    </div>
  );
}
