 /// <reference path="../../typings/express/express.d.ts"/>
 /// <reference path="../../typings/node/node.d.ts"/>
import  express = require('express');
import path = require('path');
import config = require('./config');
import rpcRegister = require('../components/easy-rpc/register');
import mogHelper = require('../library/mogHelper');


var app = express();

var web_path = path.join(__dirname,'../../');
console.log(web_path);
app.use(express.static(web_path));

var views = require('./views');
views.loadViews(app);

var server = require('http').Server(app);
server.listen(config.port,function(){
  console.log('data-explore server is listening on port ' + config.port);
});

mogHelper.init(function(){
  rpcRegister(app,path.join(__dirname,'./rpc'));
});

var tasks = require('./tasks');
tasks.run();
