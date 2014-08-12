(function(root) {
  var Cars = root.Cars = (root.Cars || {});

  var Game = Cars.Game = function(ctx) {
    this.cars = [];
    this.speed = 2;
    this.ship = new Cars.Ship();
    this.bullets = [];
    this.counter = 0;
    this.ctx = ctx;
    this.xDim = Game.DIM_X;
    this.yDim = Game.DIM_Y;
    this.generateCars();
  };
  
  Game.CAR_SIZE = Cars.Ship.RADIUS
  Game.POSIBLE_POS= [Game.CAR_SIZE/2,Game.CAR_SIZE +   Game.CAR_SIZE/2,2*Game.CAR_SIZE + Game.CAR_SIZE/2]
  
  Game.prototype.generateCars = function () {
   
    var positions = []
    if (this.cars.length === 0) {
      while (positions.length < 2) {
        positions.push(Game.POSIBLE_POS[Math.floor(Math.random() * 3)])
      }
      console.log(positions)
      var new_cars = Cars.Asteroid.generateManyCars(positions,this.speed);

      this.cars = new_cars
     
    }
  };

  Game.prototype.movingObjects = function () {
    return this.cars.concat(this.bullets).concat([this.ship])
  };

  Game.DIM_X = Cars.Ship.RADIUS * 3;
  Game.DIM_Y = 500;
  Game.MAX_SPEED = 2.87;
  Game.COUNTER = 0;
  

  Game.prototype.draw = function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.xDim, this.yDim);

    this.movingObjects().forEach(function(movingObj){
      movingObj.draw(ctx);
    });
  };

  Game.prototype.move = function () {
    this.movingObjects().forEach(function(movingObj){
      movingObj.move();
    });
  };

  Game.prototype.changeVel = function (dir) {
    var delta = (dir==="up" ? 0.01 : -0.01)
    this.ship.vel = this.ship.vel.sum(
      Cars.Vector.fromPolar(this.ship.angle, delta));
    this.ship.vel = Cars.Vector.fromPolar(
      this.ship.vel.angle(),
      Math.min(Game.MAX_SPEED, this.ship.vel.magnitude()));
  }

  Game.prototype.step = function () {
   

    this.move();
    this.draw();

  };

  Game.prototype.checkCollisions = function (myVar) {
    var game = this;
    this.cars.forEach(function(astr, i){

      if (astr.isCollidedWith(game.ship)) {
        game.stop(myVar);
      }
      
    });
  };
  
  Game.prototype.levelUp = function () {
    if (this.speed < 3) {
      this.speed += this.speed * 0.1
    }else if (this.speed  < 4) {
      this.speed += this.speed * 0.05    
    }
    
  };

  Game.prototype.removeObjects = function () {
    this.cars.forEach(function(astr, i){
      if (astr.pos.y > Game.DIM_Y + 100) {
              game.cars = [];
            }
    });
  };
  
  
  Game.prototype.repoblateCars = function () {
    if (game.cars.length === 0) {
      game.levelUp();
      game.generateCars();
      if (game.speed < 2) {
        game.speed += game.speed*0.1;
      }
      game.counter += 1;
    }
  }

  Game.prototype.stop = function (myVar) {
    clearInterval(myVar);
    $(".again").removeClass("hidden");
  };
  
  Game.prototype.bindKeys = function () {
    key("left",function () {
      if(game.ship.pos.x === Game.POSIBLE_POS[1]){
        game.ship.pos.x = Game.POSIBLE_POS[0]
      } else if(game.ship.pos.x === Game.POSIBLE_POS[2]){
        game.ship.pos.x = Game.POSIBLE_POS[1]
      }
    })
    
    key("right",function () {
      console.log(game.ship.pos.x)
      if(game.ship.pos.x === Game.POSIBLE_POS[1] ){
        game.ship.pos.x = Game.POSIBLE_POS[2]
      } else if(game.ship.pos.x === Game.POSIBLE_POS[0]){
        game.ship.pos.x = Game.POSIBLE_POS[1]
      }
    })
    
  }

  Game.prototype.start = function () {
    var game = this;

    game.bindKeys();
    
    var inter = window.setInterval(function () {gameFunc()}, 1);

    var gameFunc = function () {
      game.step();
      game.removeObjects();
      game.ctx.font= "40pt Arial";
      game.ctx.fillStyle = "green"
      game.ctx.fillText(game.counter,10,50);
      game.checkCollisions(inter);
      game.repoblateCars();
      
    };

  };
}(this));