////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Do the following for deployment to Azure
//  Add AppSetting of Project=build to run application from the build folder
//  Go to scm (Kudu) version of deployed website and copy web.config from wwwroot then add to arc folder and modify as needed
//      No need to do this if you do not need to modify web.config
//      You can use the web.config to force HTTPS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Requires
var compression = require('compression'),
    express = require('express'),
    os = require('os'),
    path = require('path'),
    fs = require('fs');
//Global variables
var app = express();
var staticRoot = __dirname + '/';
//Use port provided by hosting provider if available
app.set('port', (process.env.PORT || 3000));
// GZIP/Deflate Middleware
app.use(compression());
//Static file middleware
app.use(express.static(staticRoot));
//Standard response middleware
app.use(function(req, res, next) {
    //If the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html') {
        return next();
    }
    //If the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if(ext !== '') {
        return next();
	}
	// //Return the settings file
	// if(req.path.endsWith('api/settings')) {
	// 	res.writeHead(200, {'Content-Type': 'application/json'});
	// 	fs.createReadStream(staticRoot + 'settings.json').pipe(res);
	// 	return next();
	// }
	//Send the root page back to the client (SPA)
	fs.createReadStream(staticRoot + 'index.html').pipe(res);
});
//Start the application
app.listen(app.get('port'), function() {
    console.log('App running on host', os.hostname(), 'and port', app.get('port'));
});
