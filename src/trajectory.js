/*
	Classe pour la gestion de la trajectoire du robot.
	Calcule des valeurs à envoyer sur chacun des moteurs
	Envoi des données à la classe serialCom.js

    OLIVIER Benjamin

*/

var	serial = require("./serialControl.js")
	, fakeS = require("./fakeSerial.js"); 

function processData(direction, speed, turn){

	console.log('Processing');
	var serialMsgMotor1, serialMsgMotor2;


	if((Math.abs(speed) + Math.abs(turn)) <= 9 ){
		if(speed >= 0){
			if(turn > 0) {
				serialMsgMotor1 = '1F' + Math.abs(speed);
				serialMsgMotor2 = '2F' + Math.abs(speed-Math.abs(turn));
			}
			else{
				serialMsgMotor1 = '1F' + Math.abs(speed-Math.abs(turn));
				serialMsgMotor2 = '2F' + Math.abs(speed);
			}
		} else{
			if(turn > 0) {
				serialMsgMotor1 = '1R' + Math.abs(speed-Math.abs(turn));
				serialMsgMotor2 = '2R' + Math.abs(speed);
			}
			else{
				serialMsgMotor1 = '1R' + Math.abs(speed);
				serialMsgMotor2 = '2R' + Math.abs(speed-Math.abs(turn));
			}
		}
	}

	else{
		var dist, ratio, newSpeed, newTurn; 

		dist = Math.sqrt(Math.pow(speed, 2) + Math.pow(turn,2));
		console.log('Distance calculé ' + dist);
		ratio = 9/dist;
		console.log('ratio calculé ' + ratio);

		newSpeed = Math.abs(Math.floor(speed * ratio));
		console.log('Nouvelle vitesse calculé ' + newSpeed);
		newTurn = Math.abs(Math.floor(turn * ratio));
		console.log('Nouveau turn calculé ' + newTurn);


		if(speed >= 0){
			serialMsgMotor1 = '1F' + newSpeed;
			serialMsgMotor2 = '2F' + newTurn;
			}
		else{
			serialMsgMotor1 = '1R' + newSpeed;
			serialMsgMotor2 = '2R' + newTurn;
		}

	}


	// A changer pour le déploiement !!!!

	//serial.sendCommand(serialMsgMotor1);
	//serial.sendCommand(serialMsgMotor2);

	fakeS.viewCommand(serialMsgMotor1);
	fakeS.viewCommand(serialMsgMotor2);

}

module.exports.processData = processData;
