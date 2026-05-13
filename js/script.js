"use strict";

// Блок объявления перменных

// Название проекта
// title;
// Что нужно сверстать
// screens;
// Стоимость работы первичная
// screenPrice;
// Нужен ли адаптив
// adaptive;
// Процент посреднику
// rollback = 22;
// Доп услуга 1
// addOptionOne;
// Доп услуга 2
// addOptionTwo;
// Общая стоимость доп.услуг
// allServicePrices = 0;
// Общая стоимость верстки и доп.услуг
// fullPrice = 0;
// Сколько я получу всего (за вычетом процента посреднику)
// servicePercentPrice = 0;

// Урок 9
const title = document.getElementsByTagName("h1")[0];
const buttons = document.getElementsByClassName("handler_btn");
const plusButton = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const spanRange = document.querySelector(".rollback .range-value");
const totalInputs = document.getElementsByClassName("total-input");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
const startBtn = document.querySelectorAll(".handler_btn")[0];
const resetBtn = document.querySelectorAll(".handler_btn")[1];
let screenBlocks = document.querySelectorAll(".screen");
let allInputsTypeText = document.querySelectorAll("input[type='text']");
let allSelect = document.querySelectorAll("select");
let allCheckboxes = document.querySelectorAll("input[type='checkbox']");
let defaultInputs = [];
let defaultValuesOfInputs = [];

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    count: {},
    sumScreens: 0,
    adaptive: true,
    rollback: 0,
    addOptions: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    isStartButtonClicked: false,
    init: function () {
        this.addTitle();
        plusButton.addEventListener("click", this.addScreenBlock);
        this.disableStartBtn();
        this.addListenersToScreenBlock();
        plusButton.addEventListener("click", this.disableStartBtn.bind(appData));
        plusButton.addEventListener("click", this.addListenersToScreenBlock.bind(appData));
        inputRange.addEventListener("input", this.displayValueInputRange.bind(appData));
        startBtn.addEventListener("click", this.displayScreensCount.bind(appData));
        startBtn.addEventListener("click", this.start.bind(appData));
        resetBtn.addEventListener("click", this.reset.bind(appData));
        this.getDefaultValuesFromInputs();
        this.getDefaultInputs();
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function () {
        screenBlocks = document.querySelectorAll(".screen");
        screenBlocks.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            this.screens.push({ id: index, name: selectName, price: +select.value * +input.value });
        });
    },
    isScreensSelected: function () {
        screenBlocks = document.querySelectorAll(".screen");
        let result = 0;
        for (let i = 0; i < screenBlocks.length; i++) {
            let typeScreen = screenBlocks[i].querySelector("select");
            let countScreen = screenBlocks[i].querySelector("input");
            if (typeScreen.options[typeScreen.selectedIndex].value !== "" && countScreen.value !== "") {
                result = true;
            } else {
                result = false;
                break;
            }
        }
        if (result) {
            return true;
        } else {
            return false;
        }
    },
    disableStartBtn: function () {
        if (this.isScreensSelected() === false) {
            startBtn.disabled = true;
            startBtn.style.opacity = "0.5";
            startBtn.style.cursor = "not-allowed";
        }
    },
    enableStartBtn: function () {
        if (this.isScreensSelected()) {
            startBtn.removeAttribute("disabled");
            startBtn.style.opacity = "unset";
            startBtn.style.cursor = "pointer";
        }
    },
    addListenersToScreenBlock: function () {
        screenBlocks = document.querySelectorAll(".screen");
        screenBlocks.forEach((element) => {
            element.addEventListener("change", this.disableStartBtn.bind(appData));
            element.addEventListener("change", this.enableStartBtn.bind(appData));
        });
    },
    displayValueInputRange: function () {
        spanRange.textContent = inputRange.value;
        this.rollback = inputRange.value;
        if (this.isStartButtonClicked === true) {
            this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
            totalCountRollback.value = this.servicePercentPrice;
        }
    },
    displayScreensCount: function () {
        screenBlocks = document.querySelectorAll(".screen");
        for (let i = 0; i < screenBlocks.length; i++) {
            let countScreen = +screenBlocks[i].querySelector("input").value;
            this.count[`screen${[i + 1]}`] = countScreen;
        }
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screenBlocks[0].cloneNode(true);
        screenBlocks[screenBlocks.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));

        for (let screensCount in this.count) {
            this.sumScreens += this.count[screensCount];
        }
    },
    // Функция проверки на строку
    isString: function (str) {
        if (String(Number(str)) === "NaN") {
            return true;
        } else {
            return false;
        }
    },
    startBtnClicked: function () {
        this.isStartButtonClicked = true;
    },
    disableTextInputsSelects: function () {
        if (!this.isStartButtonClicked) {
            return;
        }

        allInputsTypeText = document.querySelectorAll("input[type='text']");
        allSelect = document.querySelectorAll("select");
        allCheckboxes = document.querySelectorAll("input[type='checkbox']");
        for (let input of allInputsTypeText) {
            if (!input.hasAttribute("disabled")) {
                input.disabled = true;
            }
        }
        for (let select of allSelect) {
            if (!select.hasAttribute("disabled")) {
                select.disabled = true;
            }
        }
        for (let checkbox of allCheckboxes) {
            if (!checkbox.hasAttribute("disabled")) {
                checkbox.disabled = true;
            }
        }
    },
    enableTextInputsSelects: function () {
        allInputsTypeText = document.querySelectorAll("input[type='text']");
        allSelect = document.querySelectorAll("select");
        allCheckboxes = document.querySelectorAll("input[type='checkbox']");
        for (let input of allInputsTypeText) {
            if (input.hasAttribute("disabled")) {
                input.disabled = false;
            }
        }
        for (let select of allSelect) {
            if (select.hasAttribute("disabled")) {
                select.disabled = false;
            }
        }
        for (let checkbox of allCheckboxes) {
            if (checkbox.hasAttribute("disabled")) {
                checkbox.disabled = false;
            }
        }
    },
    hideStartBtn: function () {
        startBtn.style.display = "none";
        resetBtn.style.display = "block";
    },
    hideResetBtn: function () {
        resetBtn.style.display = "none";
        startBtn.style.display = "block";
    },
    getDefaultInputs: function () {
        for (let input of allInputsTypeText) {
            if (input.parentElement.style.display === "none") {
                continue;
            }
            defaultInputs.push(input);
        }
    },
    getDefaultValuesFromInputs: function (params) {
        for (let input of allInputsTypeText) {
            if (input.parentElement.style.display === "none") {
                continue;
            }
            if (input.value) {
                defaultValuesOfInputs.push(input.value);
            } else if (input.getAttribute("placeholder")) {
                defaultValuesOfInputs.push(input.getAttribute("placeholder"));
            }
        }
    },
    reset: function () {
        for (let i = 1; i < screenBlocks.length; i++) {
            screenBlocks[i].remove();
        }
        let count = 0;
        for (let input of defaultInputs) {
            input.value = defaultValuesOfInputs[count];
            count++;
        }
        allSelect[0].value = "";
        for (let checkbox of allCheckboxes) {
            checkbox.checked = false;
        }
        inputRange.value = "0";
        spanRange.textContent = "0%";
        this.hideResetBtn();
        this.enableTextInputsSelects();
    },
    // Блок вызова функций
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.startBtnClicked();
        this.disableTextInputsSelects();
        this.hideStartBtn();
        // this.logger();
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.sumScreens;
    },
    // Логи для отладки
    logger: function () {
        // console.log(this.fullPrice);
        // console.log(this.servicePercentPrice);
        // console.log(this.title);
        // console.log(this.screens);
    },
};

appData.init();
console.log("allInputsTypeText: ", allInputsTypeText);
console.log("allSelect: ", allSelect);

console.log("title: ", title);
console.log("buttons: ", buttons);
console.log("plusButton: ", plusButton);
console.log("otherItemsPercent: ", otherItemsPercent);
console.log("otherItemsNumber: ", otherItemsNumber);
console.log("inputRange: ", inputRange);
console.log("spanRange: ", spanRange);
console.log("totalInputs: ", totalInputs);
console.log("total: ", total);
console.log("totalCount: ", totalCount);
console.log("totalCountOther: ", totalCountOther);
console.log("fullTotalCount: ", fullTotalCount);
console.log("totalCountRollback: ", totalCountRollback);
console.log("startBtn: ", startBtn);
console.log("resetBtn: ", resetBtn);
console.log("screenBlocks: ", screenBlocks);

// Получить в перменную все инпуты с type text
// Получить в переменную все select с левой стороны
// Воспользоваться имеющейся функцией отслеживающей нажатие кнопки рассчитать
// Если кнопка нажата, то всем инпутам и селектам полученным в переменные через foreach или for добавить атрибут disabled

// После этого создать функцию которая создает кнопку сброс
// Также после нажатия кнопки рассчитать, у нас пропадает кнопка рассчитать и на ее место добавляется кнопка сброс
// Далее описать как должна работать кнопка сброс
