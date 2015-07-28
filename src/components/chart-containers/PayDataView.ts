import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import DashboardStats = require('../dashboard-stats/DashboardStats');
import YesterdayPayChart = require('../charts/YesterdayPayChart');
import MoneyAddLine = require('../charts/MoneyAddLine');
import PayTypeLine = require('../charts/PayTypeLine');
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
