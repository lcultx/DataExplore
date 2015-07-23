/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');
import shuijing_config = require('../shuijing_config');
import querystring = require('querystring');
import async = require('async');
import mogHelper = require('../../library/mogHelper');

var wanba_collection = mogHelper.getWanbaLogEventCollection();

class gender_pay_contrast extends baseChartView implements IChartView{

  constructor(cfg){
    super(cfg);
  }


  private goods = shuijing_config.getGoodList();

  private option = {
      title : {
          text: '男女玩家付费对比',
          subtext: ''
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['男性玩家','女性玩家','未知性别']
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
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLabel : {
                  formatter: '{value} 水晶'
              }
          }
      ],
      series : [
          {
              name:'男性玩家',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
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
          },
          {
              name:'女性玩家',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                  data : [
                      {type : 'average', name : '平均值'}
                  ]
              }
          },
          {
              name:'未知性别',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                  data : [
                      {type : 'average', name : '平均值'}
                  ]
              }
          }
      ]
  };


  private getXAxisData(){
    var x = [];
    for(var i=0;i<24;i++){
      x.push(i);
    }
    return x;
  }

  private getHour(ob){
    var d = new Date(ob.time);
    return d.getHours();
  }

  private getGoodByItemId(itemid){
    for(var i=0;i<this.goods.length;i++){
      var good = this.goods[i];
      if(good.itemid*1 == itemid*1){
        return good;
      }
    }
  }

  public loadData(callback:(data)=>void){
    wanba_collection.find({
      'data.req':/buy_playzone_item/,
      'data.res.code':0
    }).toArray(function(err,results){
      async.each(results,function(result,cb){
        wanba_collection.findOne({
          $and:[{'data.req':/get_info\?openid/},{'data.req':/openkey/}]
        },function(err,res){
           result.gender = res.data.res.gender;
           cb();
        });
      },function(err){
        callback(results);
      });
    });
  }

  public getChartOptions(data):any{

    console.log(data);

    var timeList = this.getXAxisData();
    var option = this.option;
    option.xAxis[0].data = timeList;
    option.series[0].data = [];
    option.series[1].data = [];
    option.series[2].data = [];

    var timePayRecord = {};


      for(var i in data){
        var ob = data[i];
        var gender = ob.gender;
          var money = 0;
          var url_parts =  querystring.parse(ob.data.req);
          var itemid = url_parts.itemid;
          var res = ob.data.res;

          if(res.code == 0){
            var good = this.getGoodByItemId(itemid);

            if(good){
              money = good.price;
            }

          }else{
            console.log('error res',res);
          }

          var hour = ob.time.getHours();

          if(!timePayRecord[hour]){
            timePayRecord[hour] = {
              M:0,F:0,U:0
            }
          }


          if(gender == '男'){
              timePayRecord[hour].M += money;
          }else if(gender == '女'){
              timePayRecord[hour].F += money;
          }else{
              timePayRecord[hour].U += money;
          }
      }

      for(var j=0;j<timeList.length;j++){

        var record = timePayRecord[j];

        if(record){
          option.series[0].data.push(record.M);
          option.series[1].data.push(record.F);
          option.series[2].data.push(record.U);
        }else{
          option.series[0].data.push(0);
          option.series[1].data.push(0);
          option.series[2].data.push(0);
        }

      };

      return option;
  }

}

export = gender_pay_contrast;
