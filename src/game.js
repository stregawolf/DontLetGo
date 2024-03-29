// add "?date" to the end of a url to make sure stuff doesn't get cached
nocache = "?" + (new Date()).getTime();

// include the engine code
document.write("<script type='text/javascript' src='src/engine.js"+nocache+"'></script>");

// list of objects to draw and update
scene = [];

// time
time = 0;
//delta time
dt = 0.02;

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


  messagebox = TextSprite(3, 295, "");
  messagebox.messages = [ [0, "hello there."], [5, "what's up?"], [10, ""] ];
  messagebox.update = function(self)
  {
    if(messageinfo = self.messages[0])
    {
      self.text = messageinfo[1].substring(0, (time-messageinfo[0]) * 4);
      if(self.messages.length > 1 && time >= self.messages[1][0])
      {
        self.messages.shift();
      }
    }
  }

  scene.push(bg);
  scene.push(player);
  scene.push(messagebox);
}

// Called onload by the host page
runGame = function()
{
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");
  initializeScene();
  setInterval(tick, 20);
}
