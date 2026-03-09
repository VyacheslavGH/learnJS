const title = 'learn JavaScript';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 382750;
const rollback = 89;
const fullPrice = 500000;
const adaptive = true;

console.log(typeof title, typeof fullPrice, typeof adaptive)
console.log(screens.length)
console.log(`Стоимость верстки экранов ${screenPrice} рублей`)
console.log(`Стоимость разработки сайта ${fullPrice} рублей`)
screens.toLowerCase()
console.log(screens.split(', '))
console.log(fullPrice * (rollback / 100))
console.log(fullPrice * (rollback / 100) > 10000 ? 'Обдиралово' : 'По рукам')