 /// <reference path="../../typings/express/express.d.ts"/>
 /// <reference path="../../typings/node/node.d.ts"/>
import  express = require('express');
import path = require('path');
import config = require('./config');

var app = express();

var build_path = path.join(__dirname,'../../build');
var resource_path = path.join(__dirname,'../../resource');
app.use('build',express.static(build_path));
app.use('resource',express.static(resource_path));

var server = require('http').Server(app);
server.listen(config.port,function(){
  console.log('data-explore server is listening on port ' + config.port);
});
