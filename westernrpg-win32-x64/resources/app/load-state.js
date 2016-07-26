//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
  active: function() { game.time.events.add(Phaser.Timer.SECOND, function() {
    game.state.start('play');
  }, this); },

  google: {
    families: ['VT323']
  }
};

function Load(game) {
  this.game = game;
}

Load.prototype = {
  preload: function() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    this.game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
  }
}
