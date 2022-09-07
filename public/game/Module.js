// Check out outline.md

class Module {
  constructor(name = "", runOn = "") {
    this.name = name;
    this.runOn = runOn;
  }
  isModule(){
    return true;
  }
}

class SevenBag extends Module {
  constructor(){
    super("SevenBag", "bag");
    
    this.bag = [];
    this.bag2 = [];
  }
  
  nextPiece() {
    if (this.bag.length == 0) {
      this.bag = this.bag2;
      this.newBag();
    }
  }
  
  newBag(){
    
  }
  
//   nextPiece() {
//     if (this.bag.length == 0) {
//       this.bag = this.bag2;
//       this.newBag();
//     }
//     this.holdable = true;

//     let p = Piece.get7BagPieceFromInt(this.bag.shift());
    
//     if (!this.checkCell(p.pos.x, p.pos.y)) {
//       this.reset();
//     }
    
//     return p;
//   }

//   newBag() {
//     this.bag2 = shuffle([0, 1, 2, 3, 4, 5, 6], true);
//   }
  
  getPieceFromInt(i){
    switch (i){
      case 0:
        return new TPiece();
      case 1:
        return new IPiece();
      case 2:
        return new OPiece();
      case 3:
        return new LPiece();
      case 4:
        return new JPiece();
      case 5:
        return new SPiece();
      case 6:
        return new ZPiece();
    }
  }
}

class CellRenderer extends Module {
  constructor(){
    super("CellRenderer", "cell");
  }
}

let ModuleSystem = {
  BagModule: SevenBag,
  RuntimeModules: []
}