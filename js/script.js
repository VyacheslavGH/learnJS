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
        appData.addTitle();
        plusButton.addEventListener("click", appData.addScreenBlock);
        appData.disableStartBtn();
        appData.addListenersToScreenBlock();
        plusButton.addEventListener("click", appData.disableStartBtn);
        plusButton.addEventListener("click", appData.addListenersToScreenBlock);
        inputRange.addEventListener("input", appData.displayValueInputRange);
        startBtn.addEventListener("click", appData.displayScreensCount);
        startBtn.addEventListener("click", appData.start);
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
            appData.screens.push({ id: index, name: selectName, price: +select.value * +input.value });
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
        if (appData.isScreensSelected() === false) {
            startBtn.disabled = true;
            startBtn.style.opacity = "0.5";
            startBtn.style.cursor = "not-allowed";
        }
    },
    enableStartBtn: function () {
        if (appData.isScreensSelected()) {
            startBtn.removeAttribute("disabled");
            startBtn.style.opacity = "unset";
            startBtn.style.cursor = "pointer";
        }
    },
    addListenersToScreenBlock: function () {
        screenBlocks = document.querySelectorAll(".screen");
        screenBlocks.forEach((element) => {
            element.addEventListener("change", appData.disableStartBtn);
            element.addEventListener("change", appData.enableStartBtn);
        });
    },
    displayValueInputRange: function () {
        spanRange.textContent = inputRange.value;
        appData.rollback = inputRange.value;
        if (appData.isStartButtonClicked === true) {
            appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
            totalCountRollback.value = appData.servicePercentPrice;
        }
    },
    displayScreensCount: function () {
        screenBlocks = document.querySelectorAll(".screen");
        for (let i = 0; i < screenBlocks.length; i++) {
            let countScreen = +screenBlocks[i].querySelector("input").value;
            appData.count[`screen${[i + 1]}`] = countScreen;
        }
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screenBlocks[0].cloneNode(true);
        screenBlocks[screenBlocks.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));

        for (let screensCount in appData.count) {
            appData.sumScreens += appData.count[screensCount];
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
        appData.isStartButtonClicked = true;
    },
    // Блок вызова функций
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.startBtnClicked();
        // appData.logger();
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.sumScreens;
    },
    // Логи для отладки
    logger: function () {
        // console.log(appData.fullPrice);
        // console.log(appData.servicePercentPrice);
        // console.log(appData.title);
        // console.log(appData.screens);
    },
};

appData.init();
