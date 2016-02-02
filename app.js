var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
//vhost
var vhost = require('vhost');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var rank = require('./routes/rank');

//db
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'polpos',
    password : 'polpos',
    database : 'nodegambar',
    debug    :  false
});
exports.pool = pool; 

//Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
	  //console.log('ini '+username + ', password='+password);
	  //TODO: cek pass
	  
	  var uname;
	  var urole;
	  	  
	  pool.getConnection(function(err,connection){
			if (err) {
				connection.release();
				//res.json({"code" : 100, "status" : "Error in connection database"});
				console.log("error koneksi db");
				return;
			}  

			//console.log('connected as id ' + connection.threadId);

			connection.query("select * from users where nama='" + username +"' and password='" + password + "'",function(err,rows){
				connection.release();
				if(!err && rows[0] != null) { 
					//console.log("ini adalah nama:"+ rows[0].nama);
					//console.log("ini adalah rol:"+ rows[0].rol);
					uname = rows[0].nama;
					urole= rows[0].rol;
					
					//console.log("ini adalah sukses:"+ urole);
					  
					if(uname != null && urole != null){
						return done(null, {name: uname, rol: urole});
					 }					
				}
				return done(null, false, { message: 'Incorrect username.' });
			});

			connection.on('error', function(err) {      
				//res.json({"code" : 100, "status" : "Error in connection database"});
				console.log("error koneksi db");
				return;    
			});
		});
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated())  	
	  res.sendStatus(401);
  else
  	next();
};

exports.auth = auth;

// socket.io
var socket_io = require("socket.io");


var app = express();

//vhost
var gambar_bom = require('./routes/index');

//Socket.io
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//vhost
app.use(vhost('gambar.bom', gambar_bom));

app.use('/', routes);


app.use(session({secret: 'ssh',saveUninitialized: false,resave: false}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization






//route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');  
});

// route to log in

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);  
});


// route to log out
app.post('/logout', function(req, res){
	//console.log('keluar');
	req.logOut();	
	res.sendStatus(200);
});


//routing ke users
app.use('/users', users);

//routing ke rank
app.use('/rank', rank);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {	
	// Start listening for mouse move events
	socket.on('mousemove', function (data) {		
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);	
		//console.log('id='+data.id+' posx='+data.x);		
	});
});

module.exports = app;