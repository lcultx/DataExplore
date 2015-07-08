/// <reference path="../../../typings/node/node.d.ts"/>
import events = require('events');

/*数据采集器
每得到一条数据，会触发一个emit('data',data); 或许应该用枚举声明事件类型
*/
interface ICollector extends events.EventEmitter{
  run();
}

export = ICollector;
