/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent,NgFor,CSSClass} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');

@Component({
  selector: 'siderbar'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('siderbar'),
  directives: [NgFor,CSSClass]
})

class Siderbar {

  barItems:any = [];
  nowActiveIndex:number = 0;

  constructor(){
    this.barItems = [
      {
        title:'Dashboard',
        icon:'icon-home',
        active:true
      },{
        title:'登录数据',
        icon:'icon-user'
      },{
        title:'付费数据',
        icon:'icon-file-text'
      },{
        title:'消耗数据',
        icon:'icon-fire'
      },{
        title:'VIP等级数据',
        icon:'icon-star'
      },{
        title:'玩家等级数据',
        icon:'icon-filter'
      },{
        title:'游戏内容数据',
        icon:'icon-gamepad'
      }
    ];
  }

  getClassOfItem(item,i:number){
    if(i== this.nowActiveIndex){
      return 'active';
    }else{
      return 'default';
    }
  }

  getIconClassOfItem(item){
    return item.icon || 'default';
  }

  onItemClick(i:number){
    this.barItems[this.nowActiveIndex].active = false;
    this.nowActiveIndex = i;
    this.barItems[this.nowActiveIndex].active = true;
  }

}

export = Siderbar;
