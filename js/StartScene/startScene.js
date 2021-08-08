import { startSceneBackground } from "./startSceneBackground.js";

export class StartScene extends Phaser.Scene{
  constructor(){
    super('Start');
  }
  preload(){
    this.load.atlas('squirrel', '../assets/squirrel.png', '../assets/squirrel.json');
    this.load.plugin('rexpathfollowerplugin', '../assets/rexpathfollowerplugin.min.js', true);

    this.load.setPath('../assets/AudioFile/');
    this.load.audio('hip-latin', 'hip-latin-jazz.mp3');

    this.load.setPath('../assets/StartScene/');
    this.load.image('light', 'light.png');
    this.load.atlas('candle');
    this.load.image('background');
    this.load.image('clouds');
    this.load.image('fog');
    this.load.image('overlay');
    this.load.image('tombs', ['tombs.png', 'tombs_n.png']);
    this.load.image('tombsNormalMap', 'tombs_n.png');
  }
  create(){
    let musicConfig = {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    this.music = this.sound.add('hip-latin', musicConfig);
    this.music.play(musicConfig);
    
    this.anims.create({
      key: 'squirrel-run',
      frames: this.anims.generateFrameNames('squirrel'),
      repeat: -1,
      frameRate: 7,
    });
    
    this.squirrel = this.add.sprite(500, 700, 'squirrel').setScale(0.7).setTint('0xff01234').play('squirrel-run');

    startSceneBackground(this);

    this.add.text(50, 50, 'Click anywhere to start').setScale(3).setTint('0xff01234');
    this.add.text(100, 100, 'up to increase speed\ndown to decrease').setScale(2).setTint('0xff01234');

    this.input.on('pointerdown', function (){
      this.scene.launch('SceneA');
      this.music.pause();
      this.scene.stop('Start');
    }, this);
  }
};