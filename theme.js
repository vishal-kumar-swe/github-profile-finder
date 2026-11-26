const theme = document.querySelector('.theme')

theme.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme')

    if (document.documentElement.classList.contains('light-theme')) {
        theme.innerHTML = `Dark <i class="fa-solid fa-moon"></i>`;
    } else {
        theme.innerHTML = `Light <i class="fa-solid fa-sun"></i>`;
    }
})