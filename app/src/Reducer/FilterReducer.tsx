import { TweetModel } from "../Models/TweetModel";
import {
  NEW_FILTERED_TWEET_RAISED,
  NEW_FILTERED_TWEET_ARRIVED
} from "../AppConstants";

const initialState: TweetModel[] = [];
export default function filterReducer(state: TweetModel[] = [], action: any) {
  switch (action.type) {
    case NEW_FILTERED_TWEET_RAISED: {
      return state;
    }
    case NEW_FILTERED_TWEET_ARRIVED: {
      return action.payload;
    }
    default: {
      return initialState;
    }
  }
}
