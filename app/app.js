// your application's code
var express = require('express'),
	router = express.Router();
	posts = require('./post/post.routes'),
	users = require('./user/user.routes'),
	http = require('http'),
	path = require('path'),
	favicon = require('serve-favicon'),
	mongoose = require('mongoose'),
	dbUrl = process.env.MONGOLAB_URI || 'mongodb://hui357786325:fucked2014@ds127436.mlab.com:27436/investin',
	db = mongoose.connect(dbUrl, {safe: true}),
	//Express middleware
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	//log requests to the terminal
	logger = require ('morgan'),
	errorHandler = require('errorhandler'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var app = express();
app.locals.appTitle = 'InvestIN';
//Express configurations
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
//Express middleware configuration
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	secret: '2C44774A-D649-4D44-9535-46E296EF984F',
	resave: false,
	saveUninitialized: false}));
app.use(methodOverride());

//authentication middleware
app.use(function (req, res, next) {
	if (req.session && req.session.admin) {
		res.locals.admin = true;
	}
	next();
});



if ('development' === app.get('env')) {
	app.use(errorHandler());
}

//Pages and routes
app.use(users);
app.use(posts);
router.all('*', function (req, res) {
	res.sendStatus(404);
});

var server = http.createServer(app);

var boot = function () {
	server.listen(app.get('port'), function () {
		console.info('Express server listening on port', app.get('port'));
	});
};

var shutdown = function () {
	server.close();
};

if (require.main === module) {
	boot();
} else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}

