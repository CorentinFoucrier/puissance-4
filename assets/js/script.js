var nbJoueur = 1;
var nbColonne = 5;
var nbLigne = 5;
var jeu = true;
var txt = "";
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

function afficheTextAnnonce(txt) {
	document.getElementById('textAnnonce').innerHTML = txt;
}

function nomDuJoueur(nbJoueur) {
	if (nbJoueur == 1) {
		return "rouge";
	} else {
		return "bleu";
	}
}

function creerTableau() {
	txt += "<table>";
	for (var i = 0; i < nbLigne; i++) {
		txt += "<tr>";
		for (var j = 0; j < nbColonne; j++) {
			txt += '<td onclick="detectClick('+j+')" id="'+[i]+'-'+[j]+'">';
			if (plateau[i][j] == 1) {
				txt += '<div class="joueur1"></div>';
			}
			if (plateau[i][j] == 2) {
				txt += '<div class="joueur2"></div>';
			}
			txt += "</td>";
		}
	txt += "</tr>";
	}
	txt += "</table>";
	document.getElementById('puissance4').innerHTML = txt;
}