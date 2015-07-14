
import LatteEventLogModel = require('../../components/data-models/LatteEventLogModel');
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
import config = require('../config');
import path = require('path');

import mogHelper = require('../../library/mogHelper');
import moment = require('moment');

var walk = require('fs-walk');
var qLogsDir = config.getQZoneLatteLogsDir();

function filelog2db(file,server_name){
  var ldCollector = new LocalLogDataCollector();

  console.log(file);

  var theday_str = /.*qzone_logs\/(.*)\/server*/.exec(file)[1];//2015/07/13
  var mm = moment(theday_str,'YYYY/MM/DD');

  var theday = mm.toDate();
  var nextday = mm.clone().add(1, 'd').toDate();
  console.log(theday);
  console.log(nextday);





  //先删除当天该服务器的数据 再插入
  mogHelper.getQZoneLogEventCollection().remove({
    server_name:server_name,
    time:
    {
        "$gte" : theday,
        "$lt" : nextday
    }
  },{},function(err,results){

    ldCollector.setLogURI(file);
    ldCollector.setLogModelAsParser(new LatteEventLogModel({}));
    ldCollector.on('line',function(ob){
      ob.server_name = server_name;
      mogHelper.getQZoneLogEventCollection().insert(ob,function(err,docs){
        if(err){
          console.log(err);
        }
      });
    });

    ldCollector.on('end',function(){
      console.log('finish');
    });
  //  ldCollector.run();
  });


}

function run(){

  walk.files(qLogsDir, function(basedir, filename, stat, next) {

    var file = path.join(basedir,filename);
    var server_name = filename.split('.log')[0];
    filelog2db(file,server_name);


   next();
  });
}

mogHelper.init(function(){
  run();
});
