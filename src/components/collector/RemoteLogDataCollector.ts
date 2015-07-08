import ICollector = require('./ICollector');
import events = require('events');

class LogDataCollector extends events.EventEmitter implements ICollector{
  //远程日志地址
  url:string;

  constructor(url:string){
    super();
    this.url = url;
  }

  run(){
    
  };
}
