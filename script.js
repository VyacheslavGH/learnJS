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

const appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    adaptive: true,
    rollback: 22,
    addOptionOne: "",
    addOptionTwo: "",
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while (!isString(appData.title));

        do {
            appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        } while (!isString(appData.screens));

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
            appData.screenPrice = Number(appData.screenPrice);
        } while (!isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
};

// Блок описания функций

// Функция проверки на число
const isNumber = function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
};

// Функция проверки на отстувие цифр в введенном строковом значении
const isString = function (str) {
    for (let i = 0; i < 10; i++) {
        if (str.includes(String(i)) || str.trim().length === 0) {
            return false;
        }
    }
    return true;
};

// Считаем общую стоимость доп. услуг
const getAllServicePrices = function () {
    let sum;
    let resultSum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            do {
                appData.addOptionOne = prompt("Какой дополнительный тип услуги нужен?", "Добавить счетчик");
            } while (!isString(appData.addOptionOne));
        } else if (i === 1) {
            do {
                appData.addOptionTwo = prompt("Какой дополнительный тип услуги нужен?", "Кастомная регистрация");
            } while (!isString(appData.addOptionTwo));
        }

        while (!isNumber(sum)) {
            sum = prompt("Сколько это будет стоить?");
            resultSum += Number(sum);
        }

        sum = "";
    }
    return Number(resultSum);
};

// Считаем полную стоимость с доп.услугами
function getFullPrice() {
    return Number(appData.screenPrice + appData.allServicePrices);
}

// Преобразуем любой тайтл в lowerCase, кроме первого символа
function getTitle(funcTitle) {
    while (Number(funcTitle[0]) === 0 || funcTitle[0] === " ") {
        funcTitle.slice(1);
    }
    return funcTitle[0].toUpperCase() + "" + funcTitle.slice(1).toLowerCase();
}

// Получаем округленную сумму, которую я получу за вычетом комисси посреднику
let getServicePercentPrices = function () {
    return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
};

// Предусматриваем скидку
const getRollBackMessage = function (price) {
    if (price >= 30000) {
        return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
        return "Скидка не предусмотрена";
    } else {
        return "Что то пошло не так";
    }
};

// Блок вызова функций
appData.asking();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice();
getTitle(appData.title);
appData.servicePercentPrice = getServicePercentPrices();

// Логи для отладки
console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
