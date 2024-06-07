document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess');
    const submitGuessButton = document.getElementById('submitGuess');
    const newGameButton = document.getElementById('newGame');
    const resultDiv = document.getElementById('result');
    const historyDiv = document.getElementById('history');
    const attemptsDiv = document.getElementById('attempts');

    let secretNumber = generateSecretNumber();
    let attempts = [];

    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });

    submitGuessButton.addEventListener('click', makeGuess);
    newGameButton.addEventListener('click', startNewGame);

    function makeGuess() {
        const guess = guessInput.value;
        if (guess.length === 4 && isUniqueDigits(guess)) {
            const { bulls, cows } = calculateBullsAndCows(secretNumber, guess);
            attempts.push({ guess, bulls, cows });
            updateHistory();
            updateAttempts();
            if (bulls === 4) {
                resultDiv.textContent = `Congratulations! You win !!!`;
                submitGuessButton.disabled = true;
                guessInput.disabled = true;
                launchConfetti();
            } else {
                resultDiv.textContent = `Bulls: ${bulls}, Cows: ${cows}`;
            }
        } else {
            resultDiv.textContent = 'Please enter a valid 4-digit number with unique digitsr';
        }
        guessInput.value = '';
    }

    function startNewGame() {
        secretNumber = generateSecretNumber();
        attempts = [];
        resultDiv.textContent = '';
        historyDiv.innerHTML = '';
        attemptsDiv.textContent = 'Attempts: 0';
        submitGuessButton.disabled = false;
        guessInput.disabled = false;
        guessInput.value = '';
    }

    function generateSecretNumber() {
        let digits = '0123456789';
        let number = '';
        while (number.length < 4) {
            let randomDigit = digits[Math.floor(Math.random() * digits.length)];
            if (!number.includes(randomDigit)) {
                number += randomDigit;
            }
        }
        console.log(number);
        return number;
    }

    function isUniqueDigits(number) {
        return new Set(number).size === number.length;
    }

    function calculateBullsAndCows(secret, guess) {
        let bulls = 0, cows = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === secret[i]) {
                bulls++;
            } else if (secret.includes(guess[i])) {
                cows++;
            }
        }
        return { bulls, cows };
    }

    function updateHistory() {
        historyDiv.innerHTML = '';
        attempts.forEach(attempt => {
            const div = document.createElement('div');
            div.textContent = `${attempt.guess} - Bulls: ${attempt.bulls}, Cows: ${attempt.cows}`;
            historyDiv.appendChild(div);
        });
    }

    function updateAttempts() {
        attemptsDiv.textContent = `Attempts: ${attempts.length}`;
    }

    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    
});
