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
let acceptingAnswers = null;
let score = null;
let questionsList = null;
let avaiableQuestionsList = null;
let answeredQuestionsList = null;
let currentQuestion = null;

//creating the processing's constants:
const CORRECT_SCORE = 10;
const MAX_QUESTIONS = 9;

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
    currentQuestion = getRandomQuestion();
    showingCurrentQuestion();

    btn_prev.addEventListener('click', e => {
        acceptingClicks = true; // changing the flag "acceptingClicks".

        for (let i = 0; i < questionsList.length; i++) {

            if (acceptingClicks && questionsList[i].number === currentQuestion.number) {
                // const previousQuestion = getQuestionByID(i - 1);
                const previousQuestion = questionsList[i - 1];
                currentQuestion = previousQuestion;
                showingCurrentQuestion();

                if (previousQuestion.number === 1) {
                    acceptingClicks = false; // changing the flag "acceptingClicks".
                    btn_prev.disabled = true;
                }

            }
        }
    });

    btn_next.addEventListener('click', e => {
        currentQuestion = questionsList[currentQuestion.number];

        if (currentQuestion !== undefined) {
            btn_prev.disabled = false; // eneabling the "btn_prev".
            showingCurrentQuestion();
            console.log(currentQuestion.number);
            console.log(questionsList.length);
            if (currentQuestion.number === (questionsList.length)) {
                console.log(currentQuestion);
                btn_next.disabled = true;
            }
        }
    });

    lbl_answersLits.forEach(answer => {

        // Styling answers:
        if (currentQuestion.selectedAnswer === null) {
            answer.parentElement.classList.remove("selected-answer");
        } else if (currentQuestion.selectedAnswer === Number(answer.dataset["number"])) {
            answer.parentElement.classList.add("selected-answer");
        }

        answer.addEventListener('click', e => { //adding the "click" event listener.
            if (!acceptingAnswers) return;

            const selectedChoice = e.target;
            const selectedAnswer = Number(selectedChoice.dataset["number"]);
            acceptingAnswers = false; // changing the falg "acceptingAnswers".
            currentQuestion.selectedAnswer = selectedAnswer;

            //const newChoiceOptionClass = selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect';
            answeredQuestionsList.push(currentQuestion);
            currentQuestion = getRandomQuestion();
            showingCurrentQuestion();
        });
    });
}; // startQuiz()

getRandomQuestion = () => { //The function destined to raffle some question.

    if (avaiableQuestionsList.length === 0) { // if true, goes to the "scores page" (./game/scores.html)
        return window.location.assign("./scores.html");
    }

    const questionIndex = Math.floor(Math.random() * avaiableQuestionsList.length); //raffling a smaller random number than available Questions List's length.
    raffledQuestion = avaiableQuestionsList[questionIndex]; //selecting the raffled question.

    acceptingAnswers = true; // changing the falg "acceptingAnswers".
    avaiableQuestionsList.splice(questionIndex, 1); //remove the raffled question from the avaiable list.

    return raffledQuestion;
}; // getRandomQuestion( ... ) 

getQuestionByID = id => {
    for (let j = 0; j < questionsList.length; j++) {
        if (j === id) {
            return questionsList[j];
        }
    }
    return null;
}; //getQuestionByID( ... )

showingCurrentQuestion = () => {
    lbl_Question.innerText = currentQuestion.question;

    for (let i = 0; i < lbl_answersLits.length; i++) {
        lbl_answersLits[i].innerText = currentQuestion.answers[i];
    }
}; //showingCurrentQuestion( ... )

startQuiz();
