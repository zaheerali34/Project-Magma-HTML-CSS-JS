const menu_bar = document.querySelector(".menu_bar");
const menuIcone = document.querySelector("#menu");

menuIcone.addEventListener('click', ()=> {
    menu_bar.classList.toggle('showMenu');
})