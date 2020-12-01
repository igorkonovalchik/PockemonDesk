import clickCounter from "./clickCounter.js";
import {$getElByID, bloodscreen, rundom} from "./functions.js";
import generateLogs from "./generateLogs.js";
import Pockemon from "./pockemon.js";

const apiUrl = 'https://reactmarathon-api.netlify.app/api';

class Game {

    constructor(){
        this.player1 = {}; 
        this.player2 = {};
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.countGame = 1;
        this.elCountGame = document.getElementById(`game-count`);
        this.elPlayerScores = document.getElementById(`players-scores`);
        this.startGame();
    }


    nextGameIfPlayerDie = () => {
        const { player1, player2 } = this;
        if(player1.hp.current === 0 || player2.hp.current === 0) {
            this.countGame += 1;
            const $logs = document.querySelector('.logs');
            $logs.innerHTML = '';
            if (player2.hp.current === 0) {
                this.scorePlayer1 += 1;
                this.startGame(false);
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
        this.startGame();
    }

    startGame = async (isFirstGame = true) => {
        bloodscreen(0);
        this.renderScore();
        if( isFirstGame ){ await this.getPokemon('player1') }; 
        await this.getPokemon('player2');          

        let { player1, player2, countGame } = this;

        console.log(player1);

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
            $btn.addEventListener('click', async () => {
                if(player1.hp.current > 0 && player2.hp.current > 0) {                
                let kickValue = await this.getKickValue(item.id, 'player2');                  
                player2.changeHP(kickValue, (count) => {
                        bloodscreen(count, player1.hp.current, player2.hp.current);
                        btnCounter((hitsLeft) => {
                            item.maxCount = hitsLeft;
                        });
                        this.nextGameIfPlayerDie();
                        generateLogs(player2, player1, count);
                });


                if (player2.hp.current > 0){
                        const firstAttackPlayer2 = player2.attacks[0];
                        kickValue = await this.getKickValue(firstAttackPlayer2.id, 'player1');
                        console.log(kickValue); 
                        player1.changeHP(kickValue, (count) => {
                            bloodscreen(count, player1.hp.current, player2.hp.current);
                            this.nextGameIfPlayerDie();
                            generateLogs(player2, player1, count);
                        });
                  }; 


                };

            });

        })

        const $resetGameBtn = $getElByID('resetGame');

        $resetGameBtn.addEventListener('click', () => {
            this.startNewGame();
        });


    }

    getPokemon = async (player) => {
        const response = await fetch(`${apiUrl}/pokemons?random=true`);
        const pokemon = await response.json(); 
        this[player] = new Pockemon({
            ...pokemon,
            selectors: player
        });	    
    }

    getKickValue = async (attackId, player) => {
        const { player1, player2 } = this;
        const response = await fetch(`${apiUrl}/fight?player1id=${player1.id}&attackId=${attackId}&player2id=${player2.id}`);
        const obj = await response.json();
        return obj.kick[player];    
    }
}

export default Game;