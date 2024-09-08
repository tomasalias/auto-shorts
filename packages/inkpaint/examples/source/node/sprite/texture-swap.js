var app = new InkPaint.Application();
document.body.appendChild(app.view);

module.exports = app;


var bol = false;

var texture = InkPaint.Texture.fromImage(paths('source/assets/flowerTop.png'));
var secondTexture = InkPaint.Texture.fromImage(paths('source/assets/eggHead.png'));

// create a new Sprite using the texture
var dude = new InkPaint.Sprite(texture);

// center the sprites anchor point
dude.anchor.set(0.5);

// move the sprite to the center of the screen
dude.x = app.screen.width / 2;
dude.y = app.screen.height / 2;

app.stage.addChild(dude);

// make the sprite interactive
dude.interactive = true;
dude.buttonMode = true;

dude.on('pointertap', function() {
    bol = !bol;
    if (bol) {
        dude.texture = secondTexture;
    } else {
        dude.texture = texture;
    }
});

var ticker = new InkPaint.Ticker();
ticker.start();
ticker.add(function() {
    app.render();
    // just for fun, let's rotate mr rabbit a little
    dude.rotation += 0.1;
});
