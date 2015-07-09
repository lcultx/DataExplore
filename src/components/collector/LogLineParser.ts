/// <reference path="./interfaces.d.ts"/>
//日志解析器
class LogLineParser implements ILogParser{

  //[2015-07-06 23:59:59.758] [INFO] active - 卸下装备 /equip/upgrade?partnerIndex=0&index=2&_time=1436198398545&version=v0.0.6&sessionId=a7AB0hWxRBQJKQm4L4QplE9E 1436198399758 5111 588 丑的别致. 533054 1180

  /*[
  0  "[2015-07-06",
  1  "23:59:59.758]",
  2  "[INFO]",
  3  "active",
  4  "-",
  5  "卸下装备",
  6  "/equip/upgrade?partnerIndex=0&index=2&_time=1436198398545&version=v0.0.6&sessionId=a7AB0hWxRBQJKQm4L4QplE9E",
  7  "1436198399758",
  8  "5111",
  9  "588",
  10  "丑的别致.",
  11  "533054",
  12  "1180"
  ]*/

  parse(line):any{
    if(line){
      var splitList = line.split(' ');
      var time = splitList[1];//"23:59:59.758]"
      time = time.substr(0,time.length - 1);
      var player_name = splitList[10];//"丑的别致."
      player_name = player_name.substr(0,player_name.length - 1);
      var player_action = splitList[5];//"卸下装备"
      if(player_action.indexOf('切换场')>-1 && player_action != '切换场景'){
        console.log(player_action);
        console.log(line);
      }
      var request_url = splitList[6];//"/equip/upgrade?partnerIndex=0&index=2&_time=1436198398545&version=v0.0.6&sessionId=a7AB0hWxRBQJKQm4L4QplE9E"
      return {
        time:time,
        player_name:player_name,
        player_action:player_action,
        request_url:request_url
      };
    }else{
      return null;
    }

  }
}

export = LogLineParser;
