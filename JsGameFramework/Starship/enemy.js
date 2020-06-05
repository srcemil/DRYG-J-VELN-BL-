class enemy {
  constructor(x, y){
    this.HP = 100;                    // Hälsa på fienden
    this.x = x;                       // x värden på fienden
    this.y = y;                       // y värde på fienden
  }
  update() {
  if(this.x > theShip.x){
    this.x += 2;
    }
  if(this.x < theShip.x){
      this.x -= 2;
    }
  if(this.x - 20 > 1){                // Kollar om fiendens x värde är mer än 1
      this.x -= 4;                    // Förflytta fienden åt vänster
    }
  if(this.x + 20 < gGameWidth - 50){  // Kollar om fienden x är mer än canvas bredden
      this.x += 4;									  // Förflytta fienden åt höger
    }
  }
  draw(ctx) {
    ctx.beginPath();                  // Började rita
    ctx.fillStyle = "blue";           // Färgen är blå
    ctx.rect(this.x, this.y, 50, 50); // Ritar ut en kvadrat som med x, y värde och storlek vilket är 50px x 50px
    ctx.closePath();                  // Slutar rita
    ctx.fill();                       // Fyller kvadraten med den färg vi valt
  }
}
