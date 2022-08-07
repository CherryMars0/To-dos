class Settings {
    constructor() {
        this.root = document.querySelector(".options");
        this.developKit = this.root.childNodes[3].childNodes[3];
        this.init();
    }
    init() {
        this.developKit.onclick = () => {
            console.log("1");
        }
    }
}

class ToDos {
    constructor() {
        this.Settings = new Settings();
    }

}

console.log(new ToDos(), runtime);
