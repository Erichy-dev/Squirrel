import { enemy } from "./enemy.js";
class SceneA extends Phaser.Scene {
  constructor(){
    super('SceneA');
    this.angle = 0;
  }
  preload(){
    this.load.setPath('assets/');
    this.load.image('background');
    this.load.atlas('squirrel');
    this.load.plugin('rexpathfollowerplugin', 'rexpathfollowerplugin.min.js', true);
  }
  create(){
    this.background = this.add.tileSprite(512, 384, 1024, 768, 'background');

    
    this.anims.create({
      key: 'squirrel-run',
      frames: this.anims.generateFrameNames('squirrel'),
      repeat: -1,
      frameRate: 10,
    });

    this.squirrel = this.add.sprite(120, 720, 'squirrel').setScale(0.3).setTint('black').play('squirrel-run');

    this.squirrelPath = this.add.path();

    this.squirrelCirlcle = new Phaser.Curves.Ellipse(512, 250, 200, 150);
    this.squirrelPath.add(this.squirrelCirlcle);

    this.squirrel.pathFollower = this.plugins.get('rexpathfollowerplugin').add( this.squirrel, {
      path: this.squirrelPath,
      t: 0,
      rotateToPath: true
    });

    this.tween = this.tweens.add({
      targets: this.squirrel.pathFollower,
      t: 1,
      ease: 'Linear', //'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 9000,
      repeat: -1,
      yoyo: false
    });

    this.enemyScene = this.scene.add('enemy', enemy, "autoStart");

  }
  update (time, delta){
    this.background.tilePositionX += 2;
  }
}

const config = {
  banner: {
    hidePhaser: true
  },
  url:'should be ready soon',
  title: 'Squirrel',
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example'
  },
  scene:[ SceneA ]
};
const game = new Phaser.Game(config);