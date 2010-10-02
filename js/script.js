var playfield = {
  element: document.getElementById("play_field"),
  ctx : document.getElementById("play_field").getContext("2d"),
  table_color: "rgba(0, 0, 200, 0.5)",
  holder_color: "rgba(255, 0, 0, 1.0)",
  fore_color:"rgba(0, 0, 0, 0.5)",
  friction: .5,
  font: 'bold 20px sans-serif',
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
    this.ctx.fillStyle = this.table_color;
    this.roundedRect(0,0, this.width(), this.height(), 15)
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height()/2);

    this.ctx.lineTo(this.width(), this.height()/2);
    this.ctx.stroke();
    this._draw_holes();
    this._draw_slots();
  },
  _draw_slots: function(){
    var slotSize = 150;

    this.ctx.fillStyle = this.fore_color;
    this.roundedRect(this.width()/2 - slotSize/2, 0, slotSize, 15, 5);
    this.roundedRect(this.width()/2 - slotSize/2, this.height() - 15, slotSize, 20, 5);
  },
  _draw_holes:function(){
    var startXDistance = 50;
    var startYDistance = 50;
    for(var y=0 ; y< 14; y++) {
      for(var i =0; i< 9; i++){
        this.ctx.fillStyle = this.fore_color
        this.ctx.beginPath();
        this.ctx.arc( startXDistance+ i*50, startYDistance + y*50, 1.5 , 0, Math.PI*2,false);
        this.ctx.fill();
      };
    }
  },
  _debug: function(x, y){
    log("debugging", x,y);
    this.ctx.fillStyle = this.table_color
    this.ctx.textBaseline = "top";
    this.ctx.fillRect(450,650, 50,100);
    this._text(x, 450, 650);
    this._text(y, 450, 675);
  },
  _text: function(str, x, y){
    this.ctx.font = this.font;
    this.ctx.strokeText  (str, x, y);
    
  },
  showHolder: function(x, y){
    this.ctx.beginPath();
    this.fillStyle = this.holder_color
    this.ctx.arc(x,y, 40, 0,  Math.PI*2,false);
    this.ctx.fill();
  },
  inMyArea: function(x, y){
   return (y > this.height()/2);
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

playfield.start();

$("#play_field").mousemove(function(e){
  playfield._debug(e.clientX, e.clientY); 
  if(playfield.inMyArea(e.clientX, e.clientY)){
    playfield.start();
    playfield.showHolder(e.clientX, e.clientY); 
  }
});

