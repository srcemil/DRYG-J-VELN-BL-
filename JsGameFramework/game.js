/////////////////////////////////////////////////////////////////////////////////////////////////////
// skapat av Bengt Johansson
//
// Denna programfil utgör kärnan i BProjGameJs, ett egenutvecklat enkelt ramverk för spelutveckling i
// Javascript ämnat för kursen Programmering 1 (enl. GY11).
//
// Ramverket innehåller grundläggande funktionalitet för att stödja ett spel i Javascript.
// Det innehåller ett exempel på ett påbörjat spel Starship som är körbart, men ramverket är
// generellt för alla typer av spel. Kod som tillhör exemplet är inramad mellan "BEGIN Starship" och
// "END Starship". Det är därför lätt att lokalisera och avlägsna kopplingarna till exemplet om man
// bestämmer sig för att göra ett eget spel från grunden.
//		Ramverket baseras på Canvas i HTML5 och erbjuder en tillståndsstyrd spel-loop. Hantering
// av input från tangentbord och mus är separerat från denna programfil och ligger i input_control.js.
//
// Globala identifierare som hör till ramverket bär prefixet g. Dessa är i bokstavsordning:
//		gApp
//		gAppState
//		gAppStepCount
//		gAppTimeStep
//  	gGameContext
//		gGameHeight
//		gGameWidth
//  	gStates
//
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Version 7 2020-01-13:
// - Exemplet Starship har gjorts objektrienterat.
// - Filstrukturen har organiserats med undermappar.
// - Lagt till g som prefix på globala variabler och konstanter.
// - Förbättrad kommentering allmänt.
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Tillstånd som används av spelprogrammet
const gStates = {
	STARTING 	: 1,
	PLAYING 	: 2,
	STOPPED 	: 3,
	PAUSED 		: 4
};

var gGameContext;			// Kontexten för spelet som renderas i vår canvas
var gGameWidth;				// Spelfönstrets bredd
var gGameHeight;			// Spelfönstrets höjd
var gApp;				// Applikationen som itererande loop
var gAppState;				// Huvudtillstånd i spelprogrammet
var gAppTimeStep;			// Tiden mellan iterationer (uppdateringar) i applikationen
var gAppStepCount;			// Räknare för antal iterationer som spel-loopen genomgått
// String variabler
var pEnter = "Press Enter to Start";
var pCmove = "WASD - move";
var pCshoot = "Space - shoot";
var pCpause = "press \"p\" to pause the game";
var pauseG = "The game is paused"
var winScreen = "You win!"
// Håller nummer
var score = 0;
var enemyHp = 1000;
// Ljudeffekter
var endGame = new Audio("./JsLibrary/Sound/MixedSoundeffects/Applause.MP3"); // "Applause" ljudet
endGame.src = "./JsLibrary/Sound/MixedSoundeffects/Applause.MP3";	     // Src till "Applause" ljudet
endGame.volume = 0.1;							     // Volym på ljudet


//******************* BEGIN Starship game **********************************
var theEnemy;
var theShip;
//******************* END Starship game ************************************

//==========================================================================
// Initialisering som utförs när webbsidan laddats in i webbläsaren.
//==========================================================================

function initialize() {

	// Sätt den context som spelet ska visas i.
	gGameContext = gGameCanvas.getContext("2d");

	// Hämta bredd och höjd på canvas från HTML-sidan.
	gGameWidth = gGameCanvas.getAttribute("width");
    gGameHeight = gGameCanvas.getAttribute("height");

	//******************* BEGIN Starship game ******************************
	//******************* END Starship game ********************************

	// Kör igång spel-loopen.
	startApp();
}

//==========================================================================
// Startar applikationen och spel-loopen. Denna loop itererar innehållet
// periodiskt med korta intervall som ger tillräckligt snabb bilduppdatering.
//==========================================================================
function startApp() {
	// Sätt applikationens STARTING-tillstånd.
    gAppState = gStates.STARTING;

	// Sätt spelets uppdateringsintervall
	gAppTimeStep = 10;

	// Räkna applikationens uppdateringar
	gAppStepCount = 0;

	// STARTINGa applikationen (definierad av IterateApp) så att den körs med det intervall
	// som bestäms av gAppTimeStep.
	gApp = setInterval(function() { iterateApp() }, gAppTimeStep);
}

//==========================================================================
// Stoppar applikationen.
//==========================================================================
function stopApp() {
	clearInterval(gApp);
}

//==========================================================================
// Initialiserar en ny spelomgång.
//==========================================================================
function initNewGame() {
	var spawnWidth = Math.floor((Math.random() * gGameWidth - 30)); 		// Slumpmässigt x värde på skeppet när det laddas in
	var spawnHeight = Math.floor((Math.random() * gGameHeight - 30)); 		// Slumpmässigt y värde på skeppet när det laddas in
	var enemySpawnWidth = (gGameWidth / 2) - 35; 					// Gör att fienden startar i mitten på x axeln
	var enemySpawnHeight = (gGameHeight / 2) - 35; 					// Gör att fienden startar i mitten på y axeln
	theShip = new Ship(spawnWidth, spawnHeight);
	theEnemy = new enemy(enemySpawnWidth, enemySpawnHeight);
}

//==========================================================================
// Utför en iteration (uppdatering) av innehållet i applikationen, spelet.
//==========================================================================
function iterateApp() {

	switch (gAppState) {


		case gStates.STARTING :
		initNewGame();
		if(gKeysDown[gKeyCodes.ENTER]){ 						// Om en knapp är nere och det är ENTER knappen så körs satsen
			gAppState = gStates.PLAYING; 						// Startat spelet
		}
		else{ 										// Om spelet inte spelar, så visas denna skärm
	    gGameContext.font = "20px Serif"; 							// Storlek och font
	    gGameContext.fillStyle = "Black"; 							// Färg på texten
	    gGameContext.fillText(pEnter, 47, 180); 						// Text och koordinater
	    											// Behöver ingen font eller fillstyle eftersom att det redan är bestämt
	    gGameContext.fillText(pCmove, 47, 210); 						// Text och koordinater för rörelse instruktioner
	    gGameContext.fillText(pCshoot, 47, 240);  						// Text och koordinater för skjut instruktioner
	    gGameContext.fillText(pCpause, 47, 270);  						// Text med koordinater för pause instruktioner
	  }

			//##############################################################
			//# OBS! Skriv kod för att hantera startfönstret här.
			//##############################################################


			break;

		case gStates.STOPPED :

			//##############################################################
			//# OBS! Tillståndet används inte f.n. och kan avlägsnas eller
			//#      användas senare.
			//##############################################################

			break;

		case gStates.PAUSED :

			if (gKeysDown[gKeyCodes.PMENU] == true) {
				// STARTING spelet
				gAppState = gStates.PLAYING;
			}
			else { 						 // Om inte spelet är igång så ska denna meny vara aktiv, en "pausmeny"
				gGameContext.font = "40px Serif"; 	 // Storlek och font
		    gGameContext.fillStyle = "Black"; 			 // Färg på texten
				gGameContext.fillText(pauseG, 37, 180);  // Text och koordinater
			}
			break;

		case gStates.PLAYING :
			if (enemyHp <= 0){ 					// Om fiendens hälsa är 0 eller mindr eså körs denna if sats
				gAppState = gStates.STOPPED; 			// Spelet stoppas
				gGameContext.font = "40px Serif"; 		// Storlek och font
		    gGameContext.fillStyle = "Black"; 				// Färg på texten
				gGameContext.fillText(winScreen, 37, 180);	// Text och koordinater
				endGame.play(); 				// Ljudet endGame som tidigare deklarerats spelas upp
			}
			else if (gKeysDown[gKeyCodes.PMENU] == true) {
				// Stoppa spelet
				gAppState = gStates.PAUSED;
			}
			else {
				update();
				draw(gGameContext);
				gAppStepCount++;
			}
			break;
    }
}
console.log(gKeyCodes); // visar bara alla keys i konsolen
//==========================================================================
// Funktion som kan utföra alla förflyttningar i spelet.
//==========================================================================
function update() {

	//******************* BEGIN Starship game ******************************
	theShip.update();  							// uppdaterar skeppet
	theEnemy.update(); 					        	// uppdaterar fienden
	//******************* END Starship game ********************************
	//######################################################################
	//# OBS! Skriv din egen kod för uppdateringar här. Detta kan göras direkt
	//#      eller genom anrop till funktioner eller metoder i objekt.
	//######################################################################

	return 0;
}


//==========================================================================
// Ritar (renderar) bakgrund och alla objekt som ska visas i spelet
// Param ctx: kontexten för och referensen till den canvas som ska renderas
//==========================================================================
function draw(ctx) {

	//******************* BEGIN Starship game ******************************

	ctx.fillStyle = "#c2c5cc"; 							// Bakgrundsfärg på canvas
	ctx.fillRect(0, 0, gGameWidth, gGameHeight); 					// Det ritas ut en rektangel med de tidigare deklarerade parametrarna

	ctx.font = "15px Serif"; 							// Storlek och font
	ctx.fillStyle = "white"; 							// Färg på texten
	ctx.fillText("Score: " + score, 5, 15); 		 			// Utskrivna "poäng" med koordinater, vi har tidigare deklarerat variabeln score
	ctx.fillText("Målet är att nå 1000 poäng", 380, 300); 				// Instruktioner för spelaren

	// Låt skeppet rita sig självt och sådant som skeppet ansvarar för.
	theShip.draw(ctx); 								// Skeppet ritar ut sig själv enligt instruktioner från sin personliga fil
	theEnemy.draw(ctx);								// Fienden ritar ut sig själv enligt instruktioner från sin personliga fil
	//******************* END Starship game ********************************

	//######################################################################
	//# OBS! Skriv din egen kod för rendering här. Detta kan göras direkt
	//#      eller genom anrop till andra funktioner eller metoder i objekt.
	//######################################################################
}
