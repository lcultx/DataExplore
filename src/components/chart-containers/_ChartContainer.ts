import EventEmitter = require('eventemitter3');
class ChartContainer extends EventEmitter{

  charts:Array<IChart>;

  datepicker:any;

  addChart(chart:IChart){
    this.charts.push(chart);
  }

  setDatePicker(datepicker:any){
    this.datepicker = datepicker;
    this.datepicker.on('change',(data)=>{
      this.emit('date-change',data);
    })
  };
  getDatePicker(){
    return this.datepicker;
  };
}

export = ChartContainer;
