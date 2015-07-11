/// <reference path="./interfaces.d.ts"/>
var baseEventLogModel = (function () {
    function baseEventLogModel(ob) {
        switch (typeof (ob)) {
            case "string":
                this.ob = this.parseLogLine(ob);
                break;
            case "object":
                this.ob = ob;
                break;
            default:
                throw new Error(typeof (ob) + 'is not support yet!');
        }
    }
    baseEventLogModel.prototype.parseLogLine = function (line) {
        throw new Error('parseLogLine must be override by sub class!');
    };
    baseEventLogModel.prototype.getJSONValue = function () {
        return this.ob;
    };
    ;
    baseEventLogModel.prototype.toLogString = function () {
        return '';
    };
    ;
    return baseEventLogModel;
})();
module.exports = baseEventLogModel;
//# sourceMappingURL=baseEventLogModel.js.map