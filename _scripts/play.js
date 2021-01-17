import {Question} from "./classes.js";

//Creating the constants from HTML:
const lbl_hud = document.getElementById("lbl_hud");
const progressBarContent = document.getElementById("loadingBarContent");
const lbl_progressBar = document.getElementById("lbl_progressBar");
const lbl_question = document.getElementById("lbl_question");
const choicesOptions = Array.from(document.getElementsByClassName("choice-container")); //convert to an Array
const btn_prev = document.getElementById("btn_prev");
const btn_next = document.getElementById("btn_next");
const btn_finish = document.getElementById("btn_finish");

//creating the variabes:
let questionsList;
let answeredQuestions;
let currentQuestion;
let raffledCategory;
const difficulty = JSON.parse(sessionStorage.getItem("difficulty"));
const isRandomCategory = JSON.parse(sessionStorage.getItem("isRandomCategory"));

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
        
        const correctAnswers = questionsList.reduce((count, question) => {
            (question.correctAnswer === question.selectedAnswer) ? count++ : false;
            
            return count;
        }, 0);

        sessionStorage.setItem("correctAswers", JSON.stringify(correctAnswers));

        return window.location.assign("./scores.html");
    }

});

for (let i = 0; i < choicesOptions.length; i++) {
    
    choicesOptions[i].addEventListener('click', e => {
        const clickedOptionChar = e.path[0].firstElementChild.innerText;
        const clickedOptionText = e.path[0].lastElementChild.innerText;
       
        if (currentQuestion.selectedAnswerChar !== clickedOptionChar) {
            
            currentQuestion.selectedAnswerChar = clickedOptionChar;
            currentQuestion.selectedAnswer = clickedOptionText;
            
        } else {
            currentQuestion.selectedAnswerChar = undefined;
            currentQuestion.selectedAnswer = undefined;
        }

        answeredQuestions = questionsList.reduce((count, question) => {
            (question.selectedAnswer !== undefined) ? count++ : false;
            
            return count;
        },0);

        renderScreen(false);

    }); 
}

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
    
    await fetch(fetchUrl)
        .then(response => response.json())
        .then(jsonPromise => {
            
            mapQuestionsList(jsonPromise.results); //setup the questionsList according with the "mapQuestionsList"
            
        });

}; //fetchQuestions

const resetQuiz = () => { // It's a ES6 arrow function (The "start quiz" function).
    questionsList = undefined;
    //avaiableQuestionsList = undefined;
    answeredQuestions = 0;
    btn_prev.disabled = true;
    fetchQuestions(MAX_QUESTIONS, difficulty);
}; // resetQuiz()

const renderScreen = async isToRenderTheTexts => {
    
    if (isToRenderTheTexts) { //rendering HTML's texts:
        lbl_hud.innerText = `Questão: ${currentQuestion.questionNumber} de ${questionsList.length}`;
        
        lbl_question.innerText = currentQuestion.questionTxt;
        
        for (let i = 0; i < choicesOptions.length; i++) {
            
            choicesOptions[i].innerHTML = `<span class="lbl_choiceOption">${choicesOptions[i].dataset["char"]}</span>
            <span class="lbl_choiceText" id="${i}" >${currentQuestion.answersList[i]}</span>`
        }

    }
    
    choicesOptions.forEach(option => { //Styling answers:
        
        if (currentQuestion.selectedAnswerChar === option.dataset["char"]) {
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
