let gui;
let x;
let clouds;
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

}

function setup() {
  createCanvas(1000, 1000);
  gui = createGui();
  x = createSliderV("Slider", 50, 50);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {

  switch (state) {} 
  //sky background
  background(205, 240, 255);
  image(clouds, 40, 50);
  image(clouds, 300, 30);
  image(clouds, 600, 5);
  drawGui();

  image(ladder,-50, 1)

  // character position

  gif_createImg.position(-50, 0)



  //window frame

  rect(5,0,1000,35); //window top
  rect(5,500,1000,35); //window middle
  fill("brown");
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

//if the bar reaches the top by a certain time then "perfect pitch" image appears
//if the bar doesnt reach the top by a certain time "un*perfect pitch" image appears

//states 0 = pitch perfect image with start button (home screen)
// state 1 = the man wipping the window
// state 2 = the glass breaking
// state 3 = glass break return to first screen

// after 30 seconds the screen will switch to un perfect pitch