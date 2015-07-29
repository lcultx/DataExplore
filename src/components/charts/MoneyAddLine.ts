/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');
import rpc = require('../easy-rpc/index');
var echarts = require('echarts').echarts;

var selectorName = 'money-add-line';

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

class MoneyAddLine implements IChart{

  option = {

      title : {
          text: '充值行为时间分布',
          subtext: '金额'
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
                  formatter: '{value} 元'
              }
          }
      ],
      series : [
          {
              name:'充值金额',
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

      for(var i=0;i<24;i++){
        this.option.xAxis[0].data.push(i);
        if(data[i]){
          this.option.series[0].data.push(data[i].money/10);
        }else{
          this.option.series[0].data.push(0);
        }
      }

      this.getChart().setOption(this.option);
    });
  }

  update(start:moment.Moment,end:moment.Moment){
    console.log(start,end);
  }

  getChart(){
      var $chart = $(selectorName).find('#chart');
      $chart.css({height:340});
      return echarts.init($chart[0]);
  }
}

export = MoneyAddLine;
