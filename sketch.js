let gui;
let x;
let clouds;
let pitch;
let mangGif;
let unpitch;
let wiper;
let ladder;
let mic;
let soundLevel = 0;
let state = 0;
let glassSound; 
let glassImage;
let glassX = -1;  // to put glass where mouse is clicked 
let glassY = -1;
let volumeThreshold = 4; // GUI max value
let volume;
let timer = 30;
let shatter;
let gifTimer = 0;  // Timer for playing the GIF
let gifDuration = 6 * 60;  // 6 seconds in frames (60 FPS)

function preload() {
  glassImage = loadImage("assets/Glass.png");
  clouds = loadImage("assets/clouds.png");
  ladder = loadImage("assets/ladder.png");
  mangGif = createImg("assets/mang.GIF"); // Keep the GIF as an HTML element
  pitch = loadImage("assets/pitch.JPG");
  unpitch = loadImage("assets/unpitch.JPG");
  shatter = createImg("assets/shatter.gif");

  soundFormats('mp3');
  glassSound = loadSound('assets/glassbreaking.mp3'); // Renamed for clarity
}

function setup() {
  createCanvas(1000, 1000);
  noCursor(); // Hide the cursor in the canvas

  let body = document.querySelector('body');
  body.style.cursor = 'none';  // This hides the cursor globally
  
  gui = createGui();
  x = createSliderV("Slider", 70, 100, 100, 400);  // Slider for sound control

  mangGif.position(-50, 0);
  mangGif.hide();
  mangGif.style('cursor', 'none');
  
  shatter.position(0, 0);
  shatter.hide();
  shatter.style('cursor', 'none');

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  switch (state) {
    case 0:
      image(pitch, 0, 0, width, height);
      if (mouseIsPressed) state = 1;
      mangGif.hide();
      break;

    case 1:
      textAlign(CENTER, CENTER);
      textSize(100);
      text(timer, width / 2, height / 2);

      background(205, 240, 255);
      image(clouds, 40, 50);
      image(clouds, 300, 30);
      image(clouds, 600, 5);
      drawGui();

      image(ladder, -50, 1);

      mangGif.show();

      fill("brown");
      rect(5, 0, 1000, 35);  // window top
      rect(5, 500, 1000, 35);  // window middle
      rect(0, 965, 1000, 35);  // window bottom
      rect(0, 0, 35, 1000);  // window left
      rect(960, 0, 40, 1000);  // window right

      if (glassX !== -1 && glassY !== -1) {
        image(glassImage, glassX - glassImage.width / 2, glassY - glassImage.height / 2);
      }

      // Check if volume exceeds the threshold and change to state 2
      if (x.val >= volumeThreshold && state === 1) {
        state = 2;
        glassSound.play();
        gifTimer = gifDuration;  // Start the GIF timer
      }
      break;

    case 2:
      if (gifTimer > 0) {
        shatter.show();
        image(shatter, 0, 0, width, height); 
        //glassSound.play();// Display GIF
        gifTimer--;
      } else {
        if (gifTimer <= 0) {
          shatter.hide();  // Hide the GIF after 6 seconds
          state = 0;  // Return to state 1 after GIF plays fully
        }
      }
      break;
  }

  // Timer countdown
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
  if (timer === 0) {
    image(unpitch, 0, 0, width, height);
    mangGif.hide();
  }

  volume = mic.getLevel();
  x.val = map(volume, 0, 1, 0, 10);

  if (x.isChanged) {
    print(x.label + " = " + x.val);
  }
}

function mousePressed() {
  if (state === 1) {
    glassSound.play();
    glassX = mouseX;
    glassY = mouseY;
  }
}

function touchMoved() {
  return false;
}
