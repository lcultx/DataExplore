var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./interfaces.d.ts"/>
var events = require('events');
var fs = require('fs');
var StreamHelper = require('./StreamHelper');
var LocalLogDataCollector = (function (_super) {
    __extends(LocalLogDataCollector, _super);
    function LocalLogDataCollector(url) {
        _super.call(this);
        if (url) {
            this.file = url;
        }
    }
    LocalLogDataCollector.prototype.setLogURI = function (uri) {
        this.file = uri;
    };
    LocalLogDataCollector.prototype.setParser = function (parser) {
        this.parser = parser;
    };
    LocalLogDataCollector.prototype.setLogModelAsParser = function (model) {
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
    LocalLogDataCollector.prototype.parseLine = function (line) {
        if (this.parser) {
            return this.parser.parse(line);
        }
        else {
            return line;
        }
    };
    LocalLogDataCollector.prototype.run = function () {
        var _this = this;
        var count = 0;
        var readStream = fs.createReadStream(this.file);
        readStream.setEncoding('utf8');
        StreamHelper.readLines(readStream, function (line, end) {
            var ob = _this.parseLine(line);
            if (ob) {
                _this.emit('line', ob);
            }
            if (end) {
                _this.emit('end');
            }
        });
    };
    ;
    return LocalLogDataCollector;
})(events.EventEmitter);
module.exports = LocalLogDataCollector;
//# sourceMappingURL=LocalLogDataCollector.js.map