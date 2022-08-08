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
                this.settings.style.transform = 'rotate(-30deg)';
                this.Switch = !this.Switch
            } else {
                this.selections.style = 'display:block';
                this.Switch = !this.Switch
                this.settings.style.transform = 'rotate(30deg)';
            }
        })
    }
}

class Today {
    constructor() {
        this.root = document.querySelector('.date');
        this.Date = new Date();
        this.week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.year = this.Date.getFullYear();
        this.month = this.Date.getMonth();
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.date = this.Date.getDate();
        this.day = this.Date.getDay();
        this.nowDay = "On " + this.date + " " + this.months[this.month] + " " + this.year;
        this.nowWeek = this.week[this.day];
        this.init();
    }

    init() {
        this.root.childNodes[1].innerHTML = this.nowDay;
        this.root.childNodes[3].innerHTML = this.nowWeek;
    }
}

class ToDos {
    constructor() {
        this.Settings = new Settings();
        this.Today = new Today();
    }
}

console.log(new ToDos());
