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
var ng2Helper = require('../../library/ng2Helper');
var YesterdayLogShower = require('../shower/YesterdayLogShower');
var YesterdayEventShower = require('../shower/YesterdayEventShower');
var Application = (function () {
    function Application() {
        this.showerList = [];
    }
    Application.prototype.addShower = function (shower) {
        this.showerList.push(shower);
    };
    ;
    Application = __decorate([
        angular2_1.Component({
            selector: 'application'
        }),
        angular2_1.View({
            templateUrl: ng2Helper.getTemplateUrlByComponentName('application'),
            directives: [YesterdayLogShower, YesterdayEventShower]
        }), 
        __metadata('design:paramtypes', [])
    ], Application);
    return Application;
})();
module.exports = Application;
//# sourceMappingURL=Application.js.map