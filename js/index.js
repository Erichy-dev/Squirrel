class SceneA extends Phaser.Scene {
  constructor(){
    super('SceneA');
  }
  preload(){
    this.load.setPath('assets/');
    this.load.image('background');
    this.load.atlas('squirrel')
    this.load.image('mine');
  }
  create(){
    this.background = this.add.tileSprite(512, 384, 1024, 768, 'background');

    
    this.anims.create({
      key: 'squirrel-run',
      frames: this.anims.generateFrameNames('squirrel'),
      repeat: -1,
      frameRate: 10,
    });
    
    this.squirrel = this.add.sprite(120, 720, 'squirrel').setScale(0.7).setTint('black').play('squirrel-run');
  }
  update (){
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