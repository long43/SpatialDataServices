var http = require("http");
var url = require("url");

function start(router, lexer, parser) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    //route(handle, pathname, response);
  }
//  var str = 'E&';
//  var p = /^[a-z]|[A-Z]|[0-9]|_$/;
//  var bFound = p.test(str);
//  console.log(bFound);
  //var token = lexer.nextToken("AEQ'123' AND (B EQ '231' OR C NE '222'");
//  var node = parser.parse(lexer, "(A EQ '123' OR D EQ '123') AND (B EQ '231' OR C NE '222')");
//  if (node != false){
//	  parser.printTree(node);
//  }
//  else{
//	  console.log("Is not a valid expression");
//  }
  
  var path = 'data/12345678123456781234567812345678/DataSource1/EntityType';
//  var pattern = new RegExp('^dataflow/(upload|getinfo|download|delete)/[0-9A-Za-z]{32,32}$','i');
//  var test = pattern.test(path);
//  console.log("test is " + test);
  var handler = router.matchRoute(path);
  console.log("handler is " + handler);
  //console.log("match string is " + token);
  //http.createServer(onRequest).listen(8880);
  console.log("Server has started."); 
}

exports.start = start;