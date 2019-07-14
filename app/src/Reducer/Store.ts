import { createStore, combineReducers, compose } from "redux";

import devTools, { devToolsEnhancer } from "redux-devtools-extension";
import tweetsReducer from "./TweetsReducer";
import filterReducer from "./FilterReducer";

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  filteredTweets: filterReducer
});

const store = createStore(
  rootReducer,
  window["devToolsExtension"] && window["devToolsExtension"]()
);
export default store;
