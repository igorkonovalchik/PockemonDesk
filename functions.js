export const $getElByID = (el) => document.getElementById(el);

export const rundom = (min = 20, max = 100 ) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const bloodscreen = (opacity, player1HP = 0, player2HP = 0) => {
  const $bloodscreen = document.getElementById('bloodscreen');
  if( opacity !== 0 ) {
    $bloodscreen.style.opacity = opacity / 10;
    setTimeout(() => {
        if (player1HP === 0 || player2HP === 0) {
          $bloodscreen.style.opacity = 1;
          if( player1HP === 0 ){ $bloodscreen.innerText = `GAME OVER`; }
          if( player2HP === 0 ){ $bloodscreen.innerText = `Player 1 - WIN!`; }
        }else{
          $bloodscreen.style.opacity = 0;
      }
    }, 200);
  }else{
    setTimeout(() => {
    $bloodscreen.style.opacity = opacity;
    $bloodscreen.innerText = '';
    }, 1500);
  }
};

export const addCounter = ( nameButton, button, value ) => {
  button.innerText = `${nameButton} (${value})`;
};