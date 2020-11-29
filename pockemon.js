class Selectors {
  constructor(name){
    this.elLvl = document.getElementById(`lvl-${name}`);
    this.elName = document.getElementById(`name-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pockemon extends Selectors {
  constructor({ name, img, hp, type, selectors, attacks }){
    super(selectors);
    this.name = name;
    this.img = img;
    this.hp = {
      current: hp,
      total: hp
    }
    this.type = type;
    this.attacks = attacks;
    this.level = 0;
    this.renderHP();
    this.renderPlayerInfo();
  }

  renderPlayerInfo = () => {
    const { name, img, level, elName, elImg, elLvl } = this;
    elName.innerText = name;
    elLvl.innerText = `Lv. ${level}`;
    elImg.src = img;
  }

  renderHPLife = () => {   
    const { hp: { current, total }, elHP } = this;
    elHP.innerText = current + ' / ' + total;
  }

  renderProgressbarHP = () => {
    const { hp: { current, total } } = this;
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
      }
      this.renderHP();   
      cb && cb(count);
  };

}

export default Pockemon; 
