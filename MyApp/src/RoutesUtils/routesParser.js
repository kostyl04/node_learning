var paths = require("path");
var fs = require('fs');

function routeParser(path, app) {
    this.app = app,
        this.routes = getConfig(path),
        this.doRoutes = function() {
            console.log(this.routes);
            for (let route of this.routes) {
                app[route.method](route.url, function(req, res) {
                	let p=paths.resolve("views/"+route.mapping);
                	let controller=require(paths.resolve("src/controllers/"+route.controller)).controller(req, res, p);
                	controller.do();
                   
                });
            }
        }
}

function getConfig(path) {
    console.log(path);
    
    let routes = JSON.parse(fs.readFileSync(path, 'utf8')).routes;
    console.log(routes);
    return routes;
}



exports.routeParser = function(path, app) {
    return new routeParser(path, app);
};