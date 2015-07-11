var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./interfaces.d.ts"/>
var baseEventLogModel = require('./baseEventLogModel');
var LatteEventLogModel = (function (_super) {
    __extends(LatteEventLogModel, _super);
    function LatteEventLogModel(ob) {
        _super.call(this, ob);
    }
    LatteEventLogModel.prototype.parseLogLine = function (line) {
        if (line) {
            var splitList = line.split(' ');
            var time = splitList[1];
            time = time.substr(0, time.length - 1);
            var player_name = splitList[10];
            player_name = player_name.substr(0, player_name.length - 1);
            var player_action = splitList[5];
            if (player_action.indexOf('切换场') > -1 && player_action != '切换场景') {
                console.log(player_action);
                console.log(line);
            }
            var request_url = splitList[6];
            return {
                time: time,
                player_name: player_name,
                player_action: player_action,
                request_url: request_url
            };
        }
        else {
            return null;
        }
    };
    LatteEventLogModel.prototype.getEventHour = function () {
        var time = this.ob.time;
        return time.split(':')[0] * 1;
    };
    LatteEventLogModel.prototype.getEventName = function () {
        return this.ob.player_action;
    };
    return LatteEventLogModel;
})(baseEventLogModel);
module.exports = LatteEventLogModel;
//# sourceMappingURL=LatteEventLogModel.js.map