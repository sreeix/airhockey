var playfield = {
  element: document.getElementById("play_field"),
  ctx : document.getElementById("play_field").getContext("2d"),
  tableColor: "rgba(0, 0, 200, 0.5)",
  holderColor: "rgba(255, 0, 0, 1.0)",
  foreColor:"rgba(0, 0, 0, 0.5)",
  friction: .5,
  font: 'bold 20px sans-serif',

  puck:{
    "x": 300, 
    "y": 600,
    "currentVelocity": 1,
    "heading": 0,
    move:function(ms){
      this.x = this.x + (this.currentVelocity * ms * Math.cos(heading));
      this.y = this.y + (this.currentVelocity * ms * Math.sin(heading));
    }
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
  holder: function(x, y){
    this.player1 = {"x": x, "y": y};
    this.ctx.beginPath();
    this.fillStyle = this.holderColor
    this.ctx.arc(x,y, 40, 0,  Math.PI*2,false);
    this.ctx.fill();
  },
  inMyArea: function(x, y){
   return (y > this.height()/2);
  },
  movePuck: function(periodMs){
    this.puck.move(periodMs);
    this.ctx.beginPath();
    this.drawPuck();
  },
  drawPuck: function(){
    this.ctx.fillStyle = "rgba(100,100,1000,0.5)"
    this.ctx.arc(this.puck.x, this.puck.y, 25, 0,  Math.PI*2,false);
    this.ctx.fill();
  },
  roundedRect: function (x,y,width,height,radius){
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

$("#play_field").mousemove(function(e){
  playfield._debug(e.clientX, e.clientY); 
  if(playfield.inMyArea(e.clientX, e.clientY)){
    playfield.start();
    playfield.holder(e.clientX, e.clientY); 
  }
});
setInterval(function(){
  playfield.movePuck(200);
}, 200);


