import React from "react";
import { format } from "date-fns";
import { TweetModel } from "../Models/TweetModel";
export default function EachTweetCompnent(props) {
  const tweet: TweetModel = props.tweet;
  return (
    <div>
      <div className="each-tweet card text-left bg-light">
        <div className="row">
          <div className="col-md-2 profile-background">
            <img
              src={tweet.user ? tweet.user.profile_image_url : ""}
              alt="profile-image"
              className="profile-image"
            />
          </div>
          <div className="col-md-10">
            {" "}
            <h5 className="userName">
              {tweet.user
                ? tweet.user.name
                  ? tweet.user.name
                  : "No Name"
                : "No Name"}
            </h5>
            <div className="tweetText">{tweet.text}</div>
            <p className="time-stamp text-right">
              {tweet.timestamp_ms
                ? format(
                    Number.parseInt(tweet.timestamp_ms.toString()),
                    "DD,MMM hh:mm a"
                  )
                : ""}
            </p>
          </div>
        </div>

        <div />
      </div>
    </div>
  );
}
