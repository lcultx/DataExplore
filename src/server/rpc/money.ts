import mogHelper = require('../../library/mogHelper');
import querystring = require('querystring');
import shuijing = require('../shuijing_config');


import helper = require('../../library/helper');
var ExecTime = require('exec-time');
var profiler =  new ExecTime('money');
profiler.beginProfiling();

var wanba_collection = mogHelper.getWanbaLogEventCollection();


export function getPayEventsOfTheday(args,callback){
  wanba_collection.find({
    'data.req':/buy_playzone_item/,
    'data.res.code':0,
    'theday_str':args.theday_str
  }).toArray((err,results)=>{
    callback(results);
  });
}

export function getTotalPayOfTheday(args,callback){
  var all_pay_money:any = 0;
  getPayEventsOfTheday(args,(results)=>{
    for(var i=0;i<results.length;i++){
      var result = results[i];
      var url_parts = querystring.parse(result.data.req);
      var good = shuijing.getGoodByItemId(url_parts.itemid);
      all_pay_money += good.price;
    }
    callback(all_pay_money/10);
  })
}

export function getYesterdayAddCount(args,callback){
  getTotalPayOfTheday({theday_str:helper.getYesterdayStr()},(money)=>{
    callback(money);
  });
}


export function getYesterdayPayStatusWithTimeline(args,callback){
  profiler.step('recvice request');
  var record:any = {};
  getPayEventsOfTheday({theday_str:helper.getYesterdayStr()},(events)=>{
      for(var i in events){
        var ob = events[i];

        var hour = new Date(ob.time).getHours();
        console.log(hour);

        var url_parts = querystring.parse(ob.data.req);
        var itemid = url_parts.itemid;
        var good = shuijing.getGoodByItemId(url_parts.itemid);
        if(record[hour]){
          record[hour].number += 1;
          record[hour].money += good.price;
        }else{
          record[hour] = {
            number:1,
            money:good.price
          }
        }
      }

      callback(record);
  });
}
