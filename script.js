"use strict";

// Блок объявления перменных

// Название проекта
let title;

// Что нужно сверстать
let screens;

// Стоимость работы первичная
let screenPrice;

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
    console.log(variable, typeof variable);
};

// Функция проверки на число
const isNumber = function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
};

// Задаем вопросы пользователю
const asking = function () {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    // screenPrice = +prompt("Сколько будет стоить данная работа?");

    while (!isNumber(screenPrice)) {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    }
    adaptive = confirm("Нужен ли адаптив на сайте?");
};

// Считаем общую стоимость доп услуг
const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            addOptionOne = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            addOptionTwo = prompt("Какой дополнительный тип услуги нужен?");
        }
        sum += +prompt("Сколько это будет стоить?");
    }
    return (allServicePrices = sum);
    // return optionOnePrice + optionTwoPrice;
};

// Считаем полную стоимость с доп.услугами
function getFullPrice() {
    return screenPrice + getAllServicePrices();
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
// allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
getTitle(title);
servicePercentPrice = getServicePercentPrices();

// Логи для отладки
// console.log(allServicePrices);
console.log(fullPrice);
console.log(servicePercentPrice);
console.log(getTitle(title));
console.log(getRollBackMessage(fullPrice));

console.log("allServicePrices", allServicePrices);
