class Index {
    constructor() {
        this.root = document.querySelector("#main");
        this.day = null;
        this.init();
    }
    init() {
        this.day = this.mGetDate();
        this.createDayDom(this.mGetDate());
    }
    createDayDom(muchDays) {
        for (let i = 0; i <= muchDays; i++) {
            let day = document.createElement("div");
            day.className = "days day_" + i;
            day.innerHTML = i;
            this.root.childNodes[3].appendChild(day);
        }
    }
    mGetDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = new Date(year, month, 0);
        return day.getDate();
    }
}

let index = new Index();
console.log(index);
