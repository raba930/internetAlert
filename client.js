var ping = require('ping');
var SerialPort = require('serialport');
var arduinoLocation = '/dev/ttyUSB0';
var router = '192.168.1.254';
var web = 'google.com';
var interval = 3000; // 3 sec
var port = new SerialPort(arduinoLocation, {
    baudRate: 57600,
    autoOpen: false
});
var animations = {
    'no-router': 'PINGPONG: 200',
    'no-web': 'PINGPONG: 100'
}
var showAnimation = (msg) => {
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        port.write(msg);
    });
}

/*eslint no-console: false*/
setInterval(() => {
    ping.sys.probe(router, (routerStatus) => {
        console.log(routerStatus ? 'router is available' : 'router is not available');
        if (!routerStatus) {
            showAnimation(animations['no-router']);
            return;
        }
        ping.sys.probe(web, (webStatus) => {
            console.log(webStatus ? 'web is available' : 'web is not available');
            if (!webStatus) {
                showAnimation(animations['no-web']);
            }
        });
    });
}, interval);

