function Battle(game) {
  this.game = game;
  this.background;
  this.player;
  this.enemy;
  this.testText;
  this.textBox;
}

Battle.prototype = {
  preload: function() {
    this.game.load.image('background', './assets/desert-background.jpg');
    this.game.load.image('player', './assets/battle-cowboy.png');
    this.game.load.image('enemy', './assets/battle-enemy.png');
  },

  create: function() {

    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();

    this.enemy = this.game.add.sprite(-75, 75, 'enemy');
    this.enemy.anchor.setTo(0.5);
    this.enemy.scale.setTo(2);
    this.game.add.tween(this.enemy).to({x: this.game.width - 75}, 1500, Phaser.Easing.Linear.None, true);

    this.player = this.game.add.sprite(this.game.width + 100, this.game.height - 120, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(5);
    this.game.add.tween(this.player).to({x: 100}, 1500, Phaser.Easing.Linear.None, true);

    this.textBox = this.game.add.graphics(0, this.game.height - 100);
    this.textBox.beginFill(0x000000, 1);
    this.textBox.drawRect(0, 0, this.game.width, 100);
    this.textBox.lineStyle(3, 0xffffff, 1);
    this.textBox.moveTo(0, 0);
    this.textBox.lineTo(this.game.width, 0);
    this.textBox.lineTo(this.game.width, 97);
    this.textBox.lineTo(0, 97);
    this.textBox.lineTo(0, 0);

    this.testText = this.game.add.text(this.game.width / 2, this.game.height - 50, 'Rustler wants to fight!');
    this.testText.anchor.setTo(0.5);
    this.testText.font = 'VT323';
    this.testText.fontSize = 24;
    this.testText.fill = '#fff';

    this.game.input.onDown.addOnce(function() {
      this.game.state.start('play');
    });
  },

  update: function() {},

  render: function() {
    //this.game.debug.geom(this.textBox, '#f00');
  }
}
