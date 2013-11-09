var http = require("http");
var url = require("url");

function start(router, action, lexer, parser) {
	function onRequest(request, response) {
		console.log(request.url);
		var pathname = url.parse(request.url).pathname;
		if(pathname != '/favicon.ico') {
			console.log("Request for " + pathname + " received.");
			var handler = router.matchRoute(pathname);
			console.log("handler is " + handler);
			switch (handler){
			case "Dataflow_CreateJob":
				action.dataflowCreateJobAction(pathname, response);
				break;
			case "Dataflow_GetJob":
				action.dataflowGetJobAction(pathname, response);
				break;
			case "DataService_QueryDataSource":
				action.dataflowQueryAction(pathname, response);
				break;
			default:
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write("not defined request");
				response.end();
				break;
			}
		}
	}  
	http.createServer(onRequest).listen(8880);
	console.log("Server has started."); 
}

exports.start = start;