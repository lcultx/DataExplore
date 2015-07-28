/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');

@Component({
  selector: 'yesterday-economy-chart'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('yesterday-economy-chart'),
  directives: []
})

class YesterdayEconomyChart {

}

export = YesterdayEconomyChart;
