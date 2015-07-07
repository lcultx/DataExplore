/**
 * Created by xuyang on 15/7/7.
 */
 /// <reference path="../../typings/express/express.d.ts"/>
 /// <reference path="../../typings/node/node.d.ts"/>
import  express = require('express');
import path = require('path');
import config = require('./config');

var app = express();

var fd_path = path.join(__dirname,'../../frontend');
app.use(express.static(fd_path));

var server = require('http').Server(app);
server.listen(config.port,function(){
  console.log('data-explore server is listening on port ' + config.port);
});
