var nbJoueur = 1;
var nbColonne = 5;
var nbLigne = 5;
var jeu = true;
var text = "";
var plateau = [];

for (var i = 0; i < nbLigne; i++) {
	plateau[i] = [];
}

newGame();

function newGame() {
	for (var i = 0; i < nbLigne; i++) {
		for (var j = 0; j < nbColonne; j++) {
			plateau[i][j] = 0;
		}
	}
	var joueur = 1;
	afficheTextAnnonce("Le jeu commence ! C'est le tour du joueur "+nomDuJoueur(joueur));
	var jeu = true;
	creerTableau();
}

afficheTextAnnonce(text) {
	document.getElementById('textAnnonce').innerHTML = text;
}

nomDuJoueur(nbJoueur) {
	if (nbJoueur == 1) {
		return "rouge";
	} else {
		return "bleu";
	}
}