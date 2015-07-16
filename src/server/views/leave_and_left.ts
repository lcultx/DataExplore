/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');

import mogHelper = require('../../library/mogHelper');
import shuijing = require('../shuijing_config');
import querystring = require('querystring');
import moment = require('moment');
import async = require('async');

var wanba_collection = mogHelper.getWanbaLogEventCollection();
var qzone_collection = mogHelper.getQZoneLogEventCollection();

function getTheDayCreateUsers(mm,callback){
  var theday = mm;
  var nextday = mm.clone().add(1, 'd');
  console.log(theday);
  console.log(nextday);
  qzone_collection.find({
    player_action: "创建角色",
    time:
    {
        "$gte" : mm.toDate(),
        "$lt" : nextday.toDate()
    }
  }).toArray(function(err,results){

    getLeft(results,nextday,function(number){
        callback([results.length,number]);
    });
  });
}

function userHasActiveInThisDay(user,mm,callback){
  var theday = mm;
  var nextday = mm.clone().add(1, 'd');
  qzone_collection.findOne({
    player_name:user.player_name,
    server_name:user.server_name,
    time:
    {
        "$gte" : theday.toDate(),
        "$lt" : nextday.toDate()
    }
  },function(err,result){
    if(result && result.server_name){
      callback(true)
    }else{
      callback(false);
    }
  })
}

function getLeft(users,mm,callback){
 var left = 0;
 async.each(users,function(user,cb){
   userHasActiveInThisDay(user,mm,function(exist){
     if(exist){
       left = left + 1;
     }
     cb();
   });
 },function(){
   callback(left);
 });
}


class leave_and_left extends baseChartView implements IChartView{

  constructor(cfg){
    super(cfg);
  }


  public loadData(callback:(data)=>void){
    var start_day = moment('2015-07-13');
    var end_day = moment('2015-07-14');

    getTheDayCreateUsers(start_day,function(results){
      callback(results);
    });

  }

  public getChartOptions(data):any{
      return data;
  }

}

export = leave_and_left;
