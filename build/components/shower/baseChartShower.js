/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
var ng2Helper = require('../../library/ng2Helper');
var echarts = require('echarts').echarts;
var baseChartShower = (function () {
    function baseChartShower(viewContrainer) {
        this.echarts = echarts;
        this.parent = ng2Helper.getParentFromViewContainer(viewContrainer);
        this.$elem = ng2Helper.getJQueryElementFromViewContainer(viewContrainer);
        this.parent.addShower(this);
    }
    baseChartShower.prototype.setChartOption = function (option) {
        this.option = option;
    };
    baseChartShower.prototype.drawChart = function () {
        if (this.option) {
            this.getMyChart().setOption(this.option);
        }
        else {
            throw new Error('undefined chart option, you should call setChartOption method before drawChart');
        }
    };
    baseChartShower.prototype.getMyChart = function () {
        if (this.myChart) {
            return this.myChart;
        }
        else {
            var targetElement = this.$elem.find('#canvas_content')[0];
            this.myChart = this.echarts.init(targetElement);
            return this.myChart;
        }
    };
    baseChartShower.prototype.show = function () {
        this.$elem.hide();
    };
    ;
    baseChartShower.prototype.hide = function () {
        this.$elem.show();
    };
    ;
    baseChartShower.prototype.update = function () {
    };
    ;
    return baseChartShower;
})();
module.exports = baseChartShower;
//# sourceMappingURL=baseChartShower.js.map