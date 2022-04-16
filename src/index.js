import { canvas, canvasContext } from "./globals";
import { InputManager } from "./input-manager";

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.color = "magenta";
  }

  draw() {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      20,
      20
    );
  }
}

(function () {
  const manager = new InputManager();
  let shape = null;
  let mousePosition = null;

  function update() {
    if (manager.isMouseButtonPressed(0)) {
      mousePosition = manager.mousePosition;
      console.log(mousePosition);
      shape = new Shape(mousePosition.x, mousePosition.y);
    }

    if (manager.isMouseButtonReleased(0)) {
      shape = null;
    }

    manager.update();
  }

  function render() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);

    if (null !== shape) {
      shape.draw();
    }
  }

  function loop() {
    update();
    render();

    requestAnimationFrame(loop);
  }

  loop();
})();
