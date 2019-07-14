import store from "../Reducer/Store";
import { NEW_TWEET_ARRIVED, NEW_TWEET_RAISED } from "../AppConstants";
import { TweetModel } from "../Models/TweetModel";
export function newRequest(request) {
  // //console.log(request);
  //this statement calls requestReducer with "type"
  return { type: NEW_TWEET_RAISED, payload: request };
}
export function newRequestArrived(request) {
  console.log(request);
  return { type: NEW_TWEET_ARRIVED, payload: request as TweetModel[] };
}

// export function recievedAllRequests(allRequests) {
//   return { type: ALL_REQUEST_FETCH, payload: allRequests };
// }

export function getCurrentRequestList() {
  return store.getState().tweets;
}
