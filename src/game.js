// list of objects to draw and update
scene = [];

// time
time = 0;
//delta time
dt = 0.02;

// add "?date" to the end of a url to make sure stuff doesn't get cached
nocache = "?" + (new Date()).getTime();


// Constructs a sprite which updates and renders itself
Sprite = function(x, y)
{
  return {
    draw : function(self)
    {
      if(self.image)
      {
        context.drawImage(self.image, self.x - self.width / 2, self.y - self.height / 2);
      }
    },

    update : function(self)
    {

    },

    x: x,
    y: y,
    width: 0,
    height: 0,
    image: null,
  }
}

// Called for each frame
tick = function()
{
  context.fillStyle = "rgba(255,255,255,1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for(i = 0; i < scene.length; i++)
  {
    scene[i].update(scene[i]);
  }
  
  for(i = 0; i < scene.length; i++)
  {
    scene[i].draw(scene[i]);
  }

  time += dt;
}

// Set up all the objects
initializeScene = function()
{
  
  bg = Sprite(0, 0);
  bg.image = new Image()
  bg.image.src = "assets/art/testBackground.png" + nocache;

  player = Sprite(150, 220);
  player.image = new Image();
  player.image.src = "assets/art/boy.png" + nocache;
  player.width = 35;
  player.height = 95;

  player.update = function(self) {
    self.x += Math.sin(time * 2) * dt * 10;
    self.y -= dt * 5;
  }

  scene.push(bg);
  scene.push(player);
}

// Called onload by the host page
runGame = function()
{
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");
  initializeScene();
  setInterval(tick, 20);
}