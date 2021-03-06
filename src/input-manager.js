import { canvas } from "./globals";

export const InputEvents = {
  MOUSE_DOWN: "MOUSE_DOWN",
  MOUSE_UP: "MOUSE_UP",
  MOUSE_MOVE: "MOUSE_MOVE",
  KEY_DOWN: "KEY_DOWN",
  KEY_UP: "KEY_UP"
};

export class InputManager {
  constructor() {
    this.events = [];
    this.lastSavedEvent = null;

    canvas.addEventListener("keydown", this._onKeyDown);
    canvas.addEventListener("keyup", this._onKeyUp);
    canvas.addEventListener("contextmenu", this.onContextMenu);
    canvas.addEventListener("mousedown", this._onMouseDown);
  }

  _receiveEvent = (type, payload) => {
    this.events.push({
      type: type,
      payload: payload
    });
  };

  _onKeyDown = (event) => {
    this._receiveEvent(InputEvents.KEY_DOWN, {
      button: event.code
    });
  };

  _onKeyUp = (event) => {
    this._receiveEvent(InputEvents.KEY_UP, {
      button: event.code
    });
  };

  _getMousePosition = (event) => {
    const boundingBox = canvas.getBoundingClientRect();

    return {
      x: event.x - boundingBox.left,
      y: event.y - boundingBox.top
    };
  };

  _onMouseDown = (event) => {
    this._receiveEvent(InputEvents.MOUSE_DOWN, {
      button: event.button,
      positon: this._getMousePosition(event)
    });

    canvas.addEventListener("mousemove", this._onMouseMove);
    canvas.addEventListener("mouseup", this._onMouseUp);
  };

  _onMouseUp = (event) => {
    this._receiveEvent(InputEvents.MOUSE_UP, {
      button: event.button,
      positon: this._getMousePosition(event)
    });

    canvas.removeEventListener("mousemove", this._onMouseMove);
    canvas.removeEventListener("mouseup", this._onMouseUp);
  };

  _onMouseMove = (event) => {
    this._receiveEvent(InputEvents.MOUSE_MOVE, {
      positon: this._getMousePosition(event)
    });
  };

  _onContextMenu = (event) => {
    event.preventDefault();
  };

  get lastEvent() {
    return this.events[this.events.length - 1] || {};
  }

  get mousePosition() {
    return (
      [
        InputEvents.MOUSE_DOWN,
        InputEvents.MOUSE_UP,
        InputEvents.MOUSE_MOVE
      ].includes(this.lastEvent.type) && this.lastEvent.payload.positon
    );
  }

  isMouseButtonPressed(button) {
    return (
      InputEvents.MOUSE_DOWN === this.lastEvent.type &&
      this.lastEvent.payload.button === button
    );
  }
  isMouseButtonReleased(button) {
    return (
      InputEvents.MOUSE_UP === this.lastEvent.type &&
      this.lastEvent.payload.button === button
    );
  }

  isMouseMoving() {
    return InputEvents.MOUSE_MOVE === this.lastEvent.type;
  }

  isKeyPressed(button) {
    return (
      InputEvents.KEY_DOWN === this.lastEvent.type &&
      this.lastEvent.payload.button === button
    );
  }
  isKeyReleased(button) {
    return (
      InputEvents.KEY_UP === this.lastEvent.type &&
      this.lastEvent.payload.button === button
    );
  }

  update = () => {
    if (0 === this.events.length) return;

    this.lastSavedEvent = this.events.pop();
  };
}
