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
const lbl_hud = document.getElementById("lbl_hud");
const progressBarContent = document.getElementById("loadingBarContent");
const lbl_progressBar = document.getElementById("lbl_progressBar");
const lbl_question = document.getElementById("lbl_question");
const lbl_answersLits = Array.from(document.getElementsByClassName("lbl_choiceText")); //convert to an Array
const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");
const btn_finish = document.getElementById("btn_finish");

//creating the variabes:
let score = null;
let questionsList = null;
let avaiableQuestionsList = null;
let answeredQuestionsList = null;
let currentQuestion = null;

//creating the processing's constants:
const CORRECT_SCORE = 10;
const MAX_QUESTIONS = 3;
const WAIT_TIME = 1000;

//Creating the "Click" event listeners:
btn_prev.addEventListener('click', e => {
    currentQuestion = questionsList[currentQuestion.number - 2];

    if (currentQuestion !== undefined) {
        btn_next.disabled = false; // eneabling the "btn_next".
        if (currentQuestion.number === 1) {
            btn_prev.disabled = true; // disabling the "btn_next".
        }
        // setTimeout(renderScreen(),WAIT_TIME);
        renderScreen();
    }
});

btn_next.addEventListener('click', e => {
    currentQuestion = questionsList[currentQuestion.number];

    if (currentQuestion !== undefined) {
        btn_prev.disabled = false; // eneabling the "btn_prev".
        if (currentQuestion.number === (questionsList.length)) {
            btn_next.disabled = true; // disabling the "btn_prev".
        }
        // setTimeout(renderScreen()   ,WAIT_TIME);
        renderScreen();
    }
});

btn_finish.addEventListener('click', e => {
    if (answeredQuestionsList.length === MAX_QUESTIONS) { // if true, goes to the "scores page" (./game/scores.html)
        return window.location.assign("./scores.html");
    }
});

lbl_answersLits.forEach(answer => {
    answer.parentElement.addEventListener('click', e => { //adding the "click" event listener.
        const selectedChoice = e.target;
        const answeredOption = Number(selectedChoice.dataset["number"]);


        let isToPushQuestion = true;

        for (let i = 0; i < answeredQuestionsList.length; i++) {

            if (answeredQuestionsList[i].number === currentQuestion.number) { //Updates the answeres questions list:
                isToPushQuestion = false;

                if (currentQuestion.selectedAnswer === null || answeredOption !== currentQuestion.selectedAnswer) {
                    //console.log(`Updating the answer ${answeredOption} to the question number ${currentQuestion.number}.`);
                    currentQuestion.selectedAnswer = answeredOption;
                    answeredQuestionsList[i].selectedAnswer = answeredOption;
                }
                else {
                    //console.log(`Nulling the answer from the question number ${currentQuestion.number}.`);
                    currentQuestion.selectedAnswer = null;
                    answeredQuestionsList.splice(i,1); //removes the nulled answer from answeredQuestionsList.
                }

                break;
            }
        }

        if (isToPushQuestion) {
            // console.log(`Pushing the question number ${currentQuestion.number}. into answered questions list.`);
            currentQuestion.selectedAnswer = answeredOption; //updates the asweredOption.
            answeredQuestionsList.push(currentQuestion);
        }
        renderScreen();
    });
});

fillignLists = numberOfQuestions => { //A temp function destinated to fill the processes's lists;

    for (let i = 1; i <= numberOfQuestions; i++) {
        const correctAnswer = Math.floor(Math.random() * 4);
        const answersList = [];

        for (let j = 1; j <= 4; j++) {
            const lbl_answerTxt = `Resposta ${j} da questão ${i}`;
            answersList.push(lbl_answerTxt);
        }

        const lbl_questionTxt = `Qual a resposta para esta questão?`;

        avaiableQuestionsList.push(new Question(i, lbl_questionTxt, answersList, correctAnswer));
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
    renderScreen();
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

renderScreen = () => {
    //updating HTML's texts:
    lbl_question.innerText = currentQuestion.question;

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

    lbl_hud.innerText = `Questão: ${currentQuestion.number} de ${questionsList.length}`;

    //Updating the preogress bar:
    const newWidth = Math.round((answeredQuestionsList.length / MAX_QUESTIONS) * 100);
    lbl_progressBar.innerText = `${newWidth}%`;
    progressBarContent.style.width = `${newWidth}%`;
    
    if (answeredQuestionsList.length === MAX_QUESTIONS) {
        //console.log("All the questions has aswers.\nEneabling the btn_finish");
        btn_finish.hidden = false;
    } else if (!btn_finish.hidden) {
        //console.log(`some question isn't aswered.\nHidding the btn_finish.`);
        btn_finish.hidden = true;
    }
}; //renderScreen( ... )

startQuiz();
