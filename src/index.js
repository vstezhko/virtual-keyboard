import './index.html';
import './main.scss';
import {buttons} from "./js/buttons";
import {InputButton, ServiceButton} from "./js/Button";


let isCapsDown = false
let isShiftDown = false

const toggleShiftValue = () => {
    if (isShiftDown === true) {
        return
    }

    if (localStorage.getItem('isShiftPushed') === 'true') {
        localStorage.setItem('isShiftPushed', 'false')
    } else {
        localStorage.setItem('isShiftPushed', 'true')
    }

    isShiftDown = true
}

const toggleCapsValue = () => {
    if (isCapsDown === true) {
        return
    }

    if (localStorage.getItem('isCapsPushed') === 'true') {
        localStorage.setItem('isCapsPushed', 'false')
    } else {
        localStorage.setItem('isCapsPushed', 'true')
    }

    isCapsDown = true
}

window.onload = function(){

    const body = document.querySelector('body')
    const textArea = document.querySelector('textarea')
    textArea.focus();
    const keyboard = document.createElement('section')
    keyboard.classList.add('keyboard')
    body.append(keyboard)

    document.addEventListener('keydown', (e) => {
        textArea.focus();
        console.log(e.key)
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {toggleShiftValue()}
        if (e.code === 'CapsLock') {toggleCapsValue()}
        const pushedBtn = document.querySelector(`.${e.code}`)
        pushedBtn && pushedBtn.classList.add('btn_pushed')
    })

    document.addEventListener('keyup', (e) => {
        const pushedBtn = document.querySelector(`.${e.code}`)
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
            isShiftDown = false
            toggleShiftValue()
            isShiftDown = false
        }
        if (e.code === 'CapsLock') {isCapsDown = false}
        pushedBtn && pushedBtn.classList.remove('btn_pushed')
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