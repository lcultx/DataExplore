import  express = require('express');
import path = require('path');
import config = require('./config');
import rpcRegister = require('../components/easy-rpc/register');
import mogHelper = require('./lib/mogHelper');
import paths = require('../share/configs/paths');

var app = express();



var web_path = path.join(__dirname,'../../');
console.log(web_path);

var index = path.join(web_path,'index.html');
var index_paths = paths.getExpressIndexPaths();
for(var i in index_paths){
  app.get(index_paths[i],(req,res)=>{
    res.sendFile(index);
  })
}

app.use(express.static(web_path));

var server = require('http').Server(app);
server.listen(config.port,function(){
  console.log('data-explore server is listening on port ' + config.port);
});

mogHelper.init(function(){
  rpcRegister(app,path.join(__dirname,'./rpc'));
});

var tasks = require('./tasks');
tasks.run();
