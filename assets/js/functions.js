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
    if (document.getElementById('startMenuContainer')) {
        document.getElementById('startMenuContainer').remove();
    }
}

function setInactiveIcons(objName){
    let items = Array.from(document.getElementsByTagName('div'));
    for (let i = 0; i < items.length; i++) {
        if (items[i] && (items[i].id.includes('containerTerminal') || items[i].id.includes('containerFishy') || items[i].id.includes('containerBrowser') || items[i].id.includes('containerDocument'))) {
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
        if (objName != 'browser' && objArray[j].id.includes('Browser')) {
            document.getElementById('browser' + objArray[j].index).style.backgroundColor = 'rgb(2, 0, 46)';
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
    
    menu.id = "menu" + objName.charAt(0).toUpperCase() + objName.slice(1) + this.index;
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
        menu4.textContent = 'simone@scracciOS:~';
    }
    if(objName == 'fishy'){
        menu4.textContent = 'Fishy';
    }
    if(objName == 'browser'){
        menu4.textContent = 'Browser';
    }
    if(objName == 'document'){
        menu4.textContent = 'Notepad';
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
    if(objName == 'browser'){
        newDiv.id = 'browser' + obj.index;
    }
    if(objName == 'document'){
        newDiv.id = 'document' + obj.index;
    }
    newDiv.oncontextmenu = (e) => {
        e.stopPropagation()
        e.preventDefault();
        removeActiveDivs();
        let menu = document.createElement("div");
        createContextMenu(e, objName, menu, obj.index);
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

function createContextMenu(e, objName, menu, num){

    document.body.appendChild(menu);

    var x = e.clientX;
    var y = e.clientY;

    menu.id = 'contextmenu';
    menu.style.position = "fixed";
    menu.style.left = x + "px";
    if (y >= window.innerHeight - 50) {
        menu.style.top = (y - 60) + "px";
    }
    else {
        menu.style.top = y + "px";
    }
    menu.style.width = '120px';
    menu.style.height = '57px';
    menu.style.backgroundColor = 'rgb(240, 240, 240)';
    menu.style.color = 'rgb(75, 89, 94)';
    menu.style.padding = '5px';
    menu.style.borderRadius = '5px';
    menu.style.zIndex = 5;
    menu.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
    menu.className = 'popup';

    let firstText;
    if(!document.getElementById('firstText')){
        firstText = document.createElement("div");
        firstText.id = 'firstText';
        firstText.style.marginTop = '2px';
		firstText.style.marginBottom = '2px';
        firstText.onclick = (e) => {
            removeActiveDivs();
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
            if(objName == 'browser'){
                let browser = new Browser(openBrowser);
                objArray.push(browser);
    
                newDiv = document.createElement('div');
                createBarIcon('browser', newDiv, browser);
    
                newDiv.onclick = () => {
                    browser.minimize();
                    setInactiveIcons('browser');
                    if (!browser.minimized) {
                        browser.active = true;
                        document.getElementById('browser' + browser.index).style.backgroundColor = 'rgb(5, 0, 80)';
                        document.getElementById('containerBrowser' + browser.index).style.zIndex = 1;
                    }
                };
    
                document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
                
                let newImg = document.createElement('img');
                assignImageToIcon('browser', newDiv, newImg);
            }
            if(objName == 'document'){
                e.stopPropagation();
                if(document.getElementById('document' + num)){
                    let error = document.createElement('div');
                    error.style.position = 'absolute';
                    error.id = 'error';
                    error.style.width = '200px';
                    error.style.height = '100px';
                    error.style.backgroundColor = 'rgb(240,240,240)';
                    error.style.borderRadius = '5px';
                    error.style.top = '50%';
                    error.style.left = '50%';
                    error.style.transform = 'translate(-50%,-50%)';
                    error.style.zIndex = 5;
                    document.getElementById('containerDesktop').appendChild(error);
    
                    let errorMessage = document.createElement('div');
                    if(num == 0){
                        errorMessage.textContent = 'Impossibile aprire \'' + 'Document' + '\':';
                    }
                    else{
                        errorMessage.textContent = 'Impossibile aprire \'' + 'Document(' + num + ")" + '\':';
                    }
                    errorMessage.innerHTML += '<br>File già aperto';
                    errorMessage.style.color = 'black';
                    errorMessage.style.position = 'absolute';
                    errorMessage.style.top = '20%';
                    errorMessage.style.left = '20%';
                    errorMessage.style.userSelect = 'none';
                    error.appendChild(errorMessage);
    
                    setTimeout(()=>{
                        error.classList.remove('popup');
                        error.classList.add('antiPopup');
                        error.addEventListener('animationend', ()=>{
                            error.remove();
                        });
                    }, 1000);
                }
                else{
                    let documento = new Document(num);
                    objArray.push(documento);
    
                    let newDiv = document.createElement('div');
                    newDiv.className = 'bottom-bar-element';
    
                    createBarIcon('document', newDiv, documento);
                    newDiv.id = 'document' + num;
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
                        menu.style.boxSizing = 'border-box';
                        menu.style.zIndex = 5;
                        menu.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
                
                        let firstText = document.createElement("div");
                        firstText.id = 'firstText';
                        firstText.onclick = (e) => {
                            e.stopPropagation();
                            document.getElementById('contextmenu').classList.remove('popup');
                            document.getElementById('contextmenu').classList.add('antiPopup');
                            document.getElementById('contextmenu').addEventListener('transitionEnd', ()=>{
                                document.getElementById('contextmenu').remove();
                            });
                            let error = document.createElement('div');
                            error.style.position = 'absolute';
                            error.id = 'error';
                            error.style.width = '200px';
                            error.style.height = '100px';
                            error.style.backgroundColor = 'rgb(240,240,240)';
                            error.style.borderRadius = '5px';
                            error.style.top = '50%';
                            error.style.left = '50%';
                            error.style.transform = 'translate(-50%,-50%)';
                            error.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
                            error.style.zIndex = 5;
                            document.getElementById('containerDesktop').appendChild(error);
    
                            let errorMessage = document.createElement('div');
                            if(num == 0){
                                errorMessage.textContent = 'Impossibile aprire \'' + 'Document' + '\':';
                            }
                            else{
                                errorMessage.textContent = 'Impossibile aprire \'' + 'Document(' + num + ")" + '\':';
                            }
                            errorMessage.innerHTML += '<br>File già aperto';
                            errorMessage.style.color = 'black';
                            errorMessage.style.position = 'absolute';
                            errorMessage.style.top = '20%';
                            errorMessage.style.left = '20%';
                            errorMessage.style.userSelect = 'none';
                            //errorMessage.style.transform = 'translate(-50%,-50%)';
                            error.appendChild(errorMessage);
    
                            setTimeout(()=>{
                                error.classList.remove('popup');
                                error.classList.add('antiPopup');
                                error.addEventListener('animationend', ()=>{
                                    error.remove();
                                });
                            }, 1000);
                        }
                        firstText.style.position = 'relative';
                        //firstText.innerHTML += '\x20';
                        firstText.textContent = '\xA0' + 'Open';
                        firstText.style.color = 'rgb(75, 89, 94)';
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
                        secondText.textContent = '\xA0' + 'Close';
                        secondText.style.color = 'rgb(75, 89, 94)';
                        secondText.style.cursor = 'default';
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
        firstText.style.position = 'relative';  + '\xA0'
        //firstText.innerHTML += '\x20';
        firstText.innerHTML += '<img src="assets/img/openIcon.png" style="transform: scale(0.5);"/>' + 'Open';
        firstText.style.color = 'rgb(75, 89, 94)';
        firstText.style.fontSize = '14px';
        firstText.style.fontFamily = 'Sans-Serif';
        firstText.style.fontWeight = '700';
        firstText.style.display = 'flex';
        firstText.style.alignItems = 'center';
        firstText.style.borderRadius = '5px';
        firstText.style.cursor = 'default';
        menu.appendChild(firstText);
    }
    
    
    let secondText;
    if(!document.getElementById('secondText')){
        secondText = document.createElement("div");
        secondText.id = 'secondText';
        secondText.style.marginTop = '2px';
		secondText.style.marginBottom = '2px';
        secondText.onclick = () => {
            for (let i = 0; i < objArray.length; i++) {
                if (objArray[i].id == 'container' + objName.charAt(0).toUpperCase() + objName.slice(1) + num) {
                    objArray[i].cross();
                    break;
                }
            }
        }
        secondText.style.position = 'relative';
        secondText.innerHTML += '<img src="assets/img/closeIcon.png" style="transform: scale(0.6);"/>' + 'Close';
        //secondText.textContent = '\xA0' + 'Chiudi';
        secondText.style.color = 'rgb(75, 89, 94)';
        secondText.style.fontSize = '14px';
        secondText.style.fontFamily = 'Sans-Serif';
        secondText.style.fontWeight = '700';
        secondText.style.display = 'flex';
        secondText.style.alignItems = 'center';
        secondText.style.borderRadius = '5px';
        secondText.style.cursor = 'default';
        menu.appendChild(secondText);
    }  

}

function assignImageToIcon(objName, newDiv, newImg){
    let s = 'assets/img/';
    if(objName == 'terminal'){
        s += 'terminal.png';
    }
    if(objName == 'fishy'){
        s += 'fishy.jpg';
    }
    if(objName == 'browser'){
        s += 'browser.png';
    }
    if(objName == 'document'){
        s += 'documents.png';
    }
    newImg.src = s;
    newImg.style.width = '30px';
    newImg.style.height = '30px';
    newImg.style.position = 'absolute';
    newImg.style.top = '20%';
    newImg.style.left = '20%';
    newImg.classList.add('popupProgram');
    newDiv.appendChild(newImg);
}

function contextMenuIcon(menu, objName, i){
    document.getElementById('contextmenu').style.height = '125px';
    document.getElementById('secondText').innerHTML = '<img src="assets/img/copyIcon.png" style="transform: scale(0.6);"/>' + 'Copy';
    document.getElementById('secondText').onclick = () => {
        clipboard = objName;
        ind = i;
        copied = true;
    }

    let thirdText;
    if(!document.getElementById('thirdText')){
        thirdText = document.createElement("div");
        thirdText.id = 'thirdText';
        thirdText.style.marginTop = '2px';
		thirdText.style.marginBottom = '2px';
        thirdText.style.position = 'relative';
        thirdText.innerHTML = '<img src="assets/img/deleteIcon.png" style="transform: scale(0.5);"/>' + 'Delete';
        thirdText.style.color = 'rgb(75, 89, 94)';
        thirdText.style.fontSize = '14px';
        thirdText.style.fontFamily = 'Sans-Serif';
        thirdText.style.fontWeight = '700';
        thirdText.style.display = 'flex';
        thirdText.style.alignItems = 'center';
        thirdText.style.borderRadius = '5px';
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
                    document.getElementsByClassName(objName + '-icon')[j].addEventListener('animationend', ()=>{
                        document.getElementsByClassName(objName + '-icon')[j].remove();
                    });
                    document.getElementsByClassName(objName + '-icon')[j].classList.add('antiPopup');
                    document.getElementsByClassName(objName + '-icon')[j].classList.remove('popup');
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
            if(objName == 'browser'){
                localStorage.removeItem("browser" + i);
                browserCount--;
                localStorage.setItem("browserCount", browserCount);
            }
        }
        menu.appendChild(thirdText);
    }

    let fourthText;
    if(!document.getElementById('fourthText')){
        fourthText = document.createElement("div");
        fourthText.id = 'fourthText';
        fourthText.style.marginTop = '2px';
		fourthText.style.marginBottom = '2px';
        fourthText.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            document.getElementById('contextmenu').classList.remove('popup');
            document.getElementById('contextmenu').classList.add('antiPopup');
            document.getElementById('contextmenu').addEventListener('transitionEnd', ()=>{
                document.getElementById('contextmenu').remove();
            });
            let target = document.getElementById(objName + 'Icon' + i).querySelector('div');
            target.contentEditable = true;
            target.style.outline = '0px';
            target.style.color = 'black';
            target.style.backgroundColor = 'white';
            setTimeout(()=>{target.focus();});
        }
        fourthText.style.position = 'relative';
        fourthText.innerHTML = '<img src="assets/img/renameIcon.png" style="transform: scale(0.5);"/>' + 'Rename';
        fourthText.style.color = 'rgb(75, 89, 94)';
        fourthText.style.fontSize = '14px';
        fourthText.style.fontFamily = 'Sans-Serif';
        fourthText.style.fontWeight = '700';
        fourthText.style.display = 'flex';
        fourthText.style.alignItems = 'center';
        fourthText.style.borderRadius = '5px';
        fourthText.style.cursor = 'default';
        menu.appendChild(fourthText);
    }
    
}

function createIcon(objName, num){

    currElementsCol++;
    if(currElementsCol == 6){
        currElementsCol = 1;
        currentColumn++;
    }

    let div = document.createElement('div');
    div.className = objName + '-icon icon popup';
    div.id = objName + 'Icon' + num;
    
    if(objName == 'document' && !localStorage.getItem("document" + num)){
        localStorage.setItem("document" + num, JSON.stringify(''));
    }

    document.getElementById('column' + currentColumn).appendChild(div);

    if(objName == 'terminal'){
        div.appendChild(terminalIconDesktop.cloneNode(true));
    }
    if(objName == 'fishy'){
        div.appendChild(fishyIconDesktop.cloneNode(true));
    }
    if(objName == 'browser'){
        div.appendChild(browserIconDesktop.cloneNode(true));
    }
    if(objName == 'document'){
        div.appendChild(documentIconDesktop.cloneNode(true));
    }

    let icondiv = document.createElement('div');
    icondiv.className = 'icon-text';
    
    if(num == 0){
        icondiv.textContent = objName.charAt(0).toUpperCase() + objName.slice(1);
    }
    else{
        icondiv.textContent = objName.charAt(0).toUpperCase() + objName.slice(1) + '(' + num + ")";
    }
    div.appendChild(icondiv);
    
    let newDiv = document.createElement('div');
    let newImg = document.createElement('img');

    div.onclick = (e) => {
        e.stopPropagation();
        if(document.getElementById('contextmenu')){
            document.getElementById('contextmenu').classList.add('antiPopup');
            document.getElementById('contextmenu').classList.remove('popup');
            document.getElementById('contextmenu').addEventListener('transitionend', ()=>{
                document.getElementById('contextmenu').remove();
            });
        }
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
        if(objName == 'browser'){
            let browser = new Browser(openBrowser);
            objArray.push(browser);

            newDiv = document.createElement('div');
            createBarIcon('browser', newDiv, browser);

            newDiv.onclick = () => {
                browser.minimize();
                setInactiveIcons('browser');
                if (!browser.minimized) {
                    browser.active = true;
                    document.getElementById('browser' + browser.index).style.backgroundColor = 'rgb(5, 0, 80)';
                    document.getElementById('containerBrowser' + browser.index).style.zIndex = 1;
                }
            };

            document.getElementsByClassName('bottom-bar')[0].appendChild(newDiv);
            
            let newImg = document.createElement('img');
            assignImageToIcon('browser', newDiv, newImg);
        }
    }

    let menu = document.createElement('div');

    div.oncontextmenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        removeActiveDivs();
        createContextMenu(e, objName, menu, num);
        contextMenuIcon(menu, objName, num);
    }
}

function preloadImages(){
    openIcon.src='assets/img/openIcon.png';
    openIcon.style.transform = 'scale(0.5)';

    closeIcon.src='assets/img/closeIcon.png';
    closeIcon.style.transform = 'scale(0.6)';

    deleteIcon.src='assets/img/deleteIcon.png';
    deleteIcon.style.transform = 'scale(0.5)';

    renameIcon.src='assets/img/renameIcon.png';
    renameIcon.style.transform = 'scale(0.5)';

    copyIcon.src='assets/img/copyIcon.png';
    copyIcon.style.transform = 'scale(0.6)';

    pasteIcon.src='assets/img/pasteIcon.png';
    pasteIcon.style.transform = 'scale(0.5)';
    pasteIcon.style.position = 'relative';
    pasteIcon.style.left = '-7px';
    pasteIcon.style.marginRight = '-12px';
    pasteIcon.style.marginTop = '-5px';
    pasteIcon.style.marginBottom = '-5px';

    newIcon.src='assets/img/newIcon.png';
    newIcon.style.transform = 'scale(0.4)';

    terminalIcon.src='assets/img/terminalIcon.png';
    terminalIcon.style.transform = 'scale(0.8)';
    terminalIcon.style.marginRight = '2px';

    fishyIcon.src='assets/img/fishyIcon.png';
    fishyIcon.style.transform = 'scale(0.8)';
    fishyIcon.style.marginRight = '3px';

    documentIcon.src='assets/img/documentIcon.png';
    documentIcon.style.transform = 'scale(0.8)';
    documentIcon.style.marginRight = '3px';

    browserIcon.src='assets/img/browserIcon.png';
    browserIcon.style.transform = 'scale(0.5)';
    browserIcon.style.position = 'relative';
    browserIcon.style.left = '-4px';
    browserIcon.style.marginRight = '-5px';
    browserIcon.style.marginTop = '-5px';
    browserIcon.style.marginBottom = '-5px';

    terminalIconDesktop.src='assets/img/terminal.png';
    terminalIconDesktop.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
    fishyIconDesktop.src='assets/img/fishy.jpg';
    fishyIconDesktop.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
    documentIconDesktop.src='assets/img/documents.png';
    documentIconDesktop.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
    browserIconDesktop.src='assets/img/browser.png';
    browserIconDesktop.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
}

function removeRename(){
    for(let i=0; i<document.getElementsByClassName('icon-text').length; i++){
        let target = document.getElementsByClassName('icon-text')[i];
        target.contentEditable = false;
        target.style.color = 'white';
        target.style.removeProperty('background-color');
    }
}

function enterEvent(e){
    if(e.code == 'Enter'){
        document.getElementById('outer').classList.add('popupProgram');
        document.getElementById('outer').style.visibility = 'visible';
        let subText = document.getElementById('subText')
        let sos = subText.cloneNode(true);
        document.body.appendChild(sos);
        subText.addEventListener('animationend', ()=>{
            subText.remove();
            sos.textContent = '...ok I guess?'
            sos.style.right = '10px';
        });
        subText.className = 'antiPopupProgram';
        setTimeout(()=>{
            sos.addEventListener('animationend', ()=>{
                sos.remove();
            })
            sos.className = 'antiPopupProgram'}, 1000);
        initializeIcons();
        document.removeEventListener('keydown', enterEvent);
    }
}

function initializeDesktop(){
    let scraccioText = document.createElement('div');
    scraccioText.className = 'popupProgram';
    scraccioText.textContent = 'Activate scracciOS';
    scraccioText.style.color = 'rgba(255, 255, 255, 0.3)';
    scraccioText.style.fontSize = '30px';
    scraccioText.style.fontFamily = 'Microsoft PhagsPa'
    scraccioText.style.position = 'absolute';
    scraccioText.style.top = '80%';
    scraccioText.style.right = '10px';
    scraccioText.style.transform = 'translate(-50%, -50%)';
    scraccioText.style.userSelect = 'none';
    document.body.appendChild(scraccioText);
    
    setTimeout(()=>{
        let subText = scraccioText.cloneNode(true);
        subText.id = 'subText';
        subText.textContent = 'Or press \'Enter\' for a short trial';
        document.addEventListener('keydown', enterEvent);
        subText.style.fontSize = '30px';
        subText.style.fontSize = '30px';
        subText.style.top = '85%';
        subText.style.right = '10px';
        subText.style.transform = 'translate(-50%, 50%)';
        document.body.appendChild(subText);
    }, 500);
    
}

function initializeIcons(){

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        setTimeout(() => {
            removeActiveDivs();
            removeRename();

            let menu = document.createElement("div");
            document.body.appendChild(menu);

            var x = e.clientX;
            var y = e.clientY;

            menu.id = 'contextmenu';
            menu.style.position = "fixed";
            menu.style.left = x + 10 + "px";
            if (y >= window.innerHeight - 50) {
                menu.style.top = (y - 20) + "px";
            }
            else {
                menu.style.top = y + "px";
            }
            menu.style.width = '90px';
            menu.style.height = '22px';
            menu.style.backgroundColor = 'rgb(240, 240, 240)';
            menu.style.padding = '5px';
            menu.style.borderRadius = '5px';
            menu.style.zIndex = 5;
            menu.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
            menu.className = 'popup';

            let firstText = document.createElement("div");
            firstText.id = 'firstText';
            firstText.onclick = (e) => {
                e.stopPropagation();
                let blocco = document.createElement('div');
                blocco.style.userSelect = 'none';
                blocco.style.width = '150px';
                blocco.style.height = '115px';
                blocco.id = 'blocco';
                blocco.style.position = 'absolute';
                blocco.style.padding = '5px';
                blocco.style.boxSizing = 'border-box';
                blocco.style.top = '-5px';
                blocco.style.left = '96px'
                //blocco.style.border = '1px solid black';
                blocco.style.backgroundColor = 'rgb(240, 240, 240)';
                blocco.style.color = 'rgb(75, 89, 94)';
                blocco.style.fontSize = '13px';
                blocco.style.borderRadius = '5px';
                blocco.style.boxShadow = '2px 2px 5px rgb(14, 14, 14)';
                blocco.className = 'popup';
                firstText.appendChild(blocco);

                let blocco1 = document.createElement('div');
                blocco1.id = 'blocco1';
                blocco1.style.position = 'relative';
                blocco1.style.top = 0;
                blocco1.style.left = 0;
                blocco1.style.marginTop = '2px';
                blocco1.style.marginBottom = '2px';
                blocco1.style.borderRadius = '5px';
                blocco1.appendChild(documentIcon);
                blocco1.innerHTML += 'Document';
                //blocco1.innerHTML += '\xA0' + '<img src="assets/img/documentIcon.png" style="transform: scale(0.8);"/>' + '\xA0' + 'Documento';
                blocco1.style.display = 'flex';
                blocco1.style.alignItems = 'center';
                //blocco1.textContent = 'Documento';
                //blocco1.style.borderBottom = '1px solid rgb(50, 50, 50)';
                blocco1.onclick = () => {
                    menu.classList.remove('popup');
                    menu.classList.add('antiPopup');
                    menu.addEventListener('transitionEnd', () => {
                        menu.remove();
                    })
                    if (fileArray.length > 0) {
                        newDocument(fileArray[fileArray.length - 1] + 1);
                        fileArray[fileArray.length] = fileArray[fileArray.length - 1] + 1;
                    }
                    else {
                        newDocument(documentCount);
                    }

                }
                blocco.appendChild(blocco1);

                let blocco2 = document.createElement('div');
                blocco2.id = 'blocco2';
                blocco2.style.position = 'relative';
                blocco2.style.top = 0;
                blocco2.style.left = 0;
                blocco2.style.marginTop = '2px';
                blocco2.style.marginBottom = '2px';
                blocco2.style.borderRadius = '5px';
                blocco2.appendChild(terminalIcon);
                blocco2.innerHTML += 'Terminal';
                //blocco2.innerHTML += '\xA0' + '<img src="assets/img/terminalIcon.png" style="transform: scale(0.8);"/>' + '\xA0' + 'Terminale';
                blocco2.style.display = 'flex';
                blocco2.style.alignItems = 'center';
                //blocco2.textContent = 'Terminale' + '\xA0' + '\xA0' + '\xA0';
                blocco2.onclick = () => {
                    createIcon('terminal', terminalCount);
                    terminalCount++;
                    localStorage.setItem('terminalCount', terminalCount);
                    menu.classList.remove('popup');
                    menu.classList.add('antiPopup');
                    menu.addEventListener('transitionEnd', () => {
                        menu.remove();
                    })
                }
                blocco.appendChild(blocco2);

                let blocco3 = document.createElement('div');
                blocco3.id = 'blocco3';
                blocco3.style.position = 'relative';
                blocco3.style.top = 0;
                blocco3.style.left = 0;
                blocco3.style.marginTop = '2px';
                blocco3.style.marginBottom = '2px';
                blocco3.style.borderRadius = '5px';
                blocco3.appendChild(fishyIcon);
                blocco3.innerHTML += 'Fishy';
                //blocco3.innerHTML += '\xA0' + '<img src="assets/img/fishyIcon.png" style="transform: scale(0.8);"/>' + '\xA0' + 'Fishy';
                blocco3.style.display = 'flex';
                blocco3.style.alignItems = 'center';
                //blocco3.textContent = 'Fishy' + '\xA0' + '\xA0' + '\xA0';
                blocco3.onclick = () => {
                    fishyCount++;
                    createIcon('fishy', fishyCount);
                    localStorage.setItem('fishyCount', fishyCount);
                    menu.classList.remove('popup');
                    menu.classList.add('antiPopup');
                    menu.addEventListener('transitionEnd', () => {
                        menu.remove();
                    })
                }
                blocco.appendChild(blocco3);

                let blocco4 = document.createElement('div');
                blocco4.id = 'blocco3';
                blocco4.style.position = 'relative';
                blocco4.style.top = 0;
                blocco4.style.left = 0;
                blocco4.style.marginTop = '2px';
                blocco4.style.marginBottom = '2px';
                blocco4.style.borderRadius = '5px';
                blocco4.appendChild(browserIcon);
                blocco4.innerHTML += 'Browser';
                blocco4.style.display = 'flex';
                blocco4.style.alignItems = 'center';
                //blocco4.textContent = 'Browser' + '\xA0' + '\xA0' + '\xA0';
                blocco4.onclick = () => {
                    createIcon('browser', browserCount);
                    browserCount++;
                    localStorage.setItem('browserCount', browserCount);
                    menu.classList.remove('popup');
                    menu.classList.add('antiPopup');
                    menu.addEventListener('transitionEnd', () => {
                        menu.remove();
                    })
                }
                blocco.appendChild(blocco4);
            }
            firstText.style.position = 'relative';
            //firstText.innerHTML += '\x20';
            //firstText.textContent = '\xA0' + 'Nuovo' + '\xA0' + '\xA0' + '\xA0' + '\xA0' + ' ▶';
            //firstText.innerHTML += '\xA0' + 'Nuovo' + '\xA0' + '\xA0' + '<img src="assets/img/newIcon.png" style="transform: scale(0.4);"/>';
            firstText.innerHTML += '\xA0' + 'New' + '\xA0' + '\xA0' + '\xA0' + '\xA0' + '\xA0' + '\xA0';
            firstText.appendChild(newIcon);

            firstText.style.color = 'rgb(75, 89, 94)';
            firstText.style.fontSize = '14px';
            firstText.style.fontFamily = 'Sans-Serif';
            firstText.style.fontWeight = '700';
            firstText.style.display = 'flex';
            firstText.style.alignItems = 'center';
            firstText.style.borderRadius = '5px';
            firstText.style.height = '22px';
            //firstText.style.borderBottom = '1px solid rgb(50, 50, 50)';
            firstText.style.cursor = 'default';
            menu.appendChild(firstText);

            if (copied) {
                menu.style.height = '56px';
                let secondText = document.createElement("div");
                secondText.id = 'secondText';
                secondText.onclick = () => {
                    let c;
                    if (clipboard == 'terminal') {
                        c = terminalCount;
                        createIcon(clipboard, c);
                        terminalCount++;
                    }
                    if (clipboard == 'fishy') {
                        c = fishyCount;
                        createIcon(clipboard, c);
                        fishyCount++;
                    }
                    if (clipboard == 'browser') {
                        c = browserCount;
                        createIcon(clipboard, c);
                        browserCount++;
                    }
                    if (clipboard == 'document') {
                        localStorage.setItem('document' + (documentCount), localStorage.getItem('document' + ind));
                        if (fileArray.length > 0) {
                            newDocument(fileArray[fileArray.length - 1] + 1);
                            fileArray[fileArray.length] = fileArray[fileArray.length - 1] + 1;
                            localStorage.setItem('document' + (fileArray[fileArray.length - 1] + 1).toString(), localStorage.getItem('document' + ind));
                        }
                        else {
                            newDocument(documentCount);
                            localStorage.setItem('document' + documentCount.toString(), localStorage.getItem('document' + ind));
                        }
                    }

                    clipboard = undefined;
                    copied = false;
                }
                secondText.style.position = 'relative';
                secondText.appendChild(pasteIcon);
                secondText.innerHTML += 'Paste';
                secondText.style.color = 'rgb(75, 89, 94)';
                secondText.style.fontSize = '14px';
                secondText.style.fontFamily = 'Sans-Serif';
                secondText.style.fontWeight = '700';
                secondText.style.display = 'flex';
                secondText.style.alignItems = 'center';
                secondText.style.marginTop = '2px';
                secondText.style.marginBottom = '2px';
                secondText.style.borderRadius = '5px';
                secondText.style.cursor = 'default';
                menu.appendChild(secondText);
            }

        }, 1);
    });

    document.addEventListener('click', () => {
        removeRename();
        if (document.getElementById('contextmenu')) {
            document.getElementById('contextmenu').classList.add('antiPopup');
            document.getElementById('contextmenu').classList.remove('popup');
            document.getElementById('contextmenu').addEventListener('transitionend', () => {
                document.getElementById('contextmenu').remove();
            })
        }
        if (document.getElementById('error')) {
            document.getElementById('error').classList.add('antiPopup');
            document.getElementById('error').classList.remove('popup');
            document.getElementById('error').addEventListener('transitionend', () => {
                document.getElementById('error').remove();
            });
        }
        if (document.getElementById('startMenuContainer')) {
            document.getElementById('startMenuContainer').classList.add('startMenuAntiPopup');
            document.getElementById('startMenuContainer').classList.remove('startMenuPopup');
            document.getElementById('startMenuContainer').addEventListener('animationend', () => {
                document.getElementById('startMenuContainer').remove();
            })
        }
    });

    document.getElementById('bottom-bar').className = 'bottom-bar bottom-bar-animate';
    document.getElementById('bottom-bar').querySelector('div').className = "start-button";
    let startImage = document.createElement('img');
    startImage.src = 'assets/img/startButton.png';
    startImage.setAttribute('draggable', false);
    startImage.style.position = 'absolute';
    startImage.style.width = '30px';
    startImage.style.top = '17%';
    startImage.style.left = '17%';
    startImage.className = 'popupProgram';
    document.getElementsByClassName('start-button')[0].appendChild(startImage);
    document.getElementsByClassName('start-button')[0].onclick = (e)=>{
        e.stopPropagation();
        if(document.getElementById('startMenuContainer')){
            document.getElementById('startMenuContainer').remove();
        }
        let startMenuContainer = document.createElement('div');
        startMenuContainer.id = 'startMenuContainer';
        startMenuContainer.onclick = (e)=>{
            e.stopPropagation();
        }
        startMenuContainer.className = 'startMenuPopup';
        startMenuContainer.style.zIndex = 2;
        startMenuContainer.style.position = 'absolute';
        startMenuContainer.style.left = '0px';
        startMenuContainer.style.bottom = '50px';
        startMenuContainer.style.width = '300px';
        startMenuContainer.style.height = '550px';
        startMenuContainer.style.backgroundColor = 'rgb(240, 240, 240)';
        startMenuContainer.style.boxShadow = '3px 3px 10px rgb(14, 14, 14)';
        startMenuContainer.style.borderRadius = '5px';
        document.body.appendChild(startMenuContainer);

        let topContainer = document.createElement('div');
        topContainer.id = 'topContainer';
        topContainer.textContent = 'scracciOS';
        topContainer.style.fontSize = '20px';
        topContainer.style.color = 'black';
        topContainer.style.position = 'absolute';
        topContainer.style.left = '50%';
        topContainer.style.top = '15%';
        topContainer.style.transform = 'translateX(-50%)';
        topContainer.style.display = 'flex';
        startMenuContainer.appendChild(topContainer);

        let startMenuLogo = document.createElement('img');
        startMenuLogo.id = 'startMenuLogo';
        startMenuLogo.src = 'assets/img/wallpaperOpacity100.png';
        startMenuLogo.style.position = 'absolute';
        startMenuLogo.style.left = '50%';
        startMenuLogo.style.top = '5%';
        startMenuLogo.style.transform = 'translateX(-50%)';
        startMenuLogo.style.width = '50px';
        startMenuLogo.style.height = '50px';
        startMenuLogo.style.display = 'flex';
        startMenuContainer.appendChild(startMenuLogo);

        let appContainer = document.createElement('div');
        appContainer.id = 'appContainer';
        appContainer.style.position = 'absolute';
        appContainer.style.left = '50%';
        appContainer.style.top = '45%';
        appContainer.style.transform = 'translate(-50%,-50%)';
        appContainer.style.width = '240px';
        appContainer.style.height = '240px';
        appContainer.style.color = 'black';
        appContainer.style.fontFamily = 'Microsoft PhagsPa';
        appContainer.style.textAlign = 'center';
        appContainer.innerHTML += '<b>README.MD</b>:<br><br>' +
        'You can create new icons and documents by opening the context menu.<br><br>' +
        'Documents can be saved and the content will remain in your browser even after reloading the page.<br><br>' +
        'The Browser doesn\'t quite work properly, due to the CORS policies.<br><br>' + 
        'The Fishy minigame isn\'t resizable and cannot be maximized due to issues with the iframe';
        //appContainer.style.display = 'flex';
        startMenuContainer.appendChild(appContainer);

        

    }
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('document') && !localStorage.key(i).includes('Count')) {
            fileArray.push(parseInt(localStorage.key(i).slice(8)));
        }
    }
    fileArray = fileArray.sort(function (a, b) {return a - b;});


    for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i) == 'terminalCount'){
            for(let j=0; j<localStorage.getItem('terminalCount'); j++){
                createIcon('terminal', j);
                terminalCount++;
            }
        }
        if(localStorage.key(i) == 'fishyCount'){
            for(let j=0; j<localStorage.getItem('fishyCount'); j++){
                createIcon('fishy', j);
                fishyCount++;
            }
        }
        if(localStorage.key(i) == 'browserCount'){
            for(let j=0; j<localStorage.getItem('browserCount'); j++){
                createIcon('browser', j);
                browserCount++;
            }
        }
    }

    for (let i = 0; i < fileArray.length; i++) {
        newDocument(fileArray[i]);
    }
}