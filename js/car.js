(function(root) {
  var Cars = root.Cars = (root.Cars || {});

  var Asteroid = Cars.Asteroid = function(pos,speed) {
    var randomAngle = Math.PI/2;

    
    var vel = Cars.Vector.fromPolar(randomAngle,speed);
    var radius = 50;
    this.img = new Image();
    this.img.src = 'images/car.png'

    Cars.MovingObject.call(this, pos, vel, radius, Asteroid.COLOR)
  };
  
  Asteroid.generateManyCars = function (positions,speed) {
    var cars = []
    positions.forEach(function (position) {
      var pos = new Cars.Vector(position,0)
      var new_car = new Cars.Asteroid(pos,speed)
      cars.push(new_car)
    })
    return cars
  };

  Asteroid.COLOR = "#52527A";

  Asteroid.inherits(Cars.MovingObject);




}(this));