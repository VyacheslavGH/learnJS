"use strict";

const title = prompt("Как называется ваш проект?", "learnJS");
const screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 89;
let fullPrice = 500000;
const adaptive = confirm("Нужен ли адаптив на сайте?");

// console.log(typeof title, typeof fullPrice, typeof adaptive);
// console.log(screens.length);
// console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
// console.log(`Стоимость разработки сайта ${fullPrice} рублей`);
// screens.toLowerCase();
// console.log(screens.split(", "));
// console.log(fullPrice * (rollback / 100));
// console.log(fullPrice * (rollback / 100) > 10000 ? "Обдиралово" : "По рукам");

const addOptionOne = prompt("Какой дополнительный тип услуги нужен?");
const addOptionOnePrice = +prompt("Сколько это будет стоить?");
const addOptionTwo = prompt("Какой дополнительный тип услуги нужен?");
const addOptionTwoPrice = +prompt("Сколько это будет стоить?");

fullPrice = screenPrice + addOptionOnePrice + addOptionTwoPrice;

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log("Даем скидку в 5%");
} else if (fullPrice >= 0 && fullPrice < 15000) {
    console.log("Скидка не предусмотрена");
} else {
    console.log("Что то пошло не так");
}
