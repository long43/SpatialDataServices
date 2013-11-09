var handlers = require("./requestHandlers");

var actions = function(){
	var self = this;
	self.handler = new handlers();
	
	this.dataflowCreateJobAction = function(path, response){
		var dataflowAction = path.split('/')[2].toLowerCase();
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

	this.dataflowGetJobAction = function(path, response){
		var parameters = path.split('/');
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

	this.dataflowQueryAction = function(path, response){
		var parameters = path.split('/');
		var accessId = parameters[2];
		var dataSourceName = parameters[3];
		var entityType = parameters[4];
		console.log("entityType is " + entityType);
		self.handler.dataserviceQueryDataSource(response, accessId, dataSourceName, entityType);
	};
};

module.exports = actions;
