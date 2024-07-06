const wordsWithImages = {
    fruits: [
        { word: "apple", image: "images/fruits/apple.png" },
        { word: "banana", image: "images/fruits/banana.png" },
        { word: "coconut", image: "images/fruits/coconut.png" },
        { word: "dragon-fruit", image: "images/fruits/dragon-fruit.png" },
        { word: "grape", image: "images/fruits/grape.png" },
        { word: "jackfruit", image: "images/fruits/jackfruit.png" },
        { word: "melon", image: "images/fruits/melon.png" },
        { word: "orange", image: "images/fruits/orange.png" },
        { word: "peach", image: "images/fruits/peach.png" },
        { word: "strawberry", image: "images/fruits/strawberry.png" }
    ],
    animals: [
        { word: "bird", image: "images/animals/bird.png" },
        { word: "cat", image: "images/animals/cat.png" },
        { word: "chicken", image: "images/animals/chicken.png" },
        { word: "cow", image: "images/animals/cow.png" },
        { word: "dog", image: "images/animals/dog.png" },
        { word: "elephant", image: "images/animals/elephant.png" },
        { word: "fish", image: "images/animals/fish.png" },
        { word: "goat", image: "images/animals/goat.png" },
        { word: "lion", image: "images/animals/lion.png" },
        { word: "shark", image: "images/animals/shark.png" }
    ],
    food_and_baverages: [
        { word: "bread", image: "images/fb/bread.png" },
        { word: "burger", image: "images/fb/burger.png" },
        { word: "coffee", image: "images/fb/coffee.png" },
        { word: "fried-chicken", image: "images/fb/fried-chicken.png" },
        { word: "hot-dog", image: "images/fb/hot-dog.png" },
        { word: "ice-tea", image: "images/fb/ice-tea.png" },
        { word: "milk", image: "images/fb/milk.png" },
        { word: "noodle", image: "images/fb/noodle.png" },
        { word: "orange-juice", image: "images/fb/orange-juice.png" },
        { word: "pizza", image: "images/fb/pizza.png" }
    ],
    transportation: [
        { word: "airplane", image: "images/transportation/airplane.png" },
        { word: "ambulance", image: "images/transportation/ambulance.png" },
        { word: "bike", image: "images/transportation/bike.png" },
        { word: "bus", image: "images/transportation/bus.png" },
        { word: "canoe", image: "images/transportation/canoe.png" },
        { word: "helicopter-", image: "images/transportation/helicopter-.png" },
        { word: "hot-air-balloon", image: "images/transportation/hot-air-balloon.png" },
        { word: "jet-ski", image: "images/transportation/jet-ski.png" },
        { word: "motorbike", image: "images/transportation/motorbike.png" },
        { word: "rocket", image: "images/transportation/rocket.png" }
    ]
};

let currentCategory = 'fruits';
let currentWordIndex = 0;
let currentWord = "";
let scrambledWord = "";
let score = 0;
let chancesLeft = 3;
let totalAttempts = 0;

function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function setCategory() {
    currentCategory = document.getElementById('category').value;
    currentWordIndex = 0;
    chancesLeft = 3;
    totalAttempts = 0;
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    hideEndGameAlert();
    setNewWord();
}

function setNewWord() {
    const wordList = wordsWithImages[currentCategory];
    if (currentWordIndex >= wordList.length || totalAttempts >= 10) {
        showEndGameAlert();
        return;
    }
    currentWord = wordList[currentWordIndex].word;
    const imageUrl = wordList[currentWordIndex].image;
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('scrambled-word').textContent = scrambledWord;
    document.getElementById('scrambled-word-image').src = imageUrl;
    document.getElementById('chances').textContent = `Chances left: ${chancesLeft}`;
}

function checkWord() {
    const userInput = document.getElementById('user-input').value;
    const resultElement = document.getElementById('result');
    totalAttempts++;
    if (userInput.toLowerCase() === currentWord) {
        resultElement.textContent = "Correct!";
        resultElement.classList.remove('incorrect');
        resultElement.classList.add('correct');
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
        currentWordIndex++;
        if (currentWordIndex < 10 && chancesLeft > 0) {
            setTimeout(() => {
                setNewWord();
                document.getElementById('user-input').value = "";
                document.getElementById('result').textContent = "";
                document.getElementById('result').classList.remove('correct', 'incorrect');
            }, 1000);
        } else {
            showEndGameAlert();
        }
    } else {
        resultElement.textContent = "Try again!";
        resultElement.classList.remove('correct');
        resultElement.classList.add('incorrect');
        chancesLeft--;
        document.getElementById('chances').textContent = `Chances left: ${chancesLeft}`;
        if (chancesLeft === 0) {
            showEndGameAlert();
        }
    }
}

function showEndGameAlert() {
    document.getElementById('total-score').textContent = score;
    const endGameAlert = document.getElementById('end-game-alert');
    endGameAlert.classList.add('show');
    setTimeout(() => {
        endGameAlert.style.opacity = "1";
        endGameAlert.style.pointerEvents = "auto";
    }, 100);
}

function hideEndGameAlert() {
    const endGameAlert = document.getElementById('end-game-alert');
    endGameAlert.classList.remove('show');
    endGameAlert.style.opacity = "0";
    endGameAlert.style.pointerEvents = "none";
}

function restartGame() {
    hideEndGameAlert();
    setCategory();
}

// Initialize the game with the first word
setNewWord();
