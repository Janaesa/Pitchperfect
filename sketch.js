let gui;
let x;
let clouds;
let pitch;
let mang;
let wiper;
let ladder;
let mic;
let soundLevel = 0;
let state = 0;

function preload() {
  clouds = loadImage("assets/clouds.png");
  ladder = loadImage("assets/ladder.png");
  gif_createImg = createImg("assets/mang.GIF");
  pitch = loadImage("assets/pitch.JPG");
}

function setup() {
  createCanvas(1000, 1000);
  
  // Include the GUI slider library
  gui = createGui();
  x = createSliderV("Slider", 50, 50, 100, 300);  // Added slider height and range

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

      // Character position
      gif_createImg.position(-50, 0);

      // Window frame
      fill("brown");
      rect(5, 0, 1000, 35); // window top
      rect(5, 500, 1000, 35); // window middle
      rect(0, 965, 1000, 35); // window bottom
      rect(0, 0, 35, 1000); // window left
      rect(960, 0, 40, 1000); // window right
      break;
  }

  // Get the sound level from the microphone
  soundLevel = mic.getLevel();

  // Map the sound level to the slider value
  x.val = map(soundLevel, 0, 1, 0, 100);

  if (x.isChanged) {
    print(x.label + " = " + x.val);
  }
}

function touchMoved() {
  return false;
}
