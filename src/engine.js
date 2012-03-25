Sprite = function(_x, _y)
{
  return {
    draw : function(self)
    {
      if(!self.image) { return; }

      context.drawImage(self.image, self.x - self.width / 2, self.y - self.height / 2);
    },

    update : function(self) { },

    x: _x,
    y: _y,
    width: 0,
    height: 0,
    image: null,
  }
}


TextSprite = function(_x, _y, _text)
{
  return {
    draw : function(self)
    {
      if(!self.text) { return; }

      context.font = self.font;
      context.fillStyle = self.color;
      context.fillText(self.text, self.x, self.y);
    },

    update : function(self) { },

    x: _x,
    y: _y,
    text: _text,
    font: "12pt helvetica",
    color: "000000",
  }
}