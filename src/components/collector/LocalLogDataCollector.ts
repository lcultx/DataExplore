/// <reference path="./interfaces.d.ts"/>
import events = require('events');
/// <reference path="../../../typings/request/request.d.ts"/>
import http = require('http');
import fs = require('fs');
import StreamHelper = require('./StreamHelper');


class LocalLogDataCollector extends events.EventEmitter implements ILogCollector{
  //远程日志地址
  file:string;
  parser:ILogParser; 

  constructor(url?:string){
    super();
    if(url){
      this.file = url;
    }
  }

  setLogURI(uri:string){
    this.file = uri;
  }

  setParser(parser:ILogParser){
    this.parser = parser;
  }

  run(){
    var count = 0;

    var readStream = fs.createReadStream(this.file);
    readStream.setEncoding('utf8');
    StreamHelper.readLines(readStream,(line,end)=>{

      var ob = this.parser.parse(line);
      if(end){
        this.emit('end',ob);
      }else{
        this.emit('line',ob);
      }
    })
  };
}

export = LocalLogDataCollector;
