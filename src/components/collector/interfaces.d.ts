/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../data-models/interfaces.d.ts"/>
/*数据采集器
每得到一条数据，会触发一个emit('line',data); 或许应该用枚举声明事件类型
*/
interface ICollector extends NodeJS.EventEmitter{
  run();
}

interface ILogCollector extends ICollector{
  setLogURI(url:string);
  setParser(parser:ILogParser);
  setLogModelAsParser(model:IEventLogModel);
  //Event line
  //Event end
}

interface ILogParser{
  parse(line:string):any;
}
