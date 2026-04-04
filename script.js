"use strict";

// Блок объявления перменных

// Название проекта
let title;

// Что нужно сверстать
let screens;

// Стоимость работы первичная
let screenPrice;

// Нужен ли адаптив
let adaptive;

// Процент посреднику
let rollback = 22;

// Доп услуга 1
let addOptionOne;

// // Доп услуга 2
let addOptionTwo;

// Общая стоимость доп.услуг
let allServicePrices = 0;

// Общая стоимость верстки и доп.услуг
let fullPrice = 0;

// Сколько я получу всего (за вычетом процента посреднику)
let servicePercentPrice = 0;

// Блок описания функций

// Определяем тип переменных
const showTypeOf = function (variable) {
    console.log(`${variable} имеет тип данных - ${typeof variable}`);
};

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

// Задаем вопросы пользователю
const asking = function () {
    do {
        title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    } while (!isString(title));

    do {
        screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
    } while (!isString(screens));

    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
        screenPrice = Number(screenPrice);
    } while (!isNumber(screenPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

// Считаем общую стоимость доп. услуг
const getAllServicePrices = function () {
    let sum;
    let resultSum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            do {
                addOptionOne = prompt("Какой дополнительный тип услуги нужен?", "Добавить счетчик");
            } while (!isString(addOptionOne));
        } else if (i === 1) {
            do {
                addOptionTwo = prompt("Какой дополнительный тип услуги нужен?", "Кастомная регистрация");
            } while (!isString(addOptionTwo));
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
    return Number(screenPrice + allServicePrices);
}

// Преобразуем любой тайтл в lowerCase, кроме первого символа
function getTitle(title) {
    while (Number(title[0]) === 0 || title[0] === " ") {
        title.slice(1);
    }
    return title[0].toUpperCase() + "" + title.slice(1).toLowerCase();
}

// Получаем округленную сумму, которую я получу за вычетом комисси посреднику
let getServicePercentPrices = function () {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
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
asking();
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
getTitle(title);
servicePercentPrice = getServicePercentPrices();

// Логи для отладки
console.log(`Title без обработки: ${title}`);
console.log(`Screens: ${screens}`);
console.log(`All Service Prices = ${allServicePrices} и имеет тип данных ${typeof allServicePrices}`);
console.log(`Full Price = ${fullPrice} и имеет тип данных ${typeof fullPrice}`);
console.log(`Service Percent Price = ${servicePercentPrice} и имеет тип данных ${typeof servicePercentPrice}`);
console.log(`Тайтл после обработки: ${getTitle(title)}`);
console.log(`Какую скидку мы готовы выдать: ${getRollBackMessage(fullPrice)}`);

