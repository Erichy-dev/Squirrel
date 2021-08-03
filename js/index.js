class SceneA extends Phaser.Scene {
  constructor(){
    super('SceneA');
  }
  preload(){
    this.load.setPath('assets/');
    this.load.image('background', 'background.png');
    this.load.image('bomb', 'mine.png');
  }
  create(){
    this.background = this.add.tileSprite(512, 384, 1024, 768, 'background');
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