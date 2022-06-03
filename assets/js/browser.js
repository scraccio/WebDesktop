class Browser {

    minimized;
    maximized;
    index;
    id;
    isDown;
    offset;
    active;
    oldTop;
    oldLeft;

    constructor(count) {
        openBrowser++;
        this.isDown = false;
        this.active = false;
        this.offset = [];
        this.index = count;
        this.minimized = false;
        this.maximized = false;
       
        let containerBrowser = document.createElement('div');
        containerBrowser.style.zIndex = 0;
        containerBrowser.id = 'containerBrowser' + this.index;
        this.id = containerBrowser.id;
        containerBrowser.addEventListener('mousedown', () => {
            setInactiveIcons('browser');
            document.getElementById('containerBrowser' + this.index).style.zIndex = 1;
            this.active = true;
            document.getElementById('browser' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
        });
        containerBrowser.style.width = '80%';
        containerBrowser.style.height = '80%';
        containerBrowser.style.position = 'absolute';
        containerBrowser.style.left = '10%';
        containerBrowser.style.top = '8%';
        containerBrowser.style.borderTopLeftRadius = '10px';
        containerBrowser.style.borderTopRightRadius = '10px';
        containerBrowser.style.borderBottomLeftRadius = '10px';
        containerBrowser.style.borderBottomRightRadius = '10px';
        containerBrowser.style.overflow = 'hidden';
        containerBrowser.style.resize = 'both';

        let iframe = document.createElement('iframe');
        iframe.id = 'iframe' + this.index;
        iframe.src = 'https://www.google.com/search?igu=1';
        iframe.frameBorder = 0;
        //iframe.scrolling = 'no';
        iframe.style.position = 'absolute';
        iframe.width = '101%';
        iframe.height = '96.5%';
        iframe.style.marginTop = '11px';
        iframe.style.marginLeft = '-4px';
        iframe.style.left = '50%';
        iframe.style.top = '50%';
        iframe.style.transform = 'translate(-50%,-50%)';
        iframe.onload = () => {
            if(!document.getElementById('menu' + this.index)){
                let menu = document.createElement('div');
                let menu1 = document.createElement('div');
                let menuEntry1 = document.createElement('div');
                let menu2 = document.createElement('div');
                let menuEntry2 = document.createElement('div');
                let menu3 = document.createElement('div');
                let menuEntry3 = document.createElement('div');
                let menu4 = document.createElement('div');
                createMenu.call(this, 'browser', containerBrowser, menu, menu1, menuEntry1, menu2, menuEntry2, menu3, menuEntry3, menu4, null);
                containerBrowser.style.boxShadow = '5px 5px 10px rgb(14, 14, 14)';

                menu.addEventListener('mousedown', (e) => {this.start_move_shell(e)}, true);
                document.addEventListener('mouseup', (e) => {this.stop_move_shell()}, true);
                document.addEventListener('mousemove', (e) => {this.move_shell(e)}, true);
                setInactiveIcons('browser');
                document.getElementById('containerBrowser' + this.index).style.zIndex = 1;
                this.active = true;
                document.getElementById('browser' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            }
        };
        containerBrowser.appendChild(iframe);
        document.body.appendChild(containerBrowser);
    }

    minimize() {
        if (this.minimized && !this.active) {
            document.getElementById('containerBrowser' + this.index).style.visibility = 'visible';
            document.getElementById('containerBrowser' + this.index).style.zIndex = 1;
            document.getElementById('browser' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            this.active = true;
            this.minimized = false;
        }
        else if (!this.minimized && this.active) {
            document.getElementById('containerBrowser' + this.index).style.visibility = 'hidden';
            document.getElementById('containerBrowser' + this.index).style.zIndex = 0;
            document.getElementById('browser' + this.index).style.backgroundColor = 'rgb(2, 0, 46)';
            this.active = false;
            this.minimized = true;
        }
    }

    maximize() {
        if (this.maximized) {
            document.getElementById('containerBrowser' + this.index).style.width = '50%';
            document.getElementById('containerBrowser' + this.index).style.height = '55%';
            document.getElementById('containerBrowser' + this.index).style.top = this.oldTop;
            document.getElementById('containerBrowser' + this.index).style.left = this.oldLeft;
            document.getElementById('menu' + this.index).style.borderTopLeftRadius = '5px';
            document.getElementById('menu' + this.index).style.borderTopRightRadius = '5px';
            document.getElementById('containerBrowser' + this.index).style.borderBottomLeftRadius = '1%';
            document.getElementById('containerBrowser' + this.index).style.borderBottomLeftRadius = '1%';
        }
        else {
            document.getElementById('containerBrowser' + this.index).style.width = '100%';
            document.getElementById('containerBrowser' + this.index).style.height = '100%';
            this.oldTop = document.getElementById('containerBrowser' + this.index).style.top;
            this.oldLeft = document.getElementById('containerBrowser' + this.index).style.left;
            document.getElementById('containerBrowser' + this.index).style.top = 0;
            document.getElementById('containerBrowser' + this.index).style.left = 0;
            document.getElementById('menu' + this.index).style.borderTopLeftRadius = 0;
            document.getElementById('menu' + this.index).style.borderTopRightRadius = 0;
        }
        this.maximized = !this.maximized;
    }

    cross() {
        document.getElementById('containerBrowser' + this.index).remove();
        document.getElementById('browser' + this.index).remove();
        for (let i = 0; i < objArray.length; i++) {
            if (this.id == objArray[i].id) {
                objArray.splice(i, 1);
            }
        }
        openBrowser--;
    }

    move_shell(e) {
        if (this.isDown && !this.maximized && e.clientX > 0 && e.clientY > 0) {
            let mousePosition = {
                x: e.clientX,
                y: e.clientY

            };
            document.getElementById('containerBrowser' + this.index).style.left = (mousePosition.x + this.offset[0]) + 'px';
            document.getElementById('containerBrowser' + this.index).style.top = (mousePosition.y + this.offset[1]) + 'px';
        }
    }

    start_move_shell(e) {
        this.isDown = true;
        this.offset = [
            document.getElementById('containerBrowser' + this.index).offsetLeft - e.clientX,
            document.getElementById('containerBrowser' + this.index).offsetTop - e.clientY
        ];
    }

    stop_move_shell() {
        this.isDown = false;
    }
}