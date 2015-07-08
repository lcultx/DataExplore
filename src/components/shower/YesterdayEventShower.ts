/// <reference path="./interfaces.d.ts"/>

import BasicChartShower = require('./BasicChartShower');
import {Component, Directive, View, Parent} from 'angular2/angular2';
import angular2 = require('angular2/angular2');
import ng2Helper = require('../../library/ng2Helper');





@Component({
  selector: 'yesterday-event-shower'
})

@View({
  templateUrl: ng2Helper.getTemplateUrlByComponentPath('shower/log-shower'),
})


class YesterdayEventShower extends BasicChartShower implements IChartShower{





  constructor(viewContrainer:angular2.ViewContainerRef){

    super(viewContrainer);

    this.option = {
    title : {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
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
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 110],
            center : ['25%', 200],
            roseType : 'radius',
            width: '40%',       // for funnel
            max: 40,            // for funnel
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                }
            },
            data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
        },

        {
            name:'半径模式',
            type:'pie',
            radius : [20, 210],
            center : ['50%', 200],
            roseType : 'radius',
            width: '40%',       // for funnel
            max: 40,            // for funnel
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                }
            },
            data:[
                {value:110, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
        },

        // {
        //     name:'半径模式',
        //     type:'pie',
        //     radius : [20, 110],
        //     center : ['75%', 200],
        //     roseType : 'radius',
        //     width: '40%',       // for funnel
        //     max: 40,            // for funnel
        //     itemStyle : {
        //         normal : {
        //             label : {
        //                 show : false
        //             },
        //             labelLine : {
        //                 show : false
        //             }
        //         },
        //         emphasis : {
        //             label : {
        //                 show : true
        //             },
        //             labelLine : {
        //                 show : true
        //             }
        //         }
        //     },
        //     data:[
        //         {value:10, name:'rose1'},
        //         {value:5, name:'rose2'},
        //         {value:15, name:'rose3'},
        //         {value:25, name:'rose4'},
        //         {value:20, name:'rose5'},
        //         {value:35, name:'rose6'},
        //         {value:30, name:'rose7'},
        //         {value:40, name:'rose8'}
        //     ]
        // },
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['75%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
        }
    ]
};

    this.drawChart();

  }




}



export = YesterdayEventShower;
