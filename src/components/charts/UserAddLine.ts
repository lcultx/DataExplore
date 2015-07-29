
import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import angular2 = require('angular2/angular2');
import rpc = require('../easy-rpc/index');
import helper = require('../../share/helper');

var echarts = require('echarts').echarts;

var selectorName = 'user-add-line';

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

class UserAddLine implements IChart{
  option = {

      title : {
          text: '用户增长曲线',
          subtext: ''
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
                  formatter: '{value}'
              }
          }
      ],
      series : [
          {
              name:'新增人数',
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

  getChart(){
      var $chart = $(selectorName).find('#chart');
      $chart.css({height:340});
      return echarts.init($chart[0]);
  }


  update(start,end){
    rpc.call('user.getUserAddTimelineByStartEndDayStr',{
      start:helper.getThedayStrOfTheday(start),
      end:helper.getThedayStrOfTheday(end)
    },(data)=>{
      var dayStrArray = data.dayStrArray;
      var timeline = data.timeline;
      var option = $.extend(true,{},this.option);
      if(dayStrArray.length == 1){
        for(var i=1;i<=24;i++){
          option.xAxis[0].data.push(i);
          option.series[0].data.push(timeline[i]);
        }
      }else{
        for(var j in dayStrArray){
          var theday_str = dayStrArray[j];
          option.xAxis[0].data.push(theday_str.substring(5,theday_str.length));
          option.series[0].data.push(timeline[theday_str]);
        }
      }

      this.getChart().setOption(option);
    })

  }
}

export = UserAddLine;
