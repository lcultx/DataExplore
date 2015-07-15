/// <reference path="../../typings/mongodb/mongodb.d.ts"/>
var mongodb = require('mongodb');
var wanbaCollection;
var qzoneCollection;
function getWanbaLogEventCollection() {
    return wanbaCollection;
}
exports.getWanbaLogEventCollection = getWanbaLogEventCollection;
function getQZoneLogEventCollection() {
    return qzoneCollection;
}
exports.getQZoneLogEventCollection = getQZoneLogEventCollection;
function init(callback) {
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
        wanbaCollection = db.collection('wanba_log_events');
        qzoneCollection = db.collection('qzone_log_events');
        callback();
    });
}
exports.init = init;
function fiberQuery(query) {
}
exports.fiberQuery = fiberQuery;
//# sourceMappingURL=mogHelper.js.map