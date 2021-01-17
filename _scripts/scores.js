//Creating the constants from HTML:
const resultBox = document.getElementById("resultBox");
const historyTable = document.getElementById("highSocreTable");

//Geting the sessionStorage values:
const correctAnswers = Number(sessionStorage.getItem("correctAswers"));
const playerName = sessionStorage.getItem("playerName");
const playersHistoryList = JSON.parse(localStorage.getItem("playersHistoryList"));


// Creating the functions:
const getScore = () => {

    return 99 * correctAnswers;

}; // getScore()

const saveTheResult = () => {

    const dataToSave = {
        playerName : playerName,
        score: getScore()
    };
    
    if (playersHistoryList !== null) {
        
        playersHistoryList.push(dataToSave);
        localStorage.setItem("playersHistoryList", JSON.stringify(playersHistoryList));

    }
}; // saveTheResult()

const setHistoryTable = () => {
    playersHistoryList.sort((scoreA, scoreB) => { // sort the "playersHistoryList" by "high scores first":
        return (scoreA.score < scoreB.score) ? 1 : (scoreA.score > scoreB.score) ? -1 : 0;
    });

    console.log(playersHistoryList);
}; // setHistoryTable();

const setResultBox = () => {

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

}; // setResultBox()

const renderScreen = () => {
    setResultBox();
    setHistoryTable();

    const btn_save = document.getElementById("btn_save");

    btn_save.addEventListener("click", e => {
        saveTheResult();
    });

} // renderScreen()

// Adding the Event listeners:



renderScreen();