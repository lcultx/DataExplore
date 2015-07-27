/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import rpc = require('../easy-rpc/index');
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

class YesterdayPayChart {

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

  constructor(){
    rpc.call('money.getYesterdayPayStatusWithTimeline',{},(data)=>{
      for(var i=0;i<24;i++){
        this.option.xAxis[0].data.push(i);
        if(data[i]){
          this.option.series[0].data.push(data[i].number);
        }else{
          this.option.series[0].data.push(0);
        }
      }

      this.getChart().setOption(this.option);
    });
  }

  getChart(){
      var $chart = $(selectorName).find('#chart');
      $chart.css({height:340});
      return echarts.init($chart[0]);
  }
}

export = YesterdayPayChart;
