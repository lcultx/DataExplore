/// <reference path="./interface.d.ts"/>
class baseChartView implements IChartView{
  template:string =   `
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
        <simple-chart id="simpleChart">
        Loading
        </simple-chart>

        <script>
          System.import('./build/components/shower/SimpleChartLoader');
        </script>

      </body>
    </html>


    `;





  api(req,res){
    throw new Error('must be overide buy sub class')
  };
  render(req,res){
    res.write(this.template);
  };
}

export = baseChartView;
