/// <reference path="../../components/collector/interfaces.d.ts"/>
import LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector')
import LatteEventLogModel = require('../../components/data-models/LatteEventLogModel');

var ExecTime = require('exec-time');
var walk = require('fs-walk');
import path = require('path');
import querystring = require('querystring');
var moment = require('moment');



var  goodsInfo =
`1	60	60水晶	2480
1	300	300水晶	2517
1	980	980水晶	2519
1	1980	1980水晶	2521
1	3280	3280水晶	2523
1	250	月卡	2525
1	6480	6480水晶	2528
1	1	测试道具	2533
1	2	测试月卡	2535
1	50	3天卡	2726
1	100	7天卡	2727
1	10	10水晶	2728
1	20	20水晶	2729
1	110	110水晶	2730
1	200	200水晶	2748
2	60	60水晶	2479
2	300	300水晶	2518
2	980	980水晶	2520
2	1980	1980水晶	2522
2	6480	6480水晶	2524
2	250	月卡	2526
2	3280	3280水晶	2527
2	1	测试道具	2534
2	2	测试月卡	2536
2	50	3天卡	2731
2	100	7天卡	2732
2	10	10水晶	2733
2	20	20水晶	2734
2	110	110水晶	2735
2	200	200水晶	2749`

var  goods = [
    {itemid:2480,  desc:'60水晶',    price:60,   zoneid:1}
  ];

  function parseGoodInfo():any{
    var goods = [];
    var goodInfos = goodsInfo.split('\n');
    for(var i=0;i<goodInfos.length;i++){
        var goodInfo = goodInfos[i];
        var parts = goodInfo.split("	");
        goods.push({
            itemid:<any>parts[3]*1,desc:<any>parts[2],price:<any>parts[1]*1,zoneid:<any>parts[0]*1
        });
    }
    console.log(goods);
    return goods;
  }

  goods = parseGoodInfo();

  function getGoodByItemid(itemid){

    for(var i=0;i<goods.length;i++){
      var good = goods[i];

      if(good.itemid*1 == itemid*1){
        return good;
      }
    }


  }

function getObList(callback:(options)=>void){
  var obList = [];
  var logDir = '/Users/xuyang/src/DataExplore/resource/wanba_logs';
  walk.files(logDir, function(basedir, filename, stat, next) {


    if(filename == 'info.log'){
      var file = path.join(basedir,filename);

      var ldCollector:ILogCollector = new LocalLogDataCollector();
      ldCollector.setLogURI(file);
      ldCollector.on('line',function(line){
          obList.push(JSON.parse(line));
      });

      ldCollector.on('end',function(line){

        if(line){
            obList.push(JSON.parse(line));
        }

        callback(obList);
      })


      ldCollector.run();
    }else{
      next();
    }
  }, function(err) {
    if (err) console.log(err);
  });
}


var option = {
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

function getXAxisData(){
  var x = [];
  for(var i=0;i<24;i++){
    x.push(i);
  }
  return x;
}

function isMaleBuy(obList,ob){
  var isMale = false;
  var isWoman = false;
  var findOb = null;
  var url_parts =  querystring.parse(ob.data.req);
  var openkey = url_parts['openkey'];
  for(var i=0;i<obList.length;i++){
    var this_ob = obList[i];
    if(this_ob.data.req.indexOf(openkey) > -1 && this_ob.data.req.indexOf('get_info?openid')>-1){
      findOb = this_ob;
      var res = JSON.parse(this_ob.data.res);
      if(res.gender == '男'){
        isMale = true;
      }else{
        isWoman = true;
      }
      break;
    }
  }

  if(isMale){
    return true;
  }else if(isWoman){
    return false;
  }else{
    console.log('not man and not woman?');
    console.log(findOb);
    return true;
  }
}

function getGender(obList,ob){
  var url_parts =  querystring.parse(ob.data.req);
  var openkey = url_parts['openkey'];
  for(var i=0;i<obList.length;i++){
    var this_ob = obList[i];
    if(this_ob.data.req.indexOf(openkey) > -1 && this_ob.data.req.indexOf('get_info?openid')>-1){
      var res = JSON.parse(this_ob.data.res);
      return res.gender;
      break;
    }
  }
}

function getHour(ob){
  var d = new Date(ob.time);
  return d.getHours();
}

function getThisOptions(callback:(options)=>void){

  var timeList = getXAxisData();
  option.xAxis[0].data = timeList;
  option.series[0].data = [];
  option.series[1].data = [];
  option.series[2].data = [];

  var timePayRecord = {};

  getObList((obList)=>{
    for(var i=0;i<obList.length;i++){
      var ob = obList[i];
      if(ob.data && ob.data.req){
        var req = ob.data.req;
        if(req.indexOf('buy_playzone_item')> -1){
          var gender = getGender(obList,ob);


          var money = 0;
          var url_parts =  querystring.parse(ob.data.req);
          var itemid = url_parts.itemid;
          var res = JSON.parse(ob.data.res);

          if(res.code == 0){
            var good = getGoodByItemid(itemid);
            console.log('good',good);
            if(good){
              money = good.price;
            }
            console.log('money',money);
          }else{
            console.log('code',res.code);
          }

          var hour = getHour(ob);

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


          //console.log(timePayRecord);
        }
      }
    };


    for(var i=0;i<timeList.length;i++){

      var record = timePayRecord[i];

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


    callback(option);

  })

}

var get_gender_pay_constast = function(req,res){

  var profiler = new ExecTime('getPayPointShower');

  profiler.beginProfiling();

  getThisOptions((opitons)=>{
    profiler.step('finish');
    res.json(opitons);
  })

}

export = get_gender_pay_constast;
