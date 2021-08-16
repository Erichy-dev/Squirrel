import { startSceneBackground } from "./startSceneBackground.js";

export class StartScene extends Phaser.Scene{
  constructor(){
    super('Start');
  }
  preload(){
    this.load.atlas('squirrel', '../assets/squirrel.png', '../assets/squirrel.json');

    this.load.setPath('../assets/AudioFile/');
    this.load.audio('hip-latin', 'hip-latin-jazz.mp3');

    this.load.setPath('../assets/StartScene/');
    this.load.image('light', 'light.png');
    this.load.atlas('candle');
    this.load.image('backgroundd', 'backgroundd.png');
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
      loop: true,
    };

    this.music = this.sound.add('hip-latin', musicConfig);
    this.music.play(musicConfig);
    
    this.anims.create({
      key: 'squirrel-run',
      frames: this.anims.generateFrameNames('squirrel'),
      repeat: -1,
      frameRate: 21,
    });

    this.squirrel = this.add.sprite(500, 670, 'squirrel').setScale(0.7).setTint('0xff01234').play('squirrel-run');

    startSceneBackground(this);

    this.add.text(50, 50, 'Click anywhere to start').setScale(1.5).setTint('black');
    this.add.text(50, 80, 'up to increase speed\ndown to decrease').setScale(1.8).setTint('black');
    this.add.text(50, 130, 'Make sure he does not get caught').setScale(1.5).setTint('black');

    this.input.on('pointerdown', function (){
      this.music.stop();
      this.scene.sleep();
      this.scene.launch('SceneA')
    }, this);
  }
};