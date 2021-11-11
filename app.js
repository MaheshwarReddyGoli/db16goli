var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelsRouter = require('./routes/hotels');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var Hotels = require("./models/Hotels");
var resourceRouter = require('./routes/resource');

// We can seed the collection if needed on server start
async function recreateDB() {
    // Delete everything
    await Hotels.deleteMany();
    let instance1 = new Hotels({
        roomType: "Deluxe",
        price: 100,
        location: "5 th Floor"
    });
    instance1.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("First object saved")
    });
    let instance2 = new Hotels({
        roomType: "Premium",
        price: 200,
        location: "3 rd Floor"
    });
    instance2.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Second object saved")
    });
    let instance3 = new Hotels({
        roomType: "Super Delux",
        price: 400,
        location: "1 st Floor"
    });
    instance3.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Third object saved")
    });
}
let reseed = true;
if (reseed) { recreateDB(); }
const connectionString =
    process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;