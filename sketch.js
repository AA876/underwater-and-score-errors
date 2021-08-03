
var JUNGLE = 1
var UNDERWATER = 2
var END = 0
var gameState = "JUNGLE"


function preload(){
  boypose = loadAnimation("images/firstpose.png", "images/secondpose.png","images/thirdpose.png","images/fourthpose.png", "images/fifthpose.png")
boycollided = loadAnimation("images/collidedboyimage.png")

junglebackgroundimg = loadImage("images/junglebackground.jpg")
underwaterbackgroundimg = loadImage("images/underwaterbackgroundforgame.png")

obstacle1 = loadImage("images/obstacle1image.png")
obstacle2 = loadImage("images/obstacle2image.png")
obstacle3 = loadImage("images/obstacle3image.png")
obstacle4 = loadImage("images/obstacle4image.png")

restartimg = loadImage("images/restartimageforgamecropped.png")
gameOverimg = loadImage("images/gameoverimageforgamecropped.png")

jumpSound = loadSound("sounds/jumpSound.mp3")
collidedSound = loadSound("sounds/collidedSound.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight)

  jungle = createSprite(width-1000, height-450)
  jungle.addImage(junglebackgroundimg)
  jungle.scale = 3.2
    
  
 
  boy = createSprite(100,height-60,20,50)
  boy.addAnimation("running", boypose)
  boy.addAnimation("collided",boycollided)
  boy.scale = 0.4

  invisibleGround = createSprite(width/2,height-2,width,5);  
  invisibleGround.shapeColor = "#f4cbaa";
  invisibleGround.x = invisibleGround.width/2
  invisibleGround.visible = false

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverimg); 
  restart = createSprite(width/2,height/1.8);
  restart.addImage(restartimg);
  gameOver.scale = 0.7;
  restart.scale = 0.1;
  gameOver.visible = false
  restart.visible = false
  gameOver.scale = 0.7
  restart.scale = 0.2 

  obstaclesGroup = new Group()
  longObstaclesGroup = new Group()
  spaceObstaclesGroup = new Group()

  score = 0

}

function draw() {
  //boy.debug = true;

  fill ("red")
  strokeWeight(4)
  textSize(28)
  text("Score: "+ score, 1000,50);
  
  if (gameState==="JUNGLE"){
    score = score + Math.round(getFrameRate()/60);
    invisibleGround.velocityX = -(6 + 3*score/100);

    jungle.velocityX = -6
    if(jungle.x < 300){
      jungle.x = jungle.width
      }

  
    if(keyDown("space") && boy.y >= 469) {
      boy.velocityY = -8;
      jumpSound.play()
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
  
    boy.collide(invisibleGround);

    spawnObstacles()
    spawnLongObstacles()

  
    if(obstaclesGroup.isTouching(boy)){
        gameState = "END";
    }

    if(longObstaclesGroup.isTouching(boy)){
      gameState = "END";

    console.log(score)

      if(score >= 40){
        gameState = "UNDERWATER"
      }
  }


  if (gameState==="UNDERWATER"){
    
    var underwater = createSprite(width-1000, height-450)
    underwater.addImage(underwaterbackgroundimg)
    underwater.scale = 2
    
    invisibleGround.velocityX = -(6 + 3*score/100);

    underwater.velocityX = -8
    if(underwater.x < 85){
      underwater.x = underwater.width
      }

  
    if(keyDown("space") && boy.y >= 469) {
      boy.velocityY = -8;
      jumpSound.play()
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
  
    boy.collide(invisibleGround);

    spawnObstacles()
    spawnLongObstacles()

  
    if(obstaclesGroup.isTouching(boy)){
        gameState = "END";
    }

    if(longObstaclesGroup.isTouching(boy)){
      gameState = "END";


      //if(score >= 350){
        //gameState = SPACE
      //}
  }
}


  }
  else if (gameState === "END") {
    gameOver.visible = true;
    restart.visible = true;
    
    jungle.velocityX = 0
    invisibleGround.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    longObstaclesGroup.setVelocityXEach(0)
    
    boy.changeAnimation("collided",boycollided);
    
    obstaclesGroup.setLifetimeEach(-1);
    longObstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }


drawSprites()

}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1150,height-25,20,30);
    obstacle.setCollider('circle',0,0,5)
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle3);
              break;
      default: break;
    }   
    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
    obstacle.depth = boy.depth;
    boy.depth +=1;
    obstaclesGroup.add(obstacle);
  }
}

function spawnLongObstacles(){
  if(frameCount % 347 === 0) {
    var longObstacle = createSprite(1150,height-15,20,30);
    longObstacle.setCollider('circle',0,0,15)

    longObstacle.velocityX = -(6 + 5*score/100);
    longObstacle.addImage(obstacle1)
    longObstacle.scale = 0.5;
    longObstacle.lifetime = 300;
    longObstacle.depth = boy.depth;
    boy.depth +=1;
    longObstaclesGroup.add(longObstacle);
  }
}

function reset(){
  gameState = "JUNGLE";
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  longObstaclesGroup.destroyEach();
 
  
  boy.changeAnimation("running",boypose);
  
  score = 0;
  }