"use script";

let booksItem = document.querySelectorAll(".book");
let adBanner = document.querySelector(".adv");

booksItem[0].before(booksItem[1]);
booksItem = document.querySelectorAll(".book");
booksItem[2].before(booksItem[4]);
booksItem = document.querySelectorAll(".book");
booksItem[5].after(booksItem[3]);
booksItem = document.querySelectorAll(".book");
let thirdBook = booksItem[2].querySelector("a");

adBanner.style.display = "none";
document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

thirdBook.textContent = "Книга 3. this и Прототипы Объектов";
