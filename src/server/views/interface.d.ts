/// <reference path="../../../typings/express/express.d.ts"/>
interface IChartView{
  getApiURL();
  setApiURL(url:string);
  loadData(callback:(data)=>void,req?:Express.Request);//abstarct method
  getChartOptions(data):any;//abstarct method
  api(req,res);
  render(req,res);
}

interface IChartTableView extends IChartView{
  getTableHTML():string;
}
