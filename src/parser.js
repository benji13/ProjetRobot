/*
	Classe pour parser le fichier JSON émit par le client.
	Appel des fonctions adéquates en fonction du type de message
*/

var traj = require("./trajectory.js");

function messageParsing(msg){
	var message,
		type;

	message = JSON.parse(msg);

	type = message.type;

	console.log('Le message est de type :  ' + type);

	switch(type) {
  		case "control":
  		    messageControl(message);
  		    break;
  	}

}

function messageControl(msg){
	var direction,
		speed,
		turn;

		direction = msg.direction;
		speed = msg.speed;
		turn = msg.turn;

		traj.processData(direction, speed, turn);

}


module.exports.messageParsing = messageParsing;
