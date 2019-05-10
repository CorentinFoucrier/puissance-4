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
	jeu = true;
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

/* Créer le tableau en avec le nombre de lignes et colonnes définit
** dans les var nbLigne et nbColonne
*/
function creerTableau() {
	txt = "<table>";
	for (var i = 0; i < nbLigne; i++) {
		txt += "<tr>";
		for (var j = 0; j < nbColonne; j++) {
			txt += '<td onclick="detectClick('+j+')" id="'+i+'-'+j+'">';
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
	// s'il reste une case de libre dans la colonne et si e jeu est en cours
	if (verifPosition(j) && jeu) {
		var ligneEnCour = poseJeton(j); // numero de la ligne en cours
		var verifEnd = puissance4(ligneEnCour, j, 0, 0); // la vérif si vainqueur
		if (verifEnd) {
			jeu = false;
			afficheTextAnnonce('Le joueur '+nomDuJoueur(nbJoueur)+' a gagné la partie !');
		} else {
			nbJoueur == 1 ? nbJoueur = 2 : nbJoueur = 1;
			/*	TERNAIRE
			**
			**	if (nbJoueur == 1){
			**		nbJoueur = 2;
			**	}else{
			**		nbJoueur = 1;
			**	}
			**
			*/
			afficheTextAnnonce('c\'est au tour du joueur '+nomDuJoueur(nbJoueur));
		}
	}
}
/* Si case en haut de la colonne est vide alors TRUE sinon FALSE */
function verifPosition(j) {
	if (plateau[0][j] == 0) {
		return true;
	} else {
		return false;
	}
}

/* no de la ligne disponible où le jeton peut etre posé */
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

function puissance4(ligne, colonne, l, c){
    console.log('valeur : '+ligne+' '+colonne+' / incremente '+l+' '+c);
    if (c == 0 && l == 0) {
    	/* Ce 1er appel lance les appels récursifs
		** -1 pour decaler d'une colonne à gauche ou en haut (et ne pas revenir dans cette condition 0 0) 
		** 1 pour decaler d'une colonne à droite ou en bas (et ne pas revenir dans cette condition 0 0)
		*/

        //horizontal
        var va = 1 + puissance4(ligne, colonne-1, 0, -1) + puissance4(ligne, colonne+1, 0, 1);
        
        //vertical
        var vb = 1 + puissance4(ligne-1, colonne, -1, 0) + puissance4(ligne+1, colonne, 1, 0);
        
        //diagonale qui descend vers la gauche
        var vc = 1 + puissance4(ligne-1, colonne-1, -1, -1) + puissance4(ligne+1, colonne+1, 1, 1);
        
        // diagonale qui descend vers la droite
        var vd = 1 + puissance4(ligne-1, colonne+1, -1, +1) + puissance4(ligne+1, colonne-1, 1, -1);

        //console.log(va,vb,vc,vd);
        console.log(va,vb,vc,vd);
        if (va >= 4 || vb >= 4 || vc >= 4 || vd >= 4) {
            return true;
        } else {
            return false;
        }
    }

    // condition terminale
    if (ligne < nbLigne && ligne >= 0 && colonne < nbColonne && colonne >= 0) {
        console.log('valeur : '+ligne+' '+colonne+' / incremente '+l+' '+c);
        if (plateau[ligne][colonne] == nbJoueur) {
        	// boucle récursive avec le décalage d'entrée (-1 ou +1) pour voir les cases suivantes
            return 1 + puissance4(ligne + l, colonne + c, l, c);
        } else {
            return 0;
        }
    }
    return 0;
}