import mogHelper = require('../../library/mogHelper');
import querystring = require('querystring');
import shuijing = require('../shuijing_config');


import helper = require('../../library/helper');
var ExecTime = require('exec-time');
var profiler =  new ExecTime('user');

var wanba_collection = mogHelper.getWanbaLogEventCollection();
export function getTotalPayOfTheday(args,callback){

  var all_pay_money:any = 0;
  wanba_collection.find({
    'data.req':/buy_playzone_item/,
    'data.res.code':0,
    'theday_str':args.theday_str
  }).toArray(function(err,results){

    for(var i=0;i<results.length;i++){
      var result = results[i];
      var url_parts = querystring.parse(result.data.req);
      var good = shuijing.getGoodByItemId(url_parts.itemid);
      all_pay_money += good.price;
    }
    callback(all_pay_money/10);
  });


}

export function getYesterdayAddCount(args,callback){
  getTotalPayOfTheday({theday_str:helper.getYesterdayStr()},(money)=>{
    callback(money);
  });
}

export function getPayCount(){

}
