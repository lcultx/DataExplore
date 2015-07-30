
import mongodb = require('mongodb');

var wanbaCollection:mongodb.Collection;
var qzoneCollection:mongodb.Collection;
var economyCollection:mongodb.Collection;
var leftRatesCollection:mongodb.Collection;

export function getWanbaLogEventCollection():mongodb.Collection{
  return wanbaCollection;
}

export function getQZoneLogEventCollection():mongodb.Collection{
  return qzoneCollection;
}

export function getEconomyLogCollection():mongodb.Collection{
  return economyCollection;
}

export function getLeftRatesCollection():mongodb.Collection{
  return leftRatesCollection;
}

export function init(callback:()=>void){
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect('mongodb://127.0.0.1:27017/test',function(err,db){
    wanbaCollection = db.collection('wanba_log_events');
    qzoneCollection = db.collection('qzone_log_events');
    economyCollection = db.collection('ecomony_log_events');
    leftRatesCollection = db.collection('user_left_rates');
    callback();
  });
}

export function fiberQuery(query){

}
