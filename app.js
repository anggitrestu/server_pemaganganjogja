require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/v1/index');
const userRouter = require('./src/routes/v1/users');
const authRouter = require('./src/routes/v1/auth');
const adminRouter = require('./src/routes/v1/admin');
const companyRouter = require('./src/routes/v1/company');
const regulationRouter = require('./src/routes/v1/regulation');
const internshipRouter = require('./src/routes/v1/internship');
const userInternshipRouter = require('./src/routes/v1/user-internship');
const surveyRouter = require('./src/routes/v1/survey');
const answerSurveyRouter = require('./src/routes/v1/answer-survey');
const userSurveyRouter = require('./src/routes/v1/user-survey');
const kusionerRouter = require('./src/routes/v1/questionare');
const answerKuisionerRouter = require('./src/routes/v1/answer-questionare');
const userKuisionerRouter = require('./src/routes/v1/user-questionare');
const excelRouter = require('./src/routes/v1/excel');
const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Bangkok',
});
console.log(nDate);
const app = express();
var cors = require('cors');
global.__basedir = __dirname + '/..';
app.use(express.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', indexRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/regulation', regulationRouter);
app.use('/api/v1/internship', internshipRouter);
app.use('/api/v1/user-internship', userInternshipRouter);
app.use('/api/v1/survey', surveyRouter);
app.use('/api/v1/answer-survey', answerSurveyRouter);
app.use('/api/v1/kuisioner', kusionerRouter);
app.use('/api/v1/answer-kuisioner', answerKuisionerRouter);
app.use('/api/v1/user-kuisioner', userKuisionerRouter);
app.use('/api/v1/user-survey', userSurveyRouter);
app.use('/api/v1/excel', excelRouter);

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
  res.render('error');
});

module.exports = app;
