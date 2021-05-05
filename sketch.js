var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var clouds, clouds_img, ded, terod;
var ground, ground_img, ground_infinite;
var trex, trex_running, jumpS, checkPointt, trex_ded,trex_crouch;
var edges;
var score;
var clouuds_2;
var obstacless_2;
var state, game_over, gameover_img, restart, restart_img;
function preload(){
  trex_running =        loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png");
  clouds_img = loadImage("cloud.png") 
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  jumpS = loadSound("jump.mp3")
  checkPointt = loadSound("checkPoint.mp3");
  ded = loadSound("die.mp3");
  trex_ded = loadAnimation("trex_collided.png")
  gameover_img = loadImage("gameOver.png")
  restart_img = loadImage("restart.png")
  trex_crouch = loadAnimation("trex_down1.png","trex_down2.png");
  terod = loadAnimation("tero1.png","tero2.png");
}

function setup() {
// cualquier ancho
  createCanvas(windowWidth, 200);
  
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("game_over",trex_ded);
  trex.addAnimation("crouched",trex_crouch);
  
  
  trex.setCollider("circle",0,0,40);
  //trex.debug = true;
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  //edges)
  edges = createEdgeSprites();
  //ground
  ground = createSprite(200,180,600,20)
  ground.addImage("ground",ground_img);
  ground.x = ground.width /2;
  //piso falso e infinito
  ground_infinite = createSprite(200,190,420,10);
  ground_infinite.visible = false;
  score = 0;
  clouuds_2 = new Group ();
  obstacless_2 = new Group ();
  teroos = new Group();
  state = "start";
  //que siempre estene en el centro
  game_over = createSprite(width/2,90,20,20);
  game_over.addImage(gameover_img);
  game_over.scale = 0.5
  game_over.visible = false
  restart = createSprite(width/2,130,20,20);
  restart.addImage(restart_img);
  restart.scale = 0.5
  restart.visible = false
}

function draw() {
  background("black");
  //para poder aparecer de forma adecuada
  text("Score:"+ score,width-90,40);
  
  if (state === "start"&& (keyDown ("space")||touches.length > 0) ){
  state = "play";
    touches = [];
  }
  
  if(state === "play"){
    //mejoras
    trex.velocityY = trex.velocityY + 0.7
  animate_clouds();
  obstacles();
    teros();
  ground.velocityX = -4;
  score = score + Math.round (frameCount /350);
    //cambio de estado de juego
    if(keyWentDown(DOWN_ARROW)){
      trex.changeAnimation("crouched",trex_crouch);
      trex.scale = 0.4;
    }
     if(keyWentUp(DOWN_ARROW)){
      trex.changeAnimation("running",trex_running);
   trex.scale = 0.5; 
     }
    
  if(trex.isTouching(obstacless_2)){
  trex.changeAnimation("game_over",trex_ded);
    state = "end";
  }
  }
  
  //estado de game over
  if(state === "end"){
  ground.velocityX = 0;
    clouuds_2.setVelocityXEach (0);
    obstacless_2.setVelocityXEach (0);
    trex.velocityY = 0;
    //text("game over!",300,100);
    restart.visible = true
     game_over.visible = true
  clouuds_2.setLifetimeEach(-1);
  obstacless_2.setLifetimeEach(-1);
    teroos.setVelocityYEach (0);
  if (mousePressedOver(restart)||touches.length > 0){
   play_again();  
    touches = [];
  }
  }
  //console.log(frameCount);
  
  //console.log(trex.y);
  
 if(ground.x < 0){
  ground.x = ground.width /2; 
   
   
 }
  
  //jumping the trex on space key press and the limit of the jump
  if((keyDown("space")||touches.length > 0)&&trex.y>= 100) {
    trex.velocityY = -10;
    touches = [];
    jumpS.play();
  }
  
  
  
  
 
  
  
  
  
  
  
 //stop trex from falling down 
  trex.collide(ground_infinite);
  //clouds
  drawSprites();
  
}
//funcion que crea nubes

function animate_clouds(){
//el patron de cantidad del que van las nubes
if(frameCount%115=== 0){
    clouds = createSprite (width + 50,20,20,20)
    //sprite
    clouds.addImage(clouds_img);
    //tamaño del sprite
    clouds.scale = 0.9;
    //velocidad en la que aparecen
  clouds.depth = trex.depth;
  trex.depth = trex.depth + 1;
    clouds.velocityX = -3;
    //patron aleatorio de las nubes
    clouds.y = Math.round (random (1,70));
  clouds.lifetime = 290;
  clouuds_2.add (clouds); 
  
    console.log("clouds"+clouds.depth);
    console.log("dinosaur"+trex.depth);
}
}

function obstacles(){
  //patron de la cantidad de los cactus
  if(frameCount%100=== 0){
    //crear,poner la velocidad y tamaño de el obstaculo
    obstacle = createSprite (width + 50,165,20,20)
     obstacle.velocityX = -5;
    obstacle.shapeColor = "green";
     obstacle.scale = 0.6;
    
    //poner un patron aleatorio de imagenes (spritres)
    var rand = Math.round (random (1,6));
    switch (rand){
      case 1:
        obstacle.addImage ("obs",obstacle1);
        break;
         case 2:
        obstacle.addImage ("obs2",obstacle2);
        break;
         case 3:
        obstacle.addImage ("obs3",obstacle3);
        break;
         case 4:
        obstacle.addImage ("obs4",obstacle4);
        break;
         case 5:
        obstacle.addImage ("obs5",obstacle5);
        break;
         case 6:
        obstacle.addImage ("obs6",obstacle6);
        break;
        default:
        break;
        
    }
    obstacle.lifetime = 270;
    obstacless_2.add (obstacle); 
  }
}
//restart
function play_again(){
  console.log("count")
  state = "start"
  game_over.visible = false;
  restart.visible = false;
  obstacless_2.destroyEach();
  clouuds_2.destroyEach();
  teroos.destroyEach();
  trex.changeAnimation("running", trex_running);
  trex.y = 180;
  score = 0;
}
//terodactilo
function teros(){
  if (frameCount%200 ===0){
  var   tero = createSprite(width + 50,20,20,20);
  tero.addAnimation("fly",terod);
    tero.velocityX = -3;
    tero.velocityY = 0.7;
    teroos.add (tero);
    tero.lifetime = 270;
  }
 
  
  
  
  
  
  
}
//muchas gracias por ser mi maestra :)