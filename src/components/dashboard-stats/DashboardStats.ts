/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import rpc = require('../easy-rpc/index');
@Component({
  selector: 'dashboard-stats'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('dashboard-stats'),
  directives: []
})

class DashboardStats {
  userAddNumber:number = null;
  moneyAddNumber:number = null;
  constructor(){
    this.getDashboardStats();
  }
  private getDashboardStats(callback?:Function){
    rpc.call('money.getTotalPayOfTheday',{theday:'2015/07/18'},(money)=>{
      this.moneyAddNumber = money;
    });
  }
}

export = DashboardStats;
