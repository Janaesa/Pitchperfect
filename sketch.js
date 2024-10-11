let gui;
let x;
let clouds;
let pitch;
let mangGif;
let wiper;
let ladder;
let mic;
let soundLevel = 0;
let state = 0;
let glassSound; 
let glassImage;
let glassX = -1;  // to put glass where mouse is clicked 
let glassY = -1;

function preload() {
  glassImage = loadImage("assets/Glass.png");
  clouds = loadImage("assets/clouds.png");
  ladder = loadImage("assets/ladder.png");
  mangGif = createImg("assets/mang.GIF"); // Keep the GIF as an HTML element
  pitch = loadImage("assets/pitch.JPG");

  soundFormats('mp3');
  glassSound = loadSound('assets/glassbreaking.mp3'); // Renamed for clarity
}

function setup() {
  createCanvas(1000, 1000);
  
  gui = createGui();
  x = createSliderV("Slider", 70, 100, 100, 300);  // Slider for sound control

  // Position the GIF
  mangGif.position(-50, 0);
  mangGif.hide(); // Hide initially, only show when needed
  
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
      
      // for glass to break where the mouse is clicked 
      if (glassX !== -1 && glassY !== -1) {
        image(glassImage, glassX - glassImage.width / 2, glassY - glassImage.height / 2);
      }

      break;

      case 2:
        //glass break code

    
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
  // Play the glass breaking sound when mouse is pressed
  if (state === 1) {
    glassSound.play();
    
    // to press the mouse 
    glassX = mouseX;
    glassY = mouseY;
  }
}

function touchMoved() {
  return false;
}
