export class Question {
    constructor(questionTxt, incorrectAnswers, correctAnswer) {
        this.questionNumber = undefined;
        this.questionTxt = questionTxt;
        this.correctAnswer = correctAnswer;
        this.answersList = incorrectAnswers;
        this.selectedAnswer = undefined;
        this.selectedAnswerChar = undefined;
    }
};

//export {Question};