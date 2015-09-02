
var Alerts=require('./index.js');

var options={
	firebase:"https://slited.firebaseio.com",
	redis:{detect_buffers: true}
}


var alerts = new Alerts(options);

var documents = 
{
	food:[
		    {
		        Make: 'Nissan',
		        Model: 'Murano',
		        Year: '2013',
		        Specifications: {
		            Mileage: '7106',
		            Trim: 'S AWD',
		            size:{
		            	width:3988,
		            	height:4094
		            }
		        }
		    },
		    {
		        Make: 'BMW',
		        Model: 'X5',
		        Year: '2014',
		        Specifications: {
		            Mileage: '3287',
		            Trim: 'M',
		            size:{
		            	width:6777,
		            	height:23,
		            	depth:098
		            }
		        }
		    }
		],
	bash:[
	    {
	        Make: 'Nissan',
	        Model: 'Murano',
	        Year: '2013',
	        Specifications: {
	            Mileage: '7106',
	            Trim: 'S AWD',
	            size:{
	            	width:3988,
	            	height:4094
	            }
	        }
	    },
	    {
	        Make: 'BMW',
	        Model: 'X5',
	        Year: '2014',
	        Specifications: {
	            Mileage: '3287',
	            Trim: 'M',
	            size:{
	            	width:6777,
	            	height:23,
	            	depth:098
	            }
	        }
	    }
	]
}
;



var redis = require("redis"),
    client = redis.createClient();

var channel='this channel';

client.on("message", function (channel, message) {
    console.log("client1 channel " + channel + ": " + message);
});



client.on("subscribe", function (channel, count) {
    
	alerts.publish(channel, documents)


});


client.subscribe(channel);
