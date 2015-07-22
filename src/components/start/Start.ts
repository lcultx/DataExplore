/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');

@Component({
  selector: 'start'
})

@View({
  template: '<h1>Start</h1>',
  directives: []
})

class Start{

}

export = Start;
