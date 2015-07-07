//数据采集器
interface DataCollector{
  run();
}

//数据展示器
interface DataShower{
  show();
  hide();
  update();
}

//二维数组
interface Array2 extends Array<Array<any>>{

} 

//Filter实现的是对二维数组的整体操作
interface Array2Filter{
  filter(array2:Array2):Array2;
}
