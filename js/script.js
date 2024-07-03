const startBtn = document.querySelector(".start-btn button");
const quizBlock = document.querySelector(".quiz");
const resultBlock = document.querySelector(".result");
const answersList = document.querySelector(".answers-list");
const timerText = document.querySelector(".timer .timer__text");
const timeCount = document.querySelector(".timer .timer__sec");

startBtn.onclick = () => {
    quizBlock.classList.add("activeQuiz");

    showQuestions(0);
    questionCounter(1);
    startTimer(15);
};

let timeValue = 15;
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartQuiz = resultBlock.querySelector(".buttons .restart");
const quitQuiz = resultBlock.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
    quizBlock.classList.add("activeQuiz");
    resultBlock.classList.remove("activeResult");

    timeValue = 15;
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;

    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);

    timerText.textContent = "Секунд осталось";
    nextBtn.classList.remove("show");
};

quitQuiz.onclick = () => {
    window.location.reload();
};

const nextBtn = document.querySelector(".footer .next-btn");
const totalQuestions = document.querySelector(".footer .total-questions");

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;

        showQuestions(questionCount);
        questionCounter(questionNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);

        timerText.textContent = "Ещё секунд";
        nextBtn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
};

function showQuestions(index) {
    const questionText = document.querySelector(".question__text");

    let questionTag = questions[index].numb + ". " + questions[index].question;
    let listTag =
        '<li class="answers-list__item"><span>' +
        questions[index].options[0] +
        "</span></li>" +
        '<li class="answers-list__item"><span>' +
        questions[index].options[1] +
        "</span></li>" +
        '<li class="answers-list__item"><span>' +
        questions[index].options[2] +
        "</span></li>" +
        '<li class="answers-list__item"><span>' +
        questions[index].options[3] +
        "</span></li>";

    questionText.innerHTML = questionTag;
    answersList.innerHTML = listTag;

    const listItem = answersList.querySelectorAll(".answers-list__item");

    // set onclick attribute to all available options
    for (i = 0; i < listItem.length; i++) {
        listItem[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);

    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    const allOptions = answersList.children.length;

    if (userAnswer == correctAnswer) {
        userScore += 1;
        answer.classList.add("correct");
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (answersList.children[i].textContent == correctAnswer) {
                answersList.children[i].setAttribute(
                    "class",
                    "answers-list__item correct"
                );
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        answersList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

function showResult() {
    quizBlock.classList.remove("activeQuiz");
    resultBlock.classList.add("activeResult");

    const resultText = resultBlock.querySelector(".result__text");

    let scoreTag =
        "Результат: <span>" +
        userScore +
        "</span> из <span>" +
        questions.length +
        "</span> правильных ответов.";

    resultText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;

        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timerText.textContent = "Время вышло";
            const allOptions = answersList.children.length;
            let correctAnswer = questions[questionCount].answer;

            for (i = 0; i < allOptions; i++) {
                if (answersList.children[i].textContent == correctAnswer) {
                    answersList.children[i].setAttribute(
                        "class",
                        "answers-list__item correct"
                    );
                    console.log("Время вышло,ответ выбран автоматически.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                answersList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

function questionCounter(index) {
    let totalQuestionCounterTag =
        "<span>" +
        index +
        "</span> из <span>" +
        questions.length +
        "</span> вопросов";

    totalQuestions.innerHTML = totalQuestionCounterTag;
}