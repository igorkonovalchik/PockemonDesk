import createRundomPlayer from './createRundomPlayer.js';
import clickCounter from "./clickCounter.js";
import {$getElByID, bloodscreen, rundom} from "./functions.js";
import generateLogs from "./generateLogs.js";

class Game {

    constructor(){
        this.player1 = createRundomPlayer('player1');
        this.player2 = {};
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.countGame = 1;
        this.elCountGame = document.getElementById(`game-count`);
        this.elPlayerScores = document.getElementById(`players-scores`);
        this.startGame();
    }


    resetGameIfPlayerDie = () => {
        const { player1, player2 } = this;
        if(player1.hp.current === 0 || player2.hp.current === 0) {
            this.countGame += 1;
            const $logs = document.querySelector('.logs');
            $logs.innerHTML = '';
            if (player2.hp.current === 0) {
                this.scorePlayer1 += 1;
                this.startGame();
            }
            if (player1.hp.current === 0) {
                this.startNewGame();
            }
        };
    };

    renderScore = () => {
        let { countGame, scorePlayer1, scorePlayer2, elCountGame, elPlayerScores  } = this;
        elCountGame.innerText = `GAME #${countGame}`;
        elPlayerScores.innerText = `${scorePlayer1} - ${scorePlayer2}`;
    }

    startNewGame = () => {
        this.countGame = 1;
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.player1 = createRundomPlayer('player1');
        this.startGame();
    }

    startGame = () => {
        bloodscreen(0);
        this.renderScore();
        this.player2 = createRundomPlayer('player2');
        let { player1, player2, countGame } = this;

        const $control = document.querySelector('.control');
        const $logs = document.querySelector('.logs');
        $logs.innerHTML = '';

        if(countGame === 1){
            if ($control.firstChild) {
                const allButtons = document.querySelectorAll('.control .button');
                allButtons.forEach($item => $item.remove());
            }
        }

        player1.attacks.forEach(item => {
            const $btnID = item.name.replace(/ /g, "-").toLowerCase();
            if(countGame === 1) {
                const $btn = document.createElement('button');
                $btn.setAttribute("id", $btnID );
                $btn.classList.add('button');
                $control.appendChild($btn);
            };
            const $btn = document.getElementById($btnID);
            $btn.innerText = item.name;
            const btnCounter = clickCounter( $btn, item.maxCount );
            $btn.addEventListener('click', () => {
                if(player1.hp.current > 0 && player2.hp.current > 0) {
                    player2.changeHP(rundom(item.minDamage, item.maxDamage), (count) => {
                        bloodscreen(count, player1.hp.current, player2.hp.current);
                        btnCounter((hitsLeft) => {
                            item.maxCount = hitsLeft;
                        });
                        this.resetGameIfPlayerDie();
                        generateLogs(player2, player1, count);
                    });
                    if (player2.hp.current > 0){
                        const firstAttackPlayer2 = player2.attacks[0];
                        player1.changeHP(rundom(firstAttackPlayer2.minDamage, firstAttackPlayer2.maxDamage), (count) => {
                            bloodscreen(count, player1.hp.current, player2.hp.current);
                            this.resetGameIfPlayerDie();
                            generateLogs(player2, player1, count);
                        });
                    }; };
            });

        })

        const $resetGameBtn = $getElByID('resetGame');

        $resetGameBtn.addEventListener('click', () => {
            this.startNewGame();
        });


    }
}

export default Game;