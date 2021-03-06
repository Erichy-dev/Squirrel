import { StartScene} from './../index.js';

export class Preloader extends Phaser.Scene{
  constructor(){
    super()
  }
  preload(){
    //Start scene
    this.load.atlas('squirrel', 'squirrel.png', 'squirrel.json');
    this.load.audio('hip-latin', 'hip-latin-jazz.mp3');
    this.load.image('light', 'light.png');
    this.load.atlas('candle');
    this.load.image('backgroundd', 'backgroundd.png');
    this.load.image('clouds');
    this.load.image('fog');
    this.load.image('overlay');
    this.load.image('tombs', ['tombs.png', 'tombs_n.png']);
    this.load.image('tombsNormalMap', 'tombs_n.png');
    this.load.bitmapFont('ice', 'iceicebaby.png', 'iceicebaby.xml');
    this.load.image('button');
    this.load.image('start');

    // squirrel scene
    this.load.audio('red-moon', 'red-moon.mp3');
    this.load.atlas('cheetah', 'cheetah.png', 'cheetah.json');
    this.load.image('background');
    this.load.atlas('squirrel');
    this.load.plugin('rexpathfollowerplugin', 'rexpathfollowerplugin.min.js', true);
  }
  create(){
    this.scene.start('Start');
  }
}