var LocalLogDataCollector = require('./LocalLogDataCollector');
var LatteEventLogModel = require('../data-models/LatteEventLogModel');
var logUrl = 'http://121.201.8.151:8888/gm/getActiveLog?path=/server1/2015/07/06.log';
var logPath = '/Users/xuyang/src/DataExplore/resource/getActiveLog';
var ldCollector = new LocalLogDataCollector();
ldCollector.setLogURI(logPath);
ldCollector.setLogModelAsParser(new LatteEventLogModel({}));
ldCollector.run();
ldCollector.on('line', function (ob) {
    console.log(ob);
});
//# sourceMappingURL=test.js.map