import { enemy , player, playerControls, StartScene } from "../index.js";
class SceneA extends Phaser.Scene {
  constructor(){
    super('SceneA');
  }
  preload(){
    
    this.load.setPath('assets/');
    this.load.audio('red-moon', 'AudioFile/red-moon.mp3');
    this.load.atlas('cheetah', 'enemy/cheetah.png', 'enemy/cheetah.json');
    this.load.image('background');
    this.load.atlas('squirrel');
    this.load.plugin('rexpathfollowerplugin', 'rexpathfollowerplugin.min.js', true);
  }
  create(){
    let musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.musicA = this.sound.add('red-moon', musicConfig);
    this.musicA.play();

    this.background = this.add.tileSprite(512, 384, 1024, 768, 'background');

    this.cursors = this.input.keyboard.createCursorKeys();

    player(this);
    
    this.settedT = 0;
    this.squirreSpeedRange = [5, 2, 8];//you can embelish the squirrel's speed to your liking.
    //[5] => optimal speed
    //[2.5] => accelerated speed
    //[8] => deccelerated speed
    
    enemy(this);

  }
  update (time, delta){
    this.background.tilePositionX += 3;

    playerControls(this, delta);
  }
}

window.onload = function (){
  const config = {
    audio: {
      disableWebAudio: false
    },
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
    scene:[ StartScene, SceneA ]
  };
  const game = new Phaser.Game(config);
  window.focus();
};