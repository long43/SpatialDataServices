var server = require("./Server/server");
var router = require("./Server/router");
var requestHandlers = require("./Handlers/requestHandlers");
var odatalexer = require("./OData/odatalexer");

var lexer = new odatalexer();

lexer.on("Completed", function() {
	server.start(router, lexer);
});

lexer.loadLex();
