// Options For Game 
let tempOptions = {
  width: 10,
  height: 20
};

// Defines a New Pixi object
let pix = new PIXI.Application({
  backgroundColor: 0x363941,
  width: window.innerWidth,
  height: window.innerHeight,
  resizeTo: window,
});
document.body.appendChild(pix.view);

let g = new Game(tempOptions);

// Add a "draw" loop
pix.ticker.add((dT) => {
  pix.render();
});

//Resize PIXI Canvas to window size
addEventListener("resize", (event) => {
  pix.resize();
});
