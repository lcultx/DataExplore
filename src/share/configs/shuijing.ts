
var  goodsInfo =
`
1	60	60水晶	2480
1	300	300水晶	2517
1	980	980水晶	2519
1	1980	1980水晶	2521
1	3280	3280水晶	2523
1	250	月卡	2525
1	6480	6480水晶	2528
1	1	测试道具	2533
1	2	测试月卡	2535
1	50	3天卡	2726
1	100	7天卡	2727
1	10	10水晶	2728
1	20	20水晶	2729
1	110	110水晶	2730
1	200	200水晶	2748
2	60	60水晶	2479
2	300	300水晶	2518
2	980	980水晶	2520
2	1980	1980水晶	2522
2	6480	6480水晶	2524
2	250	月卡	2526
2	3280	3280水晶	2527
2	1	测试道具	2534
2	2	测试月卡	2536
2	50	3天卡	2731
2	100	7天卡	2732
2	10	10水晶	2733
2	20	20水晶	2734
2	110	110水晶	2735
2	200	200水晶	2749
`

var goods = [
  {itemid:2480,  desc:'60水晶',    price:60,   zoneid:1}
];

export function getGoodList():Array<{itemid:number,desc:string,price:number,zoneid:number}>{
  var goods = [];
  var goodInfos = goodsInfo.split('\n');
  for(var i=0;i<goodInfos.length;i++){
      var goodInfo = goodInfos[i];
      var parts = goodInfo.split("	");
      goods.push({
          itemid:<any>parts[3]*1,desc:<any>parts[2],price:<any>parts[1]*1,zoneid:<any>parts[0]*1
      });
  }

  return goods;
}

export function getGoodByItemId(itemid){
  var goods = getGoodList();
  for(var i=0;i<goods.length;i++){
    var good = goods[i];
    if(good.itemid*1 == itemid*1){
      return good;
    }
  }
}
