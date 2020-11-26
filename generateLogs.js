import { rundom } from './functions.js'

export default (firstPerson, secondPerson, count) => {

  const {
    name: firstPersonName,
    hp: { current, total }
  } = firstPerson;
  const {
    name: secondPersonName
  } = secondPerson;

  const logs = [
    `<span>${firstPersonName}</span> вспомнил что-то важное, но неожиданно <span>${secondPersonName}</span>, не помня себя от испуга, ударил в предплечье врага. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> поперхнулся, и за это <span>${secondPersonName}</span> с испугу приложил прямой удар коленом в лоб врага. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> забылся, но в это время наглый <span>${secondPersonName}</span>, приняв волевое решение, неслышно подойдя сзади, ударил. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> пришел в себя, но неожиданно <span>${secondPersonName}</span> случайно нанес мощнейший удар. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> поперхнулся, но в это время <span>${secondPersonName}</span> нехотя раздробил кулаком \<вырезанно цензурой\> противника. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> удивился, а <span>${secondPersonName}</span> пошатнувшись влепил подлый удар. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> высморкался, но неожиданно <span>${secondPersonName}</span> провел дробящий удар. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> пошатнулся, и внезапно наглый <span>${secondPersonName}</span> беспричинно ударил в ногу противника - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
    `<span>${firstPersonName}</span> расстроился, как вдруг, неожиданно <span>${secondPersonName}</span> случайно влепил стопой в живот соперника. - <span>${count}</span>, [<span>${current}</span>/<span>${total}</span>]`,
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