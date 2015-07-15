/// <reference path="./interface.d.ts"/>
var ExecTime = require('exec-time');
class baseChartView implements IChartView{
  apiURL:string;
  viewURL:string;
  constructor(cfg:any){
    if(cfg.apiURL){
      this.apiURL = cfg.apiURL;
    }
    if(cfg.viewURL){
      this.viewURL = cfg.viewURL;
    }
  }

  loadData(callback:(data)=>void){
    throw new Error('you are calling abstarct method');
  }

  getChartOptions(data):any{
    throw new Error('you are calling abstarct method');
  }



  setApiURL(url:string){
    this.apiURL = url;
  }
  getApiURL(){
    return this.apiURL;
  }
  getTemplate(){
    var apiURL = this.getApiURL();
    var template = `
      <!DOCTYPE html>

      <html lang="zh">
        <head>
          <meta charset="UTF-8">
          <title>DataExplore</title>
          <script src="./resource/lib/traceur-runtime@0.0.87.js"></script>
          <script src="./resource/lib/system@0.16.11.js"></script>

          <script src="./config.js"></script>
          <script src="./resource/lib/angular2.0.0-alpha.28.dev.js"></script>
          <script src="./resource/lib/angular2.0.0-alpha.28_router.dev.js"></script>
          <script src="./resource/lib/jquery-1.11.3.js"></script>
        </head>
        <body>
          <!-- The app component created in app.ts -->
          <simple-chart id="simpleChart" apiURL=${apiURL}>
          Loading
          </simple-chart>

          <script>
            System.import('./build/components/shower/SimpleChartLoader');
          </script>

        </body>
      </html>


      `

      return template;
  }

  api(req,res){
    var profiler = new ExecTime(this.getApiURL());
    profiler.beginProfiling();
    this.loadData((data)=>{
      profiler.step(this.getApiURL() + ' loaded data');
      var options = this.getChartOptions(data);
      profiler.step(this.getApiURL() + ' finish')
      res.json(options);
    })
  };

  render(req,res){
    res.write(this.getTemplate());
  };
}

export = baseChartView;
