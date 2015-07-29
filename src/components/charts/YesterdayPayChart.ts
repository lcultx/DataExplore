/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import angular2 = require('angular2/angular2');
import rpc = require('../easy-rpc/index');
import helper = require('../../share/helper');
import querystring = require('querystring');
import shuijing_config = require('../../share/configs/shuijing');
var echarts = require('echarts').echarts;

var selectorName = 'yesterday-pay-chart';

@Component({
  selector: selectorName
})

@View({
  template: `
  <div class="portlet solid bordered light-grey">
    <div id="chart"></div>
  </div>
  `,
  directives: []
})

class YesterdayPayChart implements IChart{

  option = {

      title : {
          text: '充值行为时间分布',
          subtext: '次数'
      },
      tooltip : {
          trigger: 'axis'
      },
      calculable : true,
      grid:{
        x:'50px',
        y:'50px',
        x2:'40px',
        y2:'30px'
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : []
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLabel : {
                  formatter: '{value} 次'
              }
          }
      ],
      series : [
          {
              name:'充值次数',
              type:'line',
              data:[]
          }
      ]
  };

  parent:IChartContainer;

  constructor(viewContrainer:angular2.ViewContainerRef){
    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
    this.parent.addChart(this);
    rpc.call('money.getYesterdayPayStatusWithTimeline',{},(data)=>{
      var option = $.extend(true,{},this.option);
      for(var i=0;i<24;i++){
        option.xAxis[0].data.push(i);
        if(data[i]){
          option.series[0].data.push(data[i].number);
        }else{
          option.series[0].data.push(0);
        }
      }

      this.getChart().setOption(option);
    });
  }

  getChart(){
      var $chart = $(selectorName).find('#chart');
      $chart.css({height:340});
      return echarts.init($chart[0]);
  }

  getPayCountOfTheDay(events,theday_str){

    var totalCount = 0;
    for(var i in events){
      var ob = events[i];
      if(ob.theday_str ==  theday_str){
        totalCount += 1;
      }

    }

    return totalCount
  }


  update(start,end){
    rpc.call('money.getPayEventsByStartEndDayStr',{
      start:helper.getThedayStrOfTheday(start),
      end:helper.getThedayStrOfTheday(end)
    },(data)=>{

      var option = $.extend(true,{},this.option);
      //var option = this.option;
      var dayStrArray = data.dayStrArray;
      if(dayStrArray.length>3){
        for(var i in dayStrArray){
          var theday_str = dayStrArray[i];
          var money = this.getPayCountOfTheDay(data.events,theday_str);
          option.xAxis[0].data.push(theday_str.substring(5,theday_str.length));
          option.series[0].data.push(money);
        }
      }
      this.getChart().setOption(option);
    })

  }
}

export = YesterdayPayChart;
