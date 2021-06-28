let game, score=0, gameOver=0, player, stars, bombs, platforms, cursors, scoreText;

window.onload = function(){
  let config = {
    type: Phaser.AUTO,
    width: 660,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene:playGame
  };
  let game = new Phaser.Game(config);
  window.focus();
}
class playGame extends Phaser.Scene {
  constructor(){
    super('PlayGame');
  }
  preload(){
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }
  create(){
    this.add.image(330, 300, 'sky');

    platforms = this.physics.add.staticGroup();
  
    platforms.create(330, 568, 'ground').setScale(2).refreshBody();
  
    platforms.create(500, 380, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(610, 220, 'ground');
  
    player = this.physics.add.sprite(100, 450, 'dude');
  
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
  
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
  
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
  
    cursors = this.input.keyboard.createCursorKeys();
  
    stars = this.physics.add.group({
        key: 'star',
        repeat: 10,
        setXY: { x: 10, y: 0, stepX: 60 }
    });
  
    stars.children.iterate(function (child) {
  
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
    });
  
    bombs = this.physics.add.group();
  
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
  
    this.physics.add.overlap(player, stars, collectStar, null, this);
  
    this.physics.add.collider(player, bombs, hitBomb, null, this);
  }
  update (){
  
    if (cursors.left.isDown){
        player.setVelocityX(-160);
  
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown){
        player.setVelocityX(160);
  
        player.anims.play('right', true);
    }
    else{
        player.setVelocityX(0);
  
        player.anims.play('turn');
    }
  
    if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }
  }
}
function collectStar (player, star){
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0){
      stars.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);

      });

      let x = (player.x < 330) ? Phaser.Math.Between(330, 660) : Phaser.Math.Between(0, 330);

      let bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

  }
}
function hitBomb (player, bomb){
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  this.scene.start('PlayGame');
}