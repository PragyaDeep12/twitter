import { createStore, combineReducers, compose } from "redux";

import devTools, { devToolsEnhancer } from "redux-devtools-extension";
import tweetsReducer from "./TweetsReducer";
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
const rootReducer = combineReducers({
  tweets: tweetsReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  window["devToolsExtension"] && window["devToolsExtension"]()
);
export default store;
