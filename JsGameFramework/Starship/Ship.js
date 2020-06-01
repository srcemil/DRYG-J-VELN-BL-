/////////////////////////////////////////////////////////////////////////////////////////////////////
// skapat av Bengt Johansson
//
// Denna klass kan användas med ramverket BProjGameJs ämnat för kursen Programmering 1 (enl. GY11)
/////////////////////////////////////////////////////////////////////////////////////////////////////

//==============================================================================
// Spelkaraktär iform av ett interstellärt rymdskepp :)
//==============================================================================
class Ship
{
	//==========================================================================
	// Konstruktor som skapar ett skepp-objekt.
	//==========================================================================
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.laserPool = new Array();
		this.laserCnt = 0;

		// Ladda 5 återanvändbara laserskott i en pool
		for (var i = 0; i < 5; i++)
		{
			this.laserPool.push(new LaserShot(30, 1, 5));
		}
	}

	//==========================================================================
	// Skeppets tillstånd uppdateras.
	//==========================================================================
	update() {

		// Agera på tangenttryckningar
		if (gKeysDown[gKeyCodes.LEFT] == true) {
			if(this.x - 4 > 1){ // Kollar om skeppets x värde är mer än 35
				this.x -= 4;      // Förflytta skeppet åt vänster
			};
		}
		if (gKeysDown[gKeyCodes.RIGHT] == true) {
			if(this.x + 4 < gGameWidth - 35){ // Kollar om skeppets x är mer än canvas bredden
				this.x += 4;										// Förflytta skeppet åt höger
			};
		}

		if (gKeysDown[gKeyCodes.UP] == true){
			if (this.y - 4 > 1) {
				this.y -=4;
			};
		}

		if (gKeysDown[gKeyCodes.DOWN] == true){
			if (this.y + 4 < gGameHeight - 35){
				this.y += 4
			};
		}

		if (gKeysDown[gKeyCodes.SPACE] == true) {

			// Kontrollera om tiden som gått sedan senaste skottet är tillräcklig
			if (gAppStepCount % 20 == 0) {

				// Skjut iväg en laser
				this.laserPool[this.laserCnt++].shoot(this.x + (35 / 2), this.y);

				if (this.laserCnt >= this.laserPool.length) {
					this.laserCnt = 0;
				}
			}
		}

		// Updatera alla laserskott
		for (var i = 0; i < this.laserPool.length; i++) {
			this.laserPool[i].update();
		}
	}

	//==========================================================================
	// Skeppet ritas ut i canvas.
	//==========================================================================
	draw(ctx)
	{
		// Rita skeppet som en kvadrat och färglägg den
		ctx.beginPath();
		ctx.rect(this.x, this.y, 35, 35);
		ctx.closePath();
		var color = document.getElementById("color").value;
		ctx.fillStyle = color;
		ctx.fill();

		// Visa alla laserskott i canvas
		for (var i = 0; i < this.laserPool.length; i++) {
			this.laserPool[i].draw(ctx);
		}
	}
}
