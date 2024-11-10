const menu_bar = document.querySelector(".menu_bar");
const menuIcone = document.querySelector("#menuIcone");
const button = document.querySelector(".button button");

menuIcone.addEventListener('click', ()=> {
    menu_bar.classList.toggle('showMenu');
    menuIcone.classList.toggle('open');
    button.classList.toggle('remove');
})
