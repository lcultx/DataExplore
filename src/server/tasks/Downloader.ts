/// <reference path="./interface.d.ts"/>
import fs = require('fs');
import http = require('http');
import path = require('path');
import url = require('url');
var mkdirp = require('mkdirp');

function wget(remote_url:string,local_path:string,callback:(is_success?:boolean)=>void){
  //
}



export function download(remote_url:string,local_path:string,callback:(is_success?:boolean)=>void){
  console.log(arguments);
  // if(process.platform == "darwin" || process.platform == 'linux'){
  //   wget(remote_url,local_path,callback);
  // }else{

    var shower_str = local_path.substring(local_path.length -5,local_path.length -4)

    var url_parts = url.parse(remote_url);

    var options = {
      host: url_parts.hostname,
      path: url_parts.path,
      port: url_parts.port,
      //This is the only line that is new. `headers` is an object with the headers to request
      //  headers: {'custom': 'Custom Header Demo works'}
    };

    mkdirp(path.dirname(local_path),()=>{
        var downloadfile = fs.createWriteStream(local_path, {'flags': 'w','encoding':'utf-8'});
      downloadfile.on('open',()=>{
        var req = http.request(options, (res)=> {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          process.stdout.write("downloading: ");
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
              if(Math.random() < 0.1){
                process.stdout.write(shower_str || '.');
              }

              downloadfile.write(chunk);
          });
          res.on("end", function() {
              console.log('success dowaload ' + local_path);
              downloadfile.end();
          });

        });

        req.on('error', function(e) {
          console.log("Got error: " + e.message);
        });

        req.setTimeout(1000*60*10, function(e) {//最多等待10分钟
          console.log("Got error: " + e.message);
        });

        req.end();

      })
    });
  //}




}
