
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
let sfx;
let imgX;
let imgY;


function preload() {
  clouds = loadImage("assets/clouds.png");
  ladder = loadImage("assets/ladder.png");
  gif_createImg = createImg("assets/mang.GIF");
  pitch = loadImage("assets/pitch.JPG")


  //glass shattering sound effect
  soundFormats('mp3')
  sfx = loadSound('Broken glass sound effect (high quality).mp3');
  sfx.setVolume(0.2)
}

function setup() {
  createCanvas(1000, 1000);
  
  //vertical gui slider
  gui = createGui();
  x = createSliderV("Slider", 50, 50);

  //initialize mic input
  mic = new p5.AudioIn();
  mic.start();

  imgX = -500
  imgY = -500
}

function draw() {

  switch (state) {
  case 0:

    image(pitch, 0, 0, width, height);

    if(mouseIsPressed) state = 1;
  break;

  case 1:

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

  //loads image offscreen 
  image(img, imgX, imgY, 200, 200)


  }

  // Get the sound level from the microphone
  soundLevel = mic.getLevel();

  // Map the sound level to the slider value
  x.val = map(soundLevel, 0, 1, 0, 100);

  if (x.isChanged) {
    print(x.label + " = " + x.val);
  }

}

//interactivity
function mousePressed() {
  //calls image
    imgX = mouseX - 80
    imgY = mouseY + 40

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