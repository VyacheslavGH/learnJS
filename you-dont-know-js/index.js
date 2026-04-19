"use strict";

let booksItem = document.querySelectorAll(".book");
let adBanner = document.querySelector(".adv");

booksItem[0].before(booksItem[1]);
booksItem = document.querySelectorAll(".book");
booksItem[2].before(booksItem[4]);
booksItem = document.querySelectorAll(".book");
booksItem[5].after(booksItem[3]);
booksItem = document.querySelectorAll(".book");
let thirdBook = booksItem[2].querySelector("a");

// Убираем рекламный баннер
adBanner.style.display = "none";
// Меняем бэкграунд страницы
document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

// Меняем заголовок третьей книги
thirdBook.textContent = "Книга 3. this и Прототипы Объектов";

// Добавляем главу 8 к шестой книге
let itemsListSixthBook = booksItem[5].querySelectorAll("ul li");
itemsListSixthBook[itemsListSixthBook.length - 1].insertAdjacentHTML(
    "beforebegin",
    "<li>Глава 8: За пределами ES6</li>",
);

// Восстанавливаем порядок глав во второй книге
let itemsListSecondBook = booksItem[1].querySelectorAll("ul li");
itemsListSecondBook[9].after(itemsListSecondBook[2]);
itemsListSecondBook = booksItem[1].querySelectorAll("ul li");
itemsListSecondBook[2].after(itemsListSecondBook[5]);
itemsListSecondBook = booksItem[1].querySelectorAll("ul li");
itemsListSecondBook[3].after(itemsListSecondBook[7]);
itemsListSecondBook = booksItem[1].querySelectorAll("ul li");

// Восстанавливаем порядок глав в пятой книге
let itemsListFifthBook = booksItem[4].querySelectorAll("ul li");
itemsListFifthBook[1].after(itemsListFifthBook[9]);
itemsListFifthBook = booksItem[4].querySelectorAll("ul li");
itemsListFifthBook[2].after(itemsListFifthBook[4]);
itemsListFifthBook = booksItem[4].querySelectorAll("ul li");
itemsListFifthBook[3].after(itemsListFifthBook[5]);
itemsListFifthBook = booksItem[4].querySelectorAll("ul li");
itemsListFifthBook[8].after(itemsListFifthBook[6]);
itemsListFifthBook = booksItem[4].querySelectorAll("ul li");
