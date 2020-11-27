import Pockemon from './pockemon.js'
import { $getElByID, rundom, bloodscreen } from './functions.js'
import generateLogs from './generateLogs.js'
import clickCounter from './clickCounter.js'

const $btnKick = $getElByID('btn-kick');
const $btnUppercut = $getElByID('btn-uppercut');
const maxKick = 6;
const maxUppercut = 6;
const kickCounter = clickCounter( $btnKick, maxKick);
const uppercutCounter = clickCounter( $btnUppercut, maxUppercut);

const player1 = new Pockemon({
  name: 'Pickachu',
  type: 'electric',
  hp: 100,
  selectors: 'character'
});

const player2 = new Pockemon({
  name: 'Charmander',
  type: 'fire',
  hp: 100,
  selectors: 'enemy'
});


$btnKick.addEventListener('click', function () {
  player1.changeHP(rundom(rundom(10)), function(count){    
    generateLogs(player1, player2, count);
    bloodscreen(count, player1, player2);
  });
  player2.changeHP(rundom(rundom(10)), function(count){    
    generateLogs(player2, player1, count);
    bloodscreen(count, player1, player2);
  });  
  kickCounter();  
});

$btnUppercut.addEventListener('click', function () {  
  player1.changeHP(rundom(rundom(50)), function(count){    
    generateLogs(player1, player2, count);
    bloodscreen(count, player1, player2);
  });
  player2.changeHP(rundom(rundom(50)), function(count){   
    generateLogs(player2, player1, count);
    bloodscreen(count, player1, player2);
  });
  uppercutCounter();
});
