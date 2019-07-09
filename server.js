import app from './app';
import http from 'http';
import chalk from 'chalk';
// import open from'open';
/* eslint-disable no-console */

const config = require('./common/config/env.config');
const server = http.createServer(app);

server.listen(config.port, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log(chalk.green('Starting app in dev mode...'))
      // open('http://localhost:'+ config.port);
    }
  });
