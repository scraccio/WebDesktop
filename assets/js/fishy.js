class Fishy {

    minimized;
    maximized;
    index;
    id;
    isDown;
    offset;
    active;

    constructor(count) {
        openFishy++;
        this.isDown = false;
        this.active = false;
        this.offset = [];
        this.index = count;
        this.minimized = false;
        this.maximized = false;
       
        let containerFishy = document.createElement('div');
        containerFishy.style.zIndex = 0;
        containerFishy.id = 'containerFishy' + this.index;
        this.id = containerFishy.id;
        containerFishy.addEventListener('mousedown', () => {
            setInactiveIcons('fishy');
            document.getElementById('containerFishy' + this.index).style.zIndex = 1;
            this.active = true;
            document.getElementById('fishy' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
        });
        containerFishy.oncontextmenu = (e) => {
            e.stopPropagation();
            e.preventDefault();
        }
        containerFishy.style.width = '50%';
        containerFishy.style.height = '55%';
        containerFishy.style.position = 'absolute';
        containerFishy.style.left = '27%';
        containerFishy.style.top = '20%';
        containerFishy.style.borderRadius = '5px';
        containerFishy.style.overflow = 'hidden';

        let iframe = document.createElement('iframe');
        containerFishy.appendChild(iframe);
        iframe.id = 'iframeFishy' + this.index;
        iframe.src = '../../fishy/index.html';
        iframe.frameBorder = 0;
        iframe.scrolling = 'no';
        iframe.style.position = 'absolute';
        iframe.style.width = '104%';
        iframe.style.height = 'calc(100% - 26px)';
        //iframe.style.marginTop = '0';
        //iframe.style.marginLeft = '0';
        iframe.style.top = '27px';
        iframe.style.left = '-8px';
        iframe.style.visibility = 'hidden';
        document.body.style.cursor = 'wait';
        iframe.onload = () => {

            let div = document.createElement('div');
            div.id = 'instructionsDiv';
            div.className = 'popup';
            div.style.backgroundColor = 'rgb(240, 240, 240)';
            div.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
            div.style.position = 'absolute';
            div.style.width = '700px';
            div.style.height = '300px';
            div.style.top = '30%';
            div.style.left = '30%';
            div.style.zIndex = 10;
            div.style.transform = 'translate(-50%,-50%)';
            div.style.borderRadius = '5px';
            document.body.appendChild(div);

            let instructions = document.createElement('div');
            instructions.id = 'instructions';
            instructions.textContent = 'Press the \'WASD\' keys to move, eat smaller fishes to grow!';
            instructions.style.fontSize = '30px';
            instructions.style.fontFamily = 'Sans-serif';
            instructions.style.textAlign = 'center';
            instructions.style.color = 'rgb(14, 14, 14)';
            instructions.style.position = 'absolute';
            instructions.style.width = '500px';
            instructions.style.top = '40%';
            instructions.style.left = '50%';
            instructions.style.transform = 'translate(-50%,-50%)';
            instructions.style.userSelect = 'none';
            div.appendChild(instructions);

            let confirm = document.createElement('div');
            confirm.id = 'confirm';
            confirm.style.color = 'rgb(14, 14, 14)';
            confirm.textContent = 'Got it!';
            confirm.style.backgroundColor = 'rgb(240, 240, 240)';
            confirm.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
            confirm.style.fontSize = '20px';
            confirm.style.fontFamily = 'Sans-serif';
            confirm.style.position = 'absolute';
            confirm.style.textAlign = 'center';
            confirm.style.userSelect = 'none';
            confirm.style.width = '80px';
            confirm.style.height = '30px';
            confirm.style.top = '75%';
            confirm.style.left = '50%';
            confirm.style.transform = 'translate(-50%,-50%)';
            confirm.style.borderRadius = '5px';
            confirm.addEventListener('click', ()=>{
                div.addEventListener('animationend', ()=>{
                    div.remove();
                })
                div.className = 'antiPopup';
            });
            confirm.onmouseover = ()=>{
                confirm.style.backgroundColor = 'rgb(220, 220, 220)';
            }
            confirm.onmouseout = ()=>{
                confirm.style.backgroundColor = 'rgb(240, 240, 240)';
            }
            div.appendChild(confirm);
            
            document.body.style.cursor = 'default';
            containerFishy.className = 'container';
            containerFishy.classList.add('popupProgram');
            iframe.style.visibility = 'visible';
            if(!document.getElementById('menuFishy' + this.index)){
                let menu = document.createElement('div');
                let menu1 = document.createElement('div');
                let menuEntry1 = document.createElement('div');
                let menu2 = document.createElement('div');
                let menuEntry2 = document.createElement('div');
                let menu3 = document.createElement('div');
                let menuEntry3 = document.createElement('div');
                let menu4 = document.createElement('div');
                createMenu.call(this, 'fishy', containerFishy, menu, menu1, menuEntry1, menu2, menuEntry2, menu3, menuEntry3, menu4, null);
                containerFishy.style.boxShadow = '5px 5px 10px rgb(14, 14, 14)';

                menu.addEventListener('mousedown', (e) => {this.start_move_shell(e)}, true);
                document.addEventListener('mouseup', (e) => {this.stop_move_shell()}, true);
                document.addEventListener('mousemove', (e) => {this.move_shell(e)}, true);
                setInactiveIcons('fishy');
                document.getElementById('containerFishy' + this.index).style.zIndex = 1;
                this.active = true;
                document.getElementById('fishy' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            }
        };
        document.body.appendChild(containerFishy);
    }

    minimize() {
        if (this.minimized && !this.active) {
            //document.getElementById('containerFishy' + this.index).style.visibility = 'visible';
            //document.getElementById('containerFishy' + this.index).style.zIndex = 1;
            document.getElementById('fishy' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            this.active = true;
            this.minimized = false;
            document.getElementById(this.id).classList.add('popupProgram');
            document.getElementById(this.id).classList.remove('antiPopupProgram');

        }
        else if (!this.minimized && this.active) {
            //document.getElementById('containerFishy' + this.index).style.visibility = 'hidden';
            //document.getElementById('containerFishy' + this.index).style.zIndex = 0;
            document.getElementById('fishy' + this.index).style.backgroundColor = 'rgb(2, 0, 46)';
            this.active = false;
            this.minimized = true;
            document.getElementById(this.id).classList.remove('popupProgram');
            document.getElementById(this.id).classList.add('antiPopupProgram');
        }
    }


    cross() {
        document.getElementById('containerFishy' + this.index).addEventListener('animationend', ()=>{
            document.getElementById('containerFishy' + this.index).remove();
        });
        document.getElementById('containerFishy' + this.index).classList.remove('popupProgram');
        document.getElementById('containerFishy' + this.index).classList.add('antiPopupProgram');
        
        document.getElementById('fishy' + this.index).addEventListener('animationend', ()=>{
            document.getElementById('fishy' + this.index).remove();
        });
        document.getElementById('fishy' + this.index).classList.remove('popupProgram');
        document.getElementById('fishy' + this.index).classList.add('antiPopupProgram');
        for (let i = 0; i < objArray.length; i++) {
            if (this.id == objArray[i].id) {
                objArray.splice(i, 1);
            }
        }
        openFishy--;
    }

    move_shell(e) {
        if (this.isDown && e.clientX > 0 && e.clientY > 0) {
            let mousePosition = {
                x: e.clientX,
                y: e.clientY

            };
            document.getElementById('containerFishy' + this.index).style.left = (mousePosition.x + this.offset[0]) + 'px';
            document.getElementById('containerFishy' + this.index).style.top = (mousePosition.y + this.offset[1]) + 'px';
        }
    }

    start_move_shell(e) {
        this.isDown = true;
        this.offset = [
            document.getElementById('containerFishy' + this.index).offsetLeft - e.clientX,
            document.getElementById('containerFishy' + this.index).offsetTop - e.clientY
        ];
    }

    stop_move_shell() {
        this.isDown = false;
    }
}