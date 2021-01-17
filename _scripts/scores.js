//Creating the constants from HTML:
const resultBox = document.getElementById("resultBox");
const scoresTable = document.getElementById("highSocreTable");

//Geting the sessionStorage values:
const correctAnswers = Number(sessionStorage.getItem("correctAswers"));
const playerName = sessionStorage.getItem("playerName");
const scoreHistoryList = JSON.parse(localStorage.getItem("scoreHistoryList"));


// Creating the functions:
const getScore = () => {

    return 99 * correctAnswers;

}; // getScore()

const saveTheResult = () => {

    const dataToSave = {
        playerName : playerName,
        score: getScore()
    };
    
    if (scoreHistoryList !== null) {
        
        scoreHistoryList.push(dataToSave);
        localStorage.setItem("scoreHistoryList", JSON.stringify(scoreHistoryList));

    }
}; // saveTheResult()

const renderScreen = () => {
    setGreeting();

    const btn_save = document.getElementById("btn_save");

    btn_save.addEventListener("click", e => {
        saveTheResult();
    });

} // renderScreen()

const setGreeting = () => {

    if (correctAnswers >= 9) {
        
        resultBox.innerHTML = `<h1>Parabéns, ${playerName}!</h1>
        <label for="result">Você acertou</label>
        <h2 id="result">${correctAnswers} questões!</h2>
        <h3>E sua pontuação foi: ${getScore()} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`

    } else if (correctAnswers < 9 && correctAnswers > 7) {
        
        resultBox.innerHTML = `<h1>Muito bem, ${playerName}!</h1>   
        <label for="result">Você acertou</label>
        <h2 id="result">${correctAnswers} questões!</h2>
        <h3>E sua pontuação foi: ${getScore()} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`

    } else if (correctAnswers > 1) {
        
        resultBox.innerHTML = `<h1>${playerName},</h1>   
        <label for="result">Você acertou apenas</label>
        <h2 id="result">${correctAnswers} questões.</h2>
        <h3>E sua pontuação foi: ${getScore()} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`
        
    } else if (correctAnswers === 1) {
        resultBox.innerHTML = `<h1>${playerName},</h1>   
        <label for="result">Você acertou apenas</label>
        <h2 id="result">${correctAnswers} questão.</h2>
        <h3>E sua pontuação foi: ${getScore()} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`

    } else {

        resultBox.innerHTML = `<h1>${playerName},</h1>   
        <h2>Infelizmente Você errou todas as questões.</h2>`
    }

}; // setGreeting()

// Adding the Event listeners:



renderScreen();