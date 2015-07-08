 /// <reference path="../../typings/express/express.d.ts"/>
 /// <reference path="../../typings/node/node.d.ts"/>
import  express = require('express');
import path = require('path');
import config = require('./config');

var app = express();

var web_path = path.join(__dirname,'../../');
console.log(web_path);
app.use(express.static(web_path));


var server = require('http').Server(app);
server.listen(config.port,function(){
  console.log('data-explore server is listening on port ' + config.port);
});
