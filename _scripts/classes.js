export class Question {
    constructor(questionNumber, difficulty, questionTxt, incorrectAnswers, correctAnswer) {
        this.difficulty = difficulty;
        this.questionNumber = questionNumber;
        this.questionTxt = questionTxt;
        this.correctAnswer = correctAnswer;
        this.answersList = incorrectAnswers;
        this.selectedAnswer = undefined;
        this.selectedAnswerChar = undefined;
    }
};

//export {Question};