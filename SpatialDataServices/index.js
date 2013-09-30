var server = require("./Server/server");
var router = require("./Server/router");
var requestHandlers = require("./Handlers/requestHandlers");
var handle = require("./app_route");

server.start(router.route, handle);