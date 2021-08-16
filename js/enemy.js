export async function enemy(scene){
  await new Promise(resolve => {setTimeout(() => resolve(), 9000)});
    scene.anims.create({
      key: 'cheetah-run',
      frames: scene.anims.generateFrameNames('cheetah'),
      repeat: -1,
      frameRate: 16,
    });
    scene.cheetah = scene.add.sprite(512, 500, 'cheetah').setTint('black').setScale(1.3).setFlipX(true).play('cheetah-run');

    scene.enemyPath = scene.add.path();

    scene.enemyCircle = new Phaser.Curves.Ellipse(512, 510, 400, 180);
    scene.enemyCircle.clockwise = true;

    scene.enemyPath.add(scene.enemyCircle);

    scene.cheetah.pathFollower = scene.plugins.get('rexpathfollowerplugin').add( scene.cheetah, {
      path: scene.enemyPath,
      t: 0,
      rotateToPath: true,
    });

    scene.tween = scene.tweens.add({
      targets: scene.cheetah.pathFollower,
      t: 1,
      ease: 'Linear',
      duration: 3000,
      repeat: -1,
      yoyo: false
    });

    scene.physics.world.enable([scene.squirrel, scene.cheetah], 0);
    scene.physics.add.collider(scene.squirrel, scene.cheetah, collidercallback, null, scene);

    async function collidercallback (squirrel, cheetah){
      scene.add.text(100, 100, 'R.I.P').setScale(2).setTint(0xff0012);
      scene.scene.pause();
      await new Promise (resolve=>{setTimeout(()=> {resolve()}, 3000)});
      scene.musicA.stop();
      let musicConfig = {
        mute: false,
        volume: 0.2,
        rate: 1,
        loop: true,
      };
  
      scene.startSMusic = this.sound.add('hip-latin', musicConfig);
      scene.startSMusic.play(musicConfig);
  
      scene.scene.stop('SceneA');
      scene.scene.wake('Start');
    }
};