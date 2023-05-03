import { actions, Button } from './Button';

class ServiceButton extends Button {
  constructor({ ...btn }) {
    super({ ...btn });
    this.action = btn.action;
  }

  handleClick(placeNode) {
    actions[this.action](placeNode);
    placeNode.focus();
  }

  getButtonNode(placeNode) {
    this.btn.addEventListener('mousedown', () => {
      this.handleClick(placeNode);
    });

    return this.btn;
  }
}

export default ServiceButton;
