export function startSceneBackground(startScene){
  startScene.add.image(512, 384, 'backgroundd').setAlpha(0.7);

  let clouds = startScene.add.image(1024, 32, 'clouds').setOrigin(0);

  startScene.tweens.add({
    targets: clouds,
    x: -1250,
    ease: 'Linear',
    duration: 400000,
    repeat: -1
  });

  let fog = startScene.add.image(1024, 200, 'fog').setOrigin(0);

  startScene.tweens.add({
    targets: fog,
    x: -3000,
    ease: 'Linear',
    duration: 300000,
    repeat: -1
  });

  let pic = startScene.add.image(512, 384, 'tombs');
  pic.setPipeline('Light2D');


  let light1 = startScene.lights.addLight(280, 400, 200);
  let ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 70, 100);

  let light2 = startScene.lights.addLight(650, 386, 200);
  let ellipse2 = new Phaser.Geom.Ellipse(light2.x, light2.y, 30, 40);

  let light3 = startScene.lights.addLight(900, 400, 200); 

  startScene.time.addEvent({
    delay: 100,
    callback: function ()
    {
        Phaser.Geom.Ellipse.Random(ellipse1, light1);
        Phaser.Geom.Ellipse.Random(ellipse2, light2);
    },
    callbackScope: startScene,
    repeat: -1
  });

  startScene.tweens.add({
    targets: [ light3 ],
    y: 150,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1,
    duration: 3000
  });

  startScene.lights.enable();

  startScene.anims.create({
    key: 'flicker',
    frames: startScene.anims.generateFrameNames('candle', { prefix: 'candleFl', start: 1, end: 14 }),
    repeat: -1,
    frameRate: 16,
    repeatDelay: function ()
    {
        return Math.random() * 6;
    }
  });

  startScene.add.sprite(652, 386, 'candle').setScale(0.25).play('flicker');
  startScene.add.sprite(260, 400, 'candle').setScale(0.5).play('flicker');

  startScene.add.image(512, 384, 'overlay');

}