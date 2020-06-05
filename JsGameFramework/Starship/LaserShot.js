/////////////////////////////////////////////////////////////////////////////////////////////////////
// skapat av Bengt Johansson
//
// Denna klass kan användas med ramverket BProjGameJs ämnat för kursen Programmering 1 (enl. GY11)
/////////////////////////////////////////////////////////////////////////////////////////////////////

//==============================================================================
// Klass för ett laserskott (enligt StarWars-modellen). Ett objekt av klassen
// representerar alltså ett laserskott, och det oavsett om det har skjutits iväg
// eller väntar på att bli det.
//==============================================================================
class LaserShot
{
	//==========================================================================
	// Konstruktor som skapar ett laser-objekt.
	//==========================================================================
	constructor(length, width, speed) {

		this.length = length;
		this.width = width;
		this.speed = speed;
		this.x = 0;
		this.y = 0;
	}

	//==========================================================================
	// Skickar iväg lasern.
	//==========================================================================
	shoot(originX, originY) {

		// Skjut om lasern inte används redan
		if (this.y == 0) {
			this.x = originX;
			this.y = originY;
		}
	}

	//==========================================================================
	// Uppdaterar laserns tillstånd.
	//==========================================================================
	update() {
		// Uppdatera position för lasern
		if (this.y > 0) {
			this.y = this.y - this.speed;
		}
		else {
			// Friställ lasern
			this.y = 0;
		}
		if(this.y > theEnemy.y){
			if(this.y < theEnemy.y + 50){
				if(this.x > theEnemy.x){
					if(this.x < theEnemy.x + 50){
						this.y = 0; 			// Gör så att skottet inte fortsätter att åka och skada fienden
						score += 10;			// Lägger till 10 poäng till spelarens "score"
						enemyHp -= 10;			// Tar bort 10 hälsa från fienden

	}
	}
	}
	}
	}

	//==========================================================================
	// Lasern ritas ut i canvas.
	//==========================================================================
	draw(ctx)
	{
		if (this.y > 0)
		{
			ctx.fillStyle = "#FFFFFF"; 								// Färg på skottet
			ctx.fillRect(this.x - (this.width / 2), this.y - this.length, this.width, this.length); // Rektangulär form med tidigare bestämda parametrar
		}
	}
}
