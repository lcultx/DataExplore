var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./interface.d.ts"/>
var baseChartView = require('./baseChartView');
var gender_pay_contrast = (function (_super) {
    __extends(gender_pay_contrast, _super);
    function gender_pay_contrast() {
        _super.call(this);
        this.apiURL = '/adffds';
        this.setApiURL('/gender_pay_contrast');
    }
    return gender_pay_contrast;
})(baseChartView);
module.exports = gender_pay_contrast;
//# sourceMappingURL=gender_pay_contrast.js.map