/// <reference path="../../../typings/node/node.d.ts"/>

/*数据采集器
每得到一条数据，会触发一个emit('line',data); 或许应该用枚举声明事件类型
*/
interface ICollector extends NodeJS.EventEmitter{
  run();
}

interface ILogCollector extends ICollector{
  setLogUrl(url:string);
  setParser(parser:ILogParser);
}

interface ILogParser{
  parse(line:string):any;
}
