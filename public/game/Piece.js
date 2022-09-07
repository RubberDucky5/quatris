
class Piece {
  constructor(size) {
    this.cells = new Matrix(size);
    this.color = "grey";
  }
}

class S5Piece extends Piece {
  constructor() {
    super(5);
    this.color = "grey";
    this.cells.set([
      [], [], [], [], [],
      [], [], [], [], [],
      [], [], [1],[], [],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}

class TPiece extends S5Piece {
  constructor(){
    super();
    this.color = "purple";
    this.cells.set([
      [], [], [], [], [],
      [], [], [1],[], [],
      [], [1],[1],[1],[],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}

class IPiece extends S5Piece {
  constructor(){
    super();
    this.color = "cyan";
    this.cells.set([
      [], [], [], [], [],
      [], [], [], [], [],
      [], [1],[1],[1],[1],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}

class OPiece extends S5Piece {
  constructor(){
    super();
    this.color = "yellow";
    this.cells.set([
      [], [], [], [], [],
      [], [], [1],[1],[],
      [], [], [1],[1],[],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}

class LPiece extends S5Piece {
  constructor(){
    super();
    this.color = "orange";
    this.cells.set([
      [], [], [], [], [],
      [], [], [], [1],[],
      [], [1],[1],[1],[],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}
class JPiece extends S5Piece {
  constructor(){
    super();
    this.color = "blue";
    this.cells.set([
      [], [], [], [], [],
      [], [1],[], [], [],
      [], [1],[1],[1],[],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}
class SPiece extends S5Piece {
  constructor(){
    super();
    this.color = "green";
    this.cells.set([
      [], [], [], [], [],
      [], [], [1],[1],[],
      [], [1],[1],[], [],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}
class ZPiece extends S5Piece {
  constructor(){
    super();
    this.color = "red";
    this.cells.set([
      [], [], [], [], [],
      [], [1],[1],[], [],
      [], [], [1],[1],[],
      [], [], [], [], [],
      [], [], [], [], [],
    ], true);
  }
}
