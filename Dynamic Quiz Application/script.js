let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let userAnswers = [];

// DOM Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const restartButton = document.getElementById("restart-btn");

// Load questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch("questions.json");
    questions = await response.json();
    userAnswers = new Array(questions.length).fill(null);
    showQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
    questionText.textContent =
      "Error loading questions. Please try again later.";
  }
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Create and append new options
  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    if (userAnswers[currentQuestionIndex] === index) {
      optionElement.classList.add("selected");
    }
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(optionElement);
  });

  // Update button states
  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = currentQuestionIndex === questions.length - 1;
  submitButton.style.display =
    currentQuestionIndex === questions.length - 1 ? "block" : "none";
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  showQuestion();
}

function calculateScore() {
  score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      score++;
    }
  });
  return score;
}

function showResults() {
  const finalScore = calculateScore();
  scoreElement.textContent = `${finalScore} out of ${questions.length}`;

  // Feedback based on score
  if (finalScore === questions.length) {
    feedbackElement.textContent = "Excellent! You got all questions right!";
  } else if (finalScore >= questions.length * 0.7) {
    feedbackElement.textContent = "Good job! You did well!";
  } else {
    feedbackElement.textContent = "Keep practicing! You can do better!";
  }

  resultContainer.style.display = "block";
}

prevButton.addEventListener("click", () => {
  currentQuestionIndex--;
  showQuestion();
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

submitButton.addEventListener("click", showResults);

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(questions.length).fill(null);
  resultContainer.style.display = "none";
  showQuestion();
});

// Initialize the quiz
loadQuestions();
