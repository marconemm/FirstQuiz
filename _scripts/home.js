// //Creating the constants from HTML:
const txtBox_playerName = document.getElementById("txtBox_playerName");
const playerData = JSON.stringify(txtBox_playerName);
const btn_play = document.getElementById("btn_play");
const difficultySelector = document.getElementById("difficultySelector");
const randomCategories = document.getElementsByName("rbRandCategory");


txtBox_playerName.addEventListener("keyup", e => { //enabling the button "btn_play"
btn_play.disabled = txtBox_playerName.value.length !== 0 ? false : true;
});

const startQuiz = () => { //startig the Quiz.
    sessionStorage.setItem("playerName", txtBox_playerName.value);
    sessionStorage.setItem("difficulty", JSON.stringify(difficultySelector.value));
    sessionStorage.setItem("isRandomCategory", JSON.stringify(randomCategories[0].checked ? true : false));
    window.location.assign("/game/play.html");
}; // startQuiz()

const goToHistories = () => {
    sessionStorage.removeItem("playerName");
    window.location.assign("/game/scores.html");
}; // goToHistories()
