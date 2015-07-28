/// <reference path="./interface"/>

import ChartContainer = require('./_ChartContainer');

import angular2 =require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');

import DashboardStats = require('../dashboard-stats/DashboardStats');
import YesterdayPayChart = require('../yesterday-pay-chart/YesterdayPayChart');
import YesterdayUseraddChart = require('../yesterday-useradd-chart/YesterdayUseraddChart');
import YeserdayEconomyChart = require('../yesterday-economy-chart/YesterdayEconomyChart');
import DatePicker = require('../datepicker/DatePicker');

@angular2.Component({
  selector: 'dashboard'
})

@angular2.View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('chart-containers/dashboard'),
  directives: [DashboardStats,YesterdayPayChart,YesterdayUseraddChart,YeserdayEconomyChart,DatePicker]
})

class Dashboard extends ChartContainer implements IChartContainer{
    constructor(){
      super();
      console.log('dashborad');
      this.on('date-change',(data)=>{
        console.log(data);
      })
    }
}

export = Dashboard;
