/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../shower/interfaces.d.ts"/>

import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import YesterdayLogShower = require('../shower/YesterdayLogShower');
import YesterdayEventShower = require('../shower/YesterdayEventShower');
import PayPointShower = require('../shower/PayPointShower');
import GenderPayContrast = require('../shower/GenderPayContrast');

@Component({
  selector: 'application'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('application'),
  directives: [YesterdayLogShower,YesterdayEventShower,PayPointShower,GenderPayContrast]
})

class Application {
  showerList:Array<ILogShower> = [];
  addShower(shower:ILogShower){
    this.showerList.push(shower);
  };
}

export = Application;
