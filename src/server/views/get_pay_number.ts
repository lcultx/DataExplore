/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');

import mogHelper = require('../../library/mogHelper');
import shuijing = require('../shuijing_config');
import querystring = require('querystring');

var wanba_collection = mogHelper.getWanbaLogEventCollection();
var qzone_collection = mogHelper.getQZoneLogEventCollection();

class get_pay_number extends baseChartView implements IChartView{

  constructor(cfg){
    super(cfg);
  }


  public loadData(callback:(data)=>void){
    var all_pay_count = null;
    var all_pay_money = 0;
    wanba_collection.find({
      'data.req':/buy_playzone_item/,
      'data.res.code':0
    }).toArray(function(err,results){
      all_pay_count = results.length;
      for(var i=0;i<results.length;i++){
        var result = results[i];
        var url_parts = querystring.parse(result.data.req);
        var good = shuijing.getGoodByItemId(url_parts.itemid);
        all_pay_money += good.price;
      }


      callback({
        "总付费次数":all_pay_count,
        "总付费金额":all_pay_money
      });
    })

  }

  public getChartOptions(data):any{
      return data;
  }

}

export = get_pay_number;
