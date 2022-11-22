var ball_diameter = 30;
var ball_diameter = 10;
var xpoint;
var ypoint;
var zapperwidth = 6;
var numofbombs=20;
var bombposX=[];
var bombposY=[];
var bombacceleration=[];
var bombvelocity=[];
var time=0;
var timeperiod=0;
var score=0;
var posX;

function setup(){
    createCanvas(715,480);
    var temp00 = 0, temp01 =-20;
    while(temp01<height){
        temp00+=0.02;
        temp01+=temp00;
        timeperiod++;
    }
    posX = ball_diameter * 0.5 +zapperwidth - 2;
    xpoint = 0.5 * width;
    ypoint = height - ball_diameter * 0.5 +1;
   
    initBombPos();
}

function draw(){
    background(0);

    fill(239,58,38);
    rect(0,0,zapperwidth,height);

    scoreUpdate();

    fill(255,127,50);
    for(var i=0; i<numofbombs;i++){
        ellipse(bombposX[i],bombposY[i],ball_diameter,ball_diameter);
    }

    updateBombPos();
   
    fill(0,255,0);
    ellipse(xpoint,ypoint,ball_diameter,ball_diameter);
    xpoint-=3;

    if(mouseIsPressed && (xpoint + 0.5 * ball_diameter)< width){
        xpoint+=4;
    }

    if(xpoint <= posX || bombCollisionTest()){
        gameover();
    }

    time +=1;

}

function initBombPos(){
    for(var i=0; i<numofbombs;i++){
        bombacceleration[i]= random(0.02, 0.03);
        bombvelocity[i]= random(0,5);
        bombposX[i] = random(zapperwidth+(0.5*ball_diameter),width);
        bombposY[i] = random(-20,-0.5*ball_diameter);
    }
}
function updateBombPos(){

    for(var i=0; i<numofbombs;i++){
        bombvelocity[i]+=bombacceleration[i];
        bombposY[i]+=bombvelocity[i];
    }

    if(time>timeperiod){
        initBombPos();
        time=0;
    }
}

function bombCollisionTest(){
    var temp = 0.5*(ball_diameter+ball_diameter)-2;
    var distance;
   
    for(var i=0; i<numofbombs; i++){
        distance = dist(xpoint,ypoint,bombposX[i],bombposY[i]);
        if(distance<temp){
            return true;
        }
    }
    return false;
}
function gameover(){
    fill(255);
    text("GAME OVER", 0.5*width,0.5*height);
    noLoop();
}

function scoreUpdate(){
    score+=10;
    fill(255);
    text("SCORE: " + int(score/timeperiod),width -65,15);
}