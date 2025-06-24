 <script>
        let playerScore = 0;
        let computerScore = 0;
        const choices = ['rock', 'paper', 'scissors'];
        const emojis = {
            rock: '✊',
            paper: '✋',
            scissors: '✌️'
        };
        const resultMessages = {
            win: ['You crushed it!', 'Victory!', 'You win!', 'Nice one!'],
            lose: ['Better luck next time!', 'Computer wins!', 'You lost!', 'Try again!'],
            draw: ['It\'s a tie!', 'Draw!', 'Same choices!', 'No winner!']
        };

        function playGame(playerChoice) {
            // Reset animations and clear previous choices
            document.getElementById('player-choice').classList.remove('choice-selected', 'shake');
            document.getElementById('computer-choice').classList.remove('choice-selected', 'shake');
            document.getElementById('result').textContent = '';
            
            // Show player choice immediately
            const playerChoiceDisplay = document.getElementById('player-choice');
            playerChoiceDisplay.textContent = emojis[playerChoice];
            playerChoiceDisplay.classList.add('choice-selected');
            
            // Show computer thinking
            const computerChoiceDisplay = document.getElementById('computer-choice');
            computerChoiceDisplay.textContent = '❔';
            computerChoiceDisplay.classList.add('shake');
            
            // Delay computer choice for dramatic effect
            setTimeout(() => {
                const computerChoice = choices[Math.floor(Math.random() * choices.length)];
                computerChoiceDisplay.textContent = emojis[computerChoice];
                computerChoiceDisplay.classList.remove('shake');
                computerChoiceDisplay.classList.add('choice-selected');
                
                // Determine winner
                const result = determineWinner(playerChoice, computerChoice);
                displayResult(result, playerChoice, computerChoice);
                
                // Update scores
                updateScores(result);
                
                // Check for game end
                if (playerScore === 5 || computerScore === 5) {
                    endGame();
                }
            }, 1000);
        }

        function determineWinner(player, computer) {
            if (player === computer) return 'draw';
            
            if (
                (player === 'rock' && computer === 'scissors') ||
                (player === 'paper' && computer === 'rock') ||
                (player === 'scissors' && computer === 'paper')
            ) {
                return 'win';
            }
            
            return 'lose';
        }

        function displayResult(result, playerChoice, computerChoice) {
            const resultElement = document.getElementById('result');
            
            if (result === 'win') {
                resultElement.textContent = `${capitalizeFirstLetter(playerChoice)} beats ${computerChoice}`;
                resultElement.className = 'text-center text-2xl font-semibold mb-4 h-8 text-green-400';
            } else if (result === 'lose') {
                resultElement.textContent = `${capitalizeFirstLetter(computerChoice)} beats ${playerChoice}`;
                resultElement.className = 'text-center text-2xl font-semibold mb-4 h-8 text-red-400';
            } else {
                resultElement.textContent = `Both chose ${playerChoice}`;
                resultElement.className = 'text-center text-2xl font-semibold mb-4 h-8 text-yellow-400';
            }
        }

        function updateScores(result) {
            if (result === 'win') {
                playerScore++;
            } else if (result === 'lose') {
                computerScore++;
            }
            
            document.getElementById('player-score').textContent = playerScore;
            document.getElementById('computer-score').textContent = computerScore;
        }

        function endGame() {
            const popup = document.getElementById('result-popup');
            const finalResult = document.getElementById('final-result');
            const resultMessage = document.getElementById('result-message');
            
            if (playerScore === 5) {
                finalResult.textContent = 'You Won the Game!';
                finalResult.className = 'text-3xl font-bold mb-4 text-green-300';
                resultMessage.textContent = getRandomMessage('win');
            } else {
                finalResult.textContent = 'Computer Won the Game!';
                finalResult.className = 'text-3xl font-bold mb-4 text-red-300';
                resultMessage.textContent = getRandomMessage('lose');
            }
            
            popup.classList.add('show');
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            document.getElementById('player-score').textContent = '0';
            document.getElementById('computer-score').textContent = '0';
            document.getElementById('player-choice').textContent = '';
            document.getElementById('computer-choice').textContent = '';
            document.getElementById('result').textContent = '';
            document.getElementById('result-popup').classList.remove('show');
        }

        function getRandomMessage(type) {
            const messages = resultMessages[type];
            return messages[Math.floor(Math.random() * messages.length)];
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    </script>