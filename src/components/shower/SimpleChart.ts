/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../shower/interfaces.d.ts"/>

import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../../library/ng2Helper');
var echarts = require('echarts').echarts;
@Component({
  selector: 'simple-chart'
})

@View({
  template: '  <div id="canvas_content" style="height:300px;"></div>'
})

class SimpleChart  implements IChartShower{


   $elem:JQuery;
   echarts = echarts;
   option:any;
   myChart:any;
   constructor(viewContrainer:angular2.ViewContainerRef){
     this.$elem = $('#simpleChart');

     $.get(this.getApiURL(),(data)=>{

       this.option = data;
       this.drawChart();
     })
   }

   setChartOption(option:any){
     this.option = option;
   }

   getApiURL(){
     return this.$elem.attr("apiURL");
   }

   drawChart(){

     if(this.option){

       // 为echarts对象加载数据
       this.getMyChart().setOption(this.option);
     }else{
       throw new Error('undefined chart option, you should call setChartOption method before drawChart');
     }
   }

   getMyChart(){
     if(this.myChart){
       return this.myChart;
     }else{
       var targetElement = this.$elem.find('#canvas_content')[0];
       this.myChart = this.echarts.init(targetElement);
       return this.myChart;
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


export = SimpleChart;
