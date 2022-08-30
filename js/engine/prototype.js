Loader = PIXI.Loader.shared,
Resources = PIXI.Loader.shared.resources,
Graphics = PIXI.Graphics,
Texture = PIXI.Texture,
Container = PIXI.Container,
Rectangle = PIXI.Rectangle,
AnimatedSprite = PIXI.AnimatedSprite,
ParticleContainer = PIXI.ParticleContainer;
Sprite = PIXI.Sprite;

/* contenedor padre */
Layer = class extends PIXI.Container {
  constructor (cont) {
    super();
    this.width = cont.width;
    this.height = cont.height;
    this.x = 0;
    this.y = 0;
    cont.addChild(this);
  }
};

/* camara */
Camera = class {
  constructor (layer, options) {
    this.layer = layer;
    if (options) {
      layer.w = options.w;
      layer.h = options.h;
    }
  }
  
  setPosition (x, y, force) {
    force ? this.force = force : null;
    this.x = x;
    this.y = y;
    force ? this.force = false : null;
  }
  
  get x () {return this.layer.x}
  get y () {return this.layer.y}
  set x (x) {
    let layer = this.layer;
    if ((x < 0 && x > - layer.w) || this.force) layer.x = x;
  }
  set y (y) {
    let layer = this.layer;
    if ((y < 0 && y > - layer.h) || this.force) layer.y = y;
  }
};