var exec = require('cordova/exec');

var registration = undefined;
var events = {}

exports.registerForPush = function(callback, errorCallback, options) {

    const ops = {
        android: {
            icon: "notification_icon"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        }
    };

    registration = PushNotification.init(ops);

    registration.on('registration', function(token) {
        callback(token.registrationId);
    });

    registration.on('notification', function(data) {
        const list = events['pushReceived'];
        if(list && list.length > 0) {
            for(var i = 0; i < list.length; i++) {
                list[i].callback(data);
            }
        }
    });
};
               
exports.unregisterForPush = function(callback, errorCallback, options) {
    registration.unregister(function() {
        callback();
    }, function() {  
        errorCallback();
    });
};

exports.on = function (event, callback, scope) {
    if(!events[event]) events[event] = [];
    events[event].push({"callback": callback});
};

exports.un = function (event, callback) {
    this.core.un(event, callback, scope);
};
