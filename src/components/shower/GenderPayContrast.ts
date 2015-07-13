/// <reference path="./interfaces.d.ts"/>
import baseChartShower = require('./baseChartShower');
import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../../library/ng2Helper');

@Component({
  selector: 'gender-pay-contrast'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
})

class GenderPayContrast extends baseChartShower implements IChartShower{


  constructor(viewContrainer:angular2.ViewContainerRef){

    super(viewContrainer);

    $.get('/gender_pay_contrast',(data)=>{
      this.option = data;
      this.drawChart();
    })

  }

}



export = GenderPayContrast;
