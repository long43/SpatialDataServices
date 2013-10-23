var server = require("./Server/server");
var router = require("./Server/router");
var requestHandlers = require("./Handlers/requestHandlers");
var odatalexer = require("./OData/odatalexer");
var odataparser = require("./Odata/odataparser");

var lexer = new odatalexer();
var parser = new odataparser();
var router = new router();

lexer.on("Completed", function() {
	router.on("Completed", function(){
		server.start(router, lexer, parser);
	});
});

lexer.loadLex();
router.loadRoutes();
