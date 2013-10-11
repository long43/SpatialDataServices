var fs = require('fs');
var readline = require('readline');
var events = require('events');
var util = require('util');

var lexer = function() {
	var self = this;
	events.EventEmitter.call(this);
	self.tokens = [];
	self.loadLex = function(){
		var rd = readline.createInterface({
			input: fs.createReadStream('./OData/odatalexer.lex'),
			output: process.stdout,
			terminal: false
		});

		rd.on('line', function(line) {
			if (line == ''){
				return;
			}
			console.log(line);
			var array = line.split('=');
			self.tokens[array[0]] = array[1];
		});
		
		rd.on('close', function() {
			for (var key in self.tokens){
				var pattern = self.tokens[key];
				for (var nkey in self.tokens){
					var replaced = "{" + nkey + "}";
					pattern = pattern.replace(new RegExp(replaced, 'g'), self.tokens[nkey]);
				}
				self.tokens[key] = pattern;
				console.log("key is " + key + " pattern is " + self.tokens[key]);
			}
			self.emit("Completed");
		});
	};
	
	this.nextDelimiter = function(remaindedString, end){
		var key = "SPACE";
		console.log(self.tokens[key]);
		for (var i = end - 1; i >= 0; i --){
			var c = remaindedString.charAt(i);
			var pattern = new RegExp("^" + self.tokens['SPACE'] + "$");
			if (pattern.test(c)){
				return i;  
			}
		}
		return 0;
	};

	this.nextToken = function(remainedString){
		var matched = [];
		var matchedKey = '';
		var lastSpace = remainedString.length;
		while (lastSpace >= 0){
			var substr = remainedString.substring(0,lastSpace);
			console.log("remained str is " + substr + " last space is at " + lastSpace);
			var find = false;
			//console.log("substr is " + substr);
			for (var key in self.tokens){
				var str = "^" + self.tokens[key] + "$";
				//console.log('test for ' + str);
				var pattern = new RegExp(str);
				if (pattern.test(substr)){
					find = true;
					matchedKey = key;
					break;
				}
			}
			//console.log("matched key is " + matchedKey);
			if (find == true){
				console.log(matchedKey + " : " + substr);
				break;
			}
			lastSpace = this.nextDelimiter(remainedString, lastSpace);
		}	
		matched[matchedKey] = remainedString.substring(0,lastSpace);
		return matched;
	};
};

util.inherits(lexer, events.EventEmitter);
module.exports = lexer;

