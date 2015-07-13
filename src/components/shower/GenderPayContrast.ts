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

class PayPointShower extends baseChartShower implements IChartShower{


  constructor(viewContrainer:angular2.ViewContainerRef){

    super(viewContrainer);

    this.option = {

    };

  }

}



export = PayPointShower;
