var http = require("http");
var url = require("url");

function start(route, lexer) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response);
  }

  console.log("list the tokens" + lexer);
 
  http.createServer(onRequest).listen(8880);
  console.log("Server has started."); 
}

exports.start = start;