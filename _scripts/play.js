//Creating the constants from HTML:
const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("choice-text")); //convert to an Array

//creating the variabes:

let currentQuestion = {};
let acceptingAnswers = true;
let score = null;
let questionCounter = null;
let avaiableQuestionsList = [];
let questionsList = [
    {
        lblQuestion: "Questão 1?",
        correctAnswer: 1,
        answer1: "Resposta 1",
        answer2: "Resposta 2",
        answer3: "Resposta 3",
        answer4: "Resposta 4"
    },
    {
        lblQuestion: "Questão 2?",
        correctAnswer: 1,
        answer1: "Resposta 1",
        answer2: "Resposta 2",
        answer3: "Resposta 3",
        answer4: "Resposta 4"
    },
    {
        lblQuestion: "Questão 3?",
        correctAnswer: 1,
        answer1: "Resposta 1",
        answer2: "Resposta 2",
        answer3: "Resposta 3",
        answer4: "Resposta 4"
    },
    {
        lblQuestion: "Questão 4?",
        correctAnswer: 1,
        answer1: "Resposta 1",
        answer2: "Resposta 2",
        answer3: "Resposta 3",
        answer4: "Resposta 4"
    }
];

//creating the processing's constants:

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => { // It's a ES6 arrow function
    questionCounter = 0;
    score = 0;
    avaiableQuestionsList = [... questionsList]; // making a full copy from questionsLis
    getNewQuestion();
}

getNewQuestion = () => { // It's a ES6 arrow function
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * avaiableQuestionsList.length); //raffling a smaller random number than available Questions List's length.
    currentQuestion = avaiableQuestionsList[questionIndex]; //selecting the raffled question.
    question.innerText = currentQuestion.question;


};
