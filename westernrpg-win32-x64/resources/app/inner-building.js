function InBuilding(game) {
  this.game = game;
}

InBuilding.prototype = {
  preload: function() {
    var prevMap = this.game.global.prevMap; // --> ''
    this.game.global.prevMap = this.game.global.currentMap; // --> 'town1'
    this.game.global.currentMap = prevMap || 'inner-building1'; // --> 'inner-building1'
  },

  create: function() {
    this.game.add.text(100, 32, 'You are inside now!!!', {fill: '#fff'}).anchor.setTo(0.5);
    this.game.input.onDown.addOnce(function() {
      this.game.state.start('play');
    });
  },

  update: function() {}
}
