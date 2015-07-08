/// <reference path="./interfaces.d.ts"/>

import BasicChartShower = require('./BasicChartShower');
import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../../library/ng2Helper');


@Component({
  selector: 'yesterday-event-shower'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
})

class YesterdayEventShower extends BasicChartShower implements IChartShower{
  constructor(viewContrainer:angular2.ViewContainerRef){

    super(viewContrainer);

    this.drawChart();
  }


}

export = YesterdayEventShower;
