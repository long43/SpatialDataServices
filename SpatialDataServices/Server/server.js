var http = require("http");
var url = require("url");

function start(route, lexer) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response);
  }

  console.log("list the tokens" + lexer);
//  var str = 'E&';
//  var p = /^[a-z]|[A-Z]|[0-9]|_$/;
//  var bFound = p.test(str);
//  console.log(bFound);
  var token = lexer.nextToken('\'31231\'');
  for (var key in token){
   console.log("pattern is " + key + " match string is " + token[key]);
  }
  //http.createServer(onRequest).listen(8880);
  console.log("Server has started."); 
}

exports.start = start;