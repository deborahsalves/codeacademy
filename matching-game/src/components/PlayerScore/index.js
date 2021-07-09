import './style.css';

const PlayerScore = (playerNum) => {
    return `
    <article class="player-score">
        <div class="player-name">
            Player ${playerNum}
        </div>
        <div class="score-total">
            <div class="score-point one"></div>
            <div class="score-point two"></div>
            <div class="score-point three"></div>
        </div>
    </article>
    `
}

export default PlayerScore;