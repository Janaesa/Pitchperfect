let gui;
let x;
let clouds;
let mic;
let soundLevel = 0;

function preload() {
  clouds = loadImage("assets/clouds.png");
  mic = new p5.AudioIn();
  mic.start();
}

function setup() {
  createCanvas(1000, 1000);
  gui = createGui();
  x = createSliderV("Slider", 50, 50);
}

function draw() {
  //sky background
  background(205, 240, 255);
  image(clouds, 40, 50);
  image(clouds, 300, 30);
  image(clouds, 600, 5);
  drawGui();

  //window frame
  rect(5,0,1000,35); //window top
  rect(5,500,1000,35); //window middle
  rect(0,965,1000,35); //window bottom
  rect(0,0,35,1000); //winidow left
  rect(960,0,40,1000); //window right

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