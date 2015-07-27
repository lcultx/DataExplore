/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>


import {Component, Directive, View, Parent,NgFor,CSSClass} from 'angular2/angular2';
import ng2Helper = require('../../library/ng2Helper');
import router2 = require('angular2/router');
import Start = require('../start/Start');
import Dashboard = require('../dashboard/Dashboard');
import LoginData = require('../login-data/LoginData');
import PayData = require('../pay-data/PayData');


@Component({
  selector: 'siderbar'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentName('siderbar'),
  directives: [NgFor,CSSClass,router2.RouterLink]
})

class Siderbar {
  router:any = null;
  barItems:any = [];
  nowActiveIndex:number = 0;

  constructor(router:router2.Router){
    this.router = router;
    this.router.config([
         {path:'', component: Dashboard}
        ,{path:'/start', component: Start,as:'start'}
        ,{path:'/login-data',component:LoginData, as:'login-data'}
        ,{path:'/pay-data',component:PayData,as:'pay-data'}
    ]);

    this.barItems = [
      {
        title:'Dashboard',
        link:"",
        icon:'icon-home',
        active:false
      },{
        title:'登录数据',
        link:"/login-data",
        icon:'icon-user',
        active:true
      },{
        title:'付费数据',
        link:"/pay-data",
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

    if(item.active){
      this.nowActiveIndex = i;
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
    console.log(this.router);
    this.barItems[this.nowActiveIndex].active = true;
    var url = this.barItems[i].link || '';
    console.log(url);
    this.router.navigate(url).then(()=>{
      console.log('finish!');
    });
  }


}

export = Siderbar;
