class Game {
  constructor(options) {
    // Pixi Stuff
    {
      // Defines a New Pixi object
      this.pixi = new PIXI.Application({
        // This sets the Background Color To a Very Nice Grey
        backgroundColor: 0x363941,
        width: window.innerWidth,
        height: window.innerHeight,
        resizeTo: window,
      });
      document.body.appendChild(this.pixi.view);

      // Add a "draw" loop
      this.pixi.ticker.add((dT) => {
        this.pixi.render();
      });
    }
    //Resize PIXI Canvas to window size
    addEventListener("resize", this.resize.bind(this));// Left off with this not making any sense
    
    // Instantiate a new Board
    this.board = new Board(options.width, options.height, this);
    
    this.modules = [];

  }
  
  resize() {
    console.log(this);
    console.log("adfsffbefb");
    this.pixi.resize();
    this.board.updatePos();
    this.board.updateSpacing(window.innerWidth);
  }
}

class PieceRenderer {
  constructor(width, height, game) {
    this.game = game
    
    // Make a container object to contain the cell's graphics objects
    // Also to make sure it can move all of the cells at once
    this.container = new PIXI.Container();
    this.game.pixi.stage.addChild(this.container);
    
    this.spacing = 20;
    
    // Make a Matrix to contain all the cells
    this.cells = new Matrix(width, height);
    this.cells.loopThrough((c) => {
      this.cells.setAt(c.pos.x, c.pos.y, this.newCell());
    });
    this.cells.addCallback(this.updateCells);
    this.updateCells();
  }
    
  newCell () {
    return new Cell(this.game, this);
  }
  
  updatePos(){
    // this.container.position.set();
  }
  
  updateCells() {
    this.cells.loopThrough((c) => {
      let cell = this.cells.getAt(c.pos.x, c.pos.y);
      cell.pos = c.pos.copy();
      cell.update();
    });
  }
  
  getGlobalSize(){
    let s = this.cells.size.copy();
    return createVector(s.x * this.spacing, s.y * this.spacing);
  }
  
  updateSpacing(n){
    this.spacing = n;
  }
}

class Board extends PieceRenderer {
  constructor (width, height, game) {
    super(width, height, game);
    
    this.updatePos();
  }
  
  updatePos(){
    // Move board to the middle of the screen
    let renderer = this.game.pixi.renderer;
    let middle = createVector(window.innerWidth / 2, renderer.height / 2);
    let s = this.getGlobalSize();
    this.container.position.set(middle.x - (s.x / 2), middle.y - (s.y / 2));
    updateCells();
  }
  
  updateSpacing(n){
    this.spacing = n / 30;
    updateCells();
  }
}

class Cell {
  constructor(game, pr){
    this.game = game;
    this.pixi = game.pixi;
    // pr = Piece Renderer
    this.pr = pr;
    this.pos = createVector(0, 0);
    
    // Make a new Graphic to render the cell
    this.graphic = new PIXI.Graphics();
    this.update();
    
    // Add the graphic to the boards container object
    this.pr.container.addChild(this.graphic);
  }
  
  update() {
    this.graphic.clear();
    this.graphic.lineStyle(1, 0xffffff);
    this.graphic.drawRoundedRect(this.pos.x * this.pr.spacing, this.pos.y * this.pr.spacing, this.pr.spacing, this.pr.spacing);
  }
}