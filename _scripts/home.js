// //Creating the constants from HTML:
const txtBox_playerName = document.getElementById("txtBox_playerName");
const playerData = JSON.stringify(txtBox_playerName);
const btn_play = document.getElementById("btn_play");
const categoriesSelector = document.getElementById("categoriesSelector");
//const triviaCategoriesList;

txtBox_playerName.addEventListener('keyup', e => { //enabling the button "btn_play"
btn_play.disabled = txtBox_playerName.value.length !== 0 ? false : true;
});

const startQuiz = () => { //startig the Quiz.
    sessionStorage.setItem('playerName', JSON.stringify(txtBox_playerName.value));
    window.location.assign("/game/play.html");
};
