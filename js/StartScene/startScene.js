import { startSceneBackground } from "./startSceneBackground.js";

let button, musicSetting, musicOff = false;
export class StartScene extends Phaser.Scene{
  constructor(){
    super('Start');
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

    button = this.make.image({
      key: 'button', 
      x: 700, 
      y: 100,
      alpha: 0.5
    }).setInteractive();
    musicSetting = this.add.bitmapText(600, 80, 'ice', 'MUSIC', 50);

    musicOff? musicSetting.setText('musicoff'): musicSetting.setText('MUSIC');
    button.on('pointerup', () =>{
      if(!musicOff){
        musicSetting.setText('musicoff');
        this.sound.setMute(true);
        musicOff = true;
      }else {
        this.sound.setMute(false);
        musicOff = false;
        musicSetting.setText('MUSIC');
      }
    });

    let startButt = this.make.image({
      x:800,
      y:400,
      alpha: 0.5,
      key:'start',
    }).setInteractive();

    let startText = this.add.dynamicBitmapText(740, 380, 'ice', 'PLAY', 50).setTint('0xff2299');

    startButt.on('pointerup', () => {
      this.scene.start('SceneA');
    });

  }
};