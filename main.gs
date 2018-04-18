var d = {};
d.warn = 0;
function verify_(){    //identify if the "user" is a teacher or not
  var groups = GroupsApp.getGroupByEmail("");
  var whitelist = " xxx1@xxx.xxx, xxx2@xxx.xxx"
  var index = whitelist.indexOf(Session.getActiveUser());
  if (index != -1 && whitelist.slice(index - 1,index) == " "){ //any idea how to make verify process easier?
    return true;
  }else{
    return false;
  }}
function doGet() {
  if (verify_()){
    console.info(Session.getActiveUser());  //log your user so you know who used this
    return HtmlService.createHtmlOutputFromFile("Bypasser");
  }else{
    console.info(Session.getActiveUser() + " unauthorized"); //log your teacher
    return HtmlService.createHtmlOutputFromFile("fun");
  }}
  
function fun1(url){
  if (verify_()){
    return REALFUN_(url); 
  }else{
    d.warn = 1;
    return fun(url);   //block "smart" teachers who know how to inspect
  }}
function REALFUN_(url) {   
  var fetch = UrlFetchApp.fetch(url);
  var headers = fetch.getHeaders();
  if (headers['Content-Type'].indexOf("text/html") == -1){
    return [fetch.getContent(), headers['Content-Type'], 1];  //good for download files
  }
  var charset = /charset=.*/i.exec(headers['Content-Type']);
  if (charset == null){
    var outputchar = "utf-8"
    }else{
      var outputchar = charset.toString().slice(8,999); //charset settings
    }
  var content = UrlFetchApp.fetch(url).getContentText(outputchar);  
  var content = content.replace(/<meta charset\=["'].+?["']\/?>/i, "");
  var content = content.replace(/<meta.*?charset=.+?['"]/i, function u(x){if(x.indexOf('"')==-1){var a ="'"}else{var a ='"'}return x.slice(0, x.indexOf('charset=')+8) + 'utf-8' + a});
  if (url.indexOf("https://") != -1||url.indexOf("http://") != -1) { //dumb url editing...
    var url1 = url;
  }else{
    var url1 = "http://"+url;
  }
  if (url1.slice(-1) == "/"){
    var url2 = url1;
  }else{
    var url2 = url1+'/';
  }
  var base = '\n<base href="'+url2+'"/>\n'
  if (content.indexOf("<base") != -1) {
    var output4 = content.replace(/<base/, '<base href="'+url2+'"');
    var base = /<base.*?\/>/.exec(output4);
    var content = output4.replace(/<base.*?\/>/,"");} 
  if(content.indexOf("<head>") != -1){
    var output4 = content.replace(/<head>/, '<head>'+base);
  }else{
    var output4 = content.replace(/<html ?>/, '<html>\n<head>'+base+'</head>\n');  //change base url so everything will work
  }
  console.log("success 0")
  return [output4, "text/html", 0];
}
function fun2(url){
  if (verify_()){
    return REALPOWERFUN_(url);
  }else{
    d.warn = 2;
    return fun(url);
  }}
function REALPOWERFUN_(url) {   //good for 
  var http = "https://"
  var fetch = UrlFetchApp.fetch(url);
  var headers = fetch.getHeaders();  
  if (headers['Content-Type'].indexOf("text/html") == -1){
    return [fetch.getContent(), headers['Content-Type'], 1];
  }  
  var charset = /charset=.*/i.exec(headers['Content-Type']);
  if (charset == null){
  var content = UrlFetchApp.fetch(url).getContentText();  
    }else{
      var outputchar = charset.toString().slice(8,999);
      var content = UrlFetchApp.fetch(url).getContentText(outputchar);  
    }
  var content = content.replace(/<meta charset\=["'].+?["']\/?>/i, "");
  var content = content.replace(/<meta.*?charset=.+?['"]/i, function u(x){if(x.indexOf('"')==-1){var a ="'"}else{var a ='"'}return x.slice(0, x.indexOf('charset=')+8) + 'utf-8' + a});  var http = "https://"
  if (url.indexOf("https://") != -1||url.indexOf("http://") != -1) {
    var url1 = url;
  }else{
    var url1 = http + url;
  }
  if (url1.slice(-1) == "/"){
    var url2 = url1;
  }else{
    var url2 = url1+'/';
  }
  var url5 = url2.slice(0,-1);
  var url3 = /https?:\/\/[^\/]+\//gi.exec(url2);
  var url4 = /https?:\/\/(?:[^\n]+?\/)+/gi.exec(url5);
  var url6 = /https?:\/\/(?:[^\n]+?\/)+(?=(?:[^\n]+?\/))/gi.exec(url5);
  if (url4 == null){
    var url4 = url3;
  }
  if (url6 == null){
    var url6 = url3;
  }
  var b = {};
  b.u = url3;
  b.i = url6;
  b.q = http;
  b.p = url4;
  var output4 = content.replace(/>[\S\s]+?(?=<\/script>)/gi, function d(x){return x.replace(/(?:window||document)\.location(?![A-Za-z0-9]|| *?=)/gi,function a(x){return x + "1";})});
  var output4 = output4.replace(/<script[^>]*?src=.*?><\/script>/gi , function v(x){
    var xx = x.replace(/'/g, '"');
    var surl0 = xx.slice(xx.indexOf("src=")+5,999);
    var surl = surl0.slice(0,surl0.indexOf('"'));
    if (surl.slice(0,7) == "http://"||surl.slice(0,8) == "https://"){
      var outurl = surl;
    }else if(surl.slice(0,2) == "//"){
      var outurl = b.q + surl.slice(2,999);
    }else if(surl.slice(0,1) == "/"){
      var outurl = b.u + surl.slice(1,999);
    }else if(surl.slice(0,3) == "../"){
      var outurl = b.i + surl.slice(3,999);
    }else if(surl.slice(0,2) == "./"){
      var outurl = b.p + surl.slice(2,999);
    }else{
      var outurl = b.p +surl;}
    Logger.log(outurl);
    var ss = UrlFetchApp.fetch(outurl).getContentText().replace(/(?:window||document)\.location(?![A-Za-z0-9]|| *?=)/gi,function e(x){return x + "1";});
    var head = x.replace(/ src=["'].+?["']/gi, "");
    var head = head.slice(0,-9);
    if (x.indexOf("async")!=-1||x.indexOf("defer") != -1||ss.indexOf("</script>")!=-1){
      var base64 = Utilities.base64Encode(ss);
      return x.replace(/ src=["'].+?["']/gi, ' src="data:text/javascript;base64,' + base64 + '"')
    }else{
      return head + ss +"</script>\n";     //this version I made script work (which takes a longer time for sure)
    }
    
  });
  var script = '\n<script>window.location1=new URL("' + url2.slice(0,-1) + '");document.location1=new URL("' + url2.slice(0,-1) + '");Object.freeze(window.location1);Object.freeze(document.location1);</script>\n'
  var base = '\n<base href="'+url2+'"/>' + script;
  if (output4.indexOf("<base") != -1) {
    var output4 = output4.replace(/<base/, '<base href="'+url2+'"');
    var base = /<base.*?\/>/.exec(output4) + script;
    var output4 = output4.replace(/<base.*?\/>/,"");} 
  if(output4.indexOf("<head>") != -1){
    var output4 = output4.replace(/<head>/, '<head>'+base);
  }else{
    var output4 = output4.replace(/<html ?>/, '<html>\n<head>'+base+'</head>\n');
  }
  console.log("success 1")
  return [output4, "text/html", 0];
}
function fun(a) {   //play with your teachers
  var content = UrlFetchApp.fetch(a).getContentText();
  if (d.warn == 1){
    console.warn(a + " inspected1");
    d.warn = 0;
  }else if(d.warn == 2){
    console.warn(a + " inspected2");
    d.warn = 0;
  }else{
  console.log(a + " fooled");
  }
  var sizeup = a + ' HAHAHAHHAHHAAHAHHHAHAHAHHA ❤❤❤❤❤❤❤❤ Made with love in California ❤❤❤❤❤❤❤❤' //Made with ❤ in California © 2018 Liminex, Inc. doing business as GoGuardian. All rights reserved. Google, the Google logo, Chrome, Chrome OS, Chromebook, and the Chrome logo are registered trademarks of Google, Inc. All rights reserved.   
  for (i = 0; i < 11; i++) { 
    var sizeup = Utilities.base64Encode(sizeup);
  }
  Logger.log(sizeup);
  var err404 = '<HTML><HEAD><TITLE>Not Found</TITLE></HEAD><BODY BGCOLOR="#FFFFFF" TEXT="#000000"><H1>Not Found</H1><H2>Error 404</H2><script>window.setTimeout(function(){window.location.replace("http://blocked.com-default.ws/?type=chromium-m&url=' + a + '")}, 2000);</script><br><br><br><br>' + sizeup + '</BODY></HTML>'
  return err404
}
