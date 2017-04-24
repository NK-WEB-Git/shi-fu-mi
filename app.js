/*
    Lire la documentation pour comprendre
        - document.querySelectorAll : https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll
        - document.querySelector : https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
    
    choicesUser --> Il sagit de tous les choix possibles de l'utilisateur,
    autrement dit les balises a qui possedent les icones (feuille, pierre, ciseau) dans notre fichier HTML
    
    choicesComputer --> Tableau qui nous permettra de récupérer le choix de l'ordinateur
    
    win --> compteur des victoires de l'utilisateur
    
    lost --> compteur des victoires de l'ordinateur

*/

var choicesUser = document.querySelectorAll("a");
var choicesComputer = ['pierre', 'feuille', 'ciseau']
var win = 0;
var lost = 0;


/* 
    Lire la documentation pour comprendre
        - Math.floor : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/floor
        - Math.random : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
    
    Pour pouvoir faire jouer l'ordinateur, il faudrait
    générer un nombre aléatoire entre 0 et 2. Car les index
    de notre tableau choicesComputer vont de 0 à 2. Ces nombres
    générés aléatoirement seront utilisés dans la fonction gameComputeur
*/
var randomIntInclusive = function () {
  	return Math.floor(Math.random() * (3));
};


/*
    Ici on renvoie de manière plus précise le choix de l'ordinateur
    à savoir la valeur de l'index dans le tableau choicesComputer
    
    Ces valeurs étant évidemment pierre, feuille et ciseau
    
    (Les index nous permettant d'avoir la valeur du choix de l'ordinateur sont ceux
    de la fonction randomIntInclusive)
*/
var gameComputer = function (choicesComputer, randomIntInclusive) {
	var indexChoice = randomIntInclusive();
	var choiceComputer = choicesComputer[indexChoice];
	return choiceComputer;
};


/*
    Ici, on compare le choix de l'utilisateur avec celui de l'ordinateur
    C'est assez explicite (la feuille perd devant les ciseaux, la pierre perd face à la feuille etc...)
    
    A chaque comparaison, nous affichons le résultat à savoir Gagné, Perdu ou Match nul
    
    On renvoit également à chaque fois le résultat de la comparaison (draw --> nul, win --> gagné et lost --> perdu)
    que nous allons utiliser à partir de la ligne 128 de ce fichier.
*/
var battle = function (player, computer) {
	if(player == computer) {
        document.querySelector('.result').innerHTML = 'Match nul !';
        return "draw";
    }
    else if((player == "pierre" && computer == "ciseau") || (player == "feuille" && computer == "pierre") || (player == "ciseau" && computer == "feuille")) {
        document.querySelector('.result').innerHTML = 'Gagné !';
        return "win";
    }
    else if((player == "feuille" && computer == "ciseau") || (player == "pierre" && computer == "feuille") || (player == "ciseau" && computer == "pierre")) {
        document.querySelector('.result').innerHTML = 'Perdu !';
        return "lost";
    }
};


/*
    partie bonus : 
    On renvoit juste l'icone qui correspond au choix de l'utilisateur et de l'ordinateur. ON les affichera par
    contre dans la fonction displayChoices
*/
var iconsChoices = function (choice) {
    if (choice === 'pierre') {
        return '<i class="fa fa-hand-rock-o fa-2x" aria-hidden="true"></i>';
    } else if (choice === 'feuille') {
        return '<i class="fa fa-hand-paper-o fa-2x" aria-hidden="true"></i>';       
    } else {
        return '<i class="fa fa-hand-scissors-o fa-2x" aria-hidden="true"></i>';       
    }    
};


/*
    partie bonus :
    On affiche sur la page le choix de l'utilisateur et de l'ordinateur
    
    Pour comprendre, lire la documentation : 
        - tagBattle.innerHTML : https://developer.mozilla.org/fr/docs/Web/API/Element/innertHTML
        - tagBattle.style.display :  https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/style
*/
var displayChoices = function (player, computer, iconsChoices) {
    var tagBattle = document.querySelector('#battle');
    tagBattle.innerHTML =  iconsChoices(player) + '<span class="versus">vs</span>' + iconsChoices(computer) +'<span class="result"></span>';
    tagBattle.style.display = 'block';
}        


/*
    C'est ici que tout se joue
    On fait au départ une boucle pour mettre un événement sur chacun des liens (qui représentent les icones pierre, papier, et ciseau 
    donc le choix de l'utilisateur)
    
    Ensuite on récupère le texte de chacun de ses liens (feuille, pierre, ciseau)
    
    On les affiche sur la page grâce à la fonction displayChoices
    
    Pour finir on fait des conditions avec le résultat de la fonction battle
        - si c'est nul et ben on ne fait rien
        - si c'est gagné, on ajoute 1 à la variable win, et nous l'affichons sur la page (document.querySelector("#win").innerHTML = win)
        - si c'est perdu, on ajoute 1 à la variable lost et nous l'affichons sur la page (document.querySelector("#lost").innerHTML = lost)
*/
for(var i = 0; i < choicesUser.length; i++) {
    var links = choicesUser[i];
    links.addEventListener("click", function() {
    	var choiceUser = this.querySelector('span').innerText.toLowerCase();
    	var choiceComputer = gameComputer(choicesComputer, randomIntInclusive);
    	displayChoices(choiceUser, choiceComputer, iconsChoices);
        if (battle(choiceUser, choiceComputer) == 'win') {
            win++;
            document.querySelector("#win").innerHTML = win;
        } else if (battle(choiceUser, choiceComputer) == 'lost') {
            lost++;
            document.querySelector("#lost").innerHTML = lost;
        } else {
            return;
        }
    });
}

