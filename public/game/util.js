class Matrix {
  constructor(width = 1, height = 1){
    this.callbacks = [];
    this.size = createVector(width, height);
    this.array = []; //Array(width * height).fill(null);
    this.initialize();
  }
  
  initialize(){
    for(let x = 0; x < this.size.x; x++){
      for(let y = 0; y < this.size.y; y++){
        this.array.push(null);
      }
    }
    if(this.array.length == this.size.x * this.size.y){
      this.callUpdate();
      return true;
    }
    this.callUpdate();
    return false;
  }
  
  toArrayIndex(x, y){
    return (y * this.size.x) + x;
  }
  
  toCoords(i){
    let y = Math.floor(i / this.size.x);
    let x = i - (y * this.size.x);
    return createVector(x, y);
  }
  
  setAt(x, y, c){
    let i = this.toArrayIndex(x, y);
    
    this.array[i] = c;
    this.callUpdate();
  }
  
  rotate(a){
    
    let tempMatrix = new Matrix(this.size.x, this.size.y);
    let off = createVector(Math.floor(this.size.x / 2), Math.floor(this.size.y / 2));
    if(a == -1){
      this.loopThrough((c) => {
        // (-y, x)
        let t = createVector(c.pos.x - off.x, c.pos.y - off.y);
        let nc = createVector(-t.y + off.x, t.x + off.y);
        tempMatrix.setAt(nc.x, nc.y, c.object);
      });
    }
    else if(a == 1) {
      this.loopThrough((c) => {
        // (y, -x)
        let t = createVector(c.pos.x - off.x, c.pos.y - off.y);
        let nc = createVector(t.y + off.x, -t.x + off.y);
        tempMatrix.setAt(nc.x, nc.y, c.object);
      });
    }
    else {
      tempMatrix = this;
    }
    
    this.array = tempMatrix.array;
    this.callUpdate();
  }
  
  getAt(x, y ){
    let i = this.toArrayIndex(x, y);
    
    return this.array[i];
  }
  
  set(a, c){
    if(this.array.length == a.length){
      for(let i = 0; i < a.length; i++){
        if(a[i] == 1){
          this.array[i] = c;
        }
      }
    }
    else{
      console.error('Array needs to be same length');
    }
    this.callUpdate();
  }
  
  loopThrough(func){
    for(let i = 0; i < this.array.length; i++){
      func({object: this.array[i], index: i, pos: this.toCoords(i)});
    }
  }
  
  loopThroughBackwards(func){
    for(let i = this.array.length - 1; i > 0; i--){
      func({object: this.array[i], index: i, pos: this.toCoords(i)});
    }
  }
  
  getMiddle(){
    return createVector(Math.floor(this.size.x / 2), Math.floor(this.size.y / 2));
  }
  
  callUpdate(){
    for(let f of this.callbacks){
      f();
    }
  }
  
  addCallback(func){
    this.callbacks.push(func);
  }
}

class Vector {
  constructor(x = 0, y = 0, z = 0){
    this.x = x;
    this.y = y;
    this.z = z;
  }
  copy(){
    return new Vector(this.x, this.y, this.z);
  }
}

function createVector (x = 0, y = 0, z = 0){
  return new Vector(x, y, z);
}