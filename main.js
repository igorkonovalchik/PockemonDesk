const $btnKick = document.getElementById('btn-kick');
const $btnUppercut = document.getElementById('btn-uppercut');
const $bloodscreen = document.getElementById('bloodscreen');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy')
};

$btnKick.addEventListener('click', function () {
  console.log('kick');
  changeHP(rundom(rundom(10)), character);
  changeHP(rundom(rundom(10)), enemy);
});

$btnUppercut.addEventListener('click', function () {
  console.log('uppercut');
  changeHP(rundom(rundom(50)), character);
  changeHP(rundom(rundom(50)), enemy);
});

function init() {
  console.log('Start Game!');
  renderHP(character);
  renderHP(enemy);
};

function renderHP(person) {
  renderHPLife(person);
  renderProgressbarHP(person);
}


function renderHPLife(person) {
  console.log(person.elHP.innerText);
  person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
  person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;
    alert(`Бедный ${person.name}! Ты умер! Игра окончена!`);
    $bloodscreen.style.opacity = 100;
    $btnKick.disabled = true;
    $btnUppercut.disabled = true;
  } else {
    person.damageHP -= count;
  };
  renderHP(person);
  bloodscreen(count)
}

function rundom(num = 20) {
  return Math.ceil(Math.random() * num);
}

function bloodscreen(opacity) {
  $bloodscreen.style.opacity = opacity / 10;
  setTimeout(() => {
    $bloodscreen.style.opacity = 0;
  }, 300);
};

init();