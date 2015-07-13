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
        _super.call(this, viewContrainer);
        this.option = {};
    }
    PayPointShower = __decorate([
        angular2_1.Component({
            selector: 'gender-pay-contrast'
        }),
        angular2_1.View({
            templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
        }), 
        __metadata('design:paramtypes', [angular2.ViewContainerRef])
    ], PayPointShower);
    return PayPointShower;
})(baseChartShower);
module.exports = PayPointShower;
//# sourceMappingURL=GenderPayContrast.js.map