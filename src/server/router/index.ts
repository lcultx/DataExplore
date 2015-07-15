import mogHelper = require('../../library/mogHelper');

export function loadRouters(app){
  mogHelper.init(function(){
    app.get('/yesterday_events',require('./get_yesterday_events'));
    app.get('/pay_point',require('./get_pay_point'));
  });


}
