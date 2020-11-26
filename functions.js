export const $getElByID = (el) => document.getElementById(el);

export const rundom = (num = 20) => {
  return Math.ceil(Math.random() * num);
};

export const bloodscreen = (opacity, player1, player2) => {
  const $bloodscreen = document.getElementById('bloodscreen');
  $bloodscreen.style.opacity = opacity / 10;
  setTimeout(() => {
    if (player1.hp.current !== 0 && player2.hp.current !== 0) {
      $bloodscreen.style.opacity = 0;
    };
  }, 300);
};

export const addCounter = ( nameButton, button, value ) => {  
  button.innerText = `${nameButton} (${value})`;
};