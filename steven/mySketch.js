var player;
var zombieGroup;
var bulletGroup;
var spawnCounter
var playerWalkAnim;
var playerShootAnim;
var playerStandAnim;
var playerDeadAnim;
var zombieAnim;
var zombieDeadAnim;
var playerHurtStandAnim;
var playerHurtShootAnim;
var playerHurtWalkAnim;
var playerHurt2StandAnim;
var playerHurt2ShootAnim;
var playerHurt2WalkAnim;
var playerWalkAnims;
var playerShootAnims;
var playerStandAnims;
var MAX_AMMO = 75;
var ammoGroup;
var ammoImage;
function preload(){
	playerWalkAnim = loadAnimation("playerWalking_0.png", "playerWalking_2.png");
	playerWalkAnim.frameDelay = 10;
	playerHurtWalkAnim = loadAnimation("playerHurtRunning_0.png", "playerHurtRunning_1.png");
	playerHurtWalkAnim.frameDelay = 10;
	playerHurt2WalkAnim = loadAnimation("playerHurtBRunning_0.png", "playerHurtBRunning_1.png");
	playerHurt2WalkAnim.frameDelay = 10;
	//-------------------------------------------------------------------------------
	playerStandAnim = loadAnimation("playerStanding_0.png", "playerStanding_1.png");
	playerStandAnim.frameDelay = 20;
	playerHurtStandAnim = loadAnimation("playerHurtStanding_0.png", "playerHurtStanding_1.png");
	playerHurtStandAnim.frameDelay = 20;
	playerHurt2StandAnim = loadAnimation("playerHurtBStanding_0.png", "playerHurtBStanding_1.png");
	playerHurt2StandAnim.frameDelay = 20;
	//------------------------------------------------------------------------------
	playerShootAnim = loadAnimation("playerShooting_0.png","playerShooting_5.png");
	playerShootAnim.looping = false;
	playerShootAnim.frameDelay = 5;
	playerHurtShootAnim = loadAnimation("playerHurtShooting_0.png","playerHurtShooting_5.png");
	playerHurtShootAnim.looping = false;
	playerHurtShootAnim.frameDelay = 5;
	playerHurt2ShootAnim = loadAnimation("playerHurtBShooting_0.png","playerHurtBShooting_5.png");
	playerHurt2ShootAnim.looping = false;
	playerHurt2ShootAnim.frameDelay = 5;
	//----------------------------------------------------------------------------------
	playerWalkAnims = [playerWalkAnim, playerHurtWalkAnim, playerHurt2WalkAnim];
	playerStandAnims = [playerStandAnim, playerHurtStandAnim, playerHurt2StandAnim];
	playerShootAnims = [playerShootAnim, playerHurtShootAnim, playerHurt2ShootAnim];
	playerDeadAnim = loadAnimation("playerDead.png", "playerDead.png");
	zombieAnim = loadAnimation("zombie_0.png", "zombie_3.png");
	zombieAnim.frameDelay = 10;
	zombieDeadAnim = loadAnimation("zombieDead_0.png", "zombieDead_2.png");
	ammoImage = loadImage("Bullet.png");
	
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	player = createPlayer();
	zombieGroup = new Group();
	bulletGroup = new Group();
	ammoGroup = new Group();
	spawnZombies(5);
	angleMode(DEGREES);
	spawnCounter = 300;
}

function draw() {
	background("#106b43");
	
	if (player.health > 0){
		
	
		if (touches.length > 0) {
			player.attractionPoint(1, mouseX, mouseY);
			player.friction = 0.1;
		}

		if (player.getAnimationLabel().includes("shooting")){
			if (player.animation.getFrame() == 5) {
				player.setAnimWithHealth("standing");
			}
		} else {
			if (player.velocity.x > 0){
				player.mirrorX(1);
			}else{
				player.mirrorX(-1);
			}
			
			if (abs(player.velocity.x) < 0.5){
				player.setAnimWithHealth("standing");
			} else {
				player.setAnimWithHealth("walking");
			}
		}

		for (let z of zombieGroup) {
			z.attractionPoint(1, player.position.x, player.position.y);
			if (z.position.x < player.position.x){
				z.mirrorX(1);
			}else{
				z.mirrorX(-1);
			}
		}
		zombieGroup.collide(zombieGroup);
		bulletGroup.bounce(zombieGroup, bulletCollideZombie);
		player.overlap(ammoGroup, playerPickupAmmo);
		player.bounce(zombieGroup, playerCollideZombie);
		if (spawnCounter > 0){
			spawnCounter--;
		}else {
			spawnCounter = 480;
			spawnZombies(5);
		}

		textAlign(CENTER);
		//text(player.health, player.position.x, player.position.y - 30);
	}else{
		player.changeAnimation("dead");
	}
	drawSprites();
	drawStats();
}

function drawStats(){
	fill("red");
	rect(60, 10, width/4, 40);
	fill("green");
	rect(60, 10, map(player.health, 0, 60, 0, width/4), 40);
	fill("grey")
	rect(width - 60 - width/4, 10, width/4, 40);
	fill("orange");
	// hint: the width of the ammo rectangle is map(player.ammo, 0, MAX_AMMO, 0, width/4)
	let ammoRectWidth = map(player.ammo, 0, MAX_AMMO, 0, width/4);
	// x coordinate also needs to mention ammoRectWidth
	rect(width - 60 - width/4, 10, ammoRectWidth, 40)
}

function createPlayer() {
	let p = createSprite (width/2, height/2, 100, 100);
	p.health = 60;
	p.setCollider("rectangle", 0, 1, 36, 57);
	//p.debug = true;
	p.addAnimation("standing0", playerStandAnim);
	p.addAnimation("standing1", playerHurtStandAnim);
	p.addAnimation("standing2", playerHurt2StandAnim);
	p.addAnimation("walking0", playerWalkAnim);
	p.addAnimation("walking1", playerHurtWalkAnim);
	p.addAnimation("walking2", playerHurt2WalkAnim);
	p.addAnimation("shooting0", playerShootAnim);
	p.addAnimation("shooting1", playerHurtShootAnim);
	p.addAnimation("shooting2", playerHurt2ShootAnim);
	p.addAnimation("dead", playerDeadAnim);
	p.changeAnimation("walking0");
	
	p.setAnimWithHealth = function(name){
		if (this.health >= 40){
			index = 0;
		}else if(this.health >= 20){
			index = 1;
		}else {
			index = 2;
		}
		p.changeAnimation(name + index);
		console.log(name + index);
	}
	
	p.ammo = MAX_AMMO;
	return p;
}

function createZombie(x, y) {
	let z = createSprite (x, y, 100, 100);
	zombieGroup.add(z);
	z.health = 3;
	z.mass = 0.5;
	z.friction = 0.3
	z.addAnimation("walk", zombieAnim);
	z.addAnimation("dead", zombieDeadAnim);
	z.changeAnimation("walk");
	z.setCollider("rectangle", 0, -16, 28, 55);
	//z.debug = true
	return z;
}

function spawnZombies(n) {
	for (let i = 0; i < n; i++) {
		// createZombie(random(width), random(height));
		let angle = random(0, 360);
		let c = sqrt(pow(width/2, 2)+ pow(height/2, 2));
		let r = 2 * c;
		createZombie(r * cos(angle)+ width/2, r * sin(angle)+ height/2);
	}                                                                          
}

function mouseClicked() {
	if (player.ammo <= 0){
		return;
	}
	player.ammo --;
	let angle = atan2(mouseY - player.position.y, mouseX - player.position.x);
	let bullet = createSprite (player.position.x, player.position.y, 10, 10);
	player.setAnimWithHealth("shooting");
	player.animation.changeFrame(0);
	if (mouseX > player.position.x){
		player.mirrorX(1);
	}else{
		player.mirrorX(-1);
	}
	bulletGroup.add(bullet);
	bullet.setCollider("circle", 0, 0, 5);
	bullet.shapeColor = "black";
	bullet.setSpeed(10, angle);
	bullet.life = 600;
}

function bulletCollideZombie(bullet, zombie) {
	bullet.remove();
	zombie.health--;
	if (zombie.health <= 0) {
		if (random(1) < 0.3){
			let pickup = createSprite(zombie.position.x, zombie.position.y, 100, 100);
			pickup.addImage("ammo", ammoImage);
			pickup.changeAnimation("ammo");
			ammoGroup.add(pickup);
			
		}
		zombie.remove();
	}
}


function playerCollideZombie(player, zombie){
	player.health --;
}


function playerPickupAmmo(player, pickup){
	player.ammo = min(player.ammo + 15, MAX_AMMO);
	pickup.remove();
}