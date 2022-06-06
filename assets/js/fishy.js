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
        containerFishy.style.left = '20%';
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