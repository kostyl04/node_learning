const express = require('express');
const app = express();
const routeParserModule = require('./src/RoutesUtils/routesParser');
var cookieParser = require('cookie-parser')
var count=0;



app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
function init() {
	app.localizator=require("./src/RoutesUtils/Localizator").localizator();
	app.count=0;
    app.all('/*', function(req, res, next) {
        // res.set({'Access-Control-Allow-Credentials':true});
        // console.log("cookieloc="+req.cookies);

        if (req.cookies.locale == undefined) {
            res.cookie('locale', "ru", {
                maxAge: 900000,
                httpOnly: true
            });
            req.locale="ru";

        }
        if (req.query.locale != undefined) {
            res.cookie('locale', req.query.locale, {
                maxAge: 900000,
                httpOnly: true
            });
            req.locale=req.query.locale;
        }
        req.app.count++;
        next(); // call next() here to move on to next middleware/router
    });

    console.log("ADSD"+count++);
    parser = routeParserModule.routeParser("./routes/routes.json", app);
    parser.doRoutes();
};
init();
app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})