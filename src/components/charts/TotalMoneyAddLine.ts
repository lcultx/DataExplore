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

var selectorName = 'toatal-money-add-line';

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

class TotalMoneyAddLine implements IChart{

  option = {

      title : {
          text: 'CEO开心指数',
          subtext: '全服付费总值:)'
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
                  formatter: '{value} 元'
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
    this.update();
  }

  getPayMoneyOfTheDay(events,theday_str){

    var totalMoney = 0;
    for(var i in events){
      var ob = events[i];
      if(ob.theday_str ==  theday_str){
        var args = querystring.parse(ob.data.req);
        var itemid = args.itemid;
        var good = shuijing_config.getGoodByItemId(itemid);
        totalMoney += good.price;
      }

    }

    return totalMoney/10;
  }

  update(start?:moment.Moment,end?:moment.Moment){

    rpc.call('money.getTotalMoneyAddTimeline',{},(data)=>{

      var option = $.extend(true,{},this.option);
      //var option = this.option;
      var dayStrArray = data.dayStrArray;

      console.log(data);
      dayStrArray = dayStrArray.sort();

      var total = 0;
      var andorid = 0;
      var ios = 0;
      for(var i in dayStrArray){
        var theday_str = dayStrArray[i];
        var theday = data.timeline[theday_str];
        option.xAxis[0].data.push(theday_str.substring(5,theday_str.length));

        total += theday.total/10;
        option.series[0].data.push(total);
        andorid += theday[1] /10;
        option.series[1].data.push(andorid);
        ios += theday[2]/10;
        option.series[2].data.push(ios);
      };


      this.getChart().setOption(option);
    })

  }

  getChart(){
      var $chart = $(selectorName).find('#chart');
      $chart.css({height:340});
      return echarts.init($chart[0]);
  }
}

export = TotalMoneyAddLine;
