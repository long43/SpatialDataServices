var server = require("./Server/server");
var router = require("./Server/router");
var odatalexer = require("./OData/odatalexer");
var odataparser = require("./Odata/odataparser");
var action = require("./Handlers/dataflowActions");

var lexer = new odatalexer();
var parser = new odataparser();
var router = new router();
var action = new action();

lexer.on("Completed", function() {
	router.on("Completed", function(){
		server.start(router, action, lexer, parser);
	});
});

lexer.loadLex();
router.loadRoutes();
