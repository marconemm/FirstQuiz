class Question {
    constructor(number,question, answers, correctAnswer) {
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

//creating the variabes:
let raffledQuestion = {};
let acceptingAnswers = null;
let score = null;
let questionsList = null;
let avaiableQuestionsList = null;
let answeredQuestionsList = null;

//creating the processing's constants:
const CORRECT_SCORE = 10;
const MAX_QUESTIONS = 5;

fillignLists = numerOfQuestions => { //A temp function destinated to fill the processes's lists;
    
    for (let i = 1; i <= numerOfQuestions; i++) {
        const correctAnswer = Math.floor(Math.random() * 4);
        const answersList = [];

        for (let j = 1; j <= 4; j++) {
            const answer = "Resposta " + j + " da questão " + i;
            answersList.push(answer);  
        }
        
        avaiableQuestionsList.push(new Question(i, "Questão " + i,answersList,correctAnswer));   
    };

    questionsList = [... avaiableQuestionsList]; //make a copy of the questions list.
}; // fillignLists(numerOfQuestions)

startQuiz = () => { // It's a ES6 arrow function (The "start quiz" function).
    score = 0;
    questionsList = [];
    avaiableQuestionsList = [];
    answeredQuestionsList = [];
    fillignLists(MAX_QUESTIONS);
    currentQuestion = getNewQuestion();
}; // startQuiz()

getNewQuestion = () => { //The function destined to raffle some question.
    
    if(avaiableQuestionsList.length === 0){ // if true, goes to the "scores page" (./game/scores.html)
        return window.location.assign("./scores.html");
    }

    const questionIndex = Math.floor(Math.random() * avaiableQuestionsList.length); //raffling a smaller random number than available Questions List's length.
    raffledQuestion = avaiableQuestionsList[questionIndex]; //selecting the raffled question.
    lbl_Question.innerText = raffledQuestion.question;

    for (let i = 0; i < lbl_answersLits.length; i++) {
        lbl_answersLits[i].innerText = raffledQuestion.answers[i];
    }

    acceptingAnswers = true; // changing the falg "acceptingAnswers".
    avaiableQuestionsList.splice(questionIndex,1); //remove the raffled question from the avaiable list.
    
    return raffledQuestion;
}

lbl_answersLits.forEach(answer => { //adding the "click" event listener.
    answer.addEventListener('click', e => {
       if (!acceptingAnswers) return;
       
       acceptingAnswers = false; // changing the falg "acceptingAnswers".
       const selectedChoice = e.target;
       const selectedAnswer = Number(selectedChoice.dataset["number"]);
       currentQuestion.selectedAnswer = selectedAnswer;
       answeredQuestionsList.push(currentQuestion);
       currentQuestion = getNewQuestion();
    });
});

startQuiz();
