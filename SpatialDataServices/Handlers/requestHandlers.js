

function dataflowCreateJob(response){
  console.log("Request handler 'start' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Start");
  response.end(); 
}

function dataflowGetJobInfo(response){
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

function dataserviceQueryDataSource(request, response){
	
}

exports.upload = upload;