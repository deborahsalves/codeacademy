import './src/styles/settings/colours.css';
import './src/styles/generic/reset.css'
import './src/styles/elements/base.css'
import CardGame from './src/components/CardGame';
import PlayerScore from './src/components/PlayerScore';
import BoardGame from './src/objects';

const $root = document.querySelector('#root');
// $ indicates that this variable is a DOM element
const $htmlPlayerScoreOne = PlayerScore('1');
const $htmlPlayerScoreTwo = PlayerScore('2');
const $htmlBoardGame = BoardGame(6);

$root.insertAdjacentHTML('beforeend', $htmlPlayerScoreOne);
$root.insertAdjacentHTML('beforeend', $htmlPlayerScoreTwo);
$root.insertAdjacentHTML('beforeend', $htmlBoardGame);


const $eachCard = document.querySelector('.card-game');

const flipCard = (el) => {
    console.log("clicked");
    let currentStatus = el.getAttribute("class");
    if (currentStatus = "card-game face") {
        el.setAttribute("class", "card-game back");
    } else {
        el.setAttribute("class", "card-game face");
    }
}

$eachCard.addEventListener("click", flipCard($eachCard));