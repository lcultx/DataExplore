//数据展示器
interface IShower{
  show();
  hide();
  update();
}

interface ILogShower extends IShower{

}

interface IChartShower extends IShower{
  setChartOption(option:any);
  drawChart();
}
