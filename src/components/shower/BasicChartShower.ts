/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
import ng2Helper = require('../../library/ng2Helper');

import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import Application = require('../application/Application');

var echarts = require('echarts').echarts;


class BasicChartShower implements IChartShower{
  parent:Application;
  $elem:JQuery;
  echarts = echarts;
  option:any;
  constructor(viewContrainer:angular2.ViewContainerRef){
    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
    this.$elem = ng2Helper.getJQueryElementFromViewContainer(viewContrainer);
    this.parent.addShower(this);
  }

  setChartOption(option:any){
    this.option = option;
  }

  drawChart(){
    if(this.option){
      var targetElement = this.$elem.find('#canvas_content')[0];
      var myChart = this.echarts.init(targetElement);
      // 为echarts对象加载数据
      myChart.setOption(this.option);
    }else{
      throw new Error('undefined chart option, you should call setChartOption method before drawChart');
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

export =  BasicChartShower ;
