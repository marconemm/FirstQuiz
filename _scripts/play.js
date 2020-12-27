class Question {
    constructor(number, question, answers, correctAnswer) {
        this.number = number;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answers = answers;
        this.selectedAnswer = null;
    }
};

//Creating the constants from HTML:
const lbl_Question = document.getElementById("question");
const lbl_answersLits = Array.from(document.getElementsByClassName("choice-text")); //convert to an Array
const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");

//creating the variabes:
let score = null;
let questionsList = null;
let avaiableQuestionsList = null;
let answeredQuestionsList = null;
let currentQuestion = null;

//creating the processing's constants:
const CORRECT_SCORE = 10;
const MAX_QUESTIONS = 3;

//Creating the "Click" event listeners:
btn_prev.addEventListener('click', e => { 
    currentQuestion = questionsList[currentQuestion.number - 2];

    if (currentQuestion !== undefined) {
        btn_next.disabled = false; // eneabling the "btn_next".
        showCurrentQuestion();
        if (currentQuestion.number === 1) {
            btn_prev.disabled = true; // disabling the "btn_next".
        }
    }
});

btn_next.addEventListener('click', e => {
    currentQuestion = questionsList[currentQuestion.number];

    if (currentQuestion !== undefined) {
        btn_prev.disabled = false; // eneabling the "btn_prev".
        showCurrentQuestion();
        if (currentQuestion.number === (questionsList.length)) {
            btn_next.disabled = true; // disabling the "btn_prev".
        }
    }
});

lbl_answersLits.forEach(answer => {
    answer.parentElement.addEventListener('click', e => { //adding the "click" event listener.
    const selectedChoice = e.target;
    const answeredOption = Number(selectedChoice.dataset["number"]);
    currentQuestion.selectedAnswer = answeredOption;

        let isToPushQuestion = true;
        for (let i = 0; i < answeredQuestionsList.length; i++) {
            if (answeredQuestionsList[i].number === currentQuestion.number) {
                isToPushQuestion = false;
                currentQuestion.selectedAnswer = answeredOption;
                break;
            }
        }

        if (isToPushQuestion) {
            currentQuestion.selectedAnswer = answeredOption;
            answeredQuestionsList.push(currentQuestion);
        }
        showCurrentQuestion();
    });
});

fillignLists = numerOfQuestions => { //A temp function destinated to fill the processes's lists;

    for (let i = 1; i <= numerOfQuestions; i++) {
        const correctAnswer = Math.floor(Math.random() * 4);
        const answersList = [];

        for (let j = 1; j <= 4; j++) {
            const answer = "Resposta " + j + " da questão " + i;
            answersList.push(answer);
        }

        avaiableQuestionsList.push(new Question(i, '"Pergunta" da questão ' + i + ":", answersList, correctAnswer));
    };

    questionsList = [...avaiableQuestionsList]; //make a copy of the questions list.
}; // fillignLists(numerOfQuestions)

startQuiz = () => { // It's a ES6 arrow function (The "start quiz" function).
    score = 0;
    questionsList = [];
    avaiableQuestionsList = [];
    answeredQuestionsList = [];
    fillignLists(MAX_QUESTIONS);
    currentQuestion = questionsList[0];
    btn_prev.disabled = true;
    showCurrentQuestion();
}; // startQuiz()

/* getRandomQuestion = () => { //The function destined to raffle some question.

    if (avaiableQuestionsList.length === 0) { // if true, goes to the "scores page" (./game/scores.html)
        return window.location.assign("./scores.html");
    }

    const questionIndex = Math.floor(Math.random() * avaiableQuestionsList.length); //raffling a smaller random number than available Questions List's length.
    raffledQuestion = avaiableQuestionsList[questionIndex]; //selecting the raffled question.

    acceptingAnswers = true; // changing the falg "acceptingAnswers".
    avaiableQuestionsList.splice(questionIndex, 1); //remove the raffled question from the avaiable list.

    return raffledQuestion;
}; // getRandomQuestion( ... )  */

showCurrentQuestion = () => {
    //updating HTML's texts:
    lbl_Question.innerText = currentQuestion.question;

    for (let i = 0; i < lbl_answersLits.length; i++) {
        lbl_answersLits[i].innerText = currentQuestion.answers[i];
    }

    lbl_answersLits.forEach(answer => { // Styling answers:
        if (currentQuestion.selectedAnswer === Number(answer.dataset["number"])) {
            answer.parentElement.classList.add("selected-answer");
        } else {
            answer.parentElement.classList.remove("selected-answer");
        }
    });
}; //showCurrentQuestion( ... )

startQuiz();
