const QUESTIONS = [
  {
    question: "What is the result of typeof null in JavaScript?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correct: 2
  },
  {
    question: "Which of the following describes a JavaScript closure?",
    options: [
      "A function that executes immediately after it is defined.",
      "A function combined with its lexical environment.",
      "A variable that cannot be reassigned.",
      "A method of parsing JSON data."
    ],
    correct: 1
  },
  {
    question: "In the JavaScript event loop, which queue has the highest priority?",
    options: ["Task Queue", "Microtask Queue", "Render Queue", "Macrotask Queue"],
    correct: 1
  },
  {
    question: "What will happen if you access a variable declared with `let` before its initialization?",
    options: ["It returns 'undefined'.", "It throws a ReferenceError.", "It returns 'null'.", "It causes a syntax error."],
    correct: 1
  },
  {
    question: "Which array method returns a new array with all elements that pass the test implemented by the provided function?",
    options: ["map()", "reduce()", "forEach()", "filter()"],
    correct: 3
  },
  {
    question: "How does the 'this' keyword behave inside an arrow function?",
    options: [
      "It refers to the object calling the function.",
      "It is undefined in strict mode.",
      "It retains the 'this' value of the enclosing lexical context.",
      "It binds to the global object."
    ],
    correct: 2
  },
  {
    question: "What is the output of the following: const { a } = { b: 2 }; console.log(a);?",
    options: ["2", "null", "undefined", "ReferenceError"],
    correct: 2
  },
  {
    question: "What does the optional chaining operator (?.) do?",
    options: [
      "Returns undefined instead of throwing an error if a reference is nullish.",
      "Provides a default value when a variable is falsy.",
      "Converts a value to a boolean.",
      "Combines two strings safely."
    ],
    correct: 0
  },
  {
    question: "Which operator provides a fallback value only if the left operand is null or undefined?",
    options: ["||", "??", "&&", "?:"],
    correct: 1
  },
  {
    question: "How do Promises differ from callbacks in JavaScript?",
    options: [
      "Promises execute synchronously.",
      "Callbacks provide better error handling natively.",
      "Promises avoid 'callback hell' by allowing chaining.",
      "There is no functional difference."
    ],
    correct: 2
  }
];

const STATE = { currentIndex: 0, score: 0, isAnswered: false };
const TOTAL = QUESTIONS.length;

function renderQuestion() {
  const q = QUESTIONS[STATE.currentIndex];
  
  document.getElementById("question-counter").innerHTML = `<p>Question ${STATE.currentIndex + 1} of ${TOTAL}</p>`;
  document.getElementById("question-text").innerHTML = q.question;
  
  const optionsGrid = document.getElementById("options-grid");
  optionsGrid.innerHTML = "";
  
  q.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn fade-up";
    btn.style.background = "var(--bg-secondary)";
    btn.style.border = "1px solid var(--border)";
    btn.style.borderRadius = "var(--radius-btn)";
    btn.style.color = "var(--text-primary)";
    btn.style.padding = "14px 20px";
    btn.style.textAlign = "left";
    btn.style.width = "100%";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.2s";
    
    // Staggered animation
    btn.style.animationDelay = (index * 0.07) + "s";
    
    btn.innerHTML = optText;
    btn.addEventListener("click", () => handleAnswer(index));
    optionsGrid.appendChild(btn);
  });
  
  // Update progress bar
  document.querySelector(".progress-fill").style.width = ((STATE.currentIndex / TOTAL) * 100) + "%";
}

function handleAnswer(index) {
  if (STATE.isAnswered) return;
  STATE.isAnswered = true;
  
  const q = QUESTIONS[STATE.currentIndex];
  const optionsGrid = document.getElementById("options-grid");
  const clickedBtn = optionsGrid.children[index];
  
  if (index === q.correct) {
    clickedBtn.style.borderColor = "var(--success)";
    clickedBtn.style.background = "rgba(16, 185, 129, 0.12)";
    STATE.score++;
  } else {
    clickedBtn.style.borderColor = "var(--error)";
    clickedBtn.style.background = "rgba(239, 68, 68, 0.12)";
    
    // Highlight correct option
    const correctBtn = optionsGrid.children[q.correct];
    correctBtn.style.borderColor = "var(--success)";
    correctBtn.style.background = "rgba(16, 185, 129, 0.12)";
  }
  
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  STATE.currentIndex++;
  
  if (STATE.currentIndex >= TOTAL) {
    showResults();
  } else {
    STATE.isAnswered = false;
    document.getElementById("next-btn").style.display = "none";
    renderQuestion();
  }
}

function showResults() {
  document.getElementById("quiz-content").style.display = "none";
  document.querySelector(".progress-fill").style.width = "100%"; // complete progress
  
  const resultsScreen = document.getElementById("results-screen");
  resultsScreen.style.display = "block";
  
  const pct = Math.round((STATE.score / TOTAL) * 100);
  const scorePercentage = document.getElementById("score-percentage");
  scorePercentage.textContent = pct + "%";
  
  if (pct >= 80) {
    scorePercentage.style.color = "var(--success)";
  } else if (pct >= 50) {
    scorePercentage.style.color = "var(--accent-gold)";
  } else {
    scorePercentage.style.color = "var(--error)";
  }
  
  document.getElementById("score-display").textContent = `${STATE.score} / ${TOTAL}`;
  
  const msgEl = document.getElementById("score-message");
  if (pct >= 80) {
    msgEl.textContent = "Excellent! You really know your JS!";
  } else if (pct >= 50) {
    msgEl.textContent = "Good effort — keep practising.";
  } else {
    msgEl.textContent = "Keep studying — you will get there!";
  }
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);

document.getElementById("play-again-btn").addEventListener("click", () => {
  STATE.currentIndex = 0;
  STATE.score = 0;
  STATE.isAnswered = false;
  
  document.getElementById("quiz-content").style.display = "block";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("results-screen").style.display = "none";
  
  renderQuestion();
});

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
});
