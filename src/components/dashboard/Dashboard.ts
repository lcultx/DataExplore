/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import DashboardStats = require('../dashboard-stats/DashboardStats');
import YesterdayPayChart = require('../yesterday-pay-chart/YesterdayPayChart');
import YesterdayUseraddChart = require('../yesterday-useradd-chart/YesterdayUseraddChart');
import YeserdayEconomyChart = require('../yesterday-economy-chart/YesterdayEconomyChart');
import DatePicker = require('../datepicker/DatePicker');
@Component({
  selector: 'dashboard'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('dashboard'),
  directives: [DashboardStats,YesterdayPayChart,YesterdayUseraddChart,YeserdayEconomyChart,DatePicker]
})

class Dashboard {

}

export = Dashboard;
