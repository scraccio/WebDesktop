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
        containerFishy.style.width = '80%';
        containerFishy.style.height = '80%';
        containerFishy.style.position = 'absolute';
        containerFishy.style.left = '50%';
        containerFishy.style.top = '50%';
        containerFishy.style.transform = 'translate(-50%,-50%)';
        containerFishy.style.borderTopLeftRadius = '10px';
        containerFishy.style.borderTopRightRadius = '10px';
        containerFishy.style.borderBottomLeftRadius = '10px';
        containerFishy.style.borderBottomRightRadius = '10px';
        containerFishy.style.overflow = 'hidden';

        let iframe = document.createElement('iframe');
        iframe.id = 'iframe' + this.index;
        iframe.src = '../../fishy/index.html';
        iframe.frameBorder = 0;
        iframe.scrolling = 'no';
        iframe.style.position = 'absolute';
        iframe.width = '101%';
        iframe.height = '96.5%';
        iframe.style.marginTop = '11px';
        iframe.style.marginLeft = '-4px';
        iframe.style.left = '50%';
        iframe.style.top = '50%';
        iframe.style.transform = 'translate(-50%,-50%)';
        iframe.onload = () => {

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
        };
        containerFishy.appendChild(iframe);
        document.body.appendChild(containerFishy);
    }

    minimize() {
        if (this.minimized && !this.active) {
            document.getElementById('containerFishy' + this.index).style.visibility = 'visible';
            document.getElementById('containerFishy' + this.index).style.zIndex = 1;
            document.getElementById('fishy' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            this.active = true;
            this.minimized = false;
        }
        else if (!this.minimized && this.active) {
            document.getElementById('containerFishy' + this.index).style.visibility = 'hidden';
            document.getElementById('containerFishy' + this.index).style.zIndex = 0;
            document.getElementById('fishy' + this.index).style.backgroundColor = 'rgb(2, 0, 46)';
            this.active = false;
            this.minimized = true;
        }
    }

    cross() {
        document.getElementById('containerFishy' + this.index).remove();
        document.getElementById('fishy' + this.index).remove();
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

/*function fishy() {

    let fishyProgram = new Fishy(fishyCount);
    objArray.push(fishyProgram);

    let newDiv = document.createElement('div');
    createBarIcon.call(this, 'fishy', newDiv, fishyProgram);

    newDiv.onclick = () => {
        fishyProgram.minimize();
        setInactiveIcons('fishy');
        if (!fishyProgram.minimized) {
            fishyProgram.active = true;
            document.getElementById('fishy' + fishyProgram.index).style.backgroundColor = 'rgb(5, 0, 80)';
            document.getElementById('containerFishy' + fishyProgram.index).style.zIndex = 1;
        }
        
    };

    document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
    

    let newImg = document.createElement('img');
    assignImageToIcon.call(this, 'fishy', newDiv, newImg);
    

    
    document.getElementById('fishy' + fishyProgram.index).style.backgroundColor = 'rgb(5, 0, 80)';
    document.getElementById('containerFishy' + fishyProgram.index).click();
}*/