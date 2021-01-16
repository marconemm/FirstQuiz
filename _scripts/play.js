class Player {
    constructor (name){
        this.name = name;
    }
}

class Question {
    constructor(questionTxt, incorrectAnswers, correctAnswer) {
        this.questionNumber = undefined;
        this.questionTxt = questionTxt;
        this.correctAnswer = correctAnswer;
        this.answersList = incorrectAnswers;
        this.selectedAnswer = undefined;
    }
};

//Creating the constants from HTML:
const lbl_hud = document.getElementById("lbl_hud");
const progressBarContent = document.getElementById("loadingBarContent");
const lbl_progressBar = document.getElementById("lbl_progressBar");
const lbl_question = document.getElementById("lbl_question");
// const lbl_choiceOptions = Array.from(document.getElementsByClassName("lbl_choiceOption")); //convert to an Array
// const rb_choiceOptions = Array.from(document.getElementsByClassName("radioStyles"));//convert to an Array
// const lbl_answers = Array.from(document.getElementsByClassName("bl_choiceText")); //convert to an Array
const choicesOptions = Array.from(document.getElementsByClassName("choice-container")); //convert to an Array
const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");
const btn_finish = document.getElementById("btn_finish");

//creating the variabes:
let score;
let questionsList;
//let avaiableQuestionsList;
let answeredQuestions;
let currentQuestion;
let raffledCategory;
const difficulty = JSON.parse(sessionStorage.getItem("difficulty"));
const isRandomCategory = JSON.parse(sessionStorage.getItem("isRandomCategory"));

// creating the Objects:
const player = new Player(JSON.parse(sessionStorage.getItem("playerName")));

//creating the processing's constants:
const CORRECT_SCORE = 10;
const MAX_QUESTIONS = 10;
const CATEGORIES_URL = "https://opentdb.com/api_category.php";

//Creating the "Click" event listeners:
btn_prev.addEventListener('click', e => {
    currentQuestion = questionsList[currentQuestion.questionNumber - 2];
    
    if (currentQuestion !== undefined) {
        btn_next.disabled = false; // eneabling the "btn_next".
        if (currentQuestion.questionNumber === 1) {
            btn_prev.disabled = true; // disabling the "btn_next".
        }
        // setTimeout(renderScreen(),WAIT_TIME);
        renderScreen(true);
    }
});

btn_next.addEventListener('click', e => {
    currentQuestion = questionsList[currentQuestion.questionNumber];

    if (currentQuestion !== undefined) {
        btn_prev.disabled = false; // eneabling the "btn_prev".
        if (currentQuestion.questionNumber === (questionsList.length)) {
            btn_next.disabled = true; // disabling the "btn_prev".
        }
        renderScreen(true);
    }
});

btn_finish.addEventListener('click', e => {
    if (answeredQuestions === MAX_QUESTIONS) { // if true, goes to the "scores page" (./game/scores.html)
        return window.location.assign("./scores.html");
    }
});

for (let i = 0; i < choicesOptions.length; i++) {
    
    choicesOptions[i].addEventListener('click', e => {
        const clickedOption = Number(choicesOptions[i].dataset["option"]);

        currentQuestion.selectedAnswer = (currentQuestion.selectedAnswer !== clickedOption) ? clickedOption : undefined;
        
        let count = 0;
        questionsList.forEach(question => {
            if (question.selectedAnswer !== undefined) {
                count++;
            }
        });

        answeredQuestions = count;

        renderScreen(false);

    }); 
}
/*
choicesOptions.forEach(option => {
    option.parentElement.addEventListener('click', e => { //adding the "click" event listener on the option container (the parent).
        const selectedChoice = e.target;
        console.log(selectedChoice.dataset["option"]);
        currentQuestion.selectedAnswer = Number(selectedChoice.dataset["option"]);
        
        // choicesOptions.forEach(rb => {
        //     if (rb.checked) {
        //         console.log(rb);
        //         //console.log(rb.label);
        //         console.log(lbl_choiceOptions);
        //         rb.checked = false;
        //     }
        // });
        

        //console.log("\n\n");
        renderScreen();
        
        // let isToPushQuestion = true;

        // for (let i = 0; i < answeredQuestionsList.length; i++) {

        //     if (answeredQuestionsList[i].number === currentQuestion.number) { //Updates the answeres questions list:
        //         isToPushQuestion = false;

        //         if (currentQuestion.selectedAnswer === null || answeredOption !== currentQuestion.selectedAnswer) {
        //             //console.log(`Updating the answer ${answeredOption} to the question number ${currentQuestion.number}.`);
        //             currentQuestion.selectedAnswer = answeredOption;
        //             answeredQuestionsList[i].selectedAnswer = answeredOption;
        //         }
        //         else {
        //             //console.log(`Nulling the answer from the question number ${currentQuestion.number}.`);
        //             currentQuestion.selectedAnswer = null;
        //             answeredQuestionsList.splice(i,1); //removes the nulled answer from answeredQuestionsList.
        //         }

        //         break;
        //     }
        // }

        // if (isToPushQuestion) {
        //     // console.log(`Pushing the question number ${currentQuestion.number}. into answered questions list.`);
        //     currentQuestion.selectedAnswer = answeredOption; //updates the asweredOption.
        //     answeredQuestionsList.push(currentQuestion);
        // }
        //renderScreen();
    });
});
*/

// Creating the functions:
const raflleCategory = async () => {
    
    const trivia_categories = await fetch(CATEGORIES_URL) //fetch a response promise form "CATEGORIES_URL"
    .then(response => response.json()) // parse the response promise to a JSON promise
    .then(jsonPromise => { // raffle a category from the "jsonPromise":
    
    const raffledIndex = Math.round(Math.random() * jsonPromise.trivia_categories.length);
            raffledCategory = jsonPromise.trivia_categories[raffledIndex].id;
            
        });
        
        
}; //raflleCategory
    
const mapQuestionsList = async fetchResult => {

    questionsList = await fetchResult.map(question => {
        
        return new Question(question.question, question.incorrect_answers, question.correct_answer);
        
    });
    
    questionsList.forEach(question => { // insert the correct answer in an answersList's random index:
        const index = Math.floor(Math.random() * (question.answersList.length + 1));
        question.answersList.splice(index,0,question.correctAnswer);
    });

    for (let i = 0; i < questionsList.length; i++) {
        
        questionsList[i].questionNumber = i + 1;
        
    }
    
    currentQuestion = questionsList[0];
    renderScreen(true);

}; //mapQuestionsList

const fetchQuestions = async (amount, difficulty) => {

    await raflleCategory(); //raflle a category
    
    //fetch the "triviaQuestionsList":
    const TRIVIA_API = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    let fetchUrl = "";
    
    if (isRandomCategory && difficulty === "all") {
        fetchUrl = TRIVIA_API;
    } else if (isRandomCategory) {
        fetchUrl = `${TRIVIA_API}&difficulty=${difficulty}`;
    } else {
        fetchUrl = `${TRIVIA_API}&category=${raffledCategory}`;
    }
    
    const triviaQuestionsList = await fetch(fetchUrl)
        .then(response => response.json())
        .then(jsonPromise => {
            
            mapQuestionsList(jsonPromise.results); //setup the questionsList according with the "mapQuestionsList"
            
        });

}; //fetchQuestions

/*const fillignLists = numberOfQuestions => { //A temp function destinated to fill the processes's lists;

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
*/

const resetQuiz = () => { // It's a ES6 arrow function (The "start quiz" function).
    score = undefined;
    questionsList = undefined;
    avaiableQuestionsList = undefined;
    answeredQuestions = undefined;
    btn_prev.disabled = true;
    fetchQuestions(MAX_QUESTIONS, difficulty);
}; // resetQuiz()

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

const renderScreen = async isToRenderTheTexts => {
    
    if (isToRenderTheTexts) { //rendering HTML's texts:
        lbl_hud.innerText = `Questão: ${currentQuestion.questionNumber} de ${questionsList.length}`;
        
        lbl_question.innerText = currentQuestion.questionTxt;
        
        for (let i = 0; i < choicesOptions.length; i++) {
            
            choicesOptions[i].innerHTML = `<span class="lbl_choiceOption">${choicesOptions[i].dataset["char"]}</span>
            <input class="radioStyles" type="radio" name="rbAnswers" id="op_1">
            <span class="lbl_choiceText">${currentQuestion.answersList[i]}</span>`
        }

    }
    
    choicesOptions.forEach(option => { //Styling answers:

        if (currentQuestion.selectedAnswer === Number(option.dataset["option"])) {
            option.classList.add("selected-answer");
        } else {
            option.classList.remove("selected-answer");
        }
    });

    //Updating the preogress bar:
    const newWidth = Math.round((answeredQuestions / MAX_QUESTIONS) * 100);
    lbl_progressBar.innerText = `${newWidth}%`;
    progressBarContent.style.width = `${newWidth}%`;
    
    if (answeredQuestions === MAX_QUESTIONS) {
        //console.log("All the questions has aswers.\nEneabling the btn_finish");
        btn_finish.hidden = false;
    } else if (!btn_finish.hidden) {
        //console.log(`some question isn't aswered.\nHidding the btn_finish.`);
        btn_finish.hidden = true;
    }
}; //renderScreen( ... )

// Starting the quiz:
resetQuiz();
