var http = require('http');
var soap = require('soap');
var path = require('path');
var methods = {};

var helloworldservice = {
    HelloService: {
        HelloPort: {
            // This is how to define an asynchronous function.
            sayHello: function (args, callback) {
                // do some work
                console.log('sayHello: ' + JSON.stringify(args));
                callback({'greeting': 'Hello '+ args.firstName});
            }
        }
    }
};

var wsdlFile = path.join(__dirname, '../test/helloworld.wsdl');

var wsdlxml = require('fs').readFileSync(wsdlFile, 'utf8'),
    server = http.createServer(function (request, response) {
        response.end("404: Not Found: " + request.url);
    });

var PORT = 3000;

methods.startWebService = function () {
    server.listen(PORT);
    console.log('server running on port ' + PORT);

    soap.listen(server, '/helloworldservice', helloworldservice, wsdlxml);
}

methods.stopWebService = function () {
    server.close(function() {
        server = null;
  });
}

methods.getWSDLURL = function() {
    return 'http://localhost:' + PORT + '/helloworldservice?wsdl';
}

module.exports = methods;
