/// <reference path="./interface.d.ts"/>
var baseChartView = (function () {
    function baseChartView() {
    }
    baseChartView.prototype.setApiURL = function (url) {
        this.apiURL = url;
        console.log('url', url);
        console.log('setApiURL', this.apiURL);
    };
    baseChartView.prototype.getApiURL = function () {
        console.log('getApiURL', this.apiURL);
        return this.apiURL;
    };
    baseChartView.prototype.getTemplate = function () {
        var apiURL = this.getApiURL();
        console.log('apiURL', apiURL);
        var template = "\n      <!DOCTYPE html>\n\n      <html lang=\"zh\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <title>DataExplore</title>\n          <script src=\"./resource/lib/traceur-runtime@0.0.87.js\"></script>\n          <script src=\"./resource/lib/system@0.16.11.js\"></script>\n\n          <script src=\"./config.js\"></script>\n          <script src=\"./resource/lib/angular2.0.0-alpha.28.dev.js\"></script>\n          <script src=\"./resource/lib/angular2.0.0-alpha.28_router.dev.js\"></script>\n          <script src=\"./resource/lib/jquery-1.11.3.js\"></script>\n        </head>\n        <body>\n          <!-- The app component created in app.ts -->\n          <simple-chart id=\"simpleChart\" apiURL=" + apiURL + ">\n          Loading\n          </simple-chart>\n\n          <script>\n            System.import('./build/components/shower/SimpleChartLoader');\n          </script>\n\n        </body>\n      </html>\n\n\n      ";
        return template;
    };
    baseChartView.prototype.api = function (req, res) {
        throw new Error('must be overide buy sub class');
    };
    ;
    baseChartView.prototype.render = function (req, res) {
        res.write(this.getTemplate());
    };
    ;
    return baseChartView;
})();
module.exports = baseChartView;
//# sourceMappingURL=baseChartView.js.map