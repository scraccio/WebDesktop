class Document {

    maximized;
    minimized;
    index;
    oldTop;
    oldLeft;
    active;
    isDown;
    offset;
    title;

    constructor(num) {
        this.index = num;
        this.maximized = false;
        this.minimized = false;
        this.active = false;
        this.isDown = false;
        this.offset = [];
    }

    createDocument() {

        let container = document.createElement('div');
        container.id = "containerDocument" + this.index;
        this.id = container.id;
        container.className = 'container';
        container.style.resize = 'both';
        container.style.overflow = 'auto';
        container.style.minWidth = '220px';
        container.style.minHeight = '65px';
        container.style.zIndex = 0;
        container.addEventListener('mousedown', () => {
            setInactiveIcons('document');
            document.getElementById('containerDocument' + this.index).style.zIndex = 1;
            this.active = true;
            document.getElementById('document' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
        });
        container.oncontextmenu = (e) => {
            e.stopPropagation();
            e.preventDefault();
        }
        let menu = document.createElement('div');
        let menu1 = document.createElement('div');
        let menuEntry1 = document.createElement('div');
        let menu2 = document.createElement('div');
        let menuEntry2 = document.createElement('div');
        let menu3 = document.createElement('div');
        let menuEntry3 = document.createElement('div');
        let menu4 = document.createElement('div');
        let textField = document.createElement('div');
        createMenu.call(this, 'document', container, menu, menu1, menuEntry1, menu2, menuEntry2, menu3, menuEntry3, menu4, textField);
        if(localStorage.getItem('document' + this.index)) textField.innerHTML = JSON.parse(localStorage.getItem('document' + this.index));
        document.body.appendChild(container);

        menu.addEventListener('mousedown', (e) => {this.start_move_shell(e)}, true);
        document.addEventListener('mouseup', (e) => {this.stop_move_shell()}, true);
        document.addEventListener('mousemove', (e) => {this.move_shell(e)}, true);

        setInactiveIcons('document');
        document.getElementById('containerDocument' + this.index).style.zIndex = 1;
        this.active = true;
        document.getElementById('document' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
    }

    minimize() {
        if (this.minimized && !this.active) {
            document.getElementById('containerDocument' + this.index).style.visibility = 'visible';
            document.getElementById('containerDocument' + this.index).style.zIndex = 1;
            document.getElementById('document' + this.index).style.backgroundColor = 'rgb(5, 0, 80)';
            this.active = true;
            this.minimized = false;
        }
        else if (!this.minimized && this.active) {
            document.getElementById('containerDocument' + this.index).style.visibility = 'hidden';
            document.getElementById('containerDocument' + this.index).style.zIndex = 0;
            document.getElementById('document' + this.index).style.backgroundColor = 'rgb(2, 0, 46)';
            this.active = false;
            this.minimized = true;
        }
    }

    cross() {
        
        if ((!localStorage.getItem('document' + this.index) && document.getElementById('textFieldDoc' + this.index).innerHTML != '') || (localStorage.getItem('document' + this.index) && JSON.parse(localStorage.getItem('document' + this.index)) != document.getElementById('textFieldDoc'+this.index).innerHTML )) {
            let confirm = document.createElement('div');
            confirm.style.width = '120px';
            confirm.style.height = '80px';
            confirm.style.position = 'absolute';
            confirm.style.top = '50%';
            confirm.style.left = '50%';
            confirm.style.transform = 'translate(-50%,-50%)';
            confirm.style.backgroundColor = 'rgb(200,200,200)';
            confirm.style.border = '1px solid black';
            confirm.style.borderRadius = '5px';
            document.getElementById('textFieldDoc' + this.index).contentEditable = false;
            confirm.contentEditable = false;
            document.getElementById('containerDocument' + this.index).appendChild(confirm);

            let text = document.createElement('div');
            text.textContent = 'Vuoi salvare?';
            text.style.color = 'black';
            text.style.position = 'absolute';
            text.style.width = '100px';
            text.style.top = '50%';
            text.style.left = '50%';
            text.style.transform = 'translate(-45%,-150%)';
            confirm.appendChild(text);

            let yesRiquadro = document.createElement('div');
            yesRiquadro.style.position = 'absolute';
            yesRiquadro.style.width = '30px';
            yesRiquadro.style.height = '30px';
            yesRiquadro.style.top = '50%';
            yesRiquadro.style.left = '50%';
            yesRiquadro.style.transform = 'translateX(-150%)';
            yesRiquadro.style.border = '1px solid black';
            yesRiquadro.style.borderRadius = '5px';
            confirm.appendChild(yesRiquadro);
            yesRiquadro.onclick = () => {
                localStorage.setItem("document" + this.index, JSON.stringify(document.getElementById('textFieldDoc' + this.index).innerHTML));
                document.getElementById('containerDocument' + this.index).remove();
                document.getElementById('document' + this.index).remove();
                for (let i = 0; i < objArray.length; i++) {
                    if (this.id == objArray[i].id) {
                        objArray.splice(i, 1);
                    }
                }
            }

            let yes = document.createElement('div');
            yes.textContent = 'Si';
            yes.style.color = 'black';
            yes.style.position = 'absolute';
            yes.style.top = '50%';
            yes.style.left = '50%';
            yes.style.userSelect = 'none';
            yes.style.transform = 'translate(-50%,-50%)';
            yesRiquadro.appendChild(yes);

            let noRiquadro = document.createElement('div');
            noRiquadro.style.position = 'absolute';
            noRiquadro.style.width = '30px';
            noRiquadro.style.height = '30px';
            noRiquadro.style.top = '50%';
            noRiquadro.style.left = '50%';
            noRiquadro.style.transform = 'translateX(50%)';
            noRiquadro.style.border = '1px solid black';
            noRiquadro.style.borderRadius = '5px';
            confirm.appendChild(noRiquadro);
            noRiquadro.onclick = () => {
                document.getElementById('containerDocument' + this.index).remove();
                document.getElementById('document' + this.index).remove();
                for (let i = 0; i < objArray.length; i++) {
                    if (this.id == objArray[i].id) {
                        objArray.splice(i, 1);
                    }
                }
            }

            let no = document.createElement('div');
            no.textContent = 'No';
            no.style.color = 'black';
            no.style.position = 'absolute';
            no.style.top = '50%';
            no.style.left = '50%';
            no.style.userSelect = 'none';
            no.style.transform = 'translate(-50%,-50%)';
            noRiquadro.appendChild(no);
        }
        else {
            document.getElementById('containerDocument' + this.index).remove();
            document.getElementById('document' + this.index).remove();
            for (let i = 0; i < objArray.length; i++) {
                if (this.id == objArray[i].id) {
                    objArray.splice(i, 1);
                }
            }
        }
    }

    maximize() {
        if (this.maximized) {
            document.getElementById('containerDocument' + this.index).style.width = '50%';
            document.getElementById('containerDocument' + this.index).style.height = '55%';
            document.getElementById('containerDocument' + this.index).style.top = this.oldTop;
            document.getElementById('containerDocument' + this.index).style.left = this.oldLeft;
            document.getElementById('menu' + this.index).style.borderTopLeftRadius = '5px';
            document.getElementById('menu' + this.index).style.borderTopRightRadius = '5px';
            document.getElementById('containerDocument' + this.index).style.borderBottomLeftRadius = '1%';
            document.getElementById('containerDocument' + this.index).style.borderBottomLeftRadius = '1%';
        }
        else {
            document.getElementById('containerDocument' + this.index).style.width = '100%';
            document.getElementById('containerDocument' + this.index).style.height = '100%';
            this.oldTop = document.getElementById('containerDocument' + this.index).style.top;
            this.oldLeft = document.getElementById('containerDocument' + this.index).style.left;
            document.getElementById('containerDocument' + this.index).style.top = 0;
            document.getElementById('containerDocument' + this.index).style.left = 0;
            document.getElementById('menu' + this.index).style.borderTopLeftRadius = 0;
            document.getElementById('menu' + this.index).style.borderTopRightRadius = 0;
        }
        this.maximized = !this.maximized;
    }

    move_shell(e) {
        if (this.isDown && !this.maximized && e.clientX > 0 && e.clientY > 0) {
            let mousePosition = {
                x: e.clientX,
                y: e.clientY

            };
            document.getElementById('containerDocument' + this.index).style.left = (mousePosition.x + this.offset[0]) + 'px';
            document.getElementById('containerDocument' + this.index).style.top = (mousePosition.y + this.offset[1]) + 'px';
        }
    }

    start_move_shell(e) {
        this.isDown = true;
        this.offset = [
            document.getElementById('containerDocument' + this.index).offsetLeft - e.clientX,
            document.getElementById('containerDocument' + this.index).offsetTop - e.clientY
        ];
    }

    stop_move_shell() {
        this.isDown = false;
    }

}

function newDocument(num) {

    currElementsCol++;
    if(currElementsCol == 6){
        currElementsCol = 1;
        currentColumn++;
    }

    documentCount++;
    localStorage.setItem("documentCount", documentCount);

    let div = document.createElement('div');
    div.className = 'document-icon icon';
    div.id = 'documentIcon' + num;
    
    if(!localStorage.getItem("document" + num)){
        localStorage.setItem("document" + num, JSON.stringify(''));
    }

    document.getElementById('column' + currentColumn).appendChild(div);

    let image = document.createElement('img');
    image.src = 'assets/img/documents.png';
    image.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
    div.appendChild(image);

    let icondiv = document.createElement('div');
    icondiv.className = 'icon-text';
    if(num == 0){
        icondiv.textContent = 'Documento';
    }
    else{
        icondiv.textContent = 'Documento(' + num + ")";
    }
    div.appendChild(icondiv);
    
    div.onclick = (e) => {
        e.stopPropagation();
        if(document.getElementById('document' + num)){
            let error = document.createElement('div');
            error.style.position = 'absolute';
            error.id = 'error';
            error.style.width = '200px';
            error.style.height = '100px';
            error.style.backgroundColor = 'rgb(200,200,200)';
            error.style.border = '1px solid black';
            error.style.borderRadius = '5px';
            error.style.top = '50%';
            error.style.left = '50%';
            error.style.transform = 'translate(-50%,-50%)';
            error.style.zIndex = 5;
            document.getElementById('containerDesktop').appendChild(error);

            let errorMessage = document.createElement('div');
            errorMessage.textContent = 'Impossibile aprire \'' + icondiv.textContent + '\':';
            errorMessage.innerHTML += '<br>File già aperto';
            errorMessage.style.color = 'black';
            errorMessage.style.position = 'absolute';
            errorMessage.style.top = '20%';
            errorMessage.style.left = '20%';
            errorMessage.style.userSelect = 'none';
            error.appendChild(errorMessage);

            setTimeout(()=>{
                if(document.getElementById('error')){
                    document.getElementById('error').remove();
                }}, 1000);
        }
        else{
            let documento = new Document(num);
            objArray.push(documento);
            let newDiv = document.createElement('div');

            createBarIcon('document', newDiv, documento);
            document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);

            let newImg = document.createElement('img');
            newImg.src = 'assets/img/documents.png';
            newImg.style.width = '30px';
            newImg.style.height = '30px';
            newImg.style.position = 'absolute';
            newImg.style.top = '50%';
            newImg.style.left = '50%';
            newImg.style.transform = 'translate(-50%, -50%)';
            newImg.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
            newDiv.appendChild(newImg);
            newDiv.onclick = () => {
                documento.minimize();
                setInactiveIcons('document');
                if (!documento.minimized) {
                    documento.active = true;
                    document.getElementById('document' + documento.index).style.backgroundColor = 'rgb(5, 0, 80)';
                    document.getElementById('containerDocument' + documento.index).style.zIndex = 1;
                }

            };
            documento.createDocument();
        }
        
    }

    let menu = document.createElement('div');

    div.oncontextmenu = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        removeActiveDivs();
        createContextMenu(e, 'document', menu, num);
        contextMenuIcon(menu, 'document', num);
    }
}