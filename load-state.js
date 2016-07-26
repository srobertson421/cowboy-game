function Load(game) {
  this.game = game;
}

Load.prototype = {
  preload: function() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.refresh();
    this.game.load.json('interiors', 'interiors.json');
  },

  create: function() {
    this.game.state.start('play');
  }
}
