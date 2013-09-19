var server = require("./Server/server");
var router = require("./Server/router");
var requestHandlers = require("./Handlers/requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);