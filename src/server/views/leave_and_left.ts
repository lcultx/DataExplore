/// <reference path="./interface.d.ts"/>
/// <reference path="../../../typings/async/async.d.ts"/>
/// <reference path="../../../typings/express/express.d.ts"/>
import baseChartView = require('./baseChartView');

import mogHelper = require('../../library/mogHelper');
import shuijing = require('../shuijing_config');
import querystring = require('querystring');
import moment = require('moment');
import async = require('async');
import express = require('express');


var wanba_collection;
var qzone_collection;


class leave_and_left extends baseChartView implements IChartView{



  private userHasActiveInThisDay(user,mm,callback){

    var query = {
      player_name:user.player_name,
      server_name:user.server_name,
      theday_str:mm.format("YYYY/MM/DD"),
      player_action:{$ne:"创建角色"}
    };

    qzone_collection.findOne(query,(err,result)=>{
      //this.query_profile(query);
      if(result && result.server_name){
        callback(true)
      }else{
        callback(false);
      }
    })
  }

  private getLeft(users,mm,callback){
   var left = 0;
   async.each(users,(user,cb)=>{
     this.userHasActiveInThisDay(user,mm,function(exist){
       if(exist){
         left = left + 1;
       }
       cb();
     });
   },function(){
     callback(left);
   });
  }


  constructor(cfg){
    super(cfg);
    wanba_collection = mogHelper.getWanbaLogEventCollection();
    qzone_collection = mogHelper.getQZoneLogEventCollection();

  }

  getThedayStr(mm){
    return mm.format("YYYY/MM/DD")
  }

  getDailyUserQueryer(mm){
    var query:any = {
     player_action: "创建角色",
     theday_str:this.getThedayStr(mm)
    };

    if(this.query.server_name){
      query.server_name = this.query.server_name
    }
    return query;
  }



  distinctResults(results){



    this.step('distinct start');
    var newResults = [];

    function isExistInResults(result){
      for(var i in newResults){
        var new_record = newResults[i];
        if(new_record.player_name == result.player_name){
          return true;
        }
      }
    }

    for(var i in results){
      var result = results[i];
      if(!isExistInResults(result)){
        newResults.push(result);
      }
    }

    this.step('distinct finish');

    return newResults;
  }

  getTheDayLeaveAndLeft(callback,record){

    var mm = record.theday;
    var end_day = record.end_day;
    var query = this.getDailyUserQueryer(mm);
    qzone_collection.find(query).toArray((err,results)=>{
      this.query_profile(query);

      results = this.distinctResults(results);

      var left_days = [];
      var lefts = [results.length];
      for(var theday=mm.clone().add(1,'d');theday.unix()<=end_day.unix();theday = theday.clone().add(1,'d')){
        left_days.push(theday);
      }


      async.each(left_days,(mm,cb)=>{
        console.log('active day',mm.toDate());
        this.getLeft(results,mm,(number)=>{
            lefts.push(number);
            cb();
        });
      },()=>{
        this.step('get day ' + this.getThedayStr(mm) + ' left_and_leave finish');
        console.log(lefts);
        callback(lefts);
      })


    });
  }


  public loadData(callback:(data)=>void,req?:express.Request){

    var start_day = moment().subtract(7,'d');
    var end_day = moment().subtract(1,'d');

    if(req && req.query.start_day){
      start_day = moment(req.query.start_day,'YYYY/MM/DD');
    }

    if(req && req.query.end_day){
      end_day = moment(req.query.end_day,'YYYY/MM/DD');
    }

    console.log(start_day.toDate());
    console.log(end_day.toDate());

    var lefts = [];
    for(var theday=start_day;theday.unix()<=end_day.unix();theday = theday.clone().add(1,'d')){
      lefts.push({
        theday:theday,
        end_day:end_day
      });
    }

    async.each(lefts,(record,cb)=>{
      this.getTheDayLeaveAndLeft((result)=>{
        record.result = result;
        cb();
      },record);
    },()=>{
      callback(lefts);
    });

  }

  public getChartOptions(data):any{
      return data;
  }

  private query;




  public csv(req,res){
    this.query = req.query;
    var rate = req.query.rate;
    this.loadData((data)=>{
      var csv_str = '';
      var first_day_record = data[0];
      var first_day_result = first_day_record.result;
      var title = '';
      for(var i=0;i<data.length;i++){
        var record = data[i];
        title += this.getThedayStr(record.theday) + ','
      }
      csv_str += title + '\n';
      for(var i=0;i<first_day_result.length;i++){
        var line = '';
        for(var j=0;j<data.length;j++){
          var val:any = '';

          if(i<data[j].result.length){
            val = data[j].result[i];
            if(rate && i!=0){
              val = Math.round(val/data[j].result[0]*10000)/100 + '%';
            }

          }
          line += val + ',';
        }
        csv_str += line + '\n';
      }
      res.write(csv_str);
      res.end();
    },req);
  }

}

export = leave_and_left;
