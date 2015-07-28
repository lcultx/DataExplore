/// <reference path="./interface.d.ts"/>

import config = require('../config');
import path = require('path');
import async = require('async');

import mogHelper = require('../lib/mogHelper');
import moment = require('moment');

var walk = require('walk')


class LocalLogsImport implements ILocalLogsImport{
  profiler;

  getCollection(){
    console.log('getCollection()');
    throw Error('you are calling abstract method');
  }

  run(callback?:Function){
    mogHelper.init(()=>{
      var theday_str = process.argv[2];
      console.log(theday_str);
      if(theday_str){
        this.dailyLogfiles2db(moment(theday_str,'YYYY/MM/DD'),function(){
          console.log('import ' + theday_str + ' logs finish!');
          if(callback)callback();
        })
      }else{
        this.profiler.beginProfiling();
        var qlogs_dir = this.getLogsDir();
        this.logfiles2db(qlogs_dir,function(){
          console.log('import dir ' + qlogs_dir + ' finish!');
          if(callback)callback();
        });
      }
    });
  }

  getLogsDir(){
    console.log('getLogsDir()');
    throw Error('you are calling abstract method');
  }

  getServerName(file){
    console.log('getServerName(file)');
    throw Error('you are calling abstract method');
  }


  getReadFilesQueue(){
    return async.queue((task:any, callback)=> {
      console.log(task);
      var file = task.file;
      var server_name = task.server_name;
      this.logfile2db(file,server_name,function(){
        callback();
      });
    }, 1);
  }

  getThedayStr(file):string{
    console.log('getThedayStr(file)');
    throw Error('you are calling abstract method');
    return '';
  }


  logfile2db(file,server_name,callback){
    console.log('logfile2db(file,server_name,callback)');
    throw Error('you are calling abstract method');
  }


  onFile(root, fileStats, next){
    console.log('onFile(root, fileStats, next)');
    throw Error('you are calling abstract method');
  }

  private logfiles2db(dir,callback){
    var walker = walk.walk(dir, {});
    walker.on("file",(root, fileStats, next)=>{
      this.onFile(root, fileStats, next);
    });
    walker.on("errors", function (root, nodeStatsArray, next) {
      next();
    });
    walker.on("end", function () {
      callback();
    });
  }

  dailyLogfiles2db(theday,callback){
    this.profiler.beginProfiling();
    var theday_dir = <any>path.join(this.getLogsDir(),theday.format('YYYY/MM/DD'));
    this.logfiles2db(theday_dir,function(){
      callback();
    });
  }
}

export = LocalLogsImport;
