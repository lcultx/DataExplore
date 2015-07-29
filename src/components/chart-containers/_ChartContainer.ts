import EventEmitter = require('eventemitter3');
class ChartContainer extends EventEmitter{

  charts:Array<IChart> = new Array();

  datepicker:any;

  addChart(chart:IChart){
    this.charts.push(chart);
  }

  setDatePicker(datepicker:any){
    this.datepicker = datepicker;
    this.datepicker.on('change',(data)=>{
      console.log(data);
      for(var i in this.charts){
        var chart = this.charts[i];
        console.log(chart);
        chart.update(data.start,data.end);
      }
    });
  };

  getDatePicker(){
    return this.datepicker;
  };
}

export = ChartContainer;
