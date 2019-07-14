import store from "../Reducer/Store";
import {
  NEW_TWEET_ARRIVED,
  NEW_TWEET_RAISED,
  NEW_FILTERED_TWEET_ARRIVED
} from "../AppConstants";
import { TweetModel } from "../Models/TweetModel";
export function newRequest(request) {
  return { type: NEW_TWEET_RAISED, payload: request };
}
export function newRequestArrived(request) {
  return { type: NEW_TWEET_ARRIVED, payload: request as TweetModel[] };
}
export function newFilteredTweetsArrived(request) {
  return { type: NEW_FILTERED_TWEET_ARRIVED, payload: request as TweetModel[] };
}
export function getCurrentRequestList(): TweetModel[] {
  return store.getState().tweets;
}

export function getCurrentFilterList(): TweetModel[] {
  return store.getState().filteredTweets;
}
