/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');
import shuijing_config = require('../shuijing_config');
import mogHelper = require('../../library/mogHelper');
import querystring = require('querystring');
var wanba_collection = mogHelper.getWanbaLogEventCollection();

class simple_chart_view extends baseChartView implements IChartView{

  constructor(cfg){
    super(cfg);
  }
  private goods = shuijing_config.getGoodList();
  private option = {
    title : {
        text: '付费点统计'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['购买次数']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'购买次数',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
  };

  public loadData(callback:(data)=>void){
    wanba_collection.find({
      'data.req':/buy_playzone_item/,
      'data.res.code':0
    }).toArray(function(err,results){

        callback(results);

    });

  }

  private getGoodByItemId(itemid){
    for(var i=0;i<this.goods.length;i++){
      var good = this.goods[i];
      if(good.itemid*1 == itemid*1){
        return good;
      }
    }
  }

  private getPayPointRecord(data){
      var payItemRecord = {};
    for(var i=0;i<data.length;i++){

      var req = data[i].data.req;
      var url_parts = querystring.parse(req);
      data[i].itemid = url_parts.itemid;
      var itemid = data[i].itemid;
      if(payItemRecord[itemid]){
        payItemRecord[itemid] = payItemRecord[itemid] + 1;
      }else{
        payItemRecord[itemid] = 1;
      }
    }
    return payItemRecord;
  }


  public getChartOptions(data):any{
    var option = this.option;
    option.xAxis[0].data = [];
    option.series[0].data = [];
    //option.series[1].data = [];
    var payItemRecord = this.getPayPointRecord(data);
    for(var itemid in payItemRecord){

      var number = payItemRecord[itemid];
      var good = this.getGoodByItemId(itemid);
      if(good){
          option.xAxis[0].data.push(good.desc);
          option.series[0].data.push(number);
      }else{
        console.log('good',good);
      }
    }

    return option;

  }

}

export = simple_chart_view;
