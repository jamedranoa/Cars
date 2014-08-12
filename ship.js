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

  // Ship.prototype.draw = function (ctx) {
//     ctx.fillStyle = this.color;
//     ctx.beginPath();
//
//     ctx.arc(
//       this.pos.x,
//       this.pos.y,
//       this.radius,
//       this.angle + Math.PI/2,
//       this.angle - Math.PI/2,
//       true
//     );
//
//     ctx.fill();
//   };

  Ship.RADIUS = 50;
  Ship.COLOR = "red";
}(this));