/*
	Classe de test pour imiter une connexion série	

    OLIVIER Benjamin

*/

function viewCommand(value){
	console.log('Envoi de :' + value);
}

module.exports.viewCommand = viewCommand;