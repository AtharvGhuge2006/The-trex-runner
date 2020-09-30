var trex,trexp, ground,groundp, obstacles,clouds,flat,cloudimg,ob1,ob2,ob3,ob4,
    ob5,ob6,cg,og,trex_collided;
var gamestate=1//playstate is 1
var score=0
var die, checkpoint,jump;
var gameover,restart,go,rstart;
localStorage["high"]=0
function preload (){
  trexp=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundp=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
    ob2=loadImage("obstacle2.png");
    ob3=loadImage("obstacle3.png");
    ob4=loadImage("obstacle4.png");
    ob5=loadImage("obstacle5.png");
    ob6=loadImage("obstacle6.png");
    trex_collided=loadAnimation("trex_collided.png");
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  go=loadImage("gameOver.png")
  rstart=loadImage("restart.png");
}
function setup(){
  createCanvas(600,300);
  trex=createSprite(50,275,20,20);
  trex.addAnimation("trexrun",trexp);
  trex.scale=0.6
  ground=createSprite(300,280);
  ground.addImage("moceground",groundp);
  flat = createSprite(50,295,50,10);
  flat.visible=false;
  cg=new Group()
  og=new Group()
  trex.setCollider("circle",0,0,50)
  trex.addAnimation("trexcollided",trex_collided)
 
    gameover=createSprite(300,50,20,20)
    gameover.addImage("gameo",go)
    restart=createSprite(300,100,20,20)
    restart.addImage("rt",rstart)
    restart.scale=0.8
  gameover.visible=false
  restart.visible=false
}
function draw(){
  background("white");
  drawSprites();
  text("score:- "+score,25,25)
  text("high score:-"+localStorage["high"],500,25)
  if (gamestate===1){
    ground.velocityX=-(5+2*score/25);
   if (ground.x<0){
     ground.x=ground.width/2}
  if (keyDown("space")&&trex.y>245){
    trex.velocityY=-12
  jump.play()
    
  }
  trex.velocityY=trex.velocityY+0.8;
  spawncloud();
  spawnobstacles();
  if (trex.isTouching(og)){
      gamestate=0;
    die.play();
    
  }
    score=score+Math.round(getFrameRate()/60)
    if (score%100===0 && score>0){
    checkpoint.play()
    }
    restart.visible=false
  gameover.visible=false
    trex.changeAnimation("trexrun",trexp)
  }
  if (gamestate===0){
   ground.velocityX=0 
  og.setVelocityEach(0,0)
    cg.setVelocityEach(0,0)
    og.setLifetimeEach(-1)
    cg.setLifetimeEach(-1)
      gameover.visible=true
  restart.visible=true
    trex.changeAnimation("trexcollided",trex_collided)
    if (mousePressedOver(restart)){
      reset();
    }
  
  }
   trex.collide(flat)
  
}
function spawncloud (){  
  if (frameCount%60===0) {
   cloud =createSprite(600,150,20,20)
    cloud.y=random(150,200)
    cloud.velocityX=-(4+2*score/25)
    cloud.addImage("cloudp",cloudimg)
    trex.depth=cloud.depth+1 
    cloud.lifetime=150
    cg.add(cloud)
  }
} 
function spawnobstacles (){
  if (frameCount%100===0){
    obstacles=createSprite(600,270,20,20)
   obstacles.velocityX=-(5+2*score/25)
    var rand = Math.round(random(1,6))
    console.log(rand)
    switch(rand){
      case 1: obstacles.addImage("cactus1",ob1) 
     break;
     case 2: obstacles.addImage("cactus2",ob2) 
     break;
     case 3: obstacles.addImage("cactus3",ob3) 
     break;
     case 4: obstacles.addImage("cactus4",ob4) 
     break;
     case 5: obstacles.addImage("cactus5",ob5) 
     break;
     case 6: obstacles.addImage("cactus6",ob6) 
     break;
     default: break;
    }
    obstacles.scale=0.6
    obstacles.lifetime=120
    og.add(obstacles)
  }
}
function reset(){
  gamestate=1
  restart.visible=false
  gameover.visible=false
  og.destroyEach();
  cg.destroyEach();
  if (score>localStorage["high"]){
    localStorage["high"]=score
  }
  score=0
  
}