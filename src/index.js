import { canvas, canvasContext } from "./globals";
import { InputManager } from "./input-manager";

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.color = color;
  }

  draw() {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(this.x - 10, this.y - 10, 20, 20);
  }
}

(function () {
  const manager = new InputManager();
  let start = null;
  let end = null;

  let shape1 = null;
  let shape2 = null;
  let mousePosition = null;
  let currentPosition = null;

  function update() {
    if (manager.isMouseButtonPressed(0)) {
      mousePosition = manager.mousePosition;

      end = null;
      start = null;
      currentPosition = null;

      start = mousePosition;

      shape2 = null;
      shape1 = new Shape(mousePosition.x, mousePosition.y, "red");
    }

    if (null !== start && manager.isMouseMoving()) {
      currentPosition = manager.mousePosition;
    }

    if (manager.isMouseButtonReleased(0)) {
      mousePosition = manager.mousePosition;

      end = mousePosition;

      shape2 = new Shape(mousePosition.x, mousePosition.y, "green");
    }

    manager.update();
  }

  function render() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);

    if (null !== shape1) shape1.draw();
    if (null !== shape2) shape2.draw();

    if (null !== start) {
      let to =
        null !== end ? end : null !== currentPosition ? currentPosition : start;

      canvasContext.beginPath();
      canvasContext.moveTo(start.x, start.y);
      canvasContext.lineTo(to.x, to.y);
      canvasContext.stroke();
    }
  }

  function loop() {
    update();
    render();

    requestAnimationFrame(loop);
  }

  loop();
})();
