export const socket = require("socket.io-client")(
  "https://abracadabrant-bastille-91633.herokuapp.com/"
);
export var CurrentCount = 0;
export var incrementCount = 10;
export const fetchData = (track?: String) => {
  // console.log(track);
  CurrentCount = CurrentCount + incrementCount;
  console.log("not traack");
  socket.emit("latestData", {
    limit: CurrentCount
  });
};

export const getFilterTweets = (track: String) => {
  socket.emit("filterTweets", {
    limit: 20,
    track: track
  });
};
