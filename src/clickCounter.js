import { addCounter } from './functions.js'

export default ( hit, maxHit = 10 ) => {
  let a = 1;
  const nameButton = hit.innerText;
  addCounter(  nameButton, hit, maxHit );
	return function ( cb ) {
    const hitsLeft = maxHit - a;
    addCounter(  nameButton, hit, hitsLeft );
    if( a < maxHit ){ 
      console.log(`You ${ nameButton }  ${ a += 1 } times. ${ hitsLeft } hits left. `);
    }else{
      hit.disabled = true;
      console.log(`Spent all ${ nameButton }. Try another hit. `);
    }
     // cb && cb(hitsLeft);
     cb?.(hitsLeft);
	}

}