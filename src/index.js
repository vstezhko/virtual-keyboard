import './index.html';
import './main.scss';
import {buttons} from "./js/buttons";
import {Button} from "./js/Button";

window.onload = function(){

    const body = document.querySelector('body')
    const keyboard = document.createElement('section')
    keyboard.classList.add('keyboard')
    body.append(keyboard)

    document.addEventListener('keydown', (e) => {
        const pushedBtn = document.querySelector(`#${e.code}`)
        pushedBtn && pushedBtn.classList.add('btn_pushed')
    })

    document.addEventListener('keyup', (e) => {
        const pushedBtn = document.querySelector(`#${e.code}`)
        pushedBtn && pushedBtn.classList.remove('btn_pushed')
    })


    buttons.forEach(btn => {
        const newBtn = new Button(btn.size, btn.btnType, btn.name, btn.code)
        keyboard.append(newBtn.renderButton())
    })
}