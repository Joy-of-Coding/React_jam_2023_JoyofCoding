import { Player } from './Player.ts';
import { InputButton} from './InputButton.ts';
import type { RuneClient } from "rune-games-sdk/multiplayer";
import Rune from "@rune-js/client";
type Context2D = CanvasRenderingContext2D;

Rune.start(() => {
    // Add your event listener here
    window.addEventListener("load", () => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const width = window.innerWidth;
        const height = window.innerHeight;
    });
  });
  
  // Event listener function
  function handleResize() {
    // Your logic for handling window resize event
    console.log("Window resized!");
  }

  
  class Game {
    constructor(width, height) {
      window.innerWidth = width;
      window.innerHeight = height;
      this.player = new Player(this); // Fix: "new" should be lowercase
      this.input = new InputButton();
    }
  
    update() {
      this.player.update(this.input.keys)// Add your update logic here
    }
  
    draw(context) {
      window.player.draw(context);
    }
  }
  
  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
    animate();
  }
   


   
      