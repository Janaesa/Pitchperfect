let gui;
let x;
let clouds;

function preload(){
  clouds = loadImage("assets/clouds.png");
}

function setup() {
     //Creates a canvas that is 600 pixels wide
    //and 400 pixels high
     createCanvas(1000, 1000);
     gui = createGui();
     x = createSliderV("Slider",50,50);

    }


    function draw() {
        //sky background
      background(205, 240, 255);
      image(clouds, 40, 50);
      image(clouds, 300,30);
      image(clouds, 600,5);
      drawGui();

      if(x.isChanged) {
        print(x.label + " = " + x.val);
      }
      
    }

    function touchMoved() {
      return false;
    }