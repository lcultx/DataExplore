import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import ChartContainer = require('./_ChartContainer');
import DatePicker = require('../datepicker/DatePicker');
import UserAddLine = require('../charts/UserAddLine');

@Component({
  selector: 'login-data-view'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('chart-containers/login-data-view'),
  directives: [DatePicker,UserAddLine]
})

class LoginDataView extends ChartContainer implements IChartContainer {

}

export = LoginDataView;
