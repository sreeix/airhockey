function RoundObj(stuffToMove) {
  this.stuffToMove = stuffToMove;
  this.acceleration = 0;
};

var flatworld = {
  friction: .5,
  stuff: [],
  setBounds: function(width, height){
    this.height = height;
    this.width = width;
  },
  addRoundObject: function(obj){
    this.stuff.push(new RoundObj(obj));
  },
  _invertVertical: function(val){
    return (2 *Math.PI) - val;
  },
  update: function(updateInterval){
    for( var i =0; i<this.stuff.length;i++){
      var obj = this.stuff[i];
      var x = obj.stuffToMove.x + (obj.stuffToMove.velocity * updateInterval * Math.cos(obj.stuffToMove.heading));
      var y = obj.stuffToMove.y + (obj.stuffToMove.velocity * updateInterval * Math.sin(obj.stuffToMove.heading));
      if(x > this.width || x < 0 ){
        var head = (3* Math.PI) - obj.stuffToMove.heading;
        obj.stuffToMove.heading = (head > 2*Math.PI) ? (head - 2* Math.PI) : head
      }
      if(y > this.height || y  < 0){
        obj.stuffToMove.heading = this._invertVertical(obj.stuffToMove.heading);
      }
      obj.stuffToMove.x = x;
      obj.stuffToMove.y = y;
    }
  }
};