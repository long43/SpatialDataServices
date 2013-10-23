var fs = require('fs');
var readline = require('readline');
var events = require('events');
var util = require('util');

var router = function(){
	var self = this;
	self.routes = [];
	events.EventEmitter.call(this);
	
	this.loadRoutes = function(){
		var rd = readline.createInterface({
			input: fs.createReadStream('./Server/app_route.txt'),
			output: process.stdout,
			terminal: false
		});

		rd.on('line', function(line) {
			line = line.trim();
			if (line == '' || line.charAt(0) == '//'){
				return;
			}
			console.log(line);
			var array = line.split('=');
			self.routes[array[0]] = array[1].split('#')[0];
		});
		
		rd.on('close', function() {
			for (var key in self.routes){
				var pattern = self.routes[key];
				for (var nkey in self.routes){
					var replaced = "{" + nkey + "}";
					pattern = pattern.replace(new RegExp(replaced, 'g'), self.routes[nkey]);
				}
				self.routes[key] = pattern;
				console.log("key is " + key + " pattern is " + self.routes[key]);
			}
			self.emit("Completed");
		});
	};
	
	this.matchRoute = function(path){
		for (var key in self.routes){
			var str = "^" + self.routes[key] + "$";
			var pattern = new RegExp(str,'i');
			console.log("route name is " + key + " and pattern is " + pattern);
			if (pattern.test(path)){
				console.log("yes found route " + key);
				return key;
			}
		}
	};
};

util.inherits(router, events.EventEmitter);
module.exports = router;












