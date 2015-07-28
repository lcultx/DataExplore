/// <reference path="./interface.d.ts"/>
import LocalLogsImport = require('./LocalLogsImport');
import path = require('path');
import config = require('../config');
import mogHelper = require('../lib/mogHelper');
import async = require('async');
var ExecTime = require('exec-time');
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
class WanbaLogsImport extends LocalLogsImport implements ILocalLogsImport{

  constructor(){
    super();
    this.profiler = new ExecTime('wanba_history_logs_import');
  }

  getCollection(){
    return mogHelper.getWanbaLogEventCollection();
  }

  getServerName(file){
    return 'wanba_sdk_proxy'
  }
  getLogsDir(){
    return config.getWanbaSDKLogsDir();
  }

  getThedayStr(file){
    return /.*wanba_logs\/(.*)\/[(info)|(error)|(warn)]*/.exec(file)[1];
  }

  onFile(root, fileStats, next){
      var q = this.getReadFilesQueue();
      var file = path.join(root,fileStats.name);

      if(file.indexOf('info.log')> -1){
        console.log(file);
        var server_name = this.getServerName(file);
        q.push({file:file,server_name:server_name}, ()=>{});
      }

      next();
  }

  logfile2db(file,server_name,callback){

    var q = async.queue((ob, callback) =>{
     this.getCollection().insert(ob,(err,docs)=>{
       this.profiler.step('insert an object ');
       if(err){
         console.log(err);
       }
       callback();
     });
   }, 2);

    var ldCollector = new LocalLogDataCollector();
    var theday_str = this.getThedayStr(file);

    this.getCollection().remove({
      server_name:server_name,
      theday_str:theday_str
    },{},(err,results)=>{
      this.profiler.step('delete documents');
      ldCollector.setLogURI(file);

      ldCollector.on('line',(line)=>{
        try{
          var ob = JSON.parse(line);
          ob.data.res = JSON.parse(ob.data.res);
          ob.server_name = server_name;
          ob.theday_str = theday_str;
          q.push(ob, ()=>{});
        }catch(e){
          console.log(e);
        }

      });
      ldCollector.on('end',function(){
        callback();
      });
      ldCollector.run();
    });
  }
}

if(require.main === module){
  var wanbaImport = new WanbaLogsImport();
  wanbaImport.run();
}

export = WanbaLogsImport;
