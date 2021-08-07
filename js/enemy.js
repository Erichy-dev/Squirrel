export class Enemy extends Phaser.Scene{
  constructor(){
    super();
  }
  preload(){
    this.load.atlas('cheetah', 'assets/enemy/cheetah.png', 'assets/enemy/cheetah.json');
  }
  create(){

    this.anims.create({
      key: 'cheetah-run',
      frames: this.anims.generateFrameNames('cheetah'),
      repeat: -1,
      frameRate: 16,
    });
    this.cheetah = this.add.sprite(512, 500, 'cheetah').setTint('black').setScale(1.3).setFlipX(true).play('cheetah-run');

    this.enemyPath = this.add.path();

    this.enemyCircle = new Phaser.Curves.Ellipse(512, 510, 400, 200);
    this.enemyCircle.clockwise = true;

    this.enemyPath.add(this.enemyCircle);

    this.cheetah.pathFollower = this.plugins.get('rexpathfollowerplugin').add( this.cheetah, {
      path: this.enemyPath,
      t: 0,
      rotateToPath: true
    });

    this.tween = this.tweens.add({
      targets: this.cheetah.pathFollower,
      t: 1,
      ease: 'Linear', //'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 3000,
      repeat: -1,
      yoyo: false
    });
  }

};