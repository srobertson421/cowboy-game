function Play(game) {
  this.game = game;
  this.player;
  this.map;
  this.groundLayer;
  this.pathLayer;
  this.buildingLowerLayer;
  this.buildingUpperLayer;
  this.windowLayer;
  this.doorLayer;
  this.cursors;
  this.battleTimer = 0;
  this.battleCheckStarted;
  this.inBattleZone
}

Play.prototype = {
  preload: function() {

    console.log('before change, ', this.game.global);

    var prevMap = this.game.global.prevMap;
    console.log(prevMap);
    this.game.global.prevMap = this.game.global.currentMap;
    this.game.global.currentMap = prevMap || 'town1';
    console.log('after change, ', this.game.global);

    this.battleCheckStarted = false;
    this.inBattleZone = false;

    this.game.load.tilemap(this.game.global.currentMap, './assets/' + this.game.global.currentMap + '.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', './assets/Tile.png');
    this.game.load.spritesheet('player', './assets/player-walk.png', 16, 24);
  },

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.game.add.tilemap(this.game.global.currentMap);
    this.map.addTilesetImage('Tile', 'tiles');

    this.groundLayer = this.map.createLayer('Ground');
    this.pathLayer = this.map.createLayer('Path');
    this.buildingLowerLayer = this.map.createLayer('BuildingLower');
    //buildingLowerLayer.debug = true;
    this.doorLayer = this.map.createLayer('Doors');
    //doorLayer.debug = true;
    this.windowLayer = this.map.createLayer('Windows');
    //windowLayer.debug = true;

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

    this.buildingUpperLayer = this.map.createLayer('BuildingUpper');

    this.map.setCollision([2, 6, 7, 15, 16, 17, 18, 19, 40, 44, 59, 60, 61], true, this.buildingLowerLayer);
    //this.map.setCollision([3, 25, 35], true, this.doorLayer);
    this.map.setCollision([4, 5, 8, 47], true, this.windowLayer);

    this.map.setTileIndexCallback([25, 3, 35], function(sprite, tile) {

      if (this.hitDoor) {
        return;
      }

      console.log('Change to inside state!');
      this.hitDoor = true;
      setTimeout(function() {
        this.game.state.start('inner-building');
      }, 500);
    }, this, this.doorLayer);

    this.map.setTileIndexCallback([41, 42], function(sprite, tile) {
      this.inBattleZone = true;
      this.startBattleCheck();
    }, this, this.pathLayer);

    this.groundLayer.resizeWorld();

    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.game.physics.arcade.collide(this.player, this.buildingLowerLayer);
    this.game.physics.arcade.collide(this.player, this.doorLayer);
    this.game.physics.arcade.collide(this.player, this.windowLayer);
    this.game.physics.arcade.collide(this.player, this.pathLayer);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -50;
      this.player.animations.play('walk');
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 50;
      this.player.animations.play('walk');
    }

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -50;
      this.player.scale.x = -1;
      this.player.animations.play('walk');
    }
    else if (this.cursors.right.isDown) {
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

  startBattleCheck: function() {

    if (!this.inBattleZone) {
      return;
    }

    if (this.inBattleZone && this.game.time.now > this.battleTimer && this.playerIsMoving()) {
      var chance = this.game.rnd.integerInRange(1, 40);
      console.log(chance);
      if (chance === 7) {
        this.game.state.start('battle');
      } else {
        this.battleTimer = this.game.time.now + 200;
      }
    }
  },

  render: function() {
    //this.game.debug.body(player);
  },

  shutdown: function() {
    this.game.global.playerX = this.player.x;
    this.game.global.playerY = this.player.y;
    this.game.global.playerDir = this.player.scale.x;
  }
}
