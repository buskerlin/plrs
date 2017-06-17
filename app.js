var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var mime = require("./mime").types;
var config = require("./config").config;

var users = ["32234","rfewrew","7hy6ty"];

var port = (process.env.VCAP_APP_PORT || 3000); 
var host = (process.env.VCAP_APP_HOST || 'localhost');

//创建服务器
var sever = http.createServer(function(req,res){
	
	var pathName = url.parse(req.url).pathname;
	pathName = (pathName == "/") ? "/index.html" : pathName;
	console.log(pathName);
	var realPath = "index" + pathName;
	var ext = path.extname(realPath).slice(1);
	var type;
	//ext = ext ? ext : "unkown";
	type = mime[ext] || 'text/plain';
	//console.log(mime.ext);
	
	fs.exists(realPath,function(exists){
		if(!exists){
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.write('The req URL' + pathName + ' was not found on this server!');
			res.end();
		}
		else{
			
			fs.stat(realPath,function(err,stat){
				var lastModified = stat.mtime.toUTCString();

                var ifModifiedSince = "If-Modified-Since".toLowerCase();

                res.setHeader("Last-Modified", lastModified);
                
                if (ext.match(config.fileMatch)) {

				    var expires = new Date();
				
				    expires.setTime(expires.getTime() + config.maxAge * 1000);
				
				    res.setHeader("Expires", expires.toUTCString());
				
				    res.setHeader("Cache-Control", "max-age=" + config.maxAge);
				
				}
                
                 if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {

                    res.writeHead(304, "Not Modified");

                    res.end();

                } else {
                	
                	fs.readFile(realPath,'binary',function(err,file){
						if(err){
							res.writeHead(500,{'Content-Type':'text/plain'});
							res.end();
						}
						else{
							res.writeHead(200,{'Content-Type':type});
							res.write(file,'binary');
							res.end();
						}
					});
                }
			});
		}
	});
});
sever.listen(port,host);

console.log("success");