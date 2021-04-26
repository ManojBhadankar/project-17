
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(600,500)
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(500,490,900,10)
  ground.x=ground.width/2;

  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  

   score=0
}


function draw() {
  
  background("green")
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  
  spawnObstacles();
  spawnBanana();
  
  if (keyDown("space")&& monkey.y>=300){
    monkey.velocityY=-15;
  }
  
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score = score+1
  }
  
  
monkey.velocityY=monkey.velocityY+0.8
  
  monkey.collide(ground);
  
  drawSprites();
  
  fill("white");
  text("Score:" + score ,500,50);
  
  textSize(18)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50)         

}

function spawnObstacles(){
  if(frameCount%150===0){
  var obstacle=createSprite(400,450,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    
    var rand=Math.round(random(1,18))
    switch(rand){
    case 1:obstacle.addImage(obstacleImage);
    break;
    default:break;}
  
  
  obstacle.scale=0.25;
  obstacle.lifetime=-1;
    
    obstacleGroup.add(obstacle);
}
}
 function spawnBanana(){
   if(frameCount% 160===0){
     banana=createSprite(400,100,40,10);
     banana.y=Math.round(random(250,300));
     banana.addImage(bananaImage);
     banana.scale=0.1   ;
     banana.velocityX=-3;
     banana.lifetime=-1;
     
     
     banana.depth=monkey.depth;
     monkey.depth=monkey.depth+1;
      
     bananaGroup.add(banana);
   }
 }
  

