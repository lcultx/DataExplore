/// <reference path="./interfaces.d.ts"/>
import events = require('events');
/// <reference path="../../../typings/request/request.d.ts"/>
import http = require('http');


function readLines(input, func) { 
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining,true);
    }
  });
}


class RemoteLogDataCollector extends events.EventEmitter implements ILogCollector{
  //远程日志地址
  url:string;
  parser:ILogParser;

  constructor(url?:string){
    super();
    if(url){
      this.url = url;
    }
  }

  setLogURI(url:string){
    this.url = url;
  }

  setParser(parser:ILogParser){
    this.parser = parser;
  }

  run(){
    var count = 0;
    http.get(this.url, (res)=> {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      readLines(res,(line,end)=>{
        console.log('count',count++);
        //console.log(line);
        var ob = this.parser.parse(line);
        //console.log(ob);
        if(end){
          this.emit('end',ob);
        }else{
          this.emit('line',ob);
        }
      });
      // res.on('data', function (chunk) {
      //   console.log('count',count++);
      //   console.log('chunk.length',chunk.length);
      //   //console.log('BODY: ' + chunk);
      // });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  };
}

export = RemoteLogDataCollector;
