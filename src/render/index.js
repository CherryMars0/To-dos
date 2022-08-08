const { ipcRenderer } = require('electron')

class Settings {
    constructor() {
        this.root = document.querySelector(".options");
        this.developKit = this.root.childNodes[3].childNodes[3];
        this.reload = this.root.childNodes[3].childNodes[1];
        this.init();
    }
    init() {
        this.developKit.addEventListener('click', () => {
            ipcRenderer.send('open-devtools');
        })
        this.reload.addEventListener('click', () => {
            ipcRenderer.send('reload');
        })
    }
}

class ToDos {
    constructor() {
        this.Settings = new Settings();
    }

}

console.log(new ToDos(), runtime);
