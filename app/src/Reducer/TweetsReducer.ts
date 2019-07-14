import { NEW_TWEET_ARRIVED, NEW_TWEET_RAISED } from "../AppConstants";

import { socket } from "../Dao/SocketDao";
import { TweetModel } from "../Models/TweetModel";

const initialState: TweetModel[] = [];
export default function tweetsReducer(state: TweetModel[] = [], action: any) {
  // var user: User;
  switch (action.type) {
    case NEW_TWEET_RAISED: {
      //instead of pushing to  array you can push to socket
      //  state.push(action.payload as RequestMessage);
      //push data using to server using socket
      //console.log("newRequest From Clinet End");
      // socket.emit("newTweet", action.payload);
      return state;
    }
    case NEW_TWEET_ARRIVED: {
      //instead of pushing to  array you can push to socket4
      //console.log("pushing messggae through new request arrived");
      console.log(action.payload);
      // action.payload.map((element)=>{
      //   state.push(action.payload);
      // })
    
      return action.payload;
    }

    //   case ALL_REQUEST_FETCH: {
    //     var RequestMessages = action.payload as RequestMessage[];
    //     //  //console.log(RequestMessages);

    //     state = RequestMessages;
    //     return state;
    //   }

    default: {
      return initialState;
    }
  }
}
