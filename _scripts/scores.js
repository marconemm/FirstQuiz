//Creating the constants from HTML:
const resultBox = document.getElementById("resultBox");
const historyTable = document.getElementById("scoresTable");

//Geting the sessionStorage values:
const playerName = sessionStorage.getItem("playerName");
const playersHistoryList = JSON.parse(localStorage.getItem("playersHistoryList"));
const questionsList = JSON.parse(sessionStorage.getItem("questionsList"));

//Common variables:
let correctAnswers = 0;

// Creating the functions:

const saveTheResult = score => {
    
    const dataToSave = {
        playerName : playerName,
        score: score
    };
    
    if (playersHistoryList !== null) {
        playersHistoryList.push(dataToSave);
        playersHistoryList.splice(10,1); // limit the playersHistoryList.length to 10.
        localStorage.setItem("playersHistoryList", JSON.stringify(playersHistoryList));
    }
    setHistoryTable();
    resultBox.classList.add("hidden");
}; // saveTheResult()

const getTableHeader = () => // setup the "scoresTable" header:
    `<tr>
    <th>Nome</th>
    <th>Pontuação</th>
    </tr>`
// getTableHeader()

const setHistoryTable = () => {
    
    playersHistoryList.sort((scoreA, scoreB) => { // sort the "playersHistoryList" by "high scores first":
        return (scoreA.score < scoreB.score) ? 1 : (scoreA.score > scoreB.score) ? -1 : 0;
    });

    // Set the "historyTable" HTML:
    historyTable.innerHTML = playersHistoryList.reduce((newHTML, history) => 
        newHTML += `<tr> <td>${history.playerName}</td>
        <td>${history.score}&nbsp;<i>pts</i></td></tr>`
        , getTableHeader());
}; // setHistoryTable();

const setResultBox = score => {
    
    if (correctAnswers >= 9) 
        resultBox.innerHTML = `<h1>Parabéns, ${playerName}!</h1>
        <label for="result">Você acertou</label>
        <h2 id="result">${correctAnswers} questões!</h2>
        <h3>E sua pontuação foi: ${score} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`
    
    else if (correctAnswers < 9 && correctAnswers > 7)  
        resultBox.innerHTML = `<h1>Muito bem, ${playerName}!</h1>   
        <label for="result">Você acertou</label>
        <h2 id="result">${correctAnswers} questões!</h2>
        <h3>E sua pontuação foi: ${score} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`
    
    else if (correctAnswers > 1)     
        resultBox.innerHTML = `<h1>${playerName},</h1>   
        <label for="result">Você acertou apenas</label>
        <h2 id="result">${correctAnswers} questões.</h2>
        <h3>E sua pontuação foi: ${score} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`
    
    else if (correctAnswers === 1)
        resultBox.innerHTML = `<h1>${playerName},</h1>   
        <label for="result">Você acertou apenas</label>
        <h2 id="result">${correctAnswers} questão.</h2>
        <h3>E sua pontuação foi: ${score} pontos.</h3>
        <button class="btn" id="btn_save">Salvar</button>`
        
    else
        resultBox.innerHTML = `<h1>${playerName},</h1>   
        <h2>Infelizmente Você errou todas as questões.</h2>`
        
        
}; // setResultBox()
    
const getScore = () => {

    console.log(questionsList);
    
    const score = questionsList.reduce((count, question ) => {
        
        console.log(question.selectedAnswer === question.correctAnswer);
        if (question.selectedAnswer === question.correctAnswer) {
            console.log(correctAnswers);
            correctAnswers++;
            console.log(correctAnswers);

            if (question.difficulty === "easy")
                count += 33;
            else if (question.difficulty === "medium")
                count += 66;
            else
                count += 99;

        }

        return count;

    }, 1);
    
    return (score - 1);
}; // getScore()

const renderScreen = () => {
    const score = getScore();
    setHistoryTable();

    if (playerName !== null) {
        const btn_home = document.getElementById("btn_home");
        
        btn_home.innerText = "Reiniciar";
        setResultBox(score);
        
        const btn_save = document.getElementById("btn_save");
        if (btn_save !== null)
        btn_save.addEventListener("click", e => {
            historyTable.innerHTML = getTableHeader();
            saveTheResult(score);
        });
        
        resultBox.classList.remove("hidden");
    } else
    resultBox.classList.add("hidden");
    
} // renderScreen()

const goToHome = () => {
    window.location.assign("/");
}

renderScreen();