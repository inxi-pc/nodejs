var connect = require('connect');
var saveRequest = require('./saveRequest');
var writeHeader = require('./writeHeader');
var replyText = require('./replyText');

var app = connect.createServer(
	saveRequest(__dirname + '/requests'),
	writeHeader('X-Powered-By','Node'),
	replyText('Hello world!')
);

app.listen(8080);
