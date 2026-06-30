const QUIZ_DATA = {
  javascript: [
    { question: "What is the result of typeof null in JavaScript?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correct: 2 },
    { question: "Which of the following describes a JavaScript closure?", options: ["A function that executes immediately after it is defined.", "A function combined with its lexical environment.", "A variable that cannot be reassigned.", "A method of parsing JSON data."], correct: 1 },
    { question: "In the JavaScript event loop, which queue has the highest priority?", options: ["Task Queue", "Microtask Queue", "Render Queue", "Macrotask Queue"], correct: 1 },
    { question: "What will happen if you access a variable declared with `let` before its initialization?", options: ["It returns 'undefined'.", "It throws a ReferenceError.", "It returns 'null'.", "It causes a syntax error."], correct: 1 },
    { question: "Which array method returns a new array with all elements that pass the test implemented by the provided function?", options: ["map()", "reduce()", "forEach()", "filter()"], correct: 3 },
    { question: "How does the 'this' keyword behave inside an arrow function?", options: ["It refers to the object calling the function.", "It is undefined in strict mode.", "It retains the 'this' value of the enclosing lexical context.", "It binds to the global object."], correct: 2 },
    { question: "What is the output of the following: const { a } = { b: 2 }; console.log(a);?", options: ["2", "null", "undefined", "ReferenceError"], correct: 2 },
    { question: "What does the optional chaining operator (?.) do?", options: ["Returns undefined instead of throwing an error if a reference is nullish.", "Provides a default value when a variable is falsy.", "Converts a value to a boolean.", "Combines two strings safely."], correct: 0 },
    { question: "Which operator provides a fallback value only if the left operand is null or undefined?", options: ["||", "??", "&&", "?:"], correct: 1 },
    { question: "How do Promises differ from callbacks in JavaScript?", options: ["Promises execute synchronously.", "Callbacks provide better error handling natively.", "Promises avoid 'callback hell' by allowing chaining.", "There is no functional difference."], correct: 2 }
  ],
  java: [
    { question: "Which of these is not a Java primitive type?", options: ["int", "boolean", "String", "char"], correct: 2 },
    { question: "What is the size of an int variable in Java?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], correct: 2 },
    { question: "Which keyword is used to prevent a class from being subclassed?", options: ["final", "static", "private", "abstract"], correct: 0 },
    { question: "What is the default value of a local variable?", options: ["null", "0", "false", "Not assigned, throws compile error"], correct: 3 },
    { question: "Which interface is the root of the Java Collections Framework?", options: ["List", "Collection", "Map", "Set"], correct: 1 },
    { question: "How do you start a thread in Java?", options: ["run()", "start()", "init()", "execute()"], correct: 1 },
    { question: "What happens when an exception is not caught in Java?", options: ["The program ignores it", "The program terminates abruptly", "A default value is returned", "The JVM crashes"], correct: 1 },
    { question: "Which of the following is true about abstract classes?", options: ["They can be instantiated", "They must contain abstract methods", "They cannot be subclassed", "They can have constructors"], correct: 3 },
    { question: "Which package is imported by default in all Java programs?", options: ["java.io", "java.lang", "java.util", "java.net"], correct: 1 },
    { question: "What does the 'transient' keyword mean?", options: ["The variable cannot be serialized", "The variable cannot be modified", "The variable is shared across threads", "The variable is initialized only once"], correct: 0 }
  ],
  gk: [
    { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Osaka"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], correct: 1 },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
    { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Iron"], correct: 1 },
    { question: "In what year did World War II end?", options: ["1941", "1943", "1945", "1950"], correct: 2 },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
    { question: "What is the tallest mountain in the world?", options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"], correct: 1 },
    { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "South America", "Africa", "Australia"], correct: 2 },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 }
  ]
};

let QUESTIONS = [];
let TOTAL = 0;
const STATE = { currentIndex: 0, score: 0, isAnswered: false };
let currentTopic = "";

function startQuiz(topic) {
  currentTopic = topic;
  QUESTIONS = QUIZ_DATA[topic];
  TOTAL = QUESTIONS.length;
  
  STATE.currentIndex = 0;
  STATE.score = 0;
  STATE.isAnswered = false;
  
  document.getElementById("landing-screen").style.display = "none";
  document.getElementById("results-screen").style.display = "none";
  document.getElementById("active-quiz-screen").style.display = "block";
  document.getElementById("quiz-content").style.display = "block";
  document.getElementById("next-btn").style.display = "none";
  
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[STATE.currentIndex];
  
  document.getElementById("question-counter").innerHTML = `<p>Question ${STATE.currentIndex + 1} of ${TOTAL}</p>`;
  document.getElementById("question-text").innerHTML = q.question;
  
  const optionsGrid = document.getElementById("options-grid");
  optionsGrid.innerHTML = "";
  
  q.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn fade-up";
    
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
    clickedBtn.classList.add("correct");
    STATE.score++;
  } else {
    clickedBtn.classList.add("incorrect");
    
    // Highlight correct option
    const correctBtn = optionsGrid.children[q.correct];
    correctBtn.classList.add("correct");
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
    msgEl.textContent = "Excellent! You really know your stuff!";
  } else if (pct >= 50) {
    msgEl.textContent = "Good effort — keep practising.";
  } else {
    msgEl.textContent = "Keep studying — you will get there!";
  }
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);

document.getElementById("play-again-btn").addEventListener("click", () => {
  startQuiz(currentTopic);
});

document.getElementById("home-btn").addEventListener("click", () => {
  document.getElementById("results-screen").style.display = "none";
  document.getElementById("active-quiz-screen").style.display = "none";
  document.getElementById("landing-screen").style.display = "block";
});
