import './index.html';
import './main.scss';
import {buttons} from "./js/buttons";
import {InputButton, ServiceButton} from "./js/Button";


window.onload = function(){

    const body = document.querySelector('body')
    const textArea = document.querySelector('textarea')
    textArea.focus();
    const keyboard = document.createElement('section')
    keyboard.classList.add('keyboard')
    body.append(keyboard)


    const mousedownEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    const mouseupEvent = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    document.addEventListener('keydown', (e) => {
        textArea.focus();
        e.preventDefault();
        console.log(e.code)
        const pushedBtn = document.querySelector(`.${e.code}`)
        pushedBtn.dispatchEvent(mousedownEvent);
    })

    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        const pushedBtn = document.querySelector(`.${e.code}`)
        pushedBtn.dispatchEvent(mouseupEvent);
    })

    document.addEventListener('click', () => {
        textArea.focus();
    })


    buttons.forEach(btn => {
        let newBtn

        if (btn.btnType === 'input') {
            newBtn = new InputButton({...btn})
        }

        if (btn.btnType === 'service') {
            newBtn = new ServiceButton({...btn})
        }

        newBtn && keyboard.append(newBtn.getButtonNode(textArea))
    })
}