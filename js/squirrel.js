import { enemy , player, playerControls } from "../index.js";
class SceneA extends Phaser.Scene {
  constructor(){
    super('SceneA');
  }
  preload(){
    this.load.atlas('cheetah', 'assets/enemy/cheetah.png', 'assets/enemy/cheetah.json');

    this.load.setPath('assets/');
    this.load.image('background');
    this.load.atlas('squirrel');
    this.load.plugin('rexpathfollowerplugin', 'rexpathfollowerplugin.min.js', true);
  }
  create(){
    this.background = this.add.tileSprite(512, 384, 1024, 768, 'background');

    this.cursors = this.input.keyboard.createCursorKeys();

    player(this);
    
    this.settedT = 0;
    this.squirreSpeedRange = [5, 3, 8];
    
    enemy(this);

  }
  update (time, delta){
    this.background.tilePositionX += 3;

    playerControls(this, delta);
  }
}

const config = {
  banner: {
    hidePhaser: true
  },
  url:'should be ready soon',
  title: 'Squirrel',
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example'
  },
  scene:[ SceneA ]
};
const game = new Phaser.Game(config);