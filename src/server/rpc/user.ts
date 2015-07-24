import mogHelper = require('../../library/mogHelper');

import moment = require('moment');
var qzone_collection = mogHelper.getQZoneLogEventCollection();

import helper = require('../../library/helper');
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
  var yesterday = today.clone().subtract(1,'d');
  var before_yesterday = today.clone().subtract(2,'d');

  var leftNumber = 0;
  getAddUsersOfTheDay({theday_str:helper.getThedayStrOfTheday(before_yesterday)},(users)=>{
    profiler.step('query finish');
    async.each(users,(user,complete)=>{
      isActiveInTheday(user,yesterday,(isActive)=>{
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
