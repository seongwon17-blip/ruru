document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '라이트 모드';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = '다크 모드';
        }
    }

    // Apply saved theme on load, or default to light if no theme is saved
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Check for user's system preference if no theme is saved
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }


    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Lottery Game Logic
    const maxNumberInput = document.getElementById('max-number');
    const numBallsInput = document.getElementById('num-balls');
    const drawBallsBtn = document.getElementById('draw-balls-btn');
    const lotteryResultsDiv = document.getElementById('lottery-results');

    drawBallsBtn.addEventListener('click', () => {
        const maxNumber = parseInt(maxNumberInput.value);
        const numBalls = parseInt(numBallsInput.value);

        if (isNaN(maxNumber) || maxNumber < 1) {
            alert('최대 숫자는 1 이상의 유효한 숫자여야 합니다.');
            return;
        }
        if (isNaN(numBalls) || numBalls < 1) {
            alert('뽑을 개수는 1 이상의 유효한 숫자여야 합니다.');
            return;
        }
        if (numBalls > maxNumber) {
            alert('뽑을 개수는 최대 숫자보다 클 수 없습니다.');
            return;
        }

        const numbers = new Set();
        while (numbers.size < numBalls) {
            numbers.add(Math.floor(Math.random() * maxNumber) + 1);
        }

        lotteryResultsDiv.innerHTML = ''; // Clear previous results
        numbers.forEach(number => {
            const ball = document.createElement('span');
            ball.classList.add('lottery-ball');
            ball.textContent = number;
            lotteryResultsDiv.appendChild(ball);
        });
    });
});
