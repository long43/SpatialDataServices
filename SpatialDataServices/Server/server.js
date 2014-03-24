var http = require("http");
var url = require("url");
var dataflowAction = require("../Handlers/dataflowActions");

function start(router, action, lexer, parser) {
	function onRequest(request, response) {
		console.log(request.url);
		var queryUrl = url.parse(request.url);
		var action = new dataflowAction(queryUrl.pathname, queryUrl.query);
		if(queryUrl.path != '/favicon.ico') {
			console.log("Request for " + action.path + " received.");
			var handler = router.matchRoute(action.path);
			console.log("handler is " + handler);
			switch (handler){
			case "Dataflow_CreateJob":
				action.dataflowCreateJobAction(response);
				break;
			case "Dataflow_GetJob":
				action.dataflowGetJobAction(response);
				break;
			case "DataService_QueryDataSource":
				action.dataflowQueryAction(response);
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