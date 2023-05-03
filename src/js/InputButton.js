import { Button } from './Button';

class InputButton extends Button {
  constructor({ ...btn }) {
    super({ ...btn });
    this.value = btn.value;
  }

  handleClick(placeNode) {
    const isShiftPushed = localStorage.getItem('isShiftPushed') === 'true';
    const isCapsPushed = localStorage.getItem('isCapsPushed') === 'true';
    const start = placeNode.selectionStart;

    if (!isShiftPushed && isCapsPushed) {
      placeNode.value = placeNode.value.slice(0, start)
          + this.value.toUpperCase()
          + placeNode.value.slice(start);
    } else if (isShiftPushed && !isCapsPushed) {
      if (this.shiftName) {
        placeNode.value = placeNode.value.slice(0, start)
            + this.shiftName + placeNode.value.slice(start);
      } else {
        placeNode.value = placeNode.value.slice(0, start)
            + this.value.toUpperCase()
            + placeNode.value.slice(start);
      }
    } else if (isShiftPushed && isCapsPushed) {
      if (this.shiftName) {
        placeNode.value = placeNode.value.slice(0, start)
            + this.shiftName
            + placeNode.value.slice(start);
      } else {
        placeNode.value = placeNode.value.slice(0, start)
            + this.value
            + placeNode.value.slice(start);
      }
    } else {
      placeNode.value = placeNode.value.slice(0, start) + this.value + placeNode.value.slice(start);
    }

    placeNode.selectionStart = start + 1;
    placeNode.selectionEnd = start + 1;
  }

  getButtonNode(placeNode) {
    this.btn.addEventListener('mousedown', () => {
      this.handleClick(placeNode);
    });

    return this.btn;
  }
}

export default InputButton;
