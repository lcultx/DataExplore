/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
import ng2Helper = require('../../library/ng2Helper');

import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import Application = require('../application/Application');

        var ec = require('echarts').echarts;


@Component({
  selector: 'yesterday-log-shower'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/yesterday-log-shower'),
})

class YesterdayLogShower implements ILogShower{
  parent:Application;
  $elem:JQuery;
  constructor(viewContrainer:angular2.ViewContainerRef){
    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
    this.$elem = ng2Helper.getJQueryElementFromViewContainer(viewContrainer);
    this.parent.addShower(this);



    this.drawChart();

  }

  drawChart(){

    var targetElement = this.$elem.find('#canvas_content')[0];
    
    var myChart = ec.init(targetElement);
    var option = {
       title : {
           text: '某楼盘销售情况',
           subtext: '纯属虚构'
       },
       tooltip : {
           trigger: 'axis'
       },
       legend: {
           data:['意向','预购','成交']
       },
       toolbox: {
           show : true,
           feature : {
               mark : {show: true},
               dataView : {show: true, readOnly: false},
               magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
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
               type : 'value'
           }
       ],
       series : [
           {
               name:'成交',
               type:'line',
               smooth:true,
               itemStyle: {normal: {areaStyle: {type: 'default'}}},
               data:[10, 12, 21, 54, 260, 830, 710]
           },
           {
               name:'预购',
               type:'line',
               smooth:true,
               itemStyle: {normal: {areaStyle: {type: 'default'}}},
               data:[30, 182, 434, 791, 390, 30, 10]
           },
           {
               name:'意向',
               type:'line',
               smooth:true,
               itemStyle: {normal: {areaStyle: {type: 'default'}}},
               data:[1320, 1132, 601, 234, 120, 90, 20]
           }
       ]
    };


    // 为echarts对象加载数据
    myChart.setOption(option);

  }


  show(){
    this.$elem.hide();
  };
  hide(){
    this.$elem.show();
  };
  update(){

  };
}

export = YesterdayLogShower;
