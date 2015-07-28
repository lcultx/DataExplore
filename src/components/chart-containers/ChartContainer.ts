class ChartContainer {
  charts:Array<IChart>;

  addChart(chart:IChart){
    this.charts.push(chart);
  }
}

export = ChartContainer;
