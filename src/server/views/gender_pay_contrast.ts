/// <reference path="./interface.d.ts"/>
import baseChartView = require('./baseChartView');
class gender_pay_contrast extends baseChartView{
  constructor(){
    super();
    this.apiURL = '/adffds';
    this.setApiURL('/gender_pay_contrast');
  }
}

export = gender_pay_contrast;
