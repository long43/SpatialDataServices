
var handlers = function(){
	this.dataflowCreateUploadJob = function(response){
		console.log("Request handler 'create upload job' was called.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello Upload");
		response.end(); 
	};

	this.dataflowCreateDeleteJob = function(response){
		console.log("Request handler 'create delete job' was called.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello Delete");
		response.end(); 
	};

	this.dataflowGetUploadJobInfo = function(response, jobId){
		console.log("Request handler 'Get Upload' was called.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello Get Upload" + jobId);
		response.end();
	};

	this.dataflowGetDeleteJobInfo = function(response, jobId){
		console.log("Request handler 'Get Delete' was called.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello Get Delete" + jobId);
		response.end();
	};

	this.dataserviceQueryDataSource = function(response, accessId, dataSourceName, entityType){
		console.log("Request handler 'query' was called.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello Query " + accessId + " ds name: " + dataSourceName + " entitytype: " + entityType);
		response.end();
	};
};

module.exports = handlers;

