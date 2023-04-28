
const styles = {
    small: 'btn',
    wide: 'btn btn_wide'
}



export class Button {
    constructor(size, btnType, name, code,  ...rest) {
        this.size = size
        this.btnType = btnType
        this.name = name.en || name
        this.code = code
    }

    renderButton () {
        const btn = document.createElement('div')
        btn.innerHTML = this.name
        btn.classList = styles[this.size]
        btn.id = this.code
        btn.addEventListener('mousedown', () => {
            btn.classList.add('btn_pushed')
        })
        btn.addEventListener('mouseup', () => {
            btn.classList.remove('btn_pushed')
        })

        return btn
    }
}