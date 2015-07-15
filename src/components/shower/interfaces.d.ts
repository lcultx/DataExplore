//数据展示器
interface IShower{
  show();
  hide();
  update();
}

interface IChartShower extends IShower{
  setChartOption(option:any);
  drawChart();
}
