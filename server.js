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
	var query = mongoOp.find();

	var start = moment(req.query.start),end = moment(req.query.end);
	// if( start.isValid() && end.isValid()){
	// 	query.where('timestamp').gte(start.unix()).lte(end.unix());
	// }
	if(req.query.destination_ip){
		query.where('destination_ip').in(req.query.destination_ip);
	}
	if(req.query.destination_vn){
		query.where('destination_vn').in(req.query.destination_vn);
	}
	if(req.query.direction_ingress){
		query.where('direction_ingress').in(req.query.direction_ingress);
	}
	if(req.query.sum_bytes_kb){
		query.where('sum_bytes_kb').in(req.query.sum_bytes_kb);
	}
	if(req.query.protocol){
		query.where('protocol').in(req.query.protocol);
	}
	if(req.query.source_ip){
		query.where('source_ip').in(req.query.source_ip);
	}
	if(req.query.source_vn){
		query.where('source_vn').in(req.query.source_vn);
	}
	if(req.query.source_port){
		query.where('source_port').in(req.query.source_port);
	}
	if(req.query.sum_bytes_kb){
		query.where('sum_bytes_kb').in(req.query.sum_bytes_kb);
	}
	if(req.query.sum_packets){
		query.where('sum_packets').in(req.query.sum_packets);
	}

	query.exec(function(err, results) {
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
	keys.splice(keys.indexOf("_id"));
	keys.splice(keys.indexOf("__V"));
	var key = req.params.key;
	var values = {};
	if (_.indexOf(keys,key)!= -1) {
		mongoOp.distinct(key,function (err,data) {
			if (err) {
					res.status(500).json({error :"Something went wrong!"});
                	}else{
                		values[key] = data;
						res.status(200).json({data:values});

                	}
                });
	} else {
		res.status(400).json({error :"Invalid key"});
	}
	
});

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");