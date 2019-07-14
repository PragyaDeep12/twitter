import {
  NEW_FILTERED_TWEET_RAISED,
  NEW_FILTERED_TWEET_ARRIVED,
  NEW_TWEET_RAISED,
  NEW_TWEET_ARRIVED
} from "../AppConstants";

import { socket } from "../Dao/SocketDao";
import { TweetModel } from "../Models/TweetModel";

const initialState: TweetModel[] = [];
export default function tweetsReducer(state: TweetModel[] = [], action: any) {
  switch (action.type) {
    case NEW_TWEET_RAISED: {
      return state;
    }
    case NEW_TWEET_ARRIVED: {
      return action.payload;
    }
    default: {
      return initialState;
    }
  }
}
