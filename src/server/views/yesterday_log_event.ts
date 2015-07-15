/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');

class yesterday_log_event extends baseChartView implements IChartView{

  constructor(cfg){
    super(cfg);
  }


  private option = {
    title : {
        text: '2015/07/06 全服玩家单日行为汇总',
        subtext: '',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'left',
        y : 'bottom',
        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : []
  };

  public loadData(callback:(data)=>void){


    callback({});//not need load Data
  }

  private getKeyNameArray(data){
    var keyArray = [];
    for(var i=0;i<data.length;i++){
      for(var key in data[i]){
        if(keyArray.indexOf(key) == -1){
          keyArray.push(key);
        }
      }
    }
    return keyArray;
  }

  private totalNumber(ob){
    var total = 0;
    for(var i in ob){
      total += ob[i];
    }
    return total;
  }

  public getChartOptions(data):any{
    // var chartCanvasHeight = 200;
    // var numberArray:Array<number> = [];
    // var keyArray = this.getKeyNameArray(data);
    // console.log(keyArray);
    // this.option.legend.data = keyArray;
    // var totalTotal = 0;
    // for(var i=0;i<data.length;i++){
    //   var this_total = this.totalNumber(data[i]);
    //   totalTotal += this_total;
    //   numberArray.push(this_total);
    // }
    // console.log(numberArray);
    // console.log(totalTotal);
    //
    //
    // var totalWidth = window.innerWidth;
    // var marginLeft = 0;
    // var marginTop = 100;
    //
    // var lineCharNumber = 12;
    //
    // var cubeLength = Math.round(totalWidth/lineCharNumber);
    // var maxValue = Math.max.apply(null,numberArray);
    // var maxRadius = Math.round(((maxValue/totalTotal)/2) * totalWidth);
    //
    // console.log(Math.max.apply(null,numberArray));
    //
    //
    // var count = 0;
    //
    // for(var i=0;i<data.length;i++){
    //   count ++;
    //
    //   var radius = Math.round((numberArray[i]/totalTotal)*totalWidth);
    //   var point_x = marginLeft + cubeLength/2;
    //   var point_y = marginTop + cubeLength/2;
    //
    //
    //   console.log('point_y',point_y);
    //   marginLeft += cubeLength;
    //
    //   if(count == lineCharNumber){
    //     marginLeft = 0;
    //     marginTop = marginTop + cubeLength + 100;
    //     count = 0;
    //     chartCanvasHeight += cubeLength + 100;
    //
    //     this.option.legend.y = <any>marginTop;
    //   }
    //
    //
    //   var pie = {
    //       name:(i+1) + '点',
    //       type:'pie',
    //       radius : [5, radius],
    //       center : [point_x, point_y],
    //       roseType : 'radius',
    //       width: '5%',       // for funnel
    //       max: 40,            // for funnel
    //       itemStyle : {
    //           normal : {
    //               label : {
    //                   show : false
    //               },
    //               labelLine : {
    //                   show : false
    //               }
    //           },
    //           emphasis : {
    //               label : {
    //                   show : true
    //               },
    //               labelLine : {
    //                   show : true
    //               }
    //           }
    //       },
    //       data:[]
    //   }
    //   var this_data = data[i];
    //   for(var key in this_data){
    //     pie.data.push({
    //       name:key,
    //       value:this_data[key]
    //     });
    //   }
    //
    //   this.option.series.push(pie);
    // }
    //
    // return this.option;
  }

}

export = yesterday_log_event;
