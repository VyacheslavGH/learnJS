"use strict";

// Блок объявления перменных

// Название проекта
const title = prompt("Как называется ваш проект?", "learnJS");

// Что нужно сверстать
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

// Стоимость работы первичная
const screenPrice = +prompt("Сколько будет стоить данная работа?");

// Процент посреднику
const rollback = 22;

const adaptive = confirm("Нужен ли адаптив на сайте?");

// Доп услуга 1
const addOptionOne = prompt("Какой дополнительный тип услуги нужен?");
const addOptionOnePrice = +prompt("Сколько это будет стоить?");

// Доп услуга 2
const addOptionTwo = prompt("Какой дополнительный тип услуги нужен?");
const addOptionTwoPrice = +prompt("Сколько это будет стоить?");

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

// 1. ДЗ function expression
// Считаем общую стоимость доп услуг
const getAllServicePrices = function (optionOnePrice, optionTwoPrice) {
    return optionOnePrice + optionTwoPrice;
};

// 2. ДЗ function declaration
// Считаем полную стоимость с доп.услугами
function getFullPrice() {
    return screenPrice + getAllServicePrices(addOptionOnePrice, addOptionTwoPrice);
}

// 3. ДЗ Функция гет тайтл
// Преобразуем любой тайтл в lowerCase, кроме первого символа
function getTitle(title) {
    while (Number(title[0]) === 0 || title[0] === " ") {
        title.slice(1);
    }

    return title[0].toUpperCase() + "" + title.slice(1).toLowerCase();
}

// 4. ДЗ Объявить функцию getServicePercentPrices
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
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
allServicePrices = getAllServicePrices(addOptionOnePrice, addOptionTwoPrice);
fullPrice = getFullPrice();
getTitle(title);
servicePercentPrice = getServicePercentPrices();

// Логи для отладки
console.log(allServicePrices);
console.log(fullPrice);
console.log(servicePercentPrice);
console.log(getTitle(title));
console.log(getRollBackMessage(fullPrice));
