import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import DashboardStats = require('../dashboard-stats/DashboardStats');
import YesterdayPayChart = require('../yesterday-pay-chart/YesterdayPayChart');
import MoneyAddLine = require('../yesterday-pay-chart/MoneyAddLine');
import PayTypeLine = require('../yesterday-pay-chart/PayTypeLine');
@Component({
  selector: 'pay-data-view'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('chart-containers/pay-data-view'),
  directives: [DashboardStats,YesterdayPayChart,MoneyAddLine,PayTypeLine]
})

class PayDataView{

}

export = PayDataView;
