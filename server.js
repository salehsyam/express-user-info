const createError = require('http-errors');
const express = require('express');
const path = require('path');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

// Route files
const indexRoute = require('./routes/index');

// view engine setup
app.engine('.html', require('ejs').__express);
// Optional since express defaults to CWD/views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))

// Mount routers

app.use('/', indexRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

//start server
async function main() {
  const port = process.env.PORT || 3000;

  const server = app.listen(port, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
        .bold
    );
  });
  process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
}

main();
