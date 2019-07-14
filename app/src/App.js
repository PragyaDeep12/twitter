import React from "react";
import logo from "./logo.svg";
import { connect, Provider } from "react-redux";
import { socket, fetchData } from "./Dao/SocketDao";
import store from "./Reducer/Store";
import "./App.css";
import "./styles/stylesheet.css";

import "./styles/bootstrap.css";
import TweetsPage from "./Pages/TweetsPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { newRequestArrived } from "./Actions/TweetsAction";
function App(props) {
  // fetchData();
  socket.on("newtweet", data => {
    console.log(data);
    if (store.getState().tweets[0]) {
      var newList = [...store.getState().tweets[0], ...data];
    } else {
      var newList = [...data];
    }
    console.log(newList);
    store.dispatch(newRequestArrived(newList));
  });
  return (
    <div className="App">
      <Provider store={store}>
        {/* <CustomSnackbar /> */}
        <Router>
          <Switch>
            <Route path="/" component={TweetsPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
