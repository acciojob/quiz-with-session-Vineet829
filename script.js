const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "What is the boiling point of water?",
        options: ["100°C", "90°C", "80°C", "70°C"],
        answer: 0
    },
    {
        question: "What planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    }
];

const questionsContainer = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

// Load saved progress from session storage
function loadProgress() {
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};
    questions.forEach((question, index) => {
        if (savedProgress[index] !== undefined) {
            const radioButton = document.querySelector(`input[name="q${index}"][value="${savedProgress[index]}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }
        }
    });
}

// Save progress to session storage
function saveProgress() {
    const progress = {};
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        progress[index] = selectedOption ? selectedOption.value : undefined;
    });
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Calculate score
function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === question.answer) {
            score++;
        }
    });
    return score;
}

// Display quiz questions
function displayQuiz() {
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${question.question}</p>`;
        question.options.forEach((option, optionIndex) => {
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${optionIndex}">
                    ${option}
                </label><br>
            `;
        });
        questionsContainer.appendChild(questionDiv);
    });
}

// Submit event
submitButton.addEventListener('click', () => {
    const score = calculateScore();
    resultContainer.innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
});

// Initialize quiz
function initQuiz() {
    displayQuiz();
    loadProgress();
}

// Run the initialization
initQuiz();
