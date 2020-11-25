const $getElByID = (el) => document.getElementById(el);
const $btnKick = $getElByID('btn-kick');
const $btnUppercut = $getElByID('btn-uppercut');
const maxKick = 6;
const maxUppercut = 6;
const kickCounter = clickCounter( $btnKick, maxKick);
const uppercutCounter = clickCounter( $btnUppercut, maxUppercut);
const $bloodscreen = $getElByID('bloodscreen');

const character = {
  name: 'Pikachu',
  defaultHP: 200,
  damageHP: 100,
  elHP: $getElByID('health-character'),
  elProgressbar: $getElByID('progressbar-character'),
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: $getElByID('health-enemy'),
  elProgressbar: $getElByID('progressbar-enemy')
};

Object.prototype.renderHP = renderHP;
Object.prototype.renderHPLife = renderHPLife;
Object.prototype.renderProgressbarHP = renderProgressbarHP;
Object.prototype.changeHP = changeHP;

/* ---------- Инит ----------- */ 

function init() {
  console.log('Start Game!');
  character.renderHP();
  enemy.renderHP();
};

/* ---------- Кнопки ----------- */ 


$btnKick.addEventListener('click', function () {
  // console.log('kick');
  character.changeHP(rundom(rundom(10)));
  enemy.changeHP(rundom(rundom(10)));
  kickCounter();  
});

$btnUppercut.addEventListener('click', function () {
  // console.log('uppercut');
  character.changeHP(rundom(rundom(50)));
  enemy.changeHP(rundom(rundom(50)));
  uppercutCounter();
});

/* ---------- Обновление жизней ----------- */ 

function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function renderHPLife() {
  //  console.log(this.elHP.innerText);
  this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
  const percent = ( this.damageHP * 100 ) / this.defaultHP; 
  this.elProgressbar.style.width = percent + '%';
}

/* ---------- Изменение жизней ----------- */ 

function changeHP(count) {
  if (character.damageHP !== 0 && enemy.damageHP !== 0) {
    this.damageHP -= count;
    this === character ? generateLogs(this, enemy, count) : generateLogs(this, character, count);
    if (this.damageHP <= 0) {
      this.damageHP = 0;
      $btnKick.disabled = true;
      $btnUppercut.disabled = true;
      $bloodscreen.style.opacity = 100;
      setTimeout(() => {
        $bloodscreen.innerHTML = `<p>${this.name} Die!</p>`;
      }, 500);
    };
    this.renderHP();
    bloodscreen(count);
  };
};

/* ---------- Вспомогательные функции ----------- */ 

function rundom(num = 20) {
  return Math.ceil(Math.random() * num);
}

function bloodscreen(opacity) {
  $bloodscreen.style.opacity = opacity / 10;
  setTimeout(() => {
    if (character.damageHP !== 0 && enemy.damageHP !== 0) {
      $bloodscreen.style.opacity = 0;
    };
  }, 300);
};

/* ---------- Логи ----------- */ 

const generateLogs = (firstPerson, secondPerson, count) => {

  const {
    name: firstPersonName,
    damageHP,
    defaultHP
  } = firstPerson;
  const {
    name: secondPersonName
  } = secondPerson;

  const logs = [
    `<span>${firstPersonName}</span> вспомнил что-то важное, но неожиданно <span>${secondPersonName}</span>, не помня себя от испуга, ударил в предплечье врага. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> поперхнулся, и за это <span>${secondPersonName}</span> с испугу приложил прямой удар коленом в лоб врага. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> забылся, но в это время наглый <span>${secondPersonName}</span>, приняв волевое решение, неслышно подойдя сзади, ударил. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> пришел в себя, но неожиданно <span>${secondPersonName}</span> случайно нанес мощнейший удар. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> поперхнулся, но в это время <span>${secondPersonName}</span> нехотя раздробил кулаком \<вырезанно цензурой\> противника. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> удивился, а <span>${secondPersonName}</span> пошатнувшись влепил подлый удар. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> высморкался, но неожиданно <span>${secondPersonName}</span> провел дробящий удар. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> пошатнулся, и внезапно наглый <span>${secondPersonName}</span> беспричинно ударил в ногу противника - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> расстроился, как вдруг, неожиданно <span>${secondPersonName}</span> случайно влепил стопой в живот соперника. - <span>${count}</span>, [<span>${damageHP}</span>/<span>${defaultHP}</span>]`,
    `<span>${firstPersonName}</span> пытался что-то сказать, но вдруг, неожиданно <span>${secondPersonName}</span> со скуки, разбил бровь сопернику.'`
  ];

  const $logs = document.querySelector('.logs');
  const $p = document.createElement('p');
  $logs.appendChild($p);
  $p.innerHTML = logs[rundom(logs.length - 1)];
  $logs.insertBefore($p, $logs.children[0]);

  const childrenlogs = $logs.children;
  const logsLength = childrenlogs.length;

  if (logsLength > 2) {
    for (let index = 3; index < logsLength; index++) {
      
        setTimeout(() => {
          $logs.children[index].style.opacity = 0;
        }, 200);
        setTimeout(() => {
          if ($logs.children[index].length !== undefined) { $logs.children[index].remove(); };
        }, 1800);
      }
    
  };

};

/* ---------- Счетчик нажатий ----------- */ 

function clickCounter( hit, maxHit = 10 ) {
  let a = 0;
  const nameHit = hit.id.slice( 4, hit.id.length );
	return function ( ) {    
    if( a < maxHit ){      
      console.log(`You ${nameHit} ${a += 1} times. ${ maxHit - a } hits left. `);
    }else{
      hit.disabled = true;
      console.log(`Spent all ${nameHit}. Try another hit. `);
    }		
	}
}


init();