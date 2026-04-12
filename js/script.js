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
console.log(title);
const buttons = document.getElementsByClassName("handler_btn");
console.log(buttons);
const plusButton = document.querySelector(".screen-btn");
console.log(plusButton);
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
console.log(otherItemsPercent);
console.log(otherItemsNumber);
const inputRange = document.querySelector(".rollback input");
console.log(inputRange);
const spanRange = document.querySelector(".rollback .range-value");
console.log(spanRange);
const totalInputs = document.getElementsByClassName("total-input");
for (const input of totalInputs) {
    console.log(input);
}
console.log(totalInputs);
let screenBlocks = document.querySelectorAll(".screen");
console.log(screenBlocks);
//

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 22,
    addOptions: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    // Блок описания функций
    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while (!appData.isString(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = "";
            let price = 0;

            while (!appData.isString(name)) {
                name = prompt("Какие типы экранов нужно разработать?");
            }

            do {
                price = prompt("Сколько будет стоить данная работа?");
                price = Number(price);
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");

        for (let i = 0; i < 2; i++) {
            let name = "";
            let sum = "";

            while (!appData.isString(name)) {
                name = prompt("Какой дополнительный тип услуги нужен?");
            }

            while (!appData.isNumber(sum)) {
                sum = prompt("Сколько это будет стоить?");
            }
            appData.addOptions[name] = +sum;
            sum = "";
        }
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.addOptions) {
            appData.allServicePrices += appData.addOptions[key];
        }
    },
    // Функция проверки на число
    isNumber: function (num) {
        return !isNaN(parseFloat(num) && isFinite(num));
    },
    // Функция проверки на строку
    isString: function (str) {
        if (String(Number(str)) === "NaN") {
            return true;
        } else {
            return false;
        }
    },
    // Получаем округленную сумму, которую я получу за вычетом комисси посреднику
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },
    // Предусматриваем скидку
    getRollBackMessage: function (price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price >= 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что то пошло не так";
        }
    },
    // Преобразуем любой тайтл в lowerCase, кроме первого символа
    getTitle: function (funcTitle) {
        while (Number(funcTitle[0]) === 0 || funcTitle[0] === " ") {
            funcTitle.slice(1);
        }
        appData.title = funcTitle[0].toUpperCase() + "" + funcTitle.slice(1).toLowerCase();
    },
    // Считаем полную стоимость с доп.услугами
    getFullPrice: function () {
        appData.fullPrice = Number(appData.screenPrice + appData.allServicePrices);
    },
    // Блок вызова функций
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getTitle(appData.title);
        appData.getServicePercentPrices();
        appData.logger();
    },
    // Логи для отладки
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.title);
        console.log(appData.screens);
    },
};

// appData.start();
