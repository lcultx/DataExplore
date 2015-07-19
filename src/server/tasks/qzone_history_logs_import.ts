
import LatteEventLogModel = require('../../components/data-models/LatteEventLogModel');
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
import config = require('../config');
import path = require('path');
import async = require('async');

import mogHelper = require('../../library/mogHelper');
import moment = require('moment');
var ExecTime = require('exec-time');
var profiler = new ExecTime('qzone_history_logs_import');


var walk = require('fs-walk');

function logfile2db(file,server_name,callback){
  var ldCollector = new LocalLogDataCollector();

  console.log(file);
  var theday_str = /.*qzone_logs\/(.*)\/server*/.exec(file)[1];//2015/07/13
  var mm = moment(theday_str,'YYYY/MM/DD');

  var theday = mm.toDate();
  var nextday = mm.clone().add(1, 'd').toDate();
  console.log(theday);
  console.log(nextday);
  var q = async.queue(function (ob, callback) {
    mogHelper.getQZoneLogEventCollection().insert(ob,function(err,docs){

      if(err){
        console.log(err);
      }
      callback();
    });
  }, 10);
  //先删除当天该服务器的数据 再插入
  mogHelper.getQZoneLogEventCollection().remove({
    server_name:server_name,
    theday_str:theday_str
  },{},function(err,results){
    profiler.step('delete documents');
    ldCollector.setLogURI(file);
    ldCollector.setLogModelAsParser(new LatteEventLogModel({}));
    ldCollector.on('line',function(ob){
      ob.server_name = server_name;
      ob.theday_str =  theday_str ;
      q.push(ob,function(err){
        profiler.step('insert on object ');
      });


    });

    ldCollector.on('end',function(){
      profiler.step('finish on file' + file);
      console.log('finish');
      callback();
    });
    ldCollector.run();
  });
}

function logfiles2db(dir,callback){
  var q = async.queue(function (task:any, callback) {
    console.log(task);
    var file = task.file;
    var server_name = task.server_name;
    logfile2db(file,server_name,function(){
      callback();
    });
  }, 1);
  walk.files(dir, function(basedir, filename, stat, next) {
    var file = path.join(basedir,filename);
    if(file.indexOf('.log')> -1){
      var server_name = filename.split('.log')[0];
      q.push({file:file,server_name:server_name}, function (err) {
        next();
      });
    }
  });
}

export function dailyLogfiles2db(theday,callback){
  profiler.beginProfiling();
  var theday_dir = <any>path.join(config.getQZoneLatteLogsDir(),theday.format('YYYY/MM/DD'));
  logfiles2db(theday_dir,function(){
    console.log('finish!');
  });

}

function run(){
  mogHelper.init(function(){
    var theday_str = process.argv[2];
    console.log(theday_str);
    if(theday_str){
      dailyLogfiles2db(moment(theday_str,'YYYY/MM/DD'),function(){})
    }else{
      profiler.beginProfiling();
      var qlogs_dir = config.getQZoneLatteLogsDir();
      logfiles2db(qlogs_dir,function(){});
    }
  });
}

if(require.main === module){
  run();
}
