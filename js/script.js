/*<!--Code Reference: https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript-->*/
const burgermenu = document.getElementById('burger');
const navpages = document.getElementById('nav-pages')

burgermenu.addEventListener('click', () => {
    burger.classList.toggle("active");
    navpages.classList.toggle("active");
})

document.querySelectorAll(".nav-pages").forEach(n => n.addEventListener("click", () => {
    burger.classList.remove("active")
    navpages.classList.remove("active")
}))