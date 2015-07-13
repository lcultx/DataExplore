/// <reference path="../../../typings/express/express.d.ts"/>
interface IChartView{
  getApiURL();
  setApiURL(url:string);
  api(req,res);
  render(req,res);
}
