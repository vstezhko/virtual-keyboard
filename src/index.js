import './index.html';
import './main.scss';
import {buttonsEn} from "./js/buttonsEn";
import {buttonsRu} from "./js/buttonsRu";
import {InputButton, ServiceButton} from "./js/Button";


window.onload = function(){



    const body = document.querySelector('body')
    const textArea = document.createElement('textarea')
    const keyboard = document.createElement('section')
    keyboard.classList.add('keyboard')
    body.append(textArea)
    body.append(keyboard)
    textArea.focus();
    const info = document.createElement('div')
    info.innerHTML += `<p>Клавиатура создана в операционной системе Windows</p>`
    info.innerHTML += `<p>Для переключения языка комбинация: левыe ctrl + alt</p>`
    body.append(info)


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
        const pushedBtn = document.querySelector(`.${e.code}`)
        pushedBtn.dispatchEvent(mousedownEvent)

        handleChangeLang()
    })

    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        const pushedBtn = document.querySelector(`.${e.code}`)
        pushedBtn.dispatchEvent(mouseupEvent);
    })

    document.addEventListener('click', () => {
        textArea.focus();
    })

    const keyboardLayouts = {
        'buttonsRu': buttonsRu,
        'buttonsEn': buttonsEn
    }

    let activeLang = localStorage.getItem('lang') || 'buttonsRu'

    let buttons = keyboardLayouts[activeLang]

    const handleChangeLang = () => {

        const alt = localStorage.getItem('isAltPushed')
        const ctrl = localStorage.getItem('isCtrlPushed')

        if (alt === 'true' && ctrl === 'true') {

            console.log(activeLang)
            if (activeLang === 'buttonsRu') {
                activeLang = 'buttonsEn'
                buttons = keyboardLayouts[activeLang]
            } else {
                activeLang = 'buttonsRu'
                buttons = keyboardLayouts[activeLang]
            }

            renderButtons(buttons)

            const altNode = document.querySelector('.AltLeft')
            altNode.classList.add('btn_pushed')
            const ctrlNode = document.querySelector('.ControlLeft')
            ctrlNode.classList.add('btn_pushed')
        }

    }

    const renderButtons = (buttons) => {
        console.log('render')
        keyboard.innerHTML = ''
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

    renderButtons(buttons)

}