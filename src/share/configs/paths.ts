import helper = require('../helper');
var config = {
  Dashboard:'/',
  LoginDataView:'/login-data',
  PayDataView:'/pay-data',
  FireDataView:'/fire-data',
  GameContentDataView:'/game-content'
};

var barItemConfig = [
   {title:'Dashboard',  link:"/",  icon:'icon-home'}
  ,{title:'登录数据',link:"/login-data",icon:'icon-user'}
  ,{title:'付费数据',link:"/pay-data",icon:'icon-file-text'}
  ,{title:'消耗数据',link:'/fire-data',icon:'icon-fire'}
  ,{title:'VIP等级数据',icon:'icon-star'}
  ,{title:'玩家等级数据',icon:'icon-filter'}
  ,{title:'游戏内容数据',link:'/game-content',icon:'icon-gamepad'}
]


//[{path:'/', component: 'Dashboard'}]
export function getNG2RouterConfig(componentClassList:Array<any>){
  var routerConfig = [];
  for(var i in componentClassList){
    var Component = componentClassList[i];
    var path = config[helper.getClassName(Component)]
    routerConfig.push({path:path,component:Component});
  }
  return routerConfig;
}

export function getExpressIndexPaths(){
  var paths = [];
  for(var i in config){
    paths.push(config[i]);
  }
  return paths;
}

export function getSiderbarItemsConfig(){
  return barItemConfig;
}
