/*
    Classe de gestion de la liaison série avec les controlleurs moteurs
    Port : /dev/ttyO1
    BaudRate: 115200
*/


//Configuration de la connexion
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyO1", {
    baudrate: 115200
}, true); // this is the openImmediately flag [default is true]


//Envoi de la command passée en parametre sur la liaison série
function sendCommand(value){
    value = value + "\r";
    //serialPort.open(function () {
        //console.log('open');
        serialPort.on('data', function(data) {
            //console.log('data received: ' + data);
        });
        serialPort.write(value, function(err, results) {
            //console.log('err ' + err);
            //console.log('results ' + results);
        });
    //});
    //serialPort.close();
}



module.exports.sendCommand = sendCommand;
