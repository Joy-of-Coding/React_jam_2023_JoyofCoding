export class Player {
    constructor(public game: any) {
      this.game = game;
      this.x = 0;
      this.y = this.game.world.height - 10;
      this.height = 100;
      this.width = 91.3;
      this.image = getElementById('player');
    }
  
    update(input) {
      if (input.includes('ArrowRight')) this.x ++;
      else if (input.includes('ArrowLeft')) this.x --;
    }
  
    draw() {
      //window.ctx.fillStyle = "red";
      window.ctx.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.game.assets.player, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
  }
  