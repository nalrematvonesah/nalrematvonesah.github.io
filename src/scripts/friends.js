const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('rating-text');
const readMoreBtn = document.getElementById('readMoreBtn');
const moreContent = document.getElementById('moreContent');
const themeBtn = document.getElementById('themeBtn');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach(s => s.style.color = '#ccc');
        for (let i = 0; i <= index; i++) {
            stars[i].style.color = '#ffd700';
        }
        ratingText.textContent = `You rated ${index + 1} star${index > 0 ? 's' : ''}!`;
    });
});

readMoreBtn.addEventListener('click', () => {
    if (moreContent.style.display === 'none' || moreContent.style.display === '') {
        moreContent.style.display = 'block';
        readMoreBtn.textContent = 'Read Less';
    } else {
        moreContent.style.display = 'none';
        readMoreBtn.textContent = 'Read More';
    }
});

let darkMode = false;
themeBtn.addEventListener('click', () => {
    document.body.style.transition = 'background-color 0.4s ease';
    if (!darkMode) {
        document.body.style.backgroundColor = '#001f3f';
        document.body.style.color = 'white';
        themeBtn.textContent = 'Switch to Day Mode ☀️';
    } else {
        document.body.style.backgroundColor = '#f0f8ff';
        document.body.style.color = '#001f3f';
        themeBtn.textContent = 'Switch to Night Mode 🌙';
    }
    darkMode = !darkMode;
});

function changeColor() {
    const colors = ["#51e2f5", "#edf756", "#ffa8b6", "#a28089"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}