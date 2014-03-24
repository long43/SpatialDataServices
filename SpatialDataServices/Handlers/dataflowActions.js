var handlers = require("./requestHandlers");

var actions = function(path, query){
	var self = this;
	this.query = query;
	this.path = path;
	console.log("the path is " + path);
	
	console.log("the query params are:" + query);
	
	self.handler = new handlers(this.queryString);
	
	this.dataflowCreateJobAction = function(response){
		var dataflowAction = self.path.split('/')[2].toLowerCase();
		switch(dataflowAction){
			case "upload":
				console.log("this is create upload job request");
				self.handler.dataflowCreateUploadJob(response);
				break;
			case "delete":
				self.handler.dataflowCreateDeleteJob(response);
				break;
			default:
				break;
		}
	};

	this.dataflowGetJobAction = function(response){
		var parameters = self.path.split('/');
		var dataflowAction = parameters[2].toLowerCase();
		var jobId = parameters[3];
		switch(dataflowAction){
			case "upload":
				self.handler.dataflowGetUploadJobInfo(response, jobId);
				break;
			case "delete":
				self.handler.dataflowGetDeleteJobInfo(response, jobId);
				break;
			default:
				break;
		}
	};

	this.dataflowQueryAction = function(response){
		var parameters = self.path.split('/');
		var accessId = parameters[2];
		var dataSourceName = parameters[3];
		var entityType = parameters[4];
		console.log("entityType is " + entityType);
		self.handler.dataserviceQueryDataSource(response, accessId, dataSourceName, entityType);
	};
};

module.exports = actions;
