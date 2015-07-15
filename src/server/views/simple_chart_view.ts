/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
import baseChartView = require('./baseChartView');

class simple_chart_view extends baseChartView implements IChartView{

  constructor(cfg){
    super(cfg);
  }

  private option = {
      title : {
          text: '男女玩家付费对比',
          subtext: ''
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['男性玩家','女性玩家']
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLabel : {
                  formatter: '{value} 水晶'
              }
          }
      ],
      series : [
          {
              name:'男性玩家',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
              markPoint : {
                  data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                  ]
              },
              markLine : {
                  data : [
                      {type : 'average', name: '平均值'}
                  ]
              }
          },
          {
              name:'女性玩家',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                  data : [
                      {type : 'average', name : '平均值'}
                  ]
              }
          }
      ]
  };

  public loadData(callback:(data)=>void){
    callback({});//not need load Data
  }

  public getChartOptions(data):any{
      return this.option;
  }

}

export = simple_chart_view;
