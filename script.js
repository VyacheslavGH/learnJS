"use strict";

const title = prompt("Как называется ваш проект?", "learnJS");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 89;

let fullPrice = 500000;

const adaptive = confirm("Нужен ли адаптив на сайте?");

const addOptionOne = prompt("Какой дополнительный тип услуги нужен?");
const addOptionOnePrice = +prompt("Сколько это будет стоить?");
const addOptionTwo = prompt("Какой дополнительный тип услуги нужен?");
const addOptionTwoPrice = +prompt("Сколько это будет стоить?");

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

fullPrice = screenPrice + addOptionOnePrice + addOptionTwoPrice;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

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

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollBackMessage(fullPrice));
console.log(servicePercentPrice);

// console.log(typeof title, typeof fullPrice, typeof adaptive);
// console.log(screens.length);
// console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
// console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
// screens.toLowerCase();
// console.log(screens.split(", "));
// console.log(fullPrice * (rollback / 100));
// console.log(fullPrice * (rollback / 100) > 10000 ? "Обдиралово" : "По рукам");
