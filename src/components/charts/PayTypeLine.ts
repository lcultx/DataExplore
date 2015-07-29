/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');
import rpc = require('../easy-rpc/index');
var echarts = require('echarts').echarts;

var selectorName = 'pay-type-line';

@Component({
  selector: selectorName
})

@View({
  template: `

  <div class="row-fluid">

    <div class="span6">
      <div class="portlet solid bordered light-grey">
        <div id="chart1"></div>
      </div>
    </div>

    <div class="span6">
      <div class="portlet solid bordered light-grey">
        <div id="chart2"></div>
      </div>
    </div>

  </div>


  `,
  directives: []
})

class PayTypeLine implements IChart{

  option = {

      title : {
          text: '充值行为物品分布',
          subtext: ''
      },
      grid:{
        x:'50px',
        y:'50px',
        x2:'40px',
        y2:'30px',
        borderWidth:'0px'
      },
      xAxis : [
          {
              type : 'category',
              show:false,
              boundaryGap : false,
              data : []
          }
      ],
      yAxis : [
          {
              type : 'value',
               show: false,
              axisLabel : {
                  formatter: '{value} 次'
              }
          }
      ],
      series : [
          {
              name:'andorid次数',
              type: 'bar',
               itemStyle: {
                   normal: {
                       color: function(params) {
                           // build a color map as your need.
                           var colorList = [
                             '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                              '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                              '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                           ];
                           return colorList[params.dataIndex]
                       },
                       label: {
                           show: true,
                           position: 'top',
                           formatter: '{b}\n{c}'
                       }
                   }
               },
              data:[]
          }


      ]
  };


  parent:IChartContainer;

  constructor(viewContrainer:angular2.ViewContainerRef){
    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
    this.parent.addChart(this);
    rpc.call('money.getYesterdayPayStatusWithType',{},(data)=>{
      var android_chart_config = $.extend(true,{},this.option);
      var ios_chart_config = $.extend(true,{},this.option);
      android_chart_config.title.subtext = 'android';
      ios_chart_config.title.subtext = 'ios';


      var android_goods = data.servers[1];
      for(var i in android_goods){
        var good = android_goods[i];

        android_chart_config.xAxis[0].data.push(good.name);
        android_chart_config.series[0].data.push(good.number);
      }



      var ios_goods = data.servers[2];
      for(var i in ios_goods){
        var good = ios_goods[i];
        ios_chart_config.xAxis[0].data.push(good.name);
        ios_chart_config.series[0].data.push(good.number);
      }

      var $andorid_chart = $('<div>');
      $andorid_chart.css({height:340});
      $(selectorName).find('#chart1').html('');
      $(selectorName).find('#chart1').append($andorid_chart);
      echarts.init($andorid_chart[0]).setOption(android_chart_config);

      var $ios_chart = $('<div>');
      $ios_chart.css({height:340});
      $(selectorName).find('#chart2').html('');
      $(selectorName).find('#chart2').append($ios_chart);
      echarts.init($ios_chart[0]).setOption(ios_chart_config);

    });
  }

  update(start,end){

  }

}

export = PayTypeLine;
