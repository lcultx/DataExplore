/// <reference path="../../../typings/angular2/angular2.d.ts"/>
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../shower/interfaces.d.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2 = require('angular2/angular2');
var echarts = require('echarts').echarts;
var SimpleChart = (function () {
    function SimpleChart(viewContrainer) {
        var _this = this;
        this.echarts = echarts;
        this.$elem = $('#simpleChart');
        $.get('/gender_pay_contrast', function (data) {
            _this.option = data;
            _this.drawChart();
        });
    }
    SimpleChart.prototype.setChartOption = function (option) {
        this.option = option;
    };
    SimpleChart.prototype.drawChart = function () {
        if (this.option) {
            this.getMyChart().setOption(this.option);
        }
        else {
            throw new Error('undefined chart option, you should call setChartOption method before drawChart');
        }
    };
    SimpleChart.prototype.getMyChart = function () {
        if (this.myChart) {
            return this.myChart;
        }
        else {
            var targetElement = this.$elem.find('#canvas_content')[0];
            this.myChart = this.echarts.init(targetElement);
            return this.myChart;
        }
    };
    SimpleChart.prototype.show = function () {
        this.$elem.hide();
    };
    ;
    SimpleChart.prototype.hide = function () {
        this.$elem.show();
    };
    ;
    SimpleChart.prototype.update = function () {
    };
    ;
    SimpleChart = __decorate([
        angular2_1.Component({
            selector: 'simple-chart'
        }),
        angular2_1.View({
            template: '  <div id="canvas_content" style="height:300px;"></div>'
        }), 
        __metadata('design:paramtypes', [angular2.ViewContainerRef])
    ], SimpleChart);
    return SimpleChart;
})();
module.exports = SimpleChart;
//# sourceMappingURL=SimpleChart.js.map