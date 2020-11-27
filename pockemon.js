class Selectors {
  constructor(name){
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pockemon extends Selectors {
  constructor({name, hp, type, selectors}){    
    super(selectors);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp
    }
    this.type = type;
    this.renderHP();    
  }

  renderHPLife = () => {   
    const { hp: { current, total }, elHP } = this;
    elHP.innerText = current + ' / ' + total;
  }

  renderProgressbarHP = () => {
    const { hp: { current, total }, elProgressbar } = this;
    const percent = ( current * 100 ) / total; 
    this.elProgressbar.style.width = percent + '%';
  }
  
  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  changeHP = (count, cb) => {   
      this.hp.current -= count;   
      if (this.hp.current <= 0) {
        this.hp.current = 0;          
      };
      this.renderHP();   
      cb && cb(count);
  };



}

export default Pockemon; 
