util = require('util');
var EventEmitter = require('events').EventEmitter;
var MyClass=function(){
	var self = this;
	setInterval(function(){
		self.emit('tick');
	},1000);
};
util.inherits(MyClass,EventEmitter);


var ticker = new MyClass();
ticker.on('tick',function(){
    console.log('tick');
});

