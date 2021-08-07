export async function enemy(scene){
  await new Promise(resolve => {setTimeout(() => resolve(), 6000)});
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
      ease: 'Linear', //'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 3000,
      repeat: -1,
      yoyo: false
    });

    scene.physics.world.enable([scene.squirrel, scene.cheetah], 0);
    scene.physics.add.collider(scene.squirrel, scene.cheetah, collidercallback, null, scene);

    function collidercallback (squirrel, cheetah){
      scene.scene.pause('SceneA');
    }
};