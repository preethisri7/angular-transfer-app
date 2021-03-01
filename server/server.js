var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var uid = require('uid-safe');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000;

app.all('/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

// Online Database
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to DB Successfully");
});


var Transfer = require('./models/transfer');

var router = express.Router();


// test : http://localhost:3000/api
router.get('/', function(req, res) {
  res.sendFile(process.cwd()+"../dist/angular-transfer-app/")
});

//to get all transfers: http://localhost:3000/api/transfers
router.route('/transfers')

	.post(function(req, res) {
		var transfer = new Transfer();
    transfer.transfer_id = uid.sync(18);
		transfer.accountname = req.body.accountname;
    transfer.iban = req.body.iban;
    transfer.transferdate = req.body.transferdate;
    transfer.transferamount = req.body.transferamount;
    transfer.transfernote = req.body.transfernote;

		transfer.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Transfer created!' });
		});


	})

	.get(function(req, res) {
		Transfer.find(function(err, transfers) {
			if (err)
				res.send(err);

			res.json(transfers);
		});
	});

router.route('/transfers/:transfer_id')

	.get(function(req, res) {
		Transfer.findOne({transfer_id:req.params.transfer_id}, function(err, transfer) {
			if (err)
				res.send(err);
			res.json(transfer);
		});
	})

	.put(function(req, res) {
		Transfer.findOne({transfer_id:req.params.transfer_id}, function(err, transfer) {

			if (err)
				res.send(err);
        console.log(req.body);

        transfer.accountname = req.body.accountname;
        transfer.iban = req.body.iban;
        transfer.transferdate = req.body.transferdate;
        transfer.transferamount = req.body.transferamount;
        transfer.transfernote = req.body.transfernote;
			transfer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Transfer updated!' });
			});

		});
	})

	.delete(function(req, res) {
		Transfer.findOneAndRemove({
			transfer_id: req.params.transfer_id
		}, function(err, transfer) {
			if (err)
				res.send(err);

			res.json({ message: 'Transfer deleted' });
		});
	});


app.use('/api', router);

app.listen(port);
console.log('Listening to port: ' + port);
