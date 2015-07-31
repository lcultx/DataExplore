import {Component, Directive, View, Parent,NgFor,CSSClass} from 'angular2/angular2';
import ng2Helper = require('../ng2-library/ng2Helper');
import router2 = require('angular2/router');

import Dashboard = require('../chart-containers/Dashborad');
import LoginDataView = require('../chart-containers/LoginDataView');
import PayDataView = require('../chart-containers/PayDataView');
import FireDataView = require('../chart-containers/FireDataView');
import GameContentDataView = require('../chart-containers/GameContentDataView');
import Settings = require('../settings/Settings');

import paths = require('../../share/configs/paths');

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
    var componentsList = [Dashboard,LoginDataView,PayDataView,FireDataView,GameContentDataView,Settings];
    this.router.config(paths.getNG2RouterConfig(componentsList));
    var barItems = paths.getSiderbarItemsConfig();
    var path = location.pathname;
    for(var i in barItems){
      var item:any = barItems[i];
      if(path ==  item.link){
        item.active = true;
        this.nowActiveIndex = i;
      }else{
        item.active = false;
      }
    }
    this.barItems = barItems;
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
    this.barItems[this.nowActiveIndex].active = true;
    var url = this.barItems[i].link || '';
    this.router.navigate(url).then(()=>{
      console.log('finish!');
    });
  }


}

export = Siderbar;
