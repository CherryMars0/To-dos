const { ipcRenderer } = require('electron')

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
    constructor(aDay, year, month) {
        this.root = document.querySelector('.days');
        this.more = this.root.childNodes[7];
        this.enterInfo = this.root.childNodes[3];
        this.date = this.enterInfo.childNodes[1];
        this.lunar = this.enterInfo.childNodes[3];
        this.process = this.root.childNodes[5];
        this.tips = this.root.childNodes[1];
        this.more.Switch = true;
        this.init(aDay, year, month);
    }

    init(aDay, year, month) {
        this.date.innerHTML = aDay;
        console.log(year, month, aDay);
        console.log(this.root.childNodes);
        this.more.addEventListener('click', () => {
            if (this.more.Switch) {
                this.more.style.transform = 'rotate(180deg)';
                this.more.Switch = !this.more.Switch
            } else {
                this.more.style.transform = 'rotate(-180deg)';
                this.more.Switch = !this.more.Switch
            }
        })
    }
}

class Days {
    constructor() {
        this.root = document.querySelector('.daysContainer');
        this.daysContainer = {
            count: 0,
            node: [],
        };
        this.init();
    }

    init() {
        this.setDaysContainerInfo(2022, 8);
    }
    setDaysContainerInfo(year, month) {
        this.daysContainer.count = new Date(year, month, 0).getDate();
        for (let i = 1; i <= this.daysContainer.count; i++) {
            this.daysContainer.node.push(new Day(i, year, month));
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
            console.log(this.selectMonth.value);
        })
        this.selectYear.addEventListener('change', () => {
            this.year = this.selectYear.value;
            console.log(this.selectYear.value);
        });
    }
}

class ToDos {
    constructor() {
        this.Settings = new Settings();
        this.Today = new Today();
        this.Days = new Days();
    }
}

console.log(new ToDos());
