status = "";
img = "";
objects = [];
function preload(){
    img = loadImage("pikachu.png");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}


function modelLoaded(){
    console.log("CocoSSD is ready to identify!");
    status = true;
}

function gotResults(error, results){
    if(error)
    { console.log(error);}
        console.log(results);
        objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("nob").innerHTML = "Number of objects: " +objects.length;
            fill(r, g, b);
            stroke(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent +"%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
//fill(255, 0, 0);
//stroke(255, 0, 0);
//text("Dog", 100, 55);
//text("Cat", 325, 90);
//noFill();
//rect(100, 60, 200, 250);
//rect(300, 90, 100, 150);
}