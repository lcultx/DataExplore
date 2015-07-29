/// <reference path="../chart-containers/interface"/>
import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../ng2-library/ng2Helper');
import moment = require('moment');
import EventEmitter = require('eventemitter3');
@Component({
  selector: 'datepicker'
})

@View({
  template: `
  <div id="reportrange" class="pull-right"
    style="
      background: #fff;
      cursor: pointer;
      padding: 7px 10px;
      border: 1px solid #ccc;
      width: 100%;
      margin-top: -8px;
    "
  >
      <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
      <span></span> <b class="caret"></b>
  </div>


  <style>
  .daterangepicker .table-condensed th,.daterangepicker  .table-condensed td{
    padding: 0px 0px;
  }

  .daterangepicker .daterangepicker_input input{
    width:200px;
  }
  </style>

  `,
  directives: []
})

class Datepicker extends EventEmitter{
  parent:IChartContainer;
  constructor(viewContrainer:angular2.ViewContainerRef){
    super();

    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);

    this.parent.setDatePicker(this);

    $(() =>{

      function cb(start, end) {
          $('#reportrange span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));

      }
      cb(moment().subtract(29, 'days'), moment());

      (<any>$('#reportrange')).daterangepicker({
          locale: {
              format: 'YYYY/MM/DD'
          },
          ranges: {
              'Today': [moment(), moment()],
             'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
             'Last 7 Days': [moment().subtract(7, 'days'),moment().subtract(1, 'days')],
             'Last 30 Days': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
             'This Month': [moment().startOf('month'), moment().endOf('month')],
             'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
      }, (start,end)=>{
        cb(start,end);
        this.emit('change',{start:start,end:end});
      });

    });
  }
}

export = Datepicker;
