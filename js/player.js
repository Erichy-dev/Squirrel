export function player (scene){
  scene.anims.create({
    key: 'squirrel-run',
    frames: scene.anims.generateFrameNames('squirrel'),
    repeat: -1,
    frameRate: 7,
  });

  scene.squirrel = scene.add.sprite(120, 720, 'squirrel').setScale(0.3).setTint('black').play('squirrel-run');

  scene.squirrelPath = scene.add.path();

  scene.squirrelCirlcle = new Phaser.Curves.Ellipse(512, 250, 200, 150);
  scene.squirrelPath.add(scene.squirrelCirlcle);

  scene.squirrel.pathFollower = scene.plugins.get('rexpathfollowerplugin').add( scene.squirrel, {
    path: scene.squirrelPath,
    t: 0,
    rotateToPath: true
  });

}