import React from "react";
import logo from "./logo.svg";
import { connect, Provider } from "react-redux";
import { socket } from "./Dao/SocketDao";
import store from "./Reducer/Store";
import "./App.css";
import "./styles/stylesheet.css";

import "./styles/bootstrap.css";
import TweetsPage from "./Pages/TweetsPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  newRequestArrived,
  newFilteredTweetsArrived
} from "./Actions/TweetsAction";
import FilterPage from "./Pages/FilterPage";
import {
  SOCKET_ON_ALL_LATEST_TWEETS,
  SOCKET_ON_FILTERED_TWEETS
} from "./AppConstants";
function App(props) {
  socket.on(SOCKET_ON_ALL_LATEST_TWEETS, data => {
    console.log(data);

    store.dispatch(newRequestArrived(data));
  });

  socket.on(SOCKET_ON_FILTERED_TWEETS, data => {
    console.log(data);
    store.dispatch(newFilteredTweetsArrived(data));
  });
  return (
    <div className="App">
      <Provider store={store}>
        {/* <CustomSnackbar /> */}
        <Router>
          <Switch>
            <Route exact path="/" component={TweetsPage} />
            <Route path="/search" component={FilterPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
