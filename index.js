var http = require("http");
var something = true;
http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'html'});
   
   // Send the response body as "Hello World"
   if (something) {
      response.end('<h1>hey</h1');
   } else {
      response.end('<h1>fuck u</h1>');
   }

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
