
import mogHelper = require('../lib/mogHelper');

import moment = require('moment');
var qzone_collection = mogHelper.getQZoneLogEventCollection();
var rates_collection = mogHelper.getLeftRatesCollection();

import helper = require('../../share/helper');
var ExecTime = require('exec-time');
var profiler =  new ExecTime('user');

profiler.beginProfiling();


import async = require('async');

//收入/活跃用户数
export function getARPU(){

}

//收入/付费用户
export function ARPPU(){

}

export function getPayUsers(){

}

function distinct_users(users){
  profiler.step('distinct_users start');
  var new_user_array = [];
  var player_hashs = {};
  function isExistInNewArray(user){
    for(var i in new_user_array){
      var tmp_user = new_user_array[i];
      if(tmp_user.player_name == user.player_name){
        if(tmp_user.server_name == user.server_name){
          console.log('************************************************')
          console.log(tmp_user);
          console.log(user);
          console.log('************************************************');
        }
        return true;
      }
    }
  }

  for(var i in users){
    var user = users[i];
    if(!player_hashs[user.player_id + '_' + user.server_name]){
      new_user_array.push(user);
      player_hashs[user.player_id + '_' + user.server_name] = true;
    }
  }

  profiler.step('distinct_users finish');
  return new_user_array;
}


export function getAddUsersOfTheDay(args,callback){

  var query:any = {
   player_action: "创建角色",
   theday_str: args.theday_str
  };

  if(args.server_name){
    query.server_name = args.server_name
  }

  console.log(query);
  profiler.step('query start');
  qzone_collection.find(query).toArray((err,users)=>{
    profiler.step('query finish');
    var distincted_users = distinct_users(users);
    callback(distincted_users);
  });
}

export function getAddNumberOfTheDay(args,callback){
  getAddUsersOfTheDay(args,(users)=>{
    callback(users.length);
  });
}

function getAddUserNumberOfThisHour(users,hour){
  var count = 0;
  for(var i in users){
    var user = users[i];
    var mm = moment(user.time);
    if(mm.hour() == hour - 1){
      count ++;
    }
  }
  return count;
}

export function getAddNumberTimelineOfTheDay(args,callback){
  var timeline = {};
  getAddUsersOfTheDay(args,(users)=>{
    for(var i=1;i<=24;i++){
      timeline[i] = getAddUserNumberOfThisHour(users,i);
    }
    callback(timeline);
  });
}

export function getYesterdayAddCount(args,callback){
  getAddNumberOfTheDay({theday_str:helper.getYesterdayStr()},(num)=>{
    callback(num);
  })
}

function isActiveInTheday(user,theday,callback){
  var query = {
    player_id:user.player_id,
    server_name:user.server_name,
    theday_str:theday.format("YYYY/MM/DD"),
    player_action:{$ne:"创建角色"}
  };
  //console.log(query);

  qzone_collection.findOne(query,(err,result)=>{
    //_profiler.step('query finish');
    if(result && result.server_name){
      callback(true)
    }else{
      callback(false);
    }
  })
}

export function getLeastLeaveAndLeft(args,callback){

  var today = moment();
  var before_yesterday = today.clone().subtract(2,'d');

  getDaysLeaveOfTheday({theday_str:helper.getThedayStrOfTheday(before_yesterday),days:1},(rate)=>{
    callback(rate);
  });

}

export function getDaysLeaveOfThedaySlow(args,callback){
  var theday_str = args.theday_str;
  var days = args.days;
  var theday = moment(theday_str,'YYYY/MM/DD');
  var thatday = theday.add(days,'d');
  var leftNumber = 0;
  getAddUsersOfTheDay({theday_str:theday_str},(users)=>{
    profiler.step('query finish');
    async.each(users,(user,complete)=>{
      isActiveInTheday(user,thatday,(isActive)=>{
        if(isActive){
          leftNumber ++;
        }
        complete();
      })
    },()=>{
      profiler.step('check active finish');
      callback(leftNumber/users.length || 0);
    })
  })
}

export function getDaysLeaveOfTheday(args,callback){
  var theday_str = args.theday_str;
  var days = args.days;
  rates_collection.findOne({
    theday_str:theday_str,
    days:days
  },(err,doc)=>{
    console.log(err,doc);
    if(doc){
      callback(doc.rate);
    }else{
      getDaysLeaveOfThedaySlow(args,(rate)=>{
        callback(rate);
        rates_collection.insert({
          theday_str:theday_str,
          days:days,
          rate:rate
        },(err)=>{
          console.log(err);
        })
      })
    }
  })
}




export function getUserAddTimelineByStartEndDayStr(args,callback){
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

  if(dayStrArray.length == 1){
    getAddNumberTimelineOfTheDay({theday_str:dayStrArray[0]},(timeline)=>{
      callback({dayStrArray:dayStrArray,timeline:timeline});
    });
  }else{
    var timeline = {};
    async.each(dayStrArray,(theday_str,complete)=>{
      getAddUsersOfTheDay({theday_str:theday_str},(users)=>{
        timeline[theday_str] = users.length;
        complete();
      })
    },()=>{
      callback({dayStrArray:dayStrArray,timeline:timeline});
    })
  }

}

export function getUserLeaveTimelineByStartEndDayStr(args,callback){
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
  var timeline = {};
  async.each(dayStrArray,(theday_str,complete)=>{
    var leaves = {};
    var daysArray = [1,3,7,15,30];
    async.each(daysArray,(days,cb)=>{
      getDaysLeaveOfTheday({theday_str:theday_str,days:days},(rate)=>{
        leaves[days] = rate;
        cb();
      })
    },()=>{
      timeline[theday_str] = leaves;
      complete();
    })
  },()=>{
    callback({dayStrArray:dayStrArray,timeline:timeline});
  })


}
