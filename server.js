var express =   require("express");
var app  =   express();
var bodyParser  =   require("body-parser");
var router  =   express.Router();
var mongoOp =   require("./models/mongo");
var moment = require("moment");
var _ = require("underscore");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(express.static(__dirname + '/public'));
	
//API for search where all the keys are passed as query string parameters 
router.route("/records/search")
.get(function(req,res){
	var query ={};
	var start = moment(req.query.start),end = moment(req.query.end);
	
	if(req.query.destination_ip){
		query['destination_ip'] = req.query.destination_ip;
	}
	if(req.query.destination_vn){
		query['destination_vn'] = req.query.destination_vn;
	}
	if(req.query.direction_ingress){
		query['direction_ingress'] = req.query.direction_ingress;
	}
	if(req.query.destination_port){
		query['destination_port'] = req.query.destination_port;
	}
	if(req.query.protocol){
		query['protocol'] = req.query.protocol;
	}
	if(req.query.source_ip){
		query['source_ip'] = req.query.source_ip;
	}
	if(req.query.source_vn){
		query['source_vn'] = req.query.source_vn;
	}
	if(req.query.source_port){
		query['source_port'] = req.query.source_port;
	}
	if(req.query.sum_bytes_kb){
		query['sum_bytes_kb'] = req.query.sum_bytes_kb;
	}
	if(req.query.sum_packets){
		query['sum_packets'] = req.query.sum_packets;
	}

	mongoOp.find(query,function(err, results) {
	      if (err) {
	      	res.status(500).json({error :"Something went wrong!"});
	      }
	      res.status(200).json({data:results});

	    });
});

//To fetch all the records
router.route("/records/all")
.get(function(req,res){
	mongoOp.find({},function(err,data){
		if(err) {
			res.status(500).json({error :"Something went wrong!"});
		} else {
			res.status(200).json({data:data});
		}
	});
});

/*To fetch all the distinct values for a particular field.Used for
select box suggestions*/
router.route("/records/keys/:key")
.get(function(req,res){
	var keys = Object.keys(mongoOp.schema.paths);
	var key = req.params.key;
	var values = {};
	if (_.indexOf(keys,key)!= -1) {
		mongoOp.distinct(key,function (err,data) {
			if (err) {
					res.status(500).json({error :"Something went wrong!"});
                	}else{
                		// values[key] = data;
						res.status(200).json({data:data});

                	}
                });
	} else {
		res.status(400).json({error :"Invalid key"});
	}
	
});

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");