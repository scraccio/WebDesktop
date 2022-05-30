function setActiveFalse(id) {
    for (let i = 0; i < objArray.length; i++) {
        if (objArray[i].id == id) {
            objArray[i].active = false;
        }
    }
}

function removeActiveDivs(){
    if (document.getElementById('contextmenu')) {
        document.getElementById('contextmenu').remove();
    }
}

function setInactiveIcons(objName){
    let items = Array.from(document.getElementsByTagName('div'));
    for (let i = 0; i < items.length; i++) {
        if (items[i] && (items[i].id.includes('containerTerminal') || items[i].id.includes('containerFishy') || items[i].id.includes('containerDocument'))) {
            items[i].style.zIndex = 0;
            setActiveFalse(items[i].id);
            if (items[i].id.includes('container' + objName.charAt(0).toUpperCase() + objName.slice(1))) {
                for (let j = 0; j < objArray.length; j++) {
                    if (objArray[j].id == items[i].id) {
                        document.getElementById(objName + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)'; 
                    }
                }
            }
        }
    }
    for (let j = 0; j < objArray.length; j++) {
        if (objName != 'fishy' && objArray[j].id.includes('Fishy')) {
            document.getElementById('fishy' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
        }
        if (objName != 'document' && objArray[j].id.includes('Document')) {
            document.getElementById('document' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
        }
        if (objName != 'terminal' && objArray[j].id.includes('Terminal')) {
            document.getElementById('terminal' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
        }
    }
}

function createMenu(objName, container, menu, menu1, menuEntry1, menu2, menuEntry2, menu3, menuEntry3, menu4, textField){
    
    menu.id = "menu" + this.index;
    menu.className = 'menu';
    container.appendChild(menu);

    menu1.id = "menuEntry1" + objName.charAt(0).toUpperCase() + objName.slice(1);
    menu1.id += this.index;
    menu1.className = "button menuEntry1";
    menu1.addEventListener("click", () => {this.cross();});
    menu.appendChild(menu1);

    menuEntry1.id = 'menuCross' + objName.charAt(0).toUpperCase() + objName.slice(1);
    menuEntry1.id += this.index;

    menuEntry1.className = 'menuCross';
    menuEntry1.innerHTML += '&#10005;';
    menu1.appendChild(menuEntry1);

    menu2.id = "menuEntry2" + objName.charAt(0).toUpperCase() + objName.slice(1);
    menu2.id += this.index;
    menu2.className = "button menuEntry2";
    menu2.addEventListener("click", () => {this.minimize();});
    menu.appendChild(menu2);

    
    menuEntry2.id = 'menuMinimize' + objName.charAt(0).toUpperCase() + objName.slice(1);
    menuEntry2.id += this.index;
    menuEntry2.className = 'menuMinimize';
    menuEntry2.innerHTML += '&#9472;';
    menu2.appendChild(menuEntry2);
    
    if(objName != 'fishy'){
        menu3.id = "menuEntry3" + objName.charAt(0).toUpperCase() + objName.slice(1);
        menu3.id += this.index;
        menu3.className = "button menuEntry3";
        if(objName != 'fishy'){
            menu3.addEventListener("click", () => {this.maximize();});
        }
        menu.appendChild(menu3);
        
        menuEntry3.id = 'menuMaximize' + objName.charAt(0).toUpperCase() + objName.slice(1);
        menuEntry3.id += this.index;
        menuEntry3.className = 'menuMaximize';
        menuEntry3.innerHTML += '&#9723;';
        menu3.appendChild(menuEntry3);

    }
    
    menu4.id = "menuEntry4" + objName.charAt(0).toUpperCase() + objName.slice(1);
    menu4.id += this.index;
    menu4.className = 'menuEntry4';

    if(objName == 'terminal'){
        menu4.textContent = 'scraccio@ubuntu:~';
    }
    if(objName == 'fishy'){
        menu4.textContent = 'Fishy';
    }
    if(objName == 'document'){
        for(let i=0; i<document.getElementsByClassName('document-icon').length; i++){
            if(document.getElementsByClassName('document-icon')[i].id == 'documentIcon' + this.index){
                if((this.index) == 0){
                    menu4.textContent = 'Documento';
                }
                else{
                    menu4.textContent = 'Documento(' + this.index +')';
                }
            }
        }
    }
    
    menu.appendChild(menu4);

    if(objName == 'terminal'){
        textField.id = "textField" + this.index;
        textField.className = 'textField';
        container.appendChild(textField);
    }
    if(objName == 'document'){
        textField.id = "textFieldDoc" + this.index;
        textField.className = 'textFieldDoc';
        if(localStorage.getItem('document' + this.index)){
            textField.innerHTML = JSON.parse(localStorage.getItem('document' + this.index));
        }
        textField.contentEditable = true;
        textField.style.color = 'black';
        textField.style.outline = 'none';
        setTimeout(textField.focus(), 10);
        container.appendChild(textField);
    }
}

function createBarIcon(objName, newDiv, obj){

    newDiv.className = 'bottom-bar-element';

    if(objName == 'terminal'){
        newDiv.id = 'terminal' + openTerminal;
    }
    if(objName == 'fishy'){
        newDiv.id = 'fishy' + obj.index;
    }
    if(objName == 'document'){
        newDiv.id = 'document' + obj.index;
    }
    newDiv.oncontextmenu = (e) => {
        e.stopPropagation()
        e.preventDefault();
        removeActiveDivs();
        let menu = document.createElement("div");
        createContextMenu(e, objName, menu, obj);
    }

    newDiv.style.width = '50px';
    newDiv.style.height = '50px';
    newDiv.style.position = 'relative';
    newDiv.style.top = 0;
    newDiv.style.left = 0;
    newDiv.style.display = 'inline-block';

    newDiv.onclick = () => {
        obj.minimize();
        setInactiveIcons(objName);
        if (!obj.minimized) {
            obj.active = true;
            document.getElementById(objName + obj.index).style.backgroundColor = 'rgb(5, 0, 80)';
            document.getElementById('container' + objName.charAt(0).toUpperCase() + objName.slice(1) + obj.index).style.zIndex = 1;
        }
    };
    
    document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
}

function createContextMenu(e, objName, menu, obj){
    document.body.appendChild(menu);

    var x = e.clientX;
    var y = e.clientY;

    menu.id = 'contextmenu';
    menu.style.position = "fixed";
    menu.style.left = x + "px";
    if (y >= window.innerHeight - 50) {
        menu.style.top = (y - 40) + "px";
    }
    else {
        menu.style.top = y + "px";
    }
    menu.style.width = '80px';
    menu.style.height = '42px';
    menu.style.backgroundColor = 'rgb(100, 100, 100)';
    //menu.style.paddingTop = '2px';
    menu.style.boxSizing = 'border-box';
    menu.style.border = '1px solid black';
    menu.style.zIndex = 3;

    let firstText = document.createElement("div");
    firstText.id = 'firstText';
    firstText.onclick = (e) => {
        if(objName == 'terminal'){
            let terminal = new Terminal(openTerminal);
            objArray.push(terminal);

            newDiv = document.createElement('div');
            newImg = document.createElement('img');
            createBarIcon(objName, newDiv, terminal);
            assignImageToIcon(objName, newDiv, newImg);

            newDiv.onclick = () => {
                terminal.minimize();
                setInactiveIcons('terminal');
                if (!terminal.minimized) {
                    terminal.active = true;
                    document.getElementById('terminal' + terminal.index).style.backgroundColor = 'rgb(5, 0, 80)';
                    document.getElementById('containerTerminal' + terminal.index).style.zIndex = 1;
                }
            };
            
            document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
            terminal.openTerminal();
        }
        if(objName == 'fishy'){
            let fishyProgram = new Fishy(openFishy);
            objArray.push(fishyProgram);

            newDiv = document.createElement('div');
            createBarIcon('fishy', newDiv, fishyProgram);

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
            assignImageToIcon('fishy', newDiv, newImg);
        }
        if(objName == 'document'){
            e.stopPropagation();
            if(document.getElementById('document' + obj.index)){
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
                let documento = new Document(documentCount);
                objArray.push(documento);

                let newDiv = document.createElement('div');
                newDiv.className = 'bottom-bar-element';

                createBarIcon('document', newDiv, documento);
                newDiv.id = 'document' + documentCount;
                document.body.appendChild(newDiv);
                newDiv.style.width = '50px';
                newDiv.style.height = '50px';
                newDiv.style.position = 'relative';
                newDiv.style.top = 0;
                newDiv.style.left = 0;
                newDiv.style.display = 'inline-block';

                document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
                newDiv.oncontextmenu = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeActiveDivs();
            
                    let menu = document.createElement("div");
                    document.body.appendChild(menu);
            
                    var x = e.clientX;
                    var y = e.clientY;
            
                    menu.id = 'contextmenu';
                    menu.style.position = "fixed";
                    menu.style.left = x + "px";
                    if (y >= window.innerHeight - 50) {
                        menu.style.top = (y - 40) + "px";
                    }
                    else {
                        menu.style.top = y + "px";
                    }
                    menu.style.width = '80px';
                    menu.style.height = '42px';
                    menu.style.backgroundColor = 'rgb(100, 100, 100)';
                    //menu.style.paddingTop = '2px';
                    menu.style.boxSizing = 'border-box';
                    menu.style.border = '1px solid black';
                    menu.style.zIndex = 3;
            
                    let firstText = document.createElement("div");
                    firstText.id = 'firstText';
                    firstText.onclick = (e) => {
                        e.stopPropagation();
                        document.getElementById('contextmenu').remove();
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
                        //errorMessage.style.transform = 'translate(-50%,-50%)';
                        error.appendChild(errorMessage);

                        setTimeout(()=>{document.getElementById('error').remove()}, 1000);
                    }
                    firstText.style.position = 'relative';
                    //firstText.innerHTML += '\x20';
                    firstText.textContent = '\xA0' + 'Apri';
                    firstText.style.color = 'white';
                    firstText.style.borderBottom = '1px solid rgb(50, 50, 50)';
                    firstText.style.cursor = 'default';
                    menu.appendChild(firstText);
            
                    let secondText = document.createElement("div");
                    secondText.id = 'secondText';
                    secondText.onclick = () => {
                        for (let i = 0; i < objArray.length; i++) {
                            if (objArray[i].id == 'container' + objName.charAt(0).toUpperCase() + objName.slice(1) + obj.index) {
                                objArray[i].cross();
                                break;
                            }
                        }
            
                    }
                    secondText.style.position = 'relative';
                    secondText.textContent = '\xA0' + 'Chiudi';
                    secondText.style.color = 'white';
                    secondText.style.cursor = 'default';
                    //secondText.style.borderBottom = '1px solid rgb(50, 50, 50)';
                    menu.appendChild(secondText);
                };
                

                let newImg = document.createElement('img');
                newImg.src = 'assets/img/documents.png';
                newImg.style.width = '30px';
                newImg.style.height = '30px';
                newImg.style.position = 'absolute';
                newImg.style.top = '50%';
                newImg.style.left = '50%';
                newImg.style.transform = 'translate(-50%, -50%)';
                newDiv.appendChild(newImg);
                newDiv.onclick = () => {
                    documento.minimize();
                    let items = Array.from(document.getElementsByTagName('div'));
                    for (let i = 0; i < items.length; i++) {
                        if (items[i] && (items[i].id.includes('containerTerminal') || items[i].id.includes('containerFishy') || items[i].id.includes('containerDocument'))) {
                            items[i].style.zIndex = 0;
                            setActiveFalse(items[i].id);
                            if (items[i].id.includes('containerTerminal')) {
                                for (let j = 0; j < objArray.length; j++) {
                                    if (objArray[j].id == items[i].id) {
                                        document.getElementById('terminal' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
                                    }
                                }
                            }
                        }
                    }
                    for (let j = 0; j < objArray.length; j++) {
                        if (objArray[j].id.includes('Fishy')) {
                            document.getElementById('fishy' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
                        }
                        if (objArray[j].id.includes('Document')) {
                            document.getElementById('document' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
                        }
                    }
                    if (!documento.minimized) {
                        documento.active = true;
                        document.getElementById('document' + documento.index).style.backgroundColor = 'rgb(5, 0, 80)';
                        document.getElementById('containerDocument' + documento.index).style.zIndex = 1;
                    }

                };
                documento.createDocument();
            }
        }
    }
    firstText.style.position = 'relative';  
    //firstText.innerHTML += '\x20';
    firstText.textContent = '\xA0' + 'Apri';
    firstText.style.color = 'white';
    firstText.style.borderBottom = '1px solid rgb(50, 50, 50)';
    firstText.style.cursor = 'default';
    menu.appendChild(firstText);

    let secondText = document.createElement("div");
    secondText.id = 'secondText';
    secondText.onclick = () => {
        for (let i = 0; i < objArray.length; i++) {
            if (objArray[i].id == 'container' + objName.charAt(0).toUpperCase() + objName.slice(1) + obj.index) {
                objArray[i].cross();
                break;
            }
        }
    }
    secondText.style.position = 'relative';
    secondText.textContent = '\xA0' + 'Chiudi';
    secondText.style.color = 'white';
    secondText.style.cursor = 'default';
    menu.appendChild(secondText);
}

function assignImageToIcon(objName, newDiv, newImg){
    let s = 'assets/img/';
    if(objName == 'terminal'){
        s += 'terminal.png';
    }
    if(objName == 'fishy'){
        s += 'fishy.jpg';
    }
    if(objName == 'document'){
        s += 'documents.png';
    }
    newImg.src = s;
    newImg.style.width = '30px';
    newImg.style.height = '30px';
    newImg.style.position = 'absolute';
    newImg.style.top = '50%';
    newImg.style.left = '50%';
    newImg.style.transform = 'translate(-50%, -50%)';
    newDiv.appendChild(newImg);
}

function contextMenuIcon(menu, objName, i){
    document.getElementById('contextmenu').style.height = '62px';
    document.getElementById('secondText').textContent = '\xA0' + 'Copia';
    document.getElementById('secondText').style.borderBottom = '1px solid black';
    document.getElementById('secondText').onclick = () => {
        clipboard = document.getElementsByClassName(objName + '-icon')[i].cloneNode(true);
        clipboard.id = objName + 'Icon' + (i+1);
        clipboard.querySelector('div').textContent = objName.charAt(0).toUpperCase() + objName.slice(1) + '(' + (i + 1) + ')';

        copied = true;
    }

    let thirdText = document.createElement('div');
    thirdText.id = 'thirdText';
    thirdText.style.position = 'relative';
    thirdText.textContent = '\xA0' + 'Elimina';
    thirdText.style.color = 'white';
    thirdText.style.cursor = 'default';
    thirdText.onclick = () => {
        if(currElementsCol == 0){
            currentColumn--;
            currElementsCol = 5;
        }
        else{
            currElementsCol--;
        }
        for(let j=0; j<document.getElementsByClassName(objName + '-icon').length; j++){
            if(document.getElementsByClassName(objName + '-icon')[j].id == objName + 'Icon' + i){
                document.getElementsByClassName(objName + '-icon')[j].remove();
            }
        }
        if(objName == 'document'){
            localStorage.removeItem("document" + i);
            documentCount--;
            localStorage.setItem("documentCount", documentCount);
            for(let j=0; j<fileArray.length; j++){
                if(fileArray[j] == i){
                    fileArray.splice(j,1);
                }
            }
        }
        if(objName == 'terminal'){
            localStorage.removeItem("terminal" + i);
            terminalCount--;
            localStorage.setItem("terminalCount", terminalCount);
        }
        if(objName == 'fishy'){
            localStorage.removeItem("fishy" + i);
            fishyCount--;
            localStorage.setItem("fishyCount", fishyCount);
        }
    }
    menu.appendChild(thirdText);
    
}

function assignIconBehaviour(objName, id, index){

    for(let i=0; i<document.getElementsByClassName(id).length; i++){
        if(document.getElementsByClassName(id)[i].id.includes(index)){
            document.getElementsByClassName(id)[i].addEventListener('contextmenu', (e) => {
                e.stopPropagation();
                e.preventDefault();
                removeActiveDivs();
        
                let menu = document.createElement("div");
        
                let obj;
                for (let j = 0; j < objArray.length; j++) {
                    //console.log(objArray[j].id);
                    if(objArray[j].id.includes(objName.charAt(0).toUpperCase() + objName.slice(1)) && objArray[j].index == (index)){
                        obj = objArray[j];
                        break;
                    }
                }
                createContextMenu(e, objName, menu, obj);
                if(id.includes('icon')) contextMenuIcon(menu, objName, index);
            });
            break;
        }
    }
    
}

function createIcon(objName, num){

    let div = document.createElement('div');
    div.className = objName + '-icon icon';
    div.id = objName + 'Icon' + num;
    
    if(objName == 'document' && !localStorage.getItem("document" + num)){
        localStorage.setItem("document" + num, JSON.stringify(''));
    }

    document.getElementById('column' + currentColumn).appendChild(div);

    let image = document.createElement('img');
    if(objName == 'terminal'){
        image.src = 'assets/img/terminal.png';
    }
    if(objName == 'fishy'){
        image.src = 'assets/img/fishy.jpg';
    }
    if(objName == 'document'){
        image.src = 'assets/img/documents.png';
    }
    div.appendChild(image);

    let icondiv = document.createElement('div');
    icondiv.className = 'icon-text';
    if(num == 0){
        icondiv.textContent = objName.charAt(0).toUpperCase() + objName.slice(1);
    }
    else{
        icondiv.textContent = objName.charAt(0).toUpperCase() + objName.slice(1) + '(' + num + ")";
    }
    div.appendChild(icondiv);

    currElementsCol++;
    if(currElementsCol == 5){
        currElementsCol = 0;
        currentColumn++;
    }
    
    //assignIconBehaviour(objName, objName + '-icon', num);
    let newDiv = document.createElement('div');
    let newImg = document.createElement('img');

    div.onclick = (e) => {
        e.stopPropagation();
        if(objName == 'terminal'){
            let terminal = new Terminal(openTerminal);
            objArray.push(terminal);

            newDiv = document.createElement('div');
            newImg = document.createElement('img');
            createBarIcon(objName, newDiv, terminal);
            assignImageToIcon(objName, newDiv, newImg);

            newDiv.onclick = () => {
                terminal.minimize();
                setInactiveIcons('terminal');
                if (!terminal.minimized) {
                    terminal.active = true;
                    document.getElementById('terminal' + terminal.index).style.backgroundColor = 'rgb(5, 0, 80)';
                    document.getElementById('containerTerminal' + terminal.index).style.zIndex = 1;
                }
            };
            
            document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
            terminal.openTerminal();
        }
        if(objName == 'fishy'){
            let fishyProgram = new Fishy(openFishy);
            objArray.push(fishyProgram);

            newDiv = document.createElement('div');
            createBarIcon('fishy', newDiv, fishyProgram);

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
            assignImageToIcon('fishy', newDiv, newImg);
        }
        

    }
}