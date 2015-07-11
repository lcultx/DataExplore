var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./interfaces.d.ts"/>
var events = require('events');
/// <reference path="../../../typings/request/request.d.ts"/>
var http = require('http');
function readLines(input, func) {
    var remaining = '';
    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });
    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining, true);
        }
    });
}
var RemoteLogDataCollector = (function (_super) {
    __extends(RemoteLogDataCollector, _super);
    function RemoteLogDataCollector(url) {
        _super.call(this);
        if (url) {
            this.url = url;
        }
    }
    RemoteLogDataCollector.prototype.setLogURI = function (url) {
        this.url = url;
    };
    RemoteLogDataCollector.prototype.setParser = function (parser) {
        this.parser = parser;
    };
    RemoteLogDataCollector.prototype.setLogModelAsParser = function (model) {
        var Parser = (function () {
            function Parser() {
            }
            Parser.prototype.parse = function (line) {
                return model.parseLogLine(line);
            };
            return Parser;
        })();
        this.parser = new Parser();
    };
    ;
    RemoteLogDataCollector.prototype.run = function () {
        var _this = this;
        var count = 0;
        http.get(this.url, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            readLines(res, function (line, end) {
                console.log('count', count++);
                var ob = _this.parser.parse(line);
                if (end) {
                    _this.emit('end', ob);
                }
                else {
                    _this.emit('line', ob);
                }
            });
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    };
    ;
    return RemoteLogDataCollector;
})(events.EventEmitter);
module.exports = RemoteLogDataCollector;
//# sourceMappingURL=RemoteLogDataCollector.js.map