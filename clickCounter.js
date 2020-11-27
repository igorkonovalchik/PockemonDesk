import { addCounter } from './functions.js'

export default ( hit, maxHit = 10 ) => {
  let a = 1;
  const nameHit = hit.id.slice( 4, hit.id.length );    
  const nameButton = hit.innerText; 
  addCounter(  nameButton, hit, maxHit );   
	return function ( ) {   
    const hitsLeft = maxHit - a;
    addCounter(  nameButton, hit, hitsLeft );           
    if( a < maxHit ){ 
     // console.log(`You ${nameHit} ${a += 1} times. ${ hitsLeft } hits left. `);
    }else{
      hit.disabled = true;
     // console.log(`Spent all ${nameHit}. Try another hit. `);
    }		    
	}
}