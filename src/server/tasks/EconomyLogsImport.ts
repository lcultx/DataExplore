/// <reference path="./interface.d.ts"/>
import LocalLogsImport = require('./LocalLogsImport');
import mogHelper = require('../lib/mogHelper');
import LatteEconomyLogModel = require('../../components/data-models/LatteEconomyLogModel');
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
import path = require('path');
import config = require('../config');
var ExecTime = require('exec-time');
import async = require('async');
class EconomyLogsImport extends LocalLogsImport implements ILocalLogsImport{

    constructor(){
      super();
      this.profiler = new ExecTime('economy_history_logs_import');
    }

    getLogsDir(){
      return config.getEconomyLogsDir();
    }

    getCollection(){
      return mogHelper.getEconomyLogCollection();
    }

    getServerName(file){
      return file.split('.log')[0];
    }

    onFile(root, fileStats, next){
        var q = this.getReadFilesQueue();
        var file = path.join(root,fileStats.name);
        if(file.indexOf('.log')> -1){
          console.log(file);
          var server_name = this.getServerName(fileStats.name);
          q.push({file:file,server_name:server_name}, ()=>{});
        }
        next();
    }

    getThedayStr(file){
      return /.*economy_logs\/(.*)\/server*/.exec(file)[1];//2015/07/13
    }

    logfile2db(file,server_name,callback){

      var q = async.queue( (ob, callback)=> {
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
        ldCollector.setLogModelAsParser(new LatteEconomyLogModel({}));
        ldCollector.on('line',(ob)=>{
          ob.server_name = server_name;
          ob.theday_str =  theday_str ;
          q.push(ob,()=>{});
        });
        ldCollector.on('end',function(){
          callback();
        });
        ldCollector.run();
      });
    }
}


if(require.main === module){
  var logImport = new EconomyLogsImport();
  logImport.run();
}

export = EconomyLogsImport ;
