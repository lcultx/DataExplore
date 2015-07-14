var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./interfaces.d.ts"/>
var baseEventLogModel = require('./baseEventLogModel');
var moment = require('moment');
var LatteEventLogModel = (function (_super) {
    __extends(LatteEventLogModel, _super);
    function LatteEventLogModel(ob) {
        _super.call(this, ob);
    }
    LatteEventLogModel.prototype.parseLogLine = function (line) {
        if (line) {
            var splitList = line.split(' ');
            var time = splitList[0].split('[')[1] + ' ' + splitList[1].split('.')[0];
            var mm = moment(time, 'YYYY-MM-DD HH:mm:ss');
            var player_name = splitList[10];
            if (player_name) {
                player_name = player_name.substr(0, player_name.length - 1);
            }
            else {
                if (splitList[11] = '[') {
                    player_name = '[    ]';
                }
            }
            var player_action = splitList[5];
            var request_url = splitList[6];
            return {
                time: mm.toDate(),
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