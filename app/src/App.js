import React from "react";
import logo from "./logo.svg";
import { connect, Provider } from "react-redux";
import { socket } from "./Dao/SocketDao";

import store from "./Reducer/Store";
import "./App.css";
import TweetsPage from "./Pages/TweetsPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { newRequestArrived } from "./Actions/TweetsAction";
function App(props) {
  socket.on("newRequestArrived", data => {
    console.log(data);
    store.dispatch(newRequestArrived(data));
  });
  return (
    <div className="App">
      <Provider store={store}>
        {/* <CustomSnackbar /> */}
        <Router>
          <Switch>
            <Route path="/tweets" component={TweetsPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
