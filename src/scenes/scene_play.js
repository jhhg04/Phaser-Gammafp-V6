import Pales from '../gameObjects/pales.js';

export default class Scene_play extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scene_play',
    });
  }
  create() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    // Draw Separator
    this.add.image(center_width, center_height, 'separator');

    // Draw Pales
    // this.left = this.add.image(30, center_height, 'left');
    this.left = new Pales(this, 30, center_height, 'left');
    // this.right = this.add.image(
    //   this.sys.game.config.width - 30,
    //   center_height,
    //   'right'
    // );
    this.right = new Pales(
      this,
      this.sys.game.config.width - 30,
      center_height,
      'right'
    );

    // Draw Ball
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.ball = this.physics.add.image(center_width, center_height, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocityX(-180);

    // Physics
    this.physics.add.collider(this.ball, this.left, this.hitPale, null, this);
    this.physics.add.collider(this.ball, this.right, this.hitPale, null, this);

    // Controls
    // Right Pale
    this.cursor = this.input.keyboard.createCursorKeys();
    // Left Pale
    this.cursor_W = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.cursor_S = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }
  update() {
    if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
      this.ball.setPosition(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2
      );
    }

    // Controls Pales
    // Right Pale
    if (this.cursor.down.isDown) {
      this.right.body.setVelocityY(300);
    } else if (this.cursor.up.isDown) {
      this.right.body.setVelocityY(-300);
    } else {
      this.right.body.setVelocityY(0);
    }

    // Left Pale
    if (this.cursor_S.isDown) {
      this.left.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.left.body.setVelocityY(-300);
    } else {
      this.left.body.setVelocityY(0);
    }
  }

  hitPale() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
  }
}
