class Terminal {

    curr;
    string;
    maximized;
    minimized;
    p;
    cronologia;
    index;
    oldTop;
    oldLeft;
    active;
    isDown;
    offset;
    id;

    constructor(count) {
        this.index = count;
        this.curr = 0;
        this.string = "";
        this.maximized = false;
        this.minimized = false;
        this.p = 0;
        this.cronologia = [];
        this.active = false;
        this.isDown = false;
        this.offset = [];
    }

    openTerminal() {

        openTerminal++;
        let container = document.createElement('div');
        container.id = "containerTerminal" + this.index;
        this.id = container.id;
        container.className = 'container';
        container.style.resize = 'both';
        container.style.overflow = 'auto';
        container.style.minWidth = '220px';
        container.style.zIndex = 0;

        container.addEventListener('mousedown', () => {
            setInactiveIcons('terminal');
            document.getElementById('containerTerminal' + this.index).style.zIndex = 1;
            this.active = true;
            document.getElementById('terminal' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
        });

        let menu = document.createElement('div');
        let menu1 = document.createElement('div');
        let menuEntry1 = document.createElement('div');
        let menu2 = document.createElement('div');
        let menuEntry2 = document.createElement('div');
        let menu3 = document.createElement('div');
        let menuEntry3 = document.createElement('div');
        let menu4 = document.createElement('div');
        let textField = document.createElement('div');
        createMenu.call(this, 'terminal', container, menu, menu1, menuEntry1, menu2, menuEntry2, menu3, menuEntry3, menu4, textField);

        document.body.appendChild(container);

        container.addEventListener("keydown", (e) => {this.keyPress(e);});
        textField.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            setTimeout(document.getElementById('line' + this.curr + this.index).focus(), 10);
        });

        menu.addEventListener('mousedown', (e) => {this.start_move_shell(e)}, true);
        document.addEventListener('mouseup', (e) => {this.stop_move_shell()}, true);
        document.addEventListener('mousemove', (e) => {this.move_shell(e)}, true);
        this.initNewLine();

        setInactiveIcons('terminal');
        document.getElementById('containerTerminal' + this.index).style.zIndex = 1;
        this.active = true;
        document.getElementById('terminal' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
    }

    minimize() {
        if (this.minimized && !this.active) {
            document.getElementById('containerTerminal' + this.index).style.visibility = 'visible';
            document.getElementById('containerTerminal' + this.index).style.zIndex = 1;
            document.getElementById('terminal' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            this.active = true;
            this.minimized = false;
        }
        else if (!this.minimized && this.active) {
            document.getElementById('containerTerminal' + this.index).style.visibility = 'hidden';
            document.getElementById('containerTerminal' + this.index).style.zIndex = 0;
            document.getElementById('terminal' + this.index).style.backgroundColor = 'rgb(2, 0, 46)';
            this.active = false;
            this.minimized = true;
        }
    }

    cross() {
        document.getElementById('containerTerminal' + this.index).remove();
        document.getElementById('terminal' + this.index).remove();
        for (let i = 0; i < objArray.length; i++) {
            if (this.id == objArray[i].id) {
                objArray.splice(i, 1);
            }
        }
        openTerminal--;
    }

    maximize() {
        if (this.maximized) {
            document.getElementById('containerTerminal' + this.index).style.width = '50%';
            document.getElementById('containerTerminal' + this.index).style.height = '55%';
            document.getElementById('containerTerminal' + this.index).style.top = this.oldTop;
            document.getElementById('containerTerminal' + this.index).style.left = this.oldLeft;
            document.getElementById('menu' + this.index).style.borderTopLeftRadius = '5px';
            document.getElementById('menu' + this.index).style.borderTopRightRadius = '5px';
            document.getElementById('containerTerminal' + this.index).style.borderBottomLeftRadius = '1%';
            document.getElementById('containerTerminal' + this.index).style.borderBottomLeftRadius = '1%';
        }
        else {
            document.getElementById('containerTerminal' + this.index).style.width = '100%';
            document.getElementById('containerTerminal' + this.index).style.height = '100%';
            this.oldTop = document.getElementById('containerTerminal' + this.index).style.top;
            this.oldLeft = document.getElementById('containerTerminal' + this.index).style.left;
            document.getElementById('containerTerminal' + this.index).style.top = 0;
            document.getElementById('containerTerminal' + this.index).style.left = 0;
            document.getElementById('menu' + this.index).style.borderTopLeftRadius = 0;
            document.getElementById('menu' + this.index).style.borderTopRightRadius = 0;
            document.getElementById('textField' + this.index).style.borderBottomLeftRadius = 0;
            document.getElementById('textField' + this.index).style.borderBottomRightRadius = 0;
        }
        this.maximized = !this.maximized;
    }

    move_shell(e) {
        if (this.isDown && !this.maximized && e.clientX > 0 && e.clientY > 0) {
            let mousePosition = {
                x: e.clientX,
                y: e.clientY

            };
            document.getElementById('containerTerminal' + this.index).style.left = (mousePosition.x + this.offset[0]) + 'px';
            document.getElementById('containerTerminal' + this.index).style.top = (mousePosition.y + this.offset[1]) + 'px';
        }
    }

    start_move_shell(e) {
        this.isDown = true;
        this.offset = [
            document.getElementById('containerTerminal' + this.index).offsetLeft - e.clientX,
            document.getElementById('containerTerminal' + this.index).offsetTop - e.clientY
        ];
    }

    stop_move_shell() {
        this.isDown = false;
    }

    initNewLine() {
        if (this.curr != 0) {
            document.getElementById('line' + this.curr + this.index).contentEditable = 'false';
        }
        this.curr++;
        let textField = document.getElementById('textField' + this.index);
        let elem1 = textField.appendChild(document.createElement('div'));
        elem1.id = 'container' + this.curr + this.index;
        elem1.style.position = 'relative';
        elem1.style.top = 0;
        elem1.style.left = 0;
        let elem2 = elem1.appendChild(document.createElement('div'));
        elem2.id = 'pre' + this.curr + this.index;
        elem2.textContent = 'scraccio@ubuntu:~$' + '\u00A0';
        elem2.style.display = 'inline-block';
        elem2.style.color = 'rgb(145, 234, 55)';
        elem2.style.position = 'relative';
        elem2.style.top = '0';
        elem2.style.left = '0';
        let elem3 = elem1.appendChild(document.createElement('div'));
        elem3.id = 'line' + this.curr + this.index;
        elem3.contentEditable = 'true';
        elem3.textContent = "";
        elem3.style.display = 'inline';
        elem3.style.wordBreak = 'break-all';
        elem3.style.position = 'relative';
        elem3.style.left = '0px';
        elem3.style.outline = 0;
        setTimeout(()=>{elem3.focus()}, 10);
    }

    keyPress(e) {
        if (e.code == "Enter" && this.active) {
            //e.stopPropagation();
            e.preventDefault();
            
            this.string = document.getElementById('line' + this.curr + this.index).textContent;
            if (this.cronologia[this.curr - 1] != this.string) {

                this.cronologia[this.curr] = this.string;
                this.cronologia[this.curr + 1] = "";

                this.p = this.curr + 1;
            }
            this.words = this.string.split(" ");
            if (this.words[0] == "sum" && this.words.length == 3 && !isNaN(this.words[1]) && !isNaN(this.words[2])) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += parseInt(this.words[1]) + parseInt(this.words[2]);
            }
            else if (this.words[0] == "sum" && (this.words.length != 3 || isNaN(this.words[1]) || isNaN(this.words[2]))) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += "Usage: sum <num1> <num2>";
            }
            else if (this.words[0] == "subtract" && this.words.length == 3 && !isNaN(this.words[1]) && !isNaN(this.words[2])) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += parseInt(this.words[1]) - parseInt(this.words[2]);
            }
            else if (this.words[0] == "subtract" && (this.words.length != 3 || isNaN(this.words[1]) || isNaN(this.words[2]))) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += "Usage: subtract <num1> <num2>";
            }
            else if (this.words[0] == "product" && this.words.length == 3 && !isNaN(this.words[1]) && !isNaN(this.words[2])) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += parseInt(this.words[1]) * parseInt(this.words[2]);
            }
            else if (this.words[0] == "product" && (this.words.length != 3 || isNaN(this.words[1]) || isNaN(this.words[2]))) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += "Usage: product <num1> <num2>";
            }
            else if (this.words[0] == "divide" && this.words.length == 3 && !isNaN(this.words[1]) && !isNaN(this.words[2])) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += parseInt(this.words[1]) / parseInt(this.words[2]);
            }
            else if (this.words[0] == "divide" && (this.words.length != 3 || isNaN(this.words[1]) || isNaN(this.words[2]))) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += "Usage: divide <num1> <num2>";
            }
            else if (this.words[0] == "echo" && this.words.length == 2) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += this.words[1];
            }
            else if (this.words[0] == "echo" && this.words.length != 2) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += "Usage: echo <string>";
            }
            else if (this.words[0] == "clear" && this.words.length == 1) {
                var element = document.getElementById('textField' + this.index);
                var i = 0;
                while (this.curr != 0) {
                    element.lastChild.remove();
                    this.curr--;
                }
            }
            else if (this.words[0] == "batman" && this.words.length == 1) {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.innerHTML += '<br>';
                elem.style.wordBreak = 'break-all';

                function isDesiredLetter(array, index) {

                    if (index < 32) {
                        if (index % 2 == 0) {
                            if (array[index] != 'n') {
                                return false;
                            }
                        }
                        else {
                            if (array[index] != 'a') {
                                return false;
                            }
                        }
                    }
                    else {
                        if (index == 32 && array[32] != ' ') {
                            return false;
                        }
                        if (index == 33 && array[33] != 'B') {
                            return false;
                        }
                        if (index == 34 && array[34] != 'A') {
                            return false;
                        }
                        if (index == 35 && array[35] != 'T') {
                            return false;
                        }
                        if (index == 36 && array[36] != 'M') {
                            return false;
                        }
                        if (index == 37 && array[37] != 'A') {
                            return false;
                        }
                        if (index == 38 && array[38] != 'N') {
                            return false;
                        }
                    }
                    return true;

                }

                var counter = 1;

                function loop() {
                    setTimeout(function () {

                        count = 0;

                        for (var i = 0; i < 39; i++) {
                            if (!isDesiredLetter(array, i)) {
                                array[i] = dictionary[Math.floor(Math.random() * (dictionary.length + 1))];
                                this.string = array.toString();
                                this.string = this.string.replace(/,/g, "");
                                elem.textContent = this.string;
                                count++;
                            }
                        }

                        this.string = array.toString();
                        this.string = this.string.replace(/,/g, "");
                        counter++;
                        if (count != 0) {
                            loop();
                        }
                        else {
                            elem.style.color = '#fff000';
                        }
                    }, 50)
                }


                var dictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+-.,;:_'\"£$%&/()=[]{} ";
                var array = [];

                for (let i = 0; i < 39; i++) {
                    array[i] = dictionary[Math.floor(Math.random() * (dictionary.length + 1))];
                }
                this.string = array.toString();
                this.string = this.string.replace(/,/g, "");
                elem.textContent = "";
                for (let i = 0; i < 39; i++) {
                    elem.textContent += array[i];
                    elem.style.color = '#aaaaaa';
                }

                let count = 0;
                loop();
            }
            else if (this.words[0] == "exit" && this.words.length == 1) {
                cross();
            }
            else if (this.words[0] == "minimize" && this.words.length == 1) {
                minimize();
            }
            else if (this.words[0] == "maximize" && this.words.length == 1) {
                maximize();
            }
            else if (this.words[0] == "history" && this.words.length == 1) {
                var elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                for (let i = 1; i < this.cronologia.length - 1; i++) {
                    elem.innerHTML += this.cronologia[i];
                    elem.innerHTML += "<br>";
                }
            }
            else if (this.words[0] != "") {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
                elem.textContent += "-bash: \u00A0" + this.words[0] + ":\u00A0  command not found";
            }
            else {
                let elem = document.getElementById('container' + this.curr + this.index).appendChild(document.createElement('div'));
            }
            this.initNewLine();
        }
        else if (e.code == 'ArrowUp') {
            e.preventDefault();
            if (this.p > 1) this.p--;
            document.getElementById('line' + this.curr + this.index).textContent = this.cronologia[this.p];
        }
        else if (e.code == 'ArrowDown') {
            e.preventDefault();
            if (this.p < this.cronologia.length - 1) this.p++;
            document.getElementById('line' + this.curr + this.index).textContent = this.cronologia[this.p];
        }
    }

}