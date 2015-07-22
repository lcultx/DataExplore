/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import DashboardStats = require('../dashboard-stats/DashboardStats');

@Component({
  selector: 'dashboard'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('dashboard'),
  directives: [DashboardStats]
})

class Dashboard {

}

export = Dashboard;
