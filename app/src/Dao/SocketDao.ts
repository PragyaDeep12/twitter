export const socket = require("socket.io-client")("http://localhost:4000/");
export var CurrentCount = 0;
export var incrementCount = 10;
export const fetchData = (track?: String) => {
  console.log(track);
  if (!track) {
    CurrentCount = CurrentCount + incrementCount;
    console.log("not traack");
    socket.emit("checkData", {
      limit: incrementCount
    });
  } else {
    console.log("track");
    CurrentCount = CurrentCount + incrementCount;
    socket.emit("filterData", {
      limit: incrementCount,
      track: track
    });
  }
};
