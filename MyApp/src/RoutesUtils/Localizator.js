var paths = require("path");
var fs = require('fs');

function Localizator() {
    this.messages = getMessages(),
        this.localize = function(req, data) {
            data = data.toString();

            let locale = req.cookies.locale;
            if(req.locale!=undefined){
                locale=req.locale;
            }
            //locale = locale == undefined ? 'ru' : 'en';
            let regexp = /{{msg:\S*}}/g;
            let msgs = [];
         
            let match = regexp.exec(data);
            while (match) {
                msgs.push(match[0]);
                match = regexp.exec(data);
            }
          
            for (let msg of msgs) {
                let realMsg = msg.toString().slice(6, -2);
                let val = this.messages.get(realMsg, locale);
                data = data.split(msg).join(val);
            }
            return data;
        }
}

function getMessages() {
    let p = paths.resolve("routes/messages.json");
    let messages = JSON.parse(fs.readFileSync(p, 'utf8')).messages;
    messages.get = function(key, locale) {
        for (let msg of this) {
           
            if (msg.key == key) {
                
                return msg.value[locale];
            }
        }
    };
    return messages;
}



exports.localizator = function() {
    return new Localizator();
};