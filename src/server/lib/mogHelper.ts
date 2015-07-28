
import mongodb = require('mongodb');

var wanbaCollection:mongodb.Collection;
var qzoneCollection:mongodb.Collection;
var economyCollection:mongodb.Collection;

export function getWanbaLogEventCollection():mongodb.Collection{
  return wanbaCollection;
}

export function getQZoneLogEventCollection():mongodb.Collection{
  return qzoneCollection;
}

export function getEconomyLogCollection():mongodb.Collection{
  return economyCollection;
}

export function init(callback:()=>void){
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect('mongodb://127.0.0.1:27017/test',function(err,db){
    wanbaCollection = db.collection('wanba_log_events');
    qzoneCollection = db.collection('qzone_log_events');
    economyCollection = db.collection('ecomony_log_events');
    callback();
  });
}

export function fiberQuery(query){

}
