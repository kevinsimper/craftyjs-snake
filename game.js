Crafty.init('300','300', document.getElementById('game'));
Crafty.pixelart(true);
Crafty.background('black');

Crafty.c('Snake', {
  init: function() {
    this.requires('Color, 2D, Canvas');
    this.bind('EnterFrame')
    this.bind('EnterFrame', this.moveSnake);
    this.bind('KeyDown', function(e) {
      if(e.key == Crafty.keys.LEFT_ARROW) {
        if(this.currentDirection.x === 0){
          this.currentDirection = {x: -1, y: 0};
        }
      } else if (e.key == Crafty.keys.RIGHT_ARROW) {
        if(this.currentDirection.x === 0){
          this.currentDirection = {x: 1, y: 0};
        }
      } else if (e.key == Crafty.keys.UP_ARROW) {
        if(this.currentDirection.y === 0){
          this.currentDirection = {x: 0, y: -1};
        }
      } else if (e.key == Crafty.keys.DOWN_ARROW) {
        if(this.currentDirection.y === 0){
          this.currentDirection = {x: 0, y: 1};
        }
      }
    });
  },
  currentDirection: {x: 0, y: -1},
  moveInSteps: 0,
  moveSnake: function(dt) {
    var oldPosition = {x: this.x, y: this.y};
    if(this.moveInSteps < 250){
      this.moveInSteps += 20;
    } else {
      this.moveInSteps = 0;
      this.x += this.currentDirection.x * this.w;
      this.y += this.currentDirection.y * this.w;
      
      var nextPartPosition = oldPosition;
      for(var i = 0; i < snakeParts.length; i++){
        var snakePart = snakeParts[i];
        currentPartPosition = {x: snakePart.x, y: snakePart.y};
        snakePart.attr(nextPartPosition);
        nextPartPosition = currentPartPosition;
        // console.log('snakePart' + i, {x: snakePart.x, y: snakePart.y});
      }
    }


  }
});

var snakeParts = [];
var snake = Crafty.e('Color, Snake, Collision')
                  .attr({x: 150, y: 150, w: 10, h: 10})
                  .color('red')
                  .onHit('SnakePart', function(data){
                    var oldPoint = data[0].obj;
                    var snakePart = Crafty.e('Canvas, 2D, Color')
                                          .attr({x: oldPoint.x, y: oldPoint.y, w: 10, h: 10})
                                          .color('red');
                    snakeParts.push(snakePart);
                    data[0].obj.destroy();
                    spawnPart();
                  });

function spawnPart() {
  var part = Crafty.e('SnakePart, Color, 2D, Canvas, Collision')
                   .attr({x: Crafty.math.randomInt(1,29) * 10, y: Crafty.math.randomInt(1,29) * 10, w: 10, h: 10}).color('white');
}

spawnPart();