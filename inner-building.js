function InBuilding(game) {
  this.game = game;
}

InBuilding.prototype = {
  preload: function() {
    if(!this.game.global.currentMap) {
      this.game.global.currentMap = 'interior1';
    }
    console.log('Before tilemap load');
    console.log(this.game.global.currentMap);
    this.game.load.tilemap(this.game.global.currentMap, './assets/' + this.game.global.currentMap + '.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('interiorTiles', './assets/tiles.png');
    this.game.load.spritesheet('player', './assets/player-walk.png', 16, 24);
  },

  create: function() {
    this.interiorJSON = this.game.cache.getJSON('interiors');
    //this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.game.add.tilemap(this.game.global.currentMap);
    this.map.addTilesetImage('tiles', 'interiorTiles');

    this.floorLayer = this.map.createLayer('Floor');
    this.doorLayer = this.map.createLayer('Doors');

    this.player = this.game.add.sprite(this.game.global.playerX, this.game.global.playerY, 'player');

    if(this.hitDoor) {
      this.player.y += 20;
      this.hitDoor = false;
    }

    this.player.anchor.setTo(0.5);
    this.player.scale.x = this.game.global.playerDir;
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
    this.player.animations.add('walk', [0, 1, 2, 3], 8, true);
    this.player.body.setSize(10, 9, 0, 7);
    this.player.body.collideWorldBounds = true;

    this.floorLayer.resizeWorld();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.gamepad.start();
    this.pad1 = this.game.input.gamepad.pad1;
    console.log('Controller connected?', this.pad1.connected, this.game.input.gamepad.padsConnected);
  },

  update: function() {

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.up.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
      this.player.body.velocity.y = -50;
      this.player.animations.play('walk');
    } else if (this.cursors.down.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
      this.player.body.velocity.y = 50;
      this.player.animations.play('walk');
    }

    if (this.cursors.left.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      this.player.body.velocity.x = -50;
      this.player.scale.x = -1;
      this.player.animations.play('walk');
    }
    else if (this.cursors.right.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      this.player.body.velocity.x = 50;
      this.player.scale.x = 1;
      this.player.animations.play('walk');
    }

    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.animations.stop();
      this.player.frame = 1;
    }
  },

  playerIsMoving: function() {
    if (this.player.body.velocity.x !== 0) {
      return true;
    } else if (this.player.body.velocity.y !== 0) {
      return true;
    } else {
      return false;
    }
  },

  shutdown: function() {
    this.game.global.playerX = this.player.x;
    this.game.global.playerY = this.player.y;
    this.game.global.playerDir = this.player.scale.x;
  }
}
