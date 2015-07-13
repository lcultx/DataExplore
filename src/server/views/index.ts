
import fs = require('fs');
import path = require('path');
var files = fs.readdirSync(__dirname);
import express = require('express');

export function loadViews(app){
  for(var i in files){
    var file = files[i];
    if(file.split('_').length>1){
        var uri = file.substring(0,file.indexOf('.js'));
        var _class = path.join(__dirname,file).split('.js')[0];
        var obj_class = <any>require(_class)
        var obj = new obj_class();
        app.get('/views/' + uri,(req,res)=>{
          obj.render(req,res);
        });
    }
  }

  var build_path = path.join(__dirname,'../../..');
  console.log('build_path',build_path);
  app.use('/views',express.static(build_path));
}
