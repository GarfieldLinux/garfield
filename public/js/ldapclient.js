/*Connect to AD_PROxy_SERVER*/
var settings=require('../settings');
var net=require('net');
var port=settings.proxy_port
var host=settings.proxy_host
function Client(){}

Client.prototype.conn=function(sendmsg,recvmsg,callback)
{
  if(!sendmsg)
  {
    var err="send msg don't allow null";
    return callback(err,-1);
  }
   var client= new net.Socket();
   client.setEncoding('binary');
   //......
   client.connect(port,host,function(){
      client.write(sendmsg,'binary',function(){
      });
       var cnt =0;
       client.on('data',function(data){
           
           if(cnt==0)
           {
           recvmsg=data;
           console.log("msg:"+recvmsg);
           cnt+=1; console.log("count:"+cnt);
           //client.pause();
           return  callback("",recvmsg);
           }
         } );

      client.end();
    });//connect
   client.on('error',function(error){ 
   console.log('Have Exception:'+error);
    });
   client.on('close',function(){console.log('Connection closed');
   });
};

module.exports=new Client;
