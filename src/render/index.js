const { ipcRenderer } = require('electron')

class Settings {
    constructor() {
        this.root = document.querySelector(".options");
        this.settings = this.root.childNodes[1];
        this.developKit = this.root.childNodes[3].childNodes[3];
        this.reload = this.root.childNodes[3].childNodes[1];
        this.about = this.root.childNodes[3].childNodes[5];
        this.closed = this.root.childNodes[3].childNodes[7];
        this.selections = this.root.childNodes[3];
        this.Switch = false;
        this.init();
    }
    init() {
        this.developKit.addEventListener('click', () => {
            ipcRenderer.send('open-devtools');
        })
        this.reload.addEventListener('click', () => {
            ipcRenderer.send('reload');
        })
        this.closed.addEventListener('click', () => {
            ipcRenderer.send('closed');
        })
        this.about.addEventListener('click', () => {
            alert("Todos \nPowered by marvelous !");
        })
        this.settings.addEventListener('click', () => {
            if (this.Switch) {
                this.selections.style = 'display:none';
                this.Switch = !this.Switch
            } else {
                this.selections.style = 'display:block';
                this.Switch = !this.Switch
            }
        })
    }
}

class Today {
    constructor() {
        this.root = document.querySelector('.date');

        this.init();
    }

    init(){
        
    }
}

class ToDos {
    constructor() {
        this.Settings = new Settings();
        this.Today = new Today();
    }
}

console.log(new ToDos());
