
var Alerts=require('./index.js');

var options={
	firebase:"https://slited.firebaseio.com",
	redis:{detect_buffers: true}
}


var alerts = new Alerts(options);

var documents = {job_id:1} ;



var redis = require("redis"),
    client = redis.createClient();

var channel='data-tracked';

client.on("message", function (channel, message) {
    console.log("client1 channel " + channel + ": " + message);
});


client.subscribe(channel);



setInterval(function(){
	alerts.publish(channel, documents)
},1000)


