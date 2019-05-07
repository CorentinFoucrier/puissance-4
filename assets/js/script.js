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
	var nbJoueur = 1;
	afficheTextAnnonce("Le jeu commence ! C'est le tour du joueur "+nomDuJoueur(nbJoueur));
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

function detectClick(j) {
	if (verifPosition(j) && jeu) {
		var ligneEnCour = poseJeton(j); //numéro de la ligne en cour.
		var verifEnd = puissance4(ligneEnCour, j, 0, 0);
		if (verifEnd) {
			jeu = false;
			afficheTextAnnonce('Le joueur '+nomDuJoueur(nbJoueur)+' a gagné la partie !');
		} else {
			if (nbJoueur == 1) {
				nbJoueur = 2;
			} else {
				nbJoueur = 1;
			}
			afficheTextAnnonce('c\'est au tour du joueur '+nomDuJoueur(nbJoueur));
		}
	}
}
/* Si case en haut de la colone est vide alors TRUE sinon FALSE */
function verifPosition(j) {
	if (plateau[0][j] == 0) {
		return true;
	} else {
		return false;
	}
}

function poseJeton(j) {
	for (var i = nbLigne-1; i >= 0; i--) {
		if (plateau[i][j] == 0) {
			plateau[i][j] = nbJoueur;
			refreshTableau(i, j, nbJoueur);
			return i;
		}
	}
}

function refreshTableau(x, y, i) {
	document.getElementById(x+'-'+y).innerHTML = '<div class="joueur'+i+'"></div>';
}

function puissance4(ligne, colonne, l, c) {
	console.log('valeur:'+ligne+' '+colonne+' / incrémente '+l+' '+c);
	return false;
}