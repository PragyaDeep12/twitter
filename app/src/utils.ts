export const formatTimeStamp = time => {
  var date: Date = new Date(time);
  console.log(date);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const createHtml = (fullText: String, searchQuery: String) => {
  var startIndex = fullText
    .toUpperCase()
    .indexOf(searchQuery.toString().toUpperCase());
  var endIndex = startIndex + searchQuery.length;
  console.log("Start Index", startIndex);
  console.log("End Index", endIndex);
  var html =
    "<span>" +
    fullText.substring(0, startIndex) +
    '<span class="highlight">' +
    searchQuery +
    "</span>" +
    fullText.substring(endIndex, fullText.length - 1) +
    "</span>";
  if (startIndex != -1) return html;
  else return "<span>" + fullText + "</span>";
};
