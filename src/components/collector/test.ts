/// <reference path="./interfaces.d.ts"/>
import RemoteLogDataCollector = require('./RemoteLogDataCollector');
import LocalLogDataCollector = require('./LocalLogDataCollector');
import LogLineParser = require('./LogLineParser');
var logUrl = 'http://121.201.8.151:8888/gm/getActiveLog?path=/server1/2015/07/06.log';
// var ldCollector:ILogCollector = new RemoteLogDataCollector();
// var logParser:ILogParser = new LogLineParser();
// ldCollector.setLogUrl(logUrl);
// ldCollector.setParser(logParser);
// ldCollector.run();
// ldCollector.on('line',function(ob){
//   console.log(ob);
// });

 var logPath = '/Users/xuyang/src/DataExplore/resource/getActiveLog';
 var ldCollector:ILogCollector = new LocalLogDataCollector();
 var logParser:ILogParser = new LogLineParser();
 ldCollector.setLogURI(logPath);
 ldCollector.setParser(logParser);
 ldCollector.run();
 ldCollector.on('line',function(ob){
   console.log(ob);
 });
