

const styles = {
    small: 'btn',
    wide: 'btn btn_wide',
    extrawide: 'btn btn_extrawide',
}

const actions = {

    backspace(node){
        const start = node.selectionStart-1;
        const end = node.selectionEnd-1;
        if (start === end) {
            node.value = node.value.slice(0, start) + node.value.slice(start + 1);
            node.selectionStart = start
            node.selectionEnd = start
        } else {
            node.value = node.value.slice(0, start + 1) + node.value.slice(end + 1);
            node.selectionStart = start + 1
            node.selectionEnd = start + 1
        }
    },

    tab(node){
        const start = node.selectionStart;
        node.value = node.value.slice(0, start) + '\t' + node.value.slice(start);
        node.selectionStart = start + 1
        node.selectionEnd = start + 1
    },

    del(node) {
        const start = node.selectionStart;
        node.value = node.value.slice(0, start) + node.value.slice(start + 1);
        node.selectionStart = start
        node.selectionEnd = start
    },

    capsLock() {
        if (this.isCapsDown === false) {
            if (localStorage.getItem('isCapsPushed') === 'true') {
                localStorage.setItem('isCapsPushed', 'false')
            } else {
                localStorage.setItem('isCapsPushed', 'true')
            }
        }
        this.isCapsDown = true
    },

    shift() {
        if (this.isShiftDown === false) {
            if (localStorage.getItem('isShiftPushed') === 'true') {
                localStorage.setItem('isShiftPushed', 'false')
            } else {
                localStorage.setItem('isShiftPushed', 'true')
            }
        }
        this.isShiftDown = true
    },

    enter(node) {
        const start = node.selectionStart;
        node.value = node.value.slice(0, start) + '\n' + node.value.slice(start);
        node.selectionStart = start + 1
        node.selectionEnd = start + 1
    },

    ctrl() {

    },

    win() {

    },

    alt() {

    },

    up(node) {
        const pos = node.selectionStart;
        const value = node.value;
        const rows = value.slice(0, pos).split('\n');
        const row = rows.length - 2; // уменьшаем на 2, т.к. нумерация строк начинается с 0
        const column = rows[row].length;
        node.setSelectionRange(value.indexOf(rows[row]), column);
    },

    left() {

    },

    down() {

    },

    right() {

    },

    isCapsDown: false,
    isShiftDown: false,
}

export class Button {
    constructor({...btn}) {
        this.size = btn.size
        this.btnType = btn.btnType
        this.name = btn.name.en
        this.code = btn.code
        this.shiftName = btn.shiftName || null
        this.btn = this.createBtnNode()
    }

    createBtnNode() {
        const btn = document.createElement('div')
        btn.innerHTML = this.name
        btn.classList = styles[this.size]
        btn.classList.add(this.code)
        btn.addEventListener('mousedown', () => {
            btn.classList.add('btn_pushed')
        })
        btn.addEventListener('mouseup', () => {
            btn.classList.remove('btn_pushed')
            if (this.code === 'ShiftLeft' || this.code === 'ShiftRight') {
                actions.isShiftDown = false
                actions.shift()
                actions.isShiftDown = false
            }
            if (this.code === 'CapsLock') {actions.isCapsDown = false}
        })
        return btn
    }

}

export class InputButton extends Button {
    constructor({...btn}) {
        super({...btn});
        this.value = btn.value.en
    }

    handleClick(placeNode) {
        const isShiftPushed = localStorage.getItem('isShiftPushed') === 'true'
        const isCapsPushed = localStorage.getItem('isCapsPushed') === 'true'
        const start = placeNode.selectionStart;

        if (!isShiftPushed && isCapsPushed) {
            placeNode.value = placeNode.value.slice(0, start) + this.value.toUpperCase() + placeNode.value.slice(start);
        } else if (isShiftPushed && !isCapsPushed) {
            if (this.shiftName) {
                placeNode.value = placeNode.value.slice(0, start) + this.shiftName + placeNode.value.slice(start);
            } else {
                placeNode.value = placeNode.value.slice(0, start) + this.value.toUpperCase() + placeNode.value.slice(start);
            }
        } else if(isShiftPushed && isCapsPushed){
            if (this.shiftName) {
                placeNode.value = placeNode.value.slice(0, start) + this.shiftName + placeNode.value.slice(start);
            } else {
                placeNode.value = placeNode.value.slice(0, start) + this.value + placeNode.value.slice(start);
            }
        } else  {
            placeNode.value = placeNode.value.slice(0, start) + this.value + placeNode.value.slice(start);
        }

        placeNode.selectionStart = start + 1
        placeNode.selectionEnd = start + 1
    }

    getButtonNode (placeNode) {
        this.btn.addEventListener('mousedown', () => {
            this.handleClick(placeNode)
        })

        return this.btn
    }
}

export class ServiceButton extends Button {
    constructor({...btn}) {
        super({...btn});
        this.action = btn.action
    }

    handleClick(placeNode) {
        actions[this.action](placeNode)
        placeNode.focus()
    }

    getButtonNode (placeNode) {
        this.btn.addEventListener('mousedown', () => {
            this.handleClick(placeNode)
        })

        return this.btn
    }
}