import express from'express';
import bodyParser  from 'body-parser';
import config from './common/config/env.config';
import mongoose from 'mongoose';
import AuthorizationRouter from './auth/auth.routes';
import UsersRouter from'./user/user.routes';
import chalk from 'chalk';

/* eslint-disable no-console */
const app = express();

mongoose.Promise = global.Promise;
let dbUrl = '';

if (process.env.ENV === 'Test'){
  console.log(chalk.blue('This is a test'));
  dbUrl = config["db-url-test"];
} else {
  dbUrl = config["db-url"];
}

// Connecting to the database
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log(chalk.green("Successfully connected to the database"));
}).catch(err => {
    console.log(chalk.red('Could not connect to the database. Exiting now...', err));
    process.exit();
});

app.get('/', function(req, res){
  res.send('Hey Setted UP');
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.send(200);
  } else {
      return next();
  }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);


module.exports = app;