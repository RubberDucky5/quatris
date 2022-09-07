class Game {
  constructor(options) {
    this.options = options;
    this.modules = [];
    
    let bm = new ModuleSystem.BagModule();
    this.bagModule = bm;
    this.piece;
    
    
    // Pixi Stuff
    {
      // Defines a New Pixi object
      this.pixi = new PIXI.Application({
        // This sets the Background Color To a Very Nice Grey
        backgroundColor: 0x363941,
        width: window.innerWidth,
        height: window.innerHeight,
        resizeTo: window,
        antialias: true,
      });
      document.body.appendChild(this.pixi.view);

      // Add a "draw" loop
      this.pixi.ticker.add((dT) => {
        this.pixi.render();
      });
    }
    
    // Instantiate a new Board
    // The board mostly just helps with rendering
    this.board = new Board(options.game.width, options.game.height, this);
    
    
    //Resize PIXI Canvas to window size
    addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  
  resize() {
    this.pixi.resize();
    this.board.updateSpacing(window.innerHeight);
    this.board.updatePos();
  }
  
  // Get colors from the options as hex numbers
  getHexColor(c){
    let hex = 0x0
    
    let t = this.options.visual.colors[c];
    if(t)
      hex = t;
    
    return hex;
  }
  
  // Returns true if a cell is occupied or out of bounds
  checkCell(x, y){
    let checkingCell = this.board.getAt(x, y);
    
    if(checkingCell == null)
      return true;
    if(checkingCell.state.state == 'block')
      return true;
    
    return false;
  }
}

class PieceRenderer {
  constructor(width, height, game) {
    this.game = game
    
    // Make a container object to contain the cell's graphics objects
    // Also to make sure it can move all of the cells at once
    this.container = new PIXI.Container();
    this.game.pixi.stage.addChild(this.container);
    
    // This gets overwriten anyways
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
    this.updateCells();
    this.updateStyles();
  }
  
  updateStyles() {
    
  }
  
  toRealCoords(x, y){
    return createVector(x * this.spacing, y * this.spacing);
  }
  
  getRealSize(){
    return createVector(this.cells.size.x * this.spacing, this.cells.size.y * this.spacing);
  }
}

class Board extends PieceRenderer {
  constructor (width, height, game) {
    super(width, height, game);
    
    this.borderGraphic = new PIXI.Graphics();
    this.container.addChild(this.borderGraphic);
    
    this.updatePos();
  }
  
  updatePos(){
    // Move board to the middle of the screen
    let renderer = this.game.pixi.renderer;
    let middle = createVector(window.innerWidth / 2, renderer.height / 2);
    let s = this.getGlobalSize();
    this.container.position.set(middle.x - (s.x / 2), middle.y - (s.y / 2));
    this.updateCells();
  }
  
  updateSpacing(n){
    this.spacing = n / 25;
    this.updateCells();
    this.updateStyles();
  }
  
  updateStyles(){
    this.borderGraphic.clear();
    let rS = this.getRealSize();
    this.borderGraphic.lineStyle(this.spacing / 4, 0xffffff, 12, 1);
    this.borderGraphic.drawRect(0, 0, rS.x, rS.y);
  }
  
  getAt(x, y){
    return this.cells.getAt(x, y);
  }
  changeAt(x, y, stateTarget){
    let changingCell = this.cells.getAt(x, y);
    
    Object.assign(changingCell.state, stateTarget);
    
    this.updateCells();
  }
}

class Cell {
  constructor(game, pr){
    this.game = game;
    this.pixi = game.pixi;
    
    this.state = {
      color: null,
      state: "empty"
    }
    
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
    
    if(this.state.state == 'empty')
      this.graphic.lineStyle(1.5, 0xffffff);
      this.graphic.endFill();
    if(this.state.color != null){
      this.graphic.lineStyle();
      this.graphic.beginFill(this.game.getHexColor(this.state.color));
    }
    
    let rc = this.pr.toRealCoords(this.pos.x, this.pos.y);
    this.graphic.drawRoundedRect(rc.x, rc.y, this.pr.spacing, this.pr.spacing, this.pr.spacing / 3);
    
    // Testing for the future module system
    // mockModule(this);
  }
}

// function mockModule (cell) {
//   cell.graphic.clear();
//   cell.graphic.lineStyle(1, 0xffffff);
//   cell.graphic.drawRoundedRect(cell.pos.x * cell.pr.spacing, cell.pos.y * cell.pr.spacing, cell.pr.spacing, cell.pr.spacing, cell.pr.spacing / 3);
// }