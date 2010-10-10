function Striker(color, xRange, yRange){
  this.color = color,
  this.size = 40,
  this.position = {x: xRange[0], y: yRange[0]},
  this.range = {x: xRange, y: yRange},
  this.inMyArea = function(x, y){
    return (y > yRange[0] && y < yRange[1] && x > xRange[0] && x < xRange[1]);
  },

  this.draw = function(ctx, x, y){
    if(this.inMyArea(x, y)){
      this.position = {"x": x, "y": y};
    }
    ctx.beginPath();
    this.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, 40, 0,  Math.PI*2,false);
    ctx.fill();
  }
};

var playfield = {
  element: document.getElementById("play_field"),
  ctx : document.getElementById("play_field").getContext("2d"),
  tableColor: "rgba(0, 0, 200, 0.5)",
  holderColor: "rgba(255, 0, 0, 1.0)",
  foreColor:"rgba(0, 0, 0, 0.5)",
  friction: .5,
  font: 'bold 20px sans-serif',
  player1: new Striker("rgba(255,0,0,.5)", [0, 500], [0,350]),
  player2: new Striker("rgba(255,0,0,.5)", [0, 500], [350,700]),
  puck:{
    x: 300, 
    y: 600,
    velocity: 1,
    heading: Math.PI,
    radius: 25
  },
  
  start: function(){
    this._draw();
  },
  width: function(){
    return this.element.width;
  },
  height: function(){
    return this.element.height;
  },
  _draw: function(){
    this.ctx.fillStyle = this.tableColor;
    this.roundedRect(0,0, this.width(), this.height(), 15);
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height()/2);

    this.ctx.lineTo(this.width(), this.height()/2);
    this.ctx.stroke();
    this._drawHoles();
    this._drawSlots();
  },
  _drawSlots: function(){
    var slotSize = 150;

    this.ctx.fillStyle = this.foreColor;
    this.roundedRect(this.width()/2 - slotSize/2, 0, slotSize, 15, 5);
    this.roundedRect(this.width()/2 - slotSize/2, this.height() - 15, slotSize, 20, 5);
  },
  _drawHoles:function(){
    var startXDistance = 50;
    var startYDistance = 50;
    for(var y=0 ; y< 14; y++) {
      for(var i =0; i< 9; i++){
        this.ctx.fillStyle = this.foreColor
        this.ctx.beginPath();
        this.ctx.arc( startXDistance+ i*50, startYDistance + y*50, 1.5 , 0, Math.PI*2,false);
        this.ctx.fill();
      };
    }
  },
  _debug: function(x, y){
    this.ctx.fillStyle = this.tableColor
    this.ctx.textBaseline = "top";
    this.ctx.fillRect(450,650, 50,100);
    this._text(x, 450, 650);
    this._text(y, 450, 675);
  },
  _text: function(str, x, y){
    this.ctx.font = this.font;
    this.ctx.strokeText  (str, x, y);
    
  },
  refresh: function(){
    this.ctx.beginPath();
    this.drawPuck();
  },
  drawPuck: function(){
    this.ctx.fillStyle = "rgba(100,100,1000,0.5)"
    this.ctx.arc(this.puck.x, this.puck.y, this.puck.radius, 0,  Math.PI*2, false);
    this.ctx.fill();
  },
  roundedRect: function (x, y, width, height, radius){
    this.ctx.beginPath();
    this.ctx.moveTo(x, y+radius);
    this.ctx.lineTo(x, y+height-radius);
    this.ctx.quadraticCurveTo(x, y+height, x+radius, y+height);
    this.ctx.lineTo(x+width-radius, y+height);
    this.ctx.quadraticCurveTo(x+width, y+height, x+width, y+height-radius);
    this.ctx.lineTo(x+width, y+radius);
    this.ctx.quadraticCurveTo(x+width, y, x+width-radius,y);
    this.ctx.lineTo(x+radius,y);
    this.ctx.quadraticCurveTo(x, y, x, y+radius);
    this.ctx.fill();
  }
};

// playfield.start();
flatworld.setBounds(playfield.width(), playfield.height());
flatworld.addRoundObject(playfield.puck);
$("#play_field").mousemove(function(e){
  playfield._debug(playfield.puck.x, playfield.puck.y); 
  playfield.start();
  playfield.player1.draw(playfield.ctx, e.clientX, e.clientY); 
});
setInterval(function(){
  flatworld.update(200);
  playfield.refresh();
}, 200);


