export function playerControls (scene, delta){
  scene.squirrelSpeed = scene.squirreSpeedRange[0];

  if(scene.cursors.up.isDown)scene.squirrelSpeed = scene.squirreSpeedRange[1]
  if (scene.cursors.down.isDown)scene.squirrelSpeed = scene.squirreSpeedRange[2];

  scene.squirrelRate = scene.settedT += 1 / (scene.squirrelSpeed * delta);
  if(scene.squirrelRate > 1){scene.settedT = 0;scene.squirrelRate = 0;}

  scene.squirrel.pathFollower.setT(scene.squirrelRate);
}
