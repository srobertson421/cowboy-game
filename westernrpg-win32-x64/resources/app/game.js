var game = new Phaser.Game(400, 300, Phaser.CANVAS, '');

game.global = {
  playerX: 75,
  playerY: 75,
  playerDir: 1,
  currentMap: '',
  prevMap: ''
}

game.state.add('load', new Load(game));
game.state.add('play', new Play(game));
game.state.add('battle', new Battle(game));
game.state.add('inner-building', new InBuilding(game));

game.state.start('load');
