var paths = require("path");
var fs = require('fs');

function renderer() {
    this.render = function(req, res, path, params) {
        console.log(params);
        fs.readFile(path, function(err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
            res.send();
        });
    }

}




exports.renderer = new renderer();