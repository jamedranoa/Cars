(function(root) {
  var Cars = root.Cars = (root.Cars || {});

  var MovingObject = Cars.MovingObject = function(pos, vel,radius,color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function() {
    DIM_X = Cars.Game.DIM_X
    DIM_Y = Cars.Game.DIM_Y
    this.pos = this.pos.sum(this.vel);
    this.pos.x = this.pos.x 
    this.pos.y = this.pos.y
  };


  MovingObject.prototype.draw = function (ctx) {
    if(this.img) {
    			ctx.save();
    			ctx.translate(this.pos.x,this.pos.y);
    			ctx.drawImage(this.img, -(this.radius), -(this.radius), this.radius*2, this.radius*2);
    			ctx.restore();
    		} else{
      ctx.fillStyle = this.color;
      ctx.beginPath();

      ctx.arc(
        this.pos.x,
        this.pos.y,
        this.radius,
        0,
        2 * Math.PI,
        true
      );

      ctx.fill();
    }
  };

  MovingObject.prototype.isCollidedWith = function (movingObject) {
    var collided = this.pos.x == movingObject.pos.x && this.pos.y + this.radius*2> movingObject.pos.y
    return collided
  };


})(this);

Function.prototype.inherits = function (Super) {
  function Surrogate(){};
  Surrogate.prototype = Super.prototype
  this.prototype = new Surrogate();
};