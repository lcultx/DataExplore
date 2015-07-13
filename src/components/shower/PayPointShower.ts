/// <reference path="./interfaces.d.ts"/>
import baseChartShower = require('./baseChartShower');
import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../../library/ng2Helper');

@Component({
  selector: 'pay-point-shower'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
})



class PayPointShower extends baseChartShower implements IChartShower{

  goodsInfo =
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

  goods = [
    {itemid:2480,  desc:'60水晶',    price:60,   zoneid:1}
  ];

  parseGoodInfo():any{
    var goods = [];
    var goodInfos = this.goodsInfo.split('\n');
    for(var i=0;i<goodInfos.length;i++){
        var goodInfo = goodInfos[i];
        var parts = goodInfo.split("	");
        goods.push({
            itemid:<any>parts[3]*1,desc:<any>parts[2],price:<any>parts[1]*1,zoneid:<any>parts[0]*1
        });
    }
    return goods;
  }

  getGoodByItemid(itemid){
    for(var i in this.goods){
      var good = this.goods[i];
      if(good.itemid == itemid){
        return good;
      }
    }
  }

  getPayPointRecord(data){
      var payItemRecord = {};
    for(var i=0;i<data.length;i++){
      var itemid = data[i].itemid;
      if(payItemRecord[itemid]){
        payItemRecord[itemid] = payItemRecord[itemid] + 1;
      }else{
        payItemRecord[itemid] = 1;
      }
    }
    return payItemRecord;
  }

  getThisOption(data){


    var option = {
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

    option.xAxis[0].data = [];
    option.series[0].data = [];
    //option.series[1].data = [];
    var payItemRecord = this.getPayPointRecord(data);
    for(var itemid in payItemRecord){
      var number = payItemRecord[itemid];
      var good = this.getGoodByItemid(itemid);
      console.log(good);
      if(good){
          option.xAxis[0].data.push(good.desc);
          option.series[0].data.push(number);


      }else{
        console.log('good',good);
      }


    }

    return option;
  }



  constructor(viewContrainer:angular2.ViewContainerRef){

    super(viewContrainer);
    this.goods = this.parseGoodInfo();

    $.get('/pay_point',(data)=>{

      this.option = this.getThisOption(data);
      this.drawChart();
    });

  }

}



export = PayPointShower;
