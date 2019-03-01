var exec = require('cordova/exec');

var registration = undefined;

exports.registerForPush = function(callback, errorCallback, options) {

    const ops = {
        android: {
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        }
    };

    registration = PushNotification.init(ops);

    registration.on('registration', function(token) {
        callback(token);
    });
};
               
exports.unregisterForPush = function(callback, errorCallback, options) {
    this.core.unregisterForPush(callback, errorCallback, options);
};

exports.on = function (event, callback, scope) {
    if(event === 'pushReceived') {
        registration.on('notification', function(data) {
            callback(data);
        });
    }
};

exports.un = function (event, callback) {
    this.core.un(event, callback, scope);
};