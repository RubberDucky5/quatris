# Outline
Context: PixiJS uses a hirarchical system


the outline for this one is pretty similar to the last but this time I am using PIXI.js for rendering so it is a bit different.
Instead of the board class rendering the cells, this time I think each cell will render it's self.
Perhaps they will be parented to a container object, which will then be moved, scaled, rotated, etc.


Another thing that is changing is almost all the game logic and events systems will be in scriptable modules so that theoretically the end user can modify the game in a simple way