/// <reference path="./interfaces.d.ts"/>
import baseEventLogModel = require('./baseEventLogModel');
import moment = require('moment');
class LatteEventLogModel extends  baseEventLogModel implements IEventLogModel{

  constructor(ob){
    super(ob);
  }

  //[2015-07-06 23:59:59.758] [INFO] active - 卸下装备 /equip/upgrade?partnerIndex=0&index=2&_time=1436198398545&version=v0.0.6&sessionId=a7AB0hWxRBQJKQm4L4QplE9E 1436198399758 5111 588 丑的别致. 533054 1180

  /*[
  0  "[2015-07-06",
  1  "23:59:59.758]",
  2  "[INFO]", log_level
  3  "active",
  4  "-",
  5  "卸下装备",
  6  "/equip/upgrade?partnerIndex=0&index=2&_time=1436198398545&version=v0.0.6&sessionId=a7AB0hWxRBQJKQm4L4QplE9E",
  7  "1436198399758", 时间
  8  "5111", user_id
  9  "588",player_id
  10  "丑的别致.",
  11  "533054",金币
  12  "1180",水晶
  ]*/
  parseLogLine(line){
    try{
      if(line){
        var splitList = line.split(' ');
        var time = splitList[0].split('[')[1] + ' '  + splitList[1].split('.')[0];//[2015-07-12 01:05:55.680]
        var mm = moment(time,'YYYY-MM-DD HH:mm:ss');

        var player_name = splitList[10];//"丑的别致."
        if(player_name){
            player_name = player_name.substr(0,player_name.length - 1);
        }else{
            if(splitList[11]='['){
              player_name = '[    ]';
            }
        }

        var player_action = splitList[5];//"卸下装备"

        var request_url = splitList[6];//"/equip/upgrade?partnerIndex=0&index=2&_time=1436198398545&version=v0.0.6&sessionId=a7AB0hWxRBQJKQm4L4QplE9E"
        return {
          time:mm.toDate(),
          player_name:player_name,
          player_action:player_action,
          request_url:request_url
        };
      }else{
        return null;
      }
    }catch(e){
      console.log(line);
      console.log(e);

    }

  }


  getEventHour():number{
    var time = this.ob.time;
    return time.split(':')[0]*1;
  }

  getEventName():string{
    return this.ob.player_action;
  }
}

export =LatteEventLogModel;
