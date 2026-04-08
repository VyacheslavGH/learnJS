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
    addOptions: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    // Блок описания функций
    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        } while (!appData.isString(appData.title));

        do {
            appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        } while (!appData.isString(appData.screens));

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");
            appData.screenPrice = Number(appData.screenPrice);
        } while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");

        for (let i = 0; i < 2; i++) {
            let name = prompt('Какой дополнительный тип услуги нужен?", "Добавить счетчик');
            let sum = 0;

            while (!appData.isNumber(sum)) {
                sum = prompt("Сколько это будет стоить?");
            }
            appData.addOptions[name] = +sum;
            sum = "";
        }
    },
    // Считаем общую стоимость доп. услуг
    getAllServicePrices: function () {
        for (let key in appData.addOptions) {
            appData.allServicePrices += appData.addOptions[key];
        }
    },
    // Функция проверки на число
    isNumber: function (num) {
        return !isNaN(parseFloat(num) && isFinite(num));
    },
    // Функция проверки на отстувие цифр в введенном строковом значении
    isString: function (str) {
        for (let i = 0; i < 10; i++) {
            if (str.includes(String(i)) || str.trim().length === 0) {
                return false;
            }
        }
        return true;
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
        appData.getAllServicePrices();
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
    },
};

appData.start();
