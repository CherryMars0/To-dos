const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');

class Settings {
    constructor(Options, Days) {
        this.root = document.querySelector(".options");
        this.chooseTime = new chooseTime(Options, Days);
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
                this.root.childNodes[1].style.display = 'block';
                this.root.childNodes[3].style.display = 'block';
                this.root.style.transform = 'rotateY(0deg)';
                this.Switch = !this.Switch
            }
        })

    }
}

class Day {
    constructor(Options) {
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
        this.init(Options);
    }

    init(Options) {
        this.more.addEventListener('click', () => {
            if (this.Switch) {
                this.more.style.transform = 'rotate(180deg)';
                this.root.style.transform = 'rotateX(180deg)';
                this.tips.style.display = 'none';
                this.process.style.display = 'none';
                this.enterInfo.style.display = 'none';
                this.root.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                this.Switch = !this.Switch;
            } else {
                this.more.style.transform = 'rotate(-180deg)';
                this.root.style.transform = 'rotateX(0)';
                this.tips.style.display = 'flex';
                this.process.style.display = 'block';
                this.enterInfo.style.display = 'block';
                this.root.style.backgroundColor = 'rgba(255, 255, 255, 0)';
                this.Switch = !this.Switch;
            }
        })
        this.enterInfo.addEventListener('click', (Options) => {
            let Day = window.open(path.join(__dirname, 'day.html'), 'day');
        })
    }

    assemble(aDay, year, month, dayInfo) {
        console.log(dayInfo);
        let isEmpty = false;
        if (isEmpty) {
            let tips_red = document.createElement('span');
            tips_red.className = 'days_tips_red';
            this.tips.appendChild(tips_red);
        } else {
            let tips_yellow = document.createElement('span');
            tips_yellow.className = 'days_tips_yellow';
            let tips_green = document.createElement('span');
            tips_green.className = 'days_tips_green';
            this.tips.appendChild(tips_yellow);
            this.tips.appendChild(tips_green);
        }
        this.date.innerHTML = aDay;
        this.lunar.innerHTML = 'lunar';
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
    constructor(Options) {
        this.root = document.querySelector('.daysContainer');
        this.daysContainer = {
            count: 0,
        };
        this.init(Options);
    }

    init(Options) {
        let BeginDate = Options.BeginDate.split('-');
        this.setDaysContainerInfo(BeginDate[0], BeginDate[1], Options);
    }
    setDaysContainerInfo(year, month, Options) {
        this.root.innerHTML = '';
        let dayInfo = Options.Days;
        this.daysContainer.count = new Date(year, month, 0).getDate();
        for (let i = 1; i <= this.daysContainer.count; i++) {
            this.root.appendChild(new Day(Options).assemble(i, year, month, dayInfo));
        }
    }

}

class chooseTime {
    constructor(Options, Days) {
        this.root = document.querySelector('.chooseTime');
        this.selectYear = this.root.childNodes[1];
        this.selectMonth = this.root.childNodes[3];
        this.year = this.selectYear.value;
        this.month = this.selectMonth.value;
        this.init(Options, Days);
    }
    init(Options, Days) {
        this.render(Options);
        this.selectMonth.addEventListener('change', () => {
            this.month = this.selectMonth.value;
            this.year = this.selectYear.value;
            this.reRender(this.month, this.year, Days, Options);
        })
        this.selectYear.addEventListener('change', () => {
            this.month = this.selectMonth.value;
            this.year = this.selectYear.value;
            this.reRender(this.month, this.year, Days, Options);
        });
    }
    render(Options) {
        let BeginDate = Options.BeginDate.split('-0');
        this.selectYear.value = BeginDate[0];
        this.selectMonth.value = BeginDate[1];
    }
    reRender(month, year, Days, Options) {
        Days.setDaysContainerInfo(year, month, Options);
    }
}

class Reader {
    constructor(fs) {
        this.fs = fs;
    }

    readJson(file) {
        let files = this.readOther(file);
        let data = JSON.parse(files);
        return data;
    }
    readMarkdown(file) {
        let files = this.readOther(file);
        return files;
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
        this.Reader = new Reader(fs);
        this.Writer = new Writer(fs);
        this.Options = this.Reader.readJson('/assets/data/AppSetting.json');
        this.Today = new Today(this.Options);
        this.Days = new Days(this.Options);
        this.Settings = new Settings(this.Options, this.Days);
    }
}

console.log(new ToDos());
