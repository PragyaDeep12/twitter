export const socket = require("socket.io-client")("http://localhost:4000/");
export var CurrentCount = 0;
export var incrementCount = 10;
export const fetchData = (track?: String) => {
  console.log(track);
  CurrentCount = CurrentCount + incrementCount;
  socket.emit("checkData", {
    url: "/statuses/sample",
    params: { name: "sharukh" },
    limit: CurrentCount,
    track: track ? track : "World Cup"
  });
};
