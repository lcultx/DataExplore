/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
import ng2Helper = require('../../library/ng2Helper');

import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import Application = require('../application/Application');

        var ec = require('echarts');
        
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








            function drawConnectNumberChart(x,y){


              // 使用

                      // 基于准备好的dom，初始化echarts图表
                      var myChart = ec.init(document.getElementById('connect_number'));

                      var option = {
                          title : {
                              text: '连接状态',
                              subtext: 'server_01'
                          },
                          tooltip : {
                              trigger: 'axis'
                          },
                          legend: {
                              data:['连接数']
                          },
                          toolbox: {
                              show : true,
                              feature : {
                                  dataView : {show: true, readOnly: false},
                                  magicType : {show: true, type: ['line','bar']},
                                  restore : {show: true},
                                  saveAsImage : {show: true}
                              }
                          },
                          dataZoom: {
                              show: true,
                              start : 0,
                              end : 100
                          },
                          xAxis : [
                              {
                                type : 'category',
                                boundaryGap : false,
                                data : x
                              }
                          ],
                          yAxis : [
                              {
                                  type : 'value',
                                  axisLabel : {
                                      formatter: '{value} 个连接'
                                  }
                              }
                          ],

                          series : [
                              {
                                  name:'连接数',
                                //  type:'scatter',
                                //   large: true,
                                  type:'line',
                                  smooth:true,
                                  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                  data:y,
                                  // markPoint : {
                                  //     data : [
                                  //         {type : 'max', name: '最大值'},
                                  //         {type : 'min', name: '最小值'}
                                  //     ]
                                  // },
                                  markLine : {
                                      data : [
                                          {type : 'average', name: '平均值'}
                                      ]
                                  }
                              }
                          ],

                      };

                      // 为echarts对象加载数据
                      myChart.setOption(option);

                    }


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
