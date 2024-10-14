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
let timer = 30

function preload() {
  glassImage = loadImage("assets/Glass.png");
  clouds = loadImage("assets/clouds.png");
  ladder = loadImage("assets/ladder.png");
  mangGif = createImg("assets/mang.GIF"); // Keep the GIF as an HTML element
  pitch = loadImage("assets/pitch.JPG");
  unpitch = loadImage("assets/unpitch.JPG");

  soundFormats('mp3');
  glassSound = loadSound('assets/glassbreaking.mp3'); // Renamed for clarity
}

function setup() {
  createCanvas(1000, 1000);
  noCursor(); // Hide the cursor in the canvas

  // Force the cursor to stay hidden globally by applying a CSS style
  let body = document.querySelector('body');
  body.style.cursor = 'none';  // This hides the cursor globally
  
  gui = createGui();
  x = createSliderV("Slider", 70, 100, 100, 400);  // Slider for sound control

  // Position the GIF
  mangGif.position(-50, 0);
  mangGif.hide(); // Hide initially, only show when needed
  mangGif.style('cursor', 'none'); // Hide the cursor when hovering over the GIF
  
  // Initialize mic input
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  switch (state) {
    case 0:
      image(pitch, 0, 0, width, height);
      if (mouseIsPressed) state = 1;
      break;

    case 1:

     textAlign(CENTER, CENTER);
     textSize(100);
     text(timer, width/2, height/2);



      // Sky background
      background(205, 240, 255);
      image(clouds, 40, 50);
      image(clouds, 300, 30);
      image(clouds, 600, 5);
      drawGui();

      image(ladder, -50, 1);

      // Show the GIF in state 1
      mangGif.show();

      // Window frame
      fill("brown");
      rect(5, 0, 1000, 35); // window top
      rect(5, 500, 1000, 35); // window middle
      rect(0, 965, 1000, 35); // window bottom
      rect(0, 0, 35, 1000); // window left
      rect(960, 0, 40, 1000); // window right
      
      // Break glass effect where the mouse is clicked
      if (glassX !== -1 && glassY !== -1) {
        image(glassImage, glassX - glassImage.width / 2, glassY - glassImage.height / 2);
      }
      break;

    case 2:
      image(pitch, 0, 0, width, height);
      glassSound.play();
      mangGif.hide();
      break;
  }
  

  // switch from Case 1 to Case 2
  if (x.val >= volumeThreshold) {
    image(pitch, 0, 0, width, height); 
    glassSound.play();
    mangGif.hide();
  }

   //timer
   if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    image(unpitch, 0, 0, width, height);mangGif.hide();
  }

  // Get the sound level from the microphone
  volume = mic.getLevel();

  // Map the sound level to the slider value
  x.val = map(volume, 0, 1, 0, 10);

  if (x.isChanged) {
    print(x.label + " = " + x.val);
  }
}

function mousePressed() {
  // Play the glass breaking sound and set the glass position to where the mouse is clicked
  if (state === 1) {
    glassSound.play();
    
    // Set glass to appear where the mouse is clicked, but cursor is still hidden
    glassX = mouseX;
    glassY = mouseY;
  }
}

function touchMoved() {
  return false;
}
