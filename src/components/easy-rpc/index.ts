

export function call(method_str,args,callback){
  $.get('/api/rpc?method_str='+ method_str + '&args=' + JSON.stringify(args),function(data){
    callback(data);
  });
}
 
