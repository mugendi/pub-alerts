var _ = require('lodash');
var util = require('util')

var alerts= function(options){

	//extend default opts
	this.options=_.extend(
		{redis:{}},
		options
	);

	//
	var load={};
	this.publishers={}

	for(var i in this.options){
		//start systems
		switch(i.toLowerCase()){
			case 'redis':
				load=require('redis');
				this.publishers[i]=load.createClient(this.options[i]);
			break;
			case 'firebase':
				load=require('firebase');
				this.publishers[i]=new load(this.options[i]);
			break;
		}
	}

}


 var redis = require("redis"),
     client2 = redis.createClient();

alerts.prototype.publish = function(channel,msg){

	//loop thru the publishers publishing messages...

	for(var i in this.publishers){
		//start systems
		switch(i.toLowerCase()){
			case 'redis':
				this.publishers[i].publish(channel,util.inspect(msg));
			break;
			case 'firebase':
				this.publishers[i].set(msg);
			break;
		}
	}

};


module.exports=alerts;