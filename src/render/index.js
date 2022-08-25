const { ipcRenderer } = require('electron');
const fs = require('fs');
const { resolve } = require('path');

class Settings {
    constructor() {
        this.root = document.querySelector(".options");
        this.chooseTime = new chooseTime();
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
        this.Switch = true;
        this.init();
    }

    init() {
        this.root.childNodes[1].innerHTML = this.nowDay;
        this.root.childNodes[3].innerHTML = this.nowWeek;
        this.root.childNodes[5].addEventListener('click', () => {
            if (this.Switch) {
                this.root.childNodes[5].style.transform = 'rotate(180deg)';
                this.root.childNodes[1].style.display = 'none';
                this.root.childNodes[3].style.display = 'none';
                this.root.style.transform = 'rotateY(-180deg)';
                this.Switch = !this.Switch
            } else {
                this.root.childNodes[5].style.transform = 'rotate(-180deg)';
                this.root.style.transform = 'rotateY(0deg)';
                this.root.childNodes[1].style.display = 'block';
                this.root.childNodes[3].style.display = 'block';
                this.Switch = !this.Switch
            }
        })
    }
}

class Day {
    constructor() {
        this.root = document.createElement('div');
        this.root.className = 'days'
        this.tips = document.createElement('div');
        this.tips.className = 'days_tips';
        this.enterInfo = document.createElement('div');
        this.enterInfo.className = 'enterInfo';
        this.date = document.createElement('div');
        this.date.className = 'days_time';
        this.lunar = document.createElement('div');
        this.lunar.className = 'days_lunar';
        this.more = document.createElement('div');
        this.more.className = 'days_more';
        this.process = document.createElement('div');
        this.process.className = 'days_process';
        this.Switch = true;
        this.init();
    }

    init() {
        this.more.addEventListener('click', () => {
            if (this.Switch) {
                this.more.style.transform = 'rotate(180deg)';
                this.root.style.transform = 'rotateX(180deg)';
                this.Switch = !this.Switch
            } else {
                this.more.style.transform = 'rotate(-180deg)';
                this.root.style.transform = 'rotateX(0)';
                this.Switch = !this.Switch
            }
        })
    }

    assemble(aDay, year, month) {
        this.date.innerHTML = aDay;
        this.lunar.innerHTML = 'lunar';
        this.tips.innerHTML = '<span></span><span></span><span></span>';
        this.enterInfo.appendChild(this.date);
        this.enterInfo.appendChild(this.lunar);
        this.root.appendChild(this.tips);
        this.root.appendChild(this.enterInfo);
        this.root.appendChild(this.more);
        this.root.appendChild(this.process);
        return this.root;
    }

}

class Days {
    constructor() {
        this.root = document.querySelector('.daysContainer');
        this.daysContainer = {
            count: 0,
        };
        this.init();
    }

    init() {
        this.setDaysContainerInfo(2022, 8);
    }
    setDaysContainerInfo(year, month) {
        this.daysContainer.count = new Date(year, month, 0).getDate();
        for (let i = 1; i <= this.daysContainer.count; i++) {
            this.root.appendChild(new Day().assemble(i, year, month));
        }
    }

}

class chooseTime {
    constructor() {
        this.root = document.querySelector('.chooseTime');
        this.selectYear = this.root.childNodes[1];
        this.selectMonth = this.root.childNodes[3];
        this.year = this.selectYear.value;
        this.month = this.selectMonth.value;
        this.init();
    }
    init() {
        this.selectMonth.addEventListener('change', () => {
            this.month = this.selectMonth.value;
            this.year = this.selectYear.value;
            this.reRender(this.month, this.year);
        })
        this.selectYear.addEventListener('change', () => {
            this.month = this.selectMonth.value;
            this.year = this.selectYear.value;
            this.reRender(this.month, this.year);
        });
    }
    reRender(month, year) {
        console.log(month, year);
    }
}

class Reader {
    constructor(fs) {
        this.fs = fs;

        this.init();
    }

    init() {
        console.log(this.readJson('/assets/data/AppSetting.json'));
    }

    readJson(file) {
        let files = this.readOther(file);
        let data = JSON.parse(files);
        return data;
    }
    readMarkdown(file) {
        let files = this.readOther(file);
    }
    readOther(file) {
        let data = this.fs.readFileSync(resolve() + file, 'utf-8');
        return data;
    }

}
class Writer {
    constructor(fs) {
        this.fs = fs;
        this.init();
    }

    init() {

    }

    writerJson(file) {

    }
    writerMarkdown(file) {

    }
    writerOther(file) {

    }
}
class ToDos {
    constructor() {
        this.Settings = new Settings();
        this.Today = new Today();
        this.Days = new Days();
        this.Reader = new Reader(fs);
        this.Writer = new Writer(fs);
    }
}

console.log(new ToDos());
