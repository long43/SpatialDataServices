var expression = require("./Expression/expressiontree");

var parser = function(lexer){
	var self = this;
	self.expStack = new Array();
	self.opStack = new Array();
	self.expression = new expression();
	
	this.popConnectPush = function(){
		var opNode = self.opStack.pop();
		console.log("pop logic operator from op stack " + opNode.value);
		var expNodeRight = self.expStack.pop();
		var expNodeLeft = self.expStack.pop();
		
		opNode.left = expNodeLeft;
		opNode.right = expNodeRight;
		console.log("pop exp from exp stack " + expNodeRight.value);
		console.log("pop exp from exp stack " + expNodeLeft.value);
		self.expStack.push(opNode);
		return true;
	};
	
	this.printTree = function(root){
		if (root == null){
			return;
		}
		this.printTree(root.left);
		this.printTree(root.right);
		console.log("node value: " + root.value);
	};
	
	this.parse = function(lexer, remainedStr){
		console.log("input str is " + remainedStr);
		var isValid = true;
		do {
			var match = lexer.nextToken(remainedStr);
			if (match == null || match == ''){
				break;
			}
			if (match == false){
				console.log("match is empty");
				isValid = false;
				break;
			}
			remainedStr = remainedStr.replace(match,'').trim();
			console.log("match is " + match);
			//if matched with (, then just push into the stack
			if (match == '(' || match == 'EQ' || match == 'NE' || match == 'GT' || match == 'LT'){
				var exp = new expression(match);
				console.log("push logic operator to op stack " + match);
				self.opStack.push(exp);
			}
			//if match == 'AND' or match == 'OR', then we need to 
			//if operator stack is not empty and the top of the stack is not ( and 
			//it means the we are encountering a new operator, you need to pop the previous operator to get a unit tree
			else if (match == 'AND' || match == 'OR'){
				var exp = new expression(match);
				while(self.opStack.length != 0 && self.opStack[self.opStack.length - 1].value != '('){
					console.log("top is " + self.opStack[self.opStack.length - 1].value);
					self.popConnectPush();
					console.log("opstack length is " + self.opStack.length);
				}
				
				console.log("push logic operator to op stack " + match);
				self.opStack.push(exp);
			}
			//if it's ) then pop stack to form the expression tree
			else if (match == ')'){
				while(self.opStack.length != 0 && self.opStack[self.opStack.length - 1].value != '('){
					self.popConnectPush();
				}
				if (self.opStack.length != 0){
					self.opStack.pop();
				}
			}
			else{
				console.log("push variable or constant to exp stack " + match);
				var exp = new expression(match);
				self.expStack.push(exp);
			}
		} while(true);
		
		if (isValid == true){
			console.log("it's legal expression");
			while(self.opStack.length != 0 && self.opStack[self.opStack.length - 1].value != '('){
				self.popConnectPush();
			}
			if (self.expStack.length > 1){
				return false;
			}
			else{
				return self.expStack.pop();
			}
		}	
		else{
			return false;
		}
	};
};

module.exports = parser;