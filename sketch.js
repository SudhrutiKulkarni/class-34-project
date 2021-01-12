var dog, happyDog;
var database;
var foodS, foodStock;

function preload() {
  dogImg = loadImage("images/dogimg.png");
  happyDog = loadImage("images/dog1.png");
  database = firebase.database();
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 250, 10, 10);
  dog.addImage("dog1", dogImg);
  dog.scale = 0.2
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  //dog.addAnimation("happyDog",dogimg  )

}


function draw() {
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)) {
       writeStock(foodS);
  }

  if(foodStock>20){
    dog.changeImage(dogimg , "happyDog" );
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  text("Food Stock :" + foodS, 180, 100)

  textSize(20);
  fill("black");
  text("Note : Press Up Arrow Key To Feed The Dog With Milk ", 10, 50)



}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({ food: x })
}



