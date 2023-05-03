import './index.html';
import './main.scss';
import buttonsRu from './js/buttonsRu';
import buttonsEn from './js/buttonsEn';
import ServiceButton from './js/ServiceButton';
import InputButton from './js/InputButton';

window.onload = () => {
  const body = document.querySelector('body');
  const textArea = document.createElement('textarea');
  const keyboard = document.createElement('section');
  keyboard.classList.add('keyboard');
  body.append(textArea);
  body.append(keyboard);
  textArea.focus();
  const info = document.createElement('div');
  info.innerHTML += '<p>Клавиатура создана в операционной системе Windows</p>';
  info.innerHTML += '<p>Для переключения языка комбинация: левыe ctrl + alt</p>';
  body.append(info);

  localStorage.setItem('isShiftPushed', 'false');
  localStorage.setItem('isCapsPushed', 'false');
  localStorage.setItem('isCtrlPushed', 'false');
  localStorage.setItem('isAltPushed', 'false');

  const mousedownEvent = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  const mouseupEvent = new MouseEvent('mouseup', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  const keyboardLayouts = {
    buttonsRu,
    buttonsEn,
  };

  let activeLang = localStorage.getItem('lang') || 'buttonsRu';

  let buttons = keyboardLayouts[activeLang];

  function renderButtons(buttonsToRender) {
    keyboard.innerHTML = '';
    buttonsToRender.forEach((btn) => {
      let newBtn;

      if (btn.btnType === 'input') {
        newBtn = new InputButton({ ...btn });
      }

      if (btn.btnType === 'service') {
        newBtn = new ServiceButton({ ...btn });
      }

      if (newBtn) {
        keyboard.append(newBtn.getButtonNode(textArea));
      }
    });
  }

  function handleChangeLang() {
    const alt = localStorage.getItem('isAltPushed');
    const ctrl = localStorage.getItem('isCtrlPushed');

    if (alt === 'true' && ctrl === 'true') {
      if (activeLang === 'buttonsRu') {
        activeLang = 'buttonsEn';
        buttons = keyboardLayouts[activeLang];
      } else {
        activeLang = 'buttonsRu';
        buttons = keyboardLayouts[activeLang];
      }

      renderButtons(buttons);

      localStorage.setItem('lang', activeLang);

      const altNode = document.querySelector('.AltLeft');
      altNode.classList.add('btn_pushed');
      const ctrlNode = document.querySelector('.ControlLeft');
      ctrlNode.classList.add('btn_pushed');
    }
  }

  document.addEventListener('keydown', (e) => {
    textArea.focus();
    e.preventDefault();
    const pushedBtn = document.querySelector(`.${e.code}`);
    pushedBtn.dispatchEvent(mousedownEvent);

    handleChangeLang();
  });

  document.addEventListener('keyup', (e) => {
    e.preventDefault();
    const pushedBtn = document.querySelector(`.${e.code}`);
    pushedBtn.dispatchEvent(mouseupEvent);
  });

  document.addEventListener('click', () => {
    textArea.focus();
  });

  renderButtons(buttons);
};
