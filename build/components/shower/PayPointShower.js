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
/// <reference path="./interfaces.d.ts"/>
var baseChartShower = require('./baseChartShower');
var angular2_1 = require('angular2/angular2');
var angular2 = require('angular2/angular2');
var ng2Helper = require('../../library/ng2Helper');
var PayPointShower = (function (_super) {
    __extends(PayPointShower, _super);
    function PayPointShower(viewContrainer) {
        var _this = this;
        _super.call(this, viewContrainer);
        this.goodsInfo = "1\t60\t60\u6C34\u6676\t2480\n1\t300\t300\u6C34\u6676\t2517\n1\t980\t980\u6C34\u6676\t2519\n1\t1980\t1980\u6C34\u6676\t2521\n1\t3280\t3280\u6C34\u6676\t2523\n1\t250\t\u6708\u5361\t2525\n1\t6480\t6480\u6C34\u6676\t2528\n1\t1\t\u6D4B\u8BD5\u9053\u5177\t2533\n1\t2\t\u6D4B\u8BD5\u6708\u5361\t2535\n1\t50\t3\u5929\u5361\t2726\n1\t100\t7\u5929\u5361\t2727\n1\t10\t10\u6C34\u6676\t2728\n1\t20\t20\u6C34\u6676\t2729\n1\t110\t110\u6C34\u6676\t2730\n1\t200\t200\u6C34\u6676\t2748\n2\t60\t60\u6C34\u6676\t2479\n2\t300\t300\u6C34\u6676\t2518\n2\t980\t980\u6C34\u6676\t2520\n2\t1980\t1980\u6C34\u6676\t2522\n2\t6480\t6480\u6C34\u6676\t2524\n2\t250\t\u6708\u5361\t2526\n2\t3280\t3280\u6C34\u6676\t2527\n2\t1\t\u6D4B\u8BD5\u9053\u5177\t2534\n2\t2\t\u6D4B\u8BD5\u6708\u5361\t2536\n2\t50\t3\u5929\u5361\t2731\n2\t100\t7\u5929\u5361\t2732\n2\t10\t10\u6C34\u6676\t2733\n2\t20\t20\u6C34\u6676\t2734\n2\t110\t110\u6C34\u6676\t2735\n2\t200\t200\u6C34\u6676\t2749";
        this.goods = [
            { itemid: 2480, desc: '60水晶', price: 60, zoneid: 1 }
        ];
        this.goods = this.parseGoodInfo();
        $.get('/pay_point', function (data) {
            _this.option = _this.getThisOption(data);
            _this.drawChart();
        });
    }
    PayPointShower.prototype.parseGoodInfo = function () {
        var goods = [];
        var goodInfos = this.goodsInfo.split('\n');
        for (var i = 0; i < goodInfos.length; i++) {
            var goodInfo = goodInfos[i];
            var parts = goodInfo.split("	");
            goods.push({
                itemid: parts[3] * 1, desc: parts[2], price: parts[1] * 1, zoneid: parts[0] * 1
            });
        }
        return goods;
    };
    PayPointShower.prototype.getGoodByItemid = function (itemid) {
        for (var i in this.goods) {
            var good = this.goods[i];
            if (good.itemid == itemid) {
                return good;
            }
        }
    };
    PayPointShower.prototype.getPayPointRecord = function (data) {
        var payItemRecord = {};
        for (var i = 0; i < data.length; i++) {
            var itemid = data[i].itemid;
            if (payItemRecord[itemid]) {
                payItemRecord[itemid] = payItemRecord[itemid] + 1;
            }
            else {
                payItemRecord[itemid] = 1;
            }
        }
        return payItemRecord;
    };
    PayPointShower.prototype.getThisOption = function (data) {
        var option = {
            title: {
                text: '付费点统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['购买次数']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '购买次数',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        };
        option.xAxis[0].data = [];
        option.series[0].data = [];
        var payItemRecord = this.getPayPointRecord(data);
        for (var itemid in payItemRecord) {
            var number = payItemRecord[itemid];
            var good = this.getGoodByItemid(itemid);
            console.log(good);
            if (good) {
                option.xAxis[0].data.push(good.desc);
                option.series[0].data.push(number);
            }
            else {
                console.log('good', good);
            }
        }
        return option;
    };
    PayPointShower = __decorate([
        angular2_1.Component({
            selector: 'pay-point-shower'
        }),
        angular2_1.View({
            templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
        }), 
        __metadata('design:paramtypes', [angular2.ViewContainerRef])
    ], PayPointShower);
    return PayPointShower;
})(baseChartShower);
module.exports = PayPointShower;
//# sourceMappingURL=PayPointShower.js.map