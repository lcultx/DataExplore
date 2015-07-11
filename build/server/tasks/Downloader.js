/// <reference path="./interface.d.ts"/>
var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');
var mkdirp = require('mkdirp');
function wget(remote_url, local_path, callback) {
}
function download(remote_url, local_path, callback) {
    console.log(arguments);
    var shower_str = local_path.substring(local_path.length - 5, local_path.length - 4);
    var url_parts = url.parse(remote_url);
    var options = {
        host: url_parts.hostname,
        path: url_parts.path,
        port: url_parts.port,
    };
    mkdirp(path.dirname(local_path), function () {
        var downloadfile = fs.createWriteStream(local_path, { 'flags': 'w', 'encoding': 'utf-8' });
        downloadfile.on('open', function () {
            var req = http.request(options, function (res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                process.stdout.write("downloading: ");
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    if (Math.random() < 0.1) {
                        process.stdout.write(shower_str || '.');
                    }
                    downloadfile.write(chunk);
                });
                res.on("end", function () {
                    console.log('success dowaload ' + local_path);
                    downloadfile.end();
                });
            });
            req.on('error', function (e) {
                console.log("Got error: " + e.message);
            });
            req.setTimeout(1000 * 60 * 10, function (e) {
                console.log("Got error: " + e.message);
            });
            req.end();
        });
    });
}
exports.download = download;
//# sourceMappingURL=Downloader.js.map