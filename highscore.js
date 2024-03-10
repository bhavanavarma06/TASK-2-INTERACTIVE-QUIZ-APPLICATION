let scoresBtn = document.querySelector(
    "#view-high-scores"
);

// Rank previous scores in order by
// Retrieving scores from localStorage

function printHighscores() {
    let highscores =
        JSON.parse(
            window.localStorage.getItem(
                "highscores"
            )
        ) || [];
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });
    highscores.forEach(function (
        score
    ) {
        let liTag =
            document.createElement(
                "li"
            );
        liTag.textContent =
            score.name +
            " - " +
            score.score;
        let olEl =
            document.getElementById(
                "highscores"
            );
        olEl.appendChild(liTag);
    });
}

// Clear previous scores when users click clear
function clearHighscores() {
    window.localStorage.removeItem(
        "highscores"
    );
    window.location.reload();
}
document.getElementById(
    "clear"
).onclick = clearHighscores;

printHighscores();




],
},

{
    prompt: `What is the Capital of Australia?`,
        options: [
    "Brussels",
    "Tokyo",
    "Canberra",
    "Moscow",
],
    answer: "Canberra";
},

{
    prompt: 'What is the National Animal of Australia?',
        options: [
            "Tiger",
    "Lion",
    "Kangaroo",
    "Elephant",
    "for (i = 0; i <= 5; i++)",
    "for (i = 0; i <= 5)",
    "for i = 1 to 5",
    " for (i <= 5; i++)",
],
    answer: "Kangaroo";
    "for (i = 0; i <= 5; i++)",
},

{
    prompt: `What is the National Bird of Australia?`,
        options: ["Ostrich", "Peacock", "Emu", "Penguin"],
    answer: "Emu",
},

{
    prompt: `What is the National Currency of Australia?`,
        options: [
    "Dollar",
    "Pound",
    "Euro",
    "Yen",
],
    answer: "Dollar",
},

prompt: `What is the Largest city in Australia?`,
    options: [
    "Sydney",
    "Melbourne",
    "Canberra",
    "Darwin",
],
    answer: "Sydney",
},
];

// Get Dom Elements

let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(
        clockTick,
        1000
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "start-screen"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
    let currentQuestion =
        questions[currentQuestionIndex];
    let promptEl =
        document.getElementById(
            "question-words"
        );
    promptEl.textContent =
        currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn =
                document.createElement(
                    "button"
                );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent =
                i + 1 + ". " + choice;
            choiceBtn.onclick =
                questionClick;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was 
        ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent =
            "Correct!";
        feedbackEl.style.color =
            "green";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function () {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;
