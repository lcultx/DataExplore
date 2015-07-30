import mogHelper = require('../lib/mogHelper');
import querystring = require('querystring');
import shuijing = require('../../share/configs/shuijing');

import moment = require('moment');
import helper = require('../../share/helper');
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

export function getPayEventsOfThedays(args,callback){
  wanba_collection.find({
    'data.req':/buy_playzone_item/,
    'data.res.code':0,
    'theday_str':{$in:args.theday_strs}
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

export function getYesterdayPayStatusWithType(args,callback){

  var all:any = {};
  var servers:any = {};
  getPayEventsOfTheday({theday_str:helper.getYesterdayStr()},(events)=>{
      profiler.step('recvice request');
      for(var i in events){
        var ob = events[i];

        var hour = new Date(ob.time).getHours();
        console.log(hour);

        var url_parts = querystring.parse(ob.data.req);
        var itemid = url_parts.itemid;
        var good = shuijing.getGoodByItemId(url_parts.itemid);
        if(all[itemid]){
          all[itemid].number += 1;
          all[itemid].money += good.price;
        }else{
          all[itemid] = {
            number:1,
            money:good.price,
            name:good.desc
          }
        }


        if(!servers[good.zoneid]){
          servers[good.zoneid]={};
        }
        if(servers[good.zoneid][good.itemid]){
          servers[good.zoneid][good.itemid].number += 1;
          servers[good.zoneid][good.itemid].money += good.price;
        }else{
          servers[good.zoneid][good.itemid] = {
            number:1,
            money:good.price,
            name:good.desc
          }
        }

      }

      callback({
        all:all,
        servers:servers
      });
  });
}

export function getPayEventsByStartEndDayStr(args,callback){
  profiler.step('recvice request');
  var startday_str = args.start;
  var endday_str = args.end;

  var dayStrArray = [];
  var startday = moment(startday_str,'YYYY/MM/DD');
  var endday = moment(endday_str,'YYYY/MM/DD');
  for(var theday=startday.clone();theday.format('YYYY/MM/DD')!=endday_str;theday = theday.clone().add(1,'d')){
    dayStrArray.push(theday.format('YYYY/MM/DD'));
  }
  dayStrArray.push(endday_str);

  profiler.step('get dayStrArray');
  getPayEventsOfThedays({theday_strs:dayStrArray},(events)=>{
    profiler.step('query finish');
    callback({
      dayStrArray:dayStrArray,
      events:events
    });
  });

}

function caculateTotalMoneyAddTimeline(events,callback){
  var dayStrArray = [];
  var timeline = {};

  for(var i in events){
    var ob = events[i];
    var url_parts = querystring.parse(ob.data.req);
    var itemid = url_parts.itemid;
    var good = shuijing.getGoodByItemId(url_parts.itemid);

    var theday = timeline[ob.theday_str];
    if(!theday){
      dayStrArray.push(ob.theday_str);
      timeline[ob.theday_str] =  {total:0};
      theday = timeline[ob.theday_str];
    }

    theday.total += good.price;
    if(theday[good.zoneid]){
      theday[good.zoneid] += good.price;
    }else{
      theday[good.zoneid] = good.price;
    }
  }

  callback({dayStrArray:dayStrArray,timeline:timeline});
}

export function getTotalPayEvents(args,callback){
  wanba_collection.find({
    'data.req':/buy_playzone_item/,
    'data.res.code':0
  }).toArray((err,results)=>{
    callback(results);
  });
}

export function getTotalMoneyAddTimeline(args,callback){
  profiler.step('recvice request');
  getTotalPayEvents(args,(events)=>{
    profiler.step('query finish');
    caculateTotalMoneyAddTimeline(events,(data)=>{
      profiler.step('caculate finish');
      console.log(data);
      callback(data);
    })
  });
}
