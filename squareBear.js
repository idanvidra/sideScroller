/**
 * Game in JavaScript made with the help of:
 * Creating A Simple 2D Game With HTML5 & JavaScript by Jessica Torres
 * https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef
 */

// constatnts
const HEIGHT = 400;
const WIDTH = 1220;

// canvas init (context definition)
const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = HEIGHT;
context.canvas.width = WIDTH;

// start the frame count at 1 (level 1)
let frameCount = 1;

// set the number of obstacles to match the current "level" number
let obCount = frameCount;

// create a collection to hold the randomly generated x coordinates
const obXCoors = [];

// player object
const square = {
  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0

};

// create the obstacles for each frame
const nextFrame = () => {
  // increase the frame / "level" count
  frameCount++;
  for (let i=0; i < obCount; i++) {
    
    // randomly generate the x coordinate for the top corner
    // sart if each triangle

    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }
}

// square bear controller (player controller)
const controller = {
  
  left: false,
  right: false,
  up: false,
  
  keyListener: function (event) {
    var keyState = (event.type == "keydown") ? true : false;

    switch(event.keyCode) {
      case 37: // left arrow
        controller.left = keyState;
        break;
      case 38: // up arrow
        controller.up = keyState;
        break;
      case 39: // right arrow
        controller.right = keyState;
        break;    
    }
  }
};


// the loop where we check for the players movement
const loop = function() {

  if (controller.up && square.jumping == false){
    square.yVelocity -= 30;
    square.jumping = true;
  }
  if (controller.left) {
    square.xVelocity -= 0.75;
  }
  if (controller.right) {
    square.xVelocity += 0.75;
  }

  // gravity
  square.yVelocity += 1.5
  square.x += square.xVelocity;
  square.y += square.yVelocity;

  // friction
  square.xVelocity *= 0.9;
  square.yVelocity *= 0.9;

  /**
   * if the square is falling below floor line then:
   * 
   * Here, the current value of the square’s y coordinate should never 
   * be greater than the y coordinate that represents the “top” of the 
   * ground line (with the height of the jump and the height of 
   * the square subtracted from it).
   * 
   * If it is, we stop the square’s jump, set the y coordinate of the 
   * square to that of the value it cannot surpass, and stop the square 
   * from “falling” (set the y velocity back to 0).
   */
  

  if (square.y > 386 - 16 - 32) {  
    square.jumping = false;
    square.y = 386 - 16 - 32;
    square.yVelocity = 0;
  }

  // control over what happens when the player exits to either side
  
  if (square.x < -20) {
    square.x = 1220;
  } else if (square.x > 1220) { // if the square goes off the right
    square.x = -20;
    nextFrame();
  }

  /**
   *  Drawing the shapes, including the backdrop, ground layer,
   *  player square
   */
    // creates the backdrop for each frame
   context.fillStyle = "#201A23";;
   context.fillRect(0,0,1220,400); // x, y, width, height
   
   // creates and fills the cube for each frame
   context.fillStyle = "#8DAA9D";
   context.beginPath();
   context.rect(square.x, square.y, square.width, square.height);
   context.fill();

   // create the obstacles for each frame
   // set the standard obstacle height
   const height = 200 * Math.cos(Math.PI / 6);

   context.fillStyle = "#FBF5F3"
   obXCoors.forEach((obXCoor) => {
     context.beginPath();

     context.moveTo(obXCoor, 385); // x = random, y = coor. on "ground"
     context.lineTo(obXCoor + 20, 385); // x = ^random + 20, y = coor. on "ground"
     context.lineTo(obXCoor + 10, 510 - height); // x = ^random + 10, y = peak of triangle
    
     context.closePath();
     context.fill();
    })

   // creates the "ground" for each frame
   context.strokeStyle = "2E2532";
   context.linWidth = 30;
   context.beginPath();
   context.moveTo(0,385);
   context.lineTo(1220, 385);
   context.stroke();

   // updates when called to tell the browser it is ready to draw again
  window.requestAnimationFrame(loop);

}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
