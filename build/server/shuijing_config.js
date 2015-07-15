var goodsInfo = "1\t60\t60\u6C34\u6676\t2480\n1\t300\t300\u6C34\u6676\t2517\n1\t980\t980\u6C34\u6676\t2519\n1\t1980\t1980\u6C34\u6676\t2521\n1\t3280\t3280\u6C34\u6676\t2523\n1\t250\t\u6708\u5361\t2525\n1\t6480\t6480\u6C34\u6676\t2528\n1\t1\t\u6D4B\u8BD5\u9053\u5177\t2533\n1\t2\t\u6D4B\u8BD5\u6708\u5361\t2535\n1\t50\t3\u5929\u5361\t2726\n1\t100\t7\u5929\u5361\t2727\n1\t10\t10\u6C34\u6676\t2728\n1\t20\t20\u6C34\u6676\t2729\n1\t110\t110\u6C34\u6676\t2730\n1\t200\t200\u6C34\u6676\t2748\n2\t60\t60\u6C34\u6676\t2479\n2\t300\t300\u6C34\u6676\t2518\n2\t980\t980\u6C34\u6676\t2520\n2\t1980\t1980\u6C34\u6676\t2522\n2\t6480\t6480\u6C34\u6676\t2524\n2\t250\t\u6708\u5361\t2526\n2\t3280\t3280\u6C34\u6676\t2527\n2\t1\t\u6D4B\u8BD5\u9053\u5177\t2534\n2\t2\t\u6D4B\u8BD5\u6708\u5361\t2536\n2\t50\t3\u5929\u5361\t2731\n2\t100\t7\u5929\u5361\t2732\n2\t10\t10\u6C34\u6676\t2733\n2\t20\t20\u6C34\u6676\t2734\n2\t110\t110\u6C34\u6676\t2735\n2\t200\t200\u6C34\u6676\t2749";
var goods = [
    { itemid: 2480, desc: '60水晶', price: 60, zoneid: 1 }
];
function getGoodList() {
    var goods = [];
    var goodInfos = goodsInfo.split('\n');
    for (var i = 0; i < goodInfos.length; i++) {
        var goodInfo = goodInfos[i];
        var parts = goodInfo.split("	");
        goods.push({
            itemid: parts[3] * 1, desc: parts[2], price: parts[1] * 1, zoneid: parts[0] * 1
        });
    }
    return goods;
}
exports.getGoodList = getGoodList;
//# sourceMappingURL=shuijing_config.js.map