/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import DashboardStats = require('../dashboard-stats/DashboardStats');
import YesterdayPayChart = require('../yesterday-pay-chart/YesterdayPayChart');
import MoneyAddLine = require('../yesterday-pay-chart/MoneyAddLine');
import PayTypeLine = require('../yesterday-pay-chart/PayTypeLine');
@Component({
  selector: 'pay-data'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('pay-data'),
  directives: [DashboardStats,YesterdayPayChart,MoneyAddLine,PayTypeLine]
})

class PayData{

}

export = PayData;
