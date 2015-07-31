/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');
import rpc = require('../easy-rpc/index');
import helper = require('../../share/helper');
import querystring = require('querystring');
import shuijing_config = require('../../share/configs/shuijing');
var echarts = require('echarts').echarts;

var selectorName = 'hero-add-line';

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

class HeroAddLine implements IChart{

  option = {

      title : {
          text: '召唤次数',
          subtext: ''
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
        data:['total','android','ios']
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
                  formatter: '{value}'
              }
          }
      ],
      series : [
          {
              name:'total',
              type:'line',
              data:[]
          },{
              name:'android',
              type:'line',
              data:[]
          },{
              name:'ios',
              type:'line',
              data:[]
          }
      ]
  };

  parent:IChartContainer;

  constructor(viewContrainer:angular2.ViewContainerRef){
    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
    this.parent.addChart(this);
    this.update(moment().subtract(1,'d'),moment().subtract(1,'d'));
  }

  update(start?:moment.Moment,end?:moment.Moment){

    rpc.call('game.getHeroAddTimelineByStartEndDayStr',{
      start:helper.getThedayStrOfTheday(start),
      end:helper.getThedayStrOfTheday(end)
    },(data)=>{

      var option = $.extend(true,{},this.option);
      //var option = this.option;
      var dayStrArray = data.dayStrArray;
      var timeline = data.timeline;
      for(var i in dayStrArray){
        var theday_str = dayStrArray[i];
        option.xAxis[0].data.push(theday_str.substring(5,theday_str.length));
        option.series[0].data.push(timeline[theday_str].total);
      }
      console.log(option);
      this.getChart().setOption(option);
    })

  }

  getChart(){
      var $chart = $(selectorName).find('#chart');
      $chart.css({height:340});
      return echarts.init($chart[0]);
  }
}

export = HeroAddLine;
