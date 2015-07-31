
import moment = require('moment');
import mogHelper = require('../lib/mogHelper');
import async = require('async');

var ExecTime = require('exec-time');
var profiler =  new ExecTime('game');
profiler.beginProfiling();

var economy_collection = mogHelper.getEconomyLogCollection();


function getHeroAddNumberOfTheday(args,callback){
  economy_collection.count({
    thday_str:args.theday_str,
    player_action:'添加英雄'
  },(err,number)=>{
    callback(number);
  });
}

export function getHeroAddTimelineByStartEndDayStr(args,callback){
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
  var timeline = {};
  async.each(dayStrArray,(theday_str,complete)=>{
    getHeroAddNumberOfTheday({
      theday_str:theday_str
    },(number)=>{
      timeline[theday_str] = {
        total:number
      }
      complete();
    })
  },()=>{
    callback({dayStrArray:dayStrArray,timeline:timeline});
  })
}
