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

      this.getAndroidChart().setOption(android_chart_config);
      this.getIOSChart().setOption(ios_chart_config);

    });
  }


  getAndroidChart(){
    var $andorid_chart = $('<div>');
    $andorid_chart.css({height:340});
    $(selectorName).find('#chart1').html('');
    $(selectorName).find('#chart1').append($andorid_chart);
    return echarts.init($andorid_chart[0])
  }

  getIOSChart(){
    var $ios_chart = $('<div>');
    $ios_chart.css({height:340});
    $(selectorName).find('#chart2').html('');
    $(selectorName).find('#chart2').append($ios_chart);
    return echarts.init($ios_chart[0])
  }



  prepareChartsOption(events){
    var servers:any = {};
    for(var i in events){
      var ob = events[i];
      var args = querystring.parse(ob.data.req);
      var itemid = args.itemid;
      var good = shuijing_config.getGoodByItemId(itemid);
      if(!servers[good.zoneid]){
        servers[good.zoneid]={};
      }
      if(servers[good.zoneid][good.itemid]){
        servers[good.zoneid][good.itemid].number += 1;
        servers[good.zoneid][good.itemid].money += good.price;
      }else{
        servers[good.zoneid][good.itemid] = {
          number:1,
          money:good.price,
          name:good.desc
        }
      }
    }
    return servers;
  }

  update(start,end){
    rpc.call('money.getPayEventsByStartEndDayStr',{
      start:helper.getThedayStrOfTheday(start),
      end:helper.getThedayStrOfTheday(end)
    },(data)=>{
      var servers = this.prepareChartsOption(data.events);
      var android_chart_config = $.extend(true,{},this.option);
      var ios_chart_config = $.extend(true,{},this.option);
      android_chart_config.title.subtext = 'android';
      ios_chart_config.title.subtext = 'ios';
      var android_goods = servers[1];
      for(var i in android_goods){
        var good = android_goods[i];

        android_chart_config.xAxis[0].data.push(good.name);
        android_chart_config.series[0].data.push(good.number);
      }



      var ios_goods = servers[2];
      for(var i in ios_goods){
        var good = ios_goods[i];
        ios_chart_config.xAxis[0].data.push(good.name);
        ios_chart_config.series[0].data.push(good.number);
      }

      this.getAndroidChart().setOption(android_chart_config);
      this.getIOSChart().setOption(ios_chart_config);
    })

  }

}

export = PayTypeLine;
