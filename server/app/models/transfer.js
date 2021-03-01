var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var transferSchema   = new Schema({
  transfer_id: String,
	accountname: String,
	iban: String,
	transferdate: String,
	transferamount: String,
	transfernote: String
});

module.exports = mongoose.model('Transfer', transferSchema);
