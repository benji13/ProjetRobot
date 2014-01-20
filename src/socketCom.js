// JS pour la création du JSON et l'envoie sur la WebSocket

	var previousSpd = 0; 
	var previousTrn = 0;

var socketCom = {

	sendControl: function(spd, trn){

		if (spd != previousSpd || trn != previousTrn){
			var msg= {
  				"type": "control",
  				"direction": "F",
  				"speed": spd,
  				"turn": trn
  			}

			socket.emit('message', JSON.stringify(msg));

			previousSpd = spd;
			previousTrn  = trn;
		}
	}
}