var mongoose    =   require("mongoose");
mongoose.connect('mongodb://arun:Qwerty12@ds023500.mlab.com:23500/vnr');
var Schema = mongoose.Schema;

// create schema
var recordsSchema  = new Schema({
      "timestamp": String,      
      "destination_ip": String,
      "destination_vn": String,
      "direction_ingress": Number, // Can have value 0 or 1
      "destination_port": Number,
      "protocol": Number,
      "source_ip": String,
      "source_vn": String,
      "source_port": Number,
      "sum_bytes_kb": Number,
      "sum_packets": Number

});
// create model if not exists.
module.exports = mongoose.model('Record',recordsSchema);