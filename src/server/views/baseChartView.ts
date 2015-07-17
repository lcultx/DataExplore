/// <reference path="./interface.d.ts"/>
var ExecTime = require('exec-time');
class baseChartView implements IChartView{
  apiURL:string;
  viewURL:string;

  profiler;

  constructor(cfg:any){
    if(cfg.apiURL){
      this.apiURL = cfg.apiURL;
    }
    if(cfg.viewURL){
      this.viewURL = cfg.viewURL;
    }
  }

  loadData(callback:(data)=>void,req){
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

  getProfiler(str?:string){
    if(!this.profiler){
      this.profiler =  new ExecTime(str||this.getApiURL());
      this.profiler.beginProfiling();
    }
    return this.profiler;
  }


  query_profile(query){
    console.log('query finish');
    this.getProfiler().step(JSON.stringify(query));
  }

  step(str){
    this.getProfiler().step(this.getApiURL() +  " " + str);
  }

  api(req,res){
    this.loadData((data)=>{
    this.step('loaded data');
      var options = this.getChartOptions(data);
      this.step('finish');
      res.json(options);
    },req)
  };

  render(req,res){
    res.write(this.getTemplate());
  };
}

export = baseChartView;
