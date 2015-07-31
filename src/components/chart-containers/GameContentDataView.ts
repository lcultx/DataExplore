import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import ChartContainer = require('./_ChartContainer');
import DatePicker = require('../datepicker/DatePicker');
import EventAddLine = require('../charts/EventAddLine');

@Component({
  selector: 'game-content-data-view'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('chart-containers/game-content-data-view'),
  directives: [DatePicker,EventAddLine]
})

class GameContentDataView extends ChartContainer implements IChartContainer {

}

export = GameContentDataView;
