/// <reference path="./interfaces.d.ts"/>
class baseEventLogModel implements IEventLogModel{

  ob:any;

  constructor(ob){
    switch(typeof(ob)){
      case "string":
        this.ob = this.parseLogLine(ob);
        break;
      case "object":
        this.ob = ob;
        break;
      default:
        throw new Error(typeof(ob) + 'is not support yet!');
    }
  }

 parseLogLine(line){
    throw new Error('parseLogLine must be override by sub class!');
  }

  getJSONValue(){
    return this.ob;
  };

  toLogString():string{
    //TODO
    return '';
  };
}

export = baseEventLogModel;
