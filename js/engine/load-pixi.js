
/* (evento) al cargar pixi */
function OnLoadPixi () {
  Loader = PIXI.Loader.shared,
  Resources = PIXI.Loader.shared.resources,
  Graphics = PIXI.Graphics,
  Texture = PIXI.Texture,
  Rectangle = PIXI.Rectangle,
  Sprite = PIXI.Sprite,
  AnimatedSprite = PIXI.AnimatedSprite,
  ParticleContainer = PIXI.ParticleContainer;

  /* application */
  Application = class {
    constructor (opt) {
      let renderer = new PIXI.CanvasRenderer(opt);
      let stage = new PIXI.Container();
      let ticker = PIXI.Ticker.shared;

      this.renderer = renderer;
      this.stage = stage;
      this.ticker = ticker;
      this.view = renderer.view;

      ticker.add(function(){renderer.render(stage)});
    }
  };

  /* extender contenedor */
  Container = class extends PIXI.Container {
    constructor () {
      super();
      let that = this;

      let anchor = {
        get x () {return that.pivot.x / that.width},
        set x (v) {that.pivot.x = that.width * v},
        get y () {return that.pivot.y / that.height},
        set y (v) {that.pivot.y = that.height * v},
        set (anchorX, anchorY) {
          this.x = anchorX;
          if (typeof anchorY != "undefined") this.y = anchorY;
        }
      };
      this.anchor = anchor;
    }
  };


  /* contenedor global */
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
      force ? this.force = force: null;
      this.x = x;
      this.y = y;
      force ? this.force = false: null;
    }

    get x () {return this.layer.x}
    get y () {return this.layer.y}
    set x (x) {
      let layer = this.layer;
      if ((x < 0 && x > - layer.w + WIDTH) || this.force) layer.x = x;
    }
    set y (y) {
      let layer = this.layer;
      if ((y < 0 && y > - layer.h + HEIGHT) || this.force) layer.y = y;
    }
  };


  /* generar array de texturas */
  TextureList = class {
    constructor (src) {
      let list = [];
      for (let texture_id in src) list.push(src[texture_id]);
      this.textures = list;
    }

    sortTextures (arr) {
      let list = this.textures;
      let newList = [];
      for (let i of arr) newList.push(list[i]);
      return newList;
    }
  };

}