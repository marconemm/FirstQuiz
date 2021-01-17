//Creating the constants from HTML:
const resultBox = document.getElementById("resultBox");
const historyTable = document.getElementById("scoresTable");

//Geting the sessionStorage values:
const correctAnswers = Number(sessionStorage.getItem("correctAswers"));
const playerName = sessionStorage.getItem("playerName");
const playersHistoryList = JSON.parse(localStorage.getItem("playersHistoryList"));

// Creating the functions:
const getScore = () => {
    const questionsList = JSON.parse(sessionStorage.getItem("questionsList"));
    
    const score = questionsList.reduce((count, question ) => {
        if (question.selectedAnswer === question.correctAnswer) {
            if (question.difficulty === "easy")
                count += count * 33
            else if (question.difficulty === "medium")
                count += count * 66
            else
                count += count * 99
        }
        return count;
    }, 1);

    return (score - 1);
}; // getScore()

const saveTheResult = () => {

    const dataToSave = {
        playerName : playerName,
        score: getScore()
    };
    
    if (playersHistoryList !== null) {
        playersHistoryList.push(dataToSave);
        playersHistoryList.splice(10,1); // limit the playersHistoryList.length to 10.
        localStorage.setItem("playersHistoryList", JSON.stringify(playersHistoryList));
    }
    setHistoryTable();
}; // saveTheResult()

const setHistoryTable = () => {

    playersHistoryList.sort((scoreA, scoreB) => { // sort the "playersHistoryList" by "high scores first":
        return (scoreA.score < scoreB.score) ? 1 : (scoreA.score > scoreB.score) ? -1 : 0;
    });

    // Set the "historyTable" HTML:
    historyTable.innerHTML = playersHistoryList.reduce((newHTML, history) => 
        newHTML += `<tr> <td>${history.playerName}</td>
        <td>${history.score}</td></tr>`
        , historyTable.innerHTML);
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

renderScreen();