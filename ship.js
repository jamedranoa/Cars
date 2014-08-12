(function(root) {
  var Cars = root.Cars = (root.Cars || {});

  var Ship = Cars.Ship = function() {
    var pos = new Cars.Vector(
      Cars.Game.DIM_X/2, Cars.Game.DIM_Y -Ship.RADIUS
    );
    var vel = new Cars.Vector(0,0);
    this.img = new Image();
    this.img.src = 'car2.png'

    Cars.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);

    this.angle = -1*Math.PI/2;
  };

  Ship.inherits(Cars.MovingObject);

  Ship.RADIUS = 50;
  Ship.COLOR = "red";
}(this));