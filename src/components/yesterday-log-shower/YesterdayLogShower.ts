/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
import ng2Helper = require('../../library/ng2Helper');

import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import Application = require('../application/Application');

@Component({
  selector: 'yesterday-log-shower'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('yesterday-log-shower'),
})

class YesterdayLogShower {
  parent:Application;
  constructor(viewContrainer:angular2.ViewContainerRef){
    this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
    console.log(this.parent);
  }
}

export = YesterdayLogShower;
