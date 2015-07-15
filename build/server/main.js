/// <reference path="../../typings/express/express.d.ts"/>
/// <reference path="../../typings/node/node.d.ts"/>
var express = require('express');
var path = require('path');
var config = require('./config');
var app = express();
var web_path = path.join(__dirname, '../../');
console.log(web_path);
app.use(express.static(web_path));
var router = require('./router');
router.loadRouters(app);
var views = require('./views');
views.loadViews(app);
var server = require('http').Server(app);
server.listen(config.port, function () {
    console.log('data-explore server is listening on port ' + config.port);
});
var tasks = require('./tasks');
tasks.run();
//# sourceMappingURL=main.js.map