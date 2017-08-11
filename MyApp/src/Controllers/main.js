var paths = require("path");
var fs = require('fs');


function controller(req, res, viewpath) {
    this.do = function() {
        fs.readFile(viewpath, function read(err, data) {
            data = req.app.localizator.localize(req, data);
            data = render(data, req);
            console.log(req.app.count);
 			res.charset = 'utf-8';
    		res.contentType('html');
            res.send(data);
        });
    }

    function render(data, req) {

        data = data.toString().split(/{{name}}/).join(req.query.name);
        return data;
    }
}




exports.controller = function(req, res, viewpath) {
    return new controller(req, res, viewpath);
}