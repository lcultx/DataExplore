import path = require('path');
export = function(app,rpc_path){
  console.log('rpc_path',rpc_path);
  app.get('/api/rpc',function(req,res){
    var method_str = req.query.method_str;
    var args = JSON.parse(req.query.args);
    var nameList = method_str.split('.');
    var file = path.join(rpc_path,nameList[0]);
    var method = nameList[1];

    console.log(file);
    var _module =  null;
    try{
      _module  = require(file);
      _module[method](args,function(data){
        res.json(data);
      });
    }catch(e){
      console.log(method_str);
      console.log(args);
      console.log(e);
    }


  });
}
