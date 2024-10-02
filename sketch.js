let clouds;

function setup() {
     //Creates a canvas that is 600 pixels wide
    //and 400 pixels high
     createCanvas(1000, 600);

     cloud = loadImage("assets/clouds.png");

    }
    function draw() {
        //sky background
      background(205, 240, 255);
      image(cloud, 40, 50);
    }
