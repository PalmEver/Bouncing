// setup canvas "draw"

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

allBalls=25;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//define the properties each ball needs

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    
    this.size = size;
  }

  //tell the ball to draw itself onto the screen

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  //move the ball

  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + 
          random(0, 255) + ',' + random(0, 255) +')';
          balls[j].size = this.size = random(10,20)
        }
      }
    }
  }

let balls = [];
let size = random(10, 20);

while (balls.length < allBalls) { //antal bollar
  let size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}

// funktion som aktiveras via knapp i html-filen som stannar samtliga bollar 
// genom en for-loop. Var tvungen att testa mig fram lite för att förstå 
// att det är enbart velX och velY jag behöver för att stanna rörelsen. 
function stop() {
  for (let j = 0; j < balls.length; j++) {
    balls[j].velX = 0;
    balls[j].velY = 0;
  }    
}

// samma som ovan men ger velX oxh velY samma värde som originellt för att starta.
function start() {
  for (let j = 0; j < balls.length; j++) {
    balls[j].velX = random(-7,7);
    balls[j].velY = random(-7,7);  
  }
}

// Använder samma kod som används i while-satsen för att skapa bollar.
// Kopplar detta till en knapp i html för att användaren ska kunna styra antal.
function more() {
  let size = random(10,20);
  let ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7), //hastighet
    random(-7,7), //hastighet
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
} 

// Minskar enbart antal objekt i array för att minska antal bollar.
// Kopplar även detta till ett knapp för att användaren ska kunna styra.
function less() {
  balls.length=balls.length - 1;
}


function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      // Använder for-satsen för att ha en räknare av antal bollar.
      // "i+1" för att det ej ska vara "0" när enbart en boll är kvar.
      // detta gör dock att det fortfarande står "1" även om alla bollar är borta.
      document.getElementById("demo").innerText=i+1;
      if (balls[i].length==0)
        document.getElementById("demo").innerText=0;
    }
  
    requestAnimationFrame(loop);
  }

  loop();