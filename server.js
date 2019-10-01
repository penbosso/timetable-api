import app from './app';
import http from 'http';
import chalk from 'chalk';
// import process from 'process';
// import open from'open';
/* eslint-disable no-console */

const config = require('./common/config/env.config');
const server = http.createServer(app);

app.set('port', (process.env.PORT || config.port));
server.listen(app.get('port'), function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log(chalk.green('Starting app in dev mode... on port: '),app.get('port'))
      // open('http://localhost:'+ config.port);
    }
  });
