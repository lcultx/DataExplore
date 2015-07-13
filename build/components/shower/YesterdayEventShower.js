/// <reference path="./interfaces.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var baseChartShower = require('./baseChartShower');
var angular2_1 = require('angular2/angular2');
var angular2 = require('angular2/angular2');
var ng2Helper = require('../../library/ng2Helper');
var YesterdayEventShower = (function (_super) {
    __extends(YesterdayEventShower, _super);
    function YesterdayEventShower(viewContrainer) {
        var _this = this;
        _super.call(this, viewContrainer);
        this.option = {
            title: {
                text: '2015/07/06 全服玩家单日行为汇总',
                subtext: '',
                x: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'left',
                y: 'bottom',
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie']
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            series: []
        };
        function totalNumber(ob) {
            var total = 0;
            for (var i in ob) {
                total += ob[i];
            }
            return total;
        }
        function getKeyNameArray(data) {
            var keyArray = [];
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    if (keyArray.indexOf(key) == -1) {
                        keyArray.push(key);
                    }
                }
            }
            return keyArray;
        }
        $.get('/yesterday_events', function (data) {
            console.log(data);
            var chartCanvasHeight = 200;
            var numberArray = [];
            var keyArray = getKeyNameArray(data);
            console.log(keyArray);
            _this.option.legend.data = keyArray;
            var totalTotal = 0;
            for (var i = 0; i < data.length; i++) {
                var this_total = totalNumber(data[i]);
                totalTotal += this_total;
                numberArray.push(this_total);
            }
            console.log(numberArray);
            console.log(totalTotal);
            var totalWidth = window.innerWidth;
            var marginLeft = 0;
            var marginTop = 100;
            var lineCharNumber = 12;
            var cubeLength = Math.round(totalWidth / lineCharNumber);
            var maxValue = Math.max.apply(null, numberArray);
            var maxRadius = Math.round(((maxValue / totalTotal) / 2) * totalWidth);
            console.log(Math.max.apply(null, numberArray));
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count++;
                var radius = Math.round((numberArray[i] / totalTotal) * totalWidth);
                var point_x = marginLeft + cubeLength / 2;
                var point_y = marginTop + cubeLength / 2;
                console.log('point_y', point_y);
                marginLeft += cubeLength;
                if (count == lineCharNumber) {
                    marginLeft = 0;
                    marginTop = marginTop + cubeLength + 100;
                    count = 0;
                    chartCanvasHeight += cubeLength + 100;
                    _this.option.legend.y = marginTop;
                }
                var pie = {
                    name: (i + 1) + '点',
                    type: 'pie',
                    radius: [5, radius],
                    center: [point_x, point_y],
                    roseType: 'radius',
                    width: '5%',
                    max: 40,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: true
                            }
                        }
                    },
                    data: []
                };
                var this_data = data[i];
                for (var key in this_data) {
                    pie.data.push({
                        name: key,
                        value: this_data[key]
                    });
                }
                _this.option.series.push(pie);
            }
            _this.drawChart();
        });
    }
    YesterdayEventShower = __decorate([
        angular2_1.Component({
            selector: 'yesterday-event-shower'
        }),
        angular2_1.View({
            templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
        }), 
        __metadata('design:paramtypes', [angular2.ViewContainerRef])
    ], YesterdayEventShower);
    return YesterdayEventShower;
})(baseChartShower);
module.exports = YesterdayEventShower;
//# sourceMappingURL=YesterdayEventShower.js.map