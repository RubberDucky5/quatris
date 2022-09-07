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

      //Resize PIXI Canvas to window size
      addEventListener("resize", (event) => {
        this.pixi.resize();
      });
    }

    // Instantiate a new Board
    this.board = new Matrix(options.width, options.height);
    this.board.loopThrough((c) => {
      this.board.setAt(c.pos.x, c.pos.y, new Cell(this));
    });

    this.modules = [];
  }
}
