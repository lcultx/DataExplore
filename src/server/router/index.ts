import mogHelper = require('../../library/mogHelper');
import LeaveAndLeft = require('../views/leave_and_left');
export function loadRouters(app){
  mogHelper.init(function(){
    app.get('/yesterday_events',require('./get_yesterday_events'));
    app.get('/leave_and_left',function(req,res){
      var leaveAndLeft = new LeaveAndLeft({});
      leaveAndLeft.csv(req,res);
    });
  });


}
