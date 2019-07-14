import { createStore, combineReducers, compose } from "redux";

import devTools, { devToolsEnhancer } from "redux-devtools-extension";
import tweetsReducer from "./TweetsReducer";

const rootReducer = combineReducers({
  tweets: tweetsReducer
});

const store = createStore(
  rootReducer,
  window["devToolsExtension"] && window["devToolsExtension"]()
);
export default store;
