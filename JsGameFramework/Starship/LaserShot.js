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
/*
	hit() {
		return(this.x > x) && (this.x < x+this.width) && (y > y) && (y > y+h)// Ett boolean värde
	}
*/ // HP TESTING
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
/*
		if(this.hit() == true) {
			let health = document.getElementById("health")
		health.value -= 10;
		}
*/ // HP UPDATE TEST
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
						this.y = 0;
						score += 10;
						enemyHp -= 10;
						console.log(score);
						console.log("hit");
						console.log(enemyHp);

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
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(this.x - (this.width / 2), this.y - this.length, this.width, this.length);
		}
	}
}
