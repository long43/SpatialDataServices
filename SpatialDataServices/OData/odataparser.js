var expression = require("./OData/Expression/expressiontree");

var parser = function(lexer, remainedStr){
	var self = this;
	self.lexer = lexer;
	self.expStack = new Array();
	self.opStack = new Array();
	self.expression = new expression();
	
	this.popConnectPush = function(){
		var opNode = self.opStack.pop();
		var expNodeRight = self.expStack.pop();
		var expNodeLeft = self.expStack.pop();
		
		opNode.left = expNodeLeft;
		opNode.right = expNodeRight;
		
		self.expStack.push(opNode);
	};
	
	this.parse = function(){
		do {
			var match = self.lexer.nextToken(remainedStr);
			if (match == ''){
				return;
			}
			
			//if matched with (, then just push into the stack
			if (match == '('){
				var exp = new expression(match);
				self.opStack.push(exp);
			}
			else if (match == 'EQ' || match == 'NE' || match == 'GT' || match == 'LT'){
				var exp = new expression(match);
				self.opStack.push(exp);
			}
			//if match == 'AND' or match == 'OR', then we need to 
			//if operator stack is not empty and the top of the stack is not ( and 
			//it means the we are encountering a new operator, you need to pop the previous operator to get a unit tree
			else if (match == 'AND' || match == 'OR' || match == ')'){
				var exp = new expression(match);
				do{
					self.popConnectPush();
				}
				while(self.opStack.length != 0 && self.opStack[self.opStack.length - 1] != '(');
				self.opStack.push(exp);
			}
		} while(true);
	};
	
};