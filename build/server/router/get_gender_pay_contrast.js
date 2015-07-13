/// <reference path="../../components/collector/interfaces.d.ts"/>
var LocalLogDataCollector = require('../../components/collector/LocalLogDataCollector');
var ExecTime = require('exec-time');
var walk = require('fs-walk');
var path = require('path');
var querystring = require('querystring');
var moment = require('moment');
var goodsInfo = "1\t60\t60\u6C34\u6676\t2480\n1\t300\t300\u6C34\u6676\t2517\n1\t980\t980\u6C34\u6676\t2519\n1\t1980\t1980\u6C34\u6676\t2521\n1\t3280\t3280\u6C34\u6676\t2523\n1\t250\t\u6708\u5361\t2525\n1\t6480\t6480\u6C34\u6676\t2528\n1\t1\t\u6D4B\u8BD5\u9053\u5177\t2533\n1\t2\t\u6D4B\u8BD5\u6708\u5361\t2535\n1\t50\t3\u5929\u5361\t2726\n1\t100\t7\u5929\u5361\t2727\n1\t10\t10\u6C34\u6676\t2728\n1\t20\t20\u6C34\u6676\t2729\n1\t110\t110\u6C34\u6676\t2730\n1\t200\t200\u6C34\u6676\t2748\n2\t60\t60\u6C34\u6676\t2479\n2\t300\t300\u6C34\u6676\t2518\n2\t980\t980\u6C34\u6676\t2520\n2\t1980\t1980\u6C34\u6676\t2522\n2\t6480\t6480\u6C34\u6676\t2524\n2\t250\t\u6708\u5361\t2526\n2\t3280\t3280\u6C34\u6676\t2527\n2\t1\t\u6D4B\u8BD5\u9053\u5177\t2534\n2\t2\t\u6D4B\u8BD5\u6708\u5361\t2536\n2\t50\t3\u5929\u5361\t2731\n2\t100\t7\u5929\u5361\t2732\n2\t10\t10\u6C34\u6676\t2733\n2\t20\t20\u6C34\u6676\t2734\n2\t110\t110\u6C34\u6676\t2735\n2\t200\t200\u6C34\u6676\t2749";
var goods = [
    { itemid: 2480, desc: '60水晶', price: 60, zoneid: 1 }
];
function parseGoodInfo() {
    var goods = [];
    var goodInfos = goodsInfo.split('\n');
    for (var i = 0; i < goodInfos.length; i++) {
        var goodInfo = goodInfos[i];
        var parts = goodInfo.split("	");
        goods.push({
            itemid: parts[3] * 1, desc: parts[2], price: parts[1] * 1, zoneid: parts[0] * 1
        });
    }
    console.log(goods);
    return goods;
}
goods = parseGoodInfo();
function getGoodByItemid(itemid) {
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.itemid * 1 == itemid * 1) {
            return good;
        }
    }
}
function getObList(callback) {
    var obList = [];
    var logDir = '/Users/xuyang/src/DataExplore/resource/wanba_logs';
    walk.files(logDir, function (basedir, filename, stat, next) {
        if (filename == 'info.log') {
            var file = path.join(basedir, filename);
            var ldCollector = new LocalLogDataCollector();
            ldCollector.setLogURI(file);
            ldCollector.on('line', function (line) {
                obList.push(JSON.parse(line));
            });
            ldCollector.on('end', function (line) {
                if (line) {
                    obList.push(JSON.parse(line));
                }
                callback(obList);
            });
            ldCollector.run();
        }
        else {
            next();
        }
    }, function (err) {
        if (err)
            console.log(err);
    });
}
var option = {
    title: {
        text: '男女玩家付费对比',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['男性玩家', '女性玩家', '未知性别']
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value} 水晶'
            }
        }
    ],
    series: [
        {
            name: '男性玩家',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        },
        {
            name: '女性玩家',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        },
        {
            name: '未知性别',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        }
    ]
};
function getXAxisData() {
    var x = [];
    for (var i = 0; i < 24; i++) {
        x.push(i);
    }
    return x;
}
function isMaleBuy(obList, ob) {
    var isMale = false;
    var isWoman = false;
    var findOb = null;
    var url_parts = querystring.parse(ob.data.req);
    var openkey = url_parts['openkey'];
    for (var i = 0; i < obList.length; i++) {
        var this_ob = obList[i];
        if (this_ob.data.req.indexOf(openkey) > -1 && this_ob.data.req.indexOf('get_info?openid') > -1) {
            findOb = this_ob;
            var res = JSON.parse(this_ob.data.res);
            if (res.gender == '男') {
                isMale = true;
            }
            else {
                isWoman = true;
            }
            break;
        }
    }
    if (isMale) {
        return true;
    }
    else if (isWoman) {
        return false;
    }
    else {
        console.log('not man and not woman?');
        console.log(findOb);
        return true;
    }
}
function getGender(obList, ob) {
    var url_parts = querystring.parse(ob.data.req);
    var openkey = url_parts['openkey'];
    for (var i = 0; i < obList.length; i++) {
        var this_ob = obList[i];
        if (this_ob.data.req.indexOf(openkey) > -1 && this_ob.data.req.indexOf('get_info?openid') > -1) {
            var res = JSON.parse(this_ob.data.res);
            return res.gender;
            break;
        }
    }
}
function getHour(ob) {
    var d = new Date(ob.time);
    return d.getHours();
}
function getThisOptions(callback) {
    var timeList = getXAxisData();
    option.xAxis[0].data = timeList;
    option.series[0].data = [];
    option.series[1].data = [];
    option.series[2].data = [];
    var timePayRecord = {};
    getObList(function (obList) {
        for (var i = 0; i < obList.length; i++) {
            var ob = obList[i];
            if (ob.data && ob.data.req) {
                var req = ob.data.req;
                if (req.indexOf('buy_playzone_item') > -1) {
                    var gender = getGender(obList, ob);
                    var money = 0;
                    var url_parts = querystring.parse(ob.data.req);
                    var itemid = url_parts.itemid;
                    var res = JSON.parse(ob.data.res);
                    if (res.code == 0) {
                        var good = getGoodByItemid(itemid);
                        console.log('good', good);
                        if (good) {
                            money = good.price;
                        }
                        console.log('money', money);
                    }
                    else {
                        console.log('code', res.code);
                    }
                    var hour = getHour(ob);
                    if (!timePayRecord[hour]) {
                        timePayRecord[hour] = {
                            M: 0, F: 0, U: 0
                        };
                    }
                    if (gender == '男') {
                        timePayRecord[hour].M += money;
                    }
                    else if (gender == '女') {
                        timePayRecord[hour].F += money;
                    }
                    else {
                        timePayRecord[hour].U += money;
                    }
                }
            }
        }
        ;
        for (var i = 0; i < timeList.length; i++) {
            var record = timePayRecord[i];
            if (record) {
                option.series[0].data.push(record.M);
                option.series[1].data.push(record.F);
                option.series[2].data.push(record.U);
            }
            else {
                option.series[0].data.push(0);
                option.series[1].data.push(0);
                option.series[2].data.push(0);
            }
        }
        ;
        callback(option);
    });
}
var get_gender_pay_constast = function (req, res) {
    var profiler = new ExecTime('getPayPointShower');
    profiler.beginProfiling();
    getThisOptions(function (opitons) {
        profiler.step('finish');
        res.json(opitons);
    });
};
module.exports = get_gender_pay_constast;
//# sourceMappingURL=get_gender_pay_contrast.js.map