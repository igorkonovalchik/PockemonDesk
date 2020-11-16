let question = prompt('Привет! Введи "1" и я смогу вычислить в какой фразе больше того или иого символа или "2" и я приведу номер мобильного к формату +7 (123) 456-78-90! Выбираай?')

switch (question) {
  case '1':
    const askRow = (row) => {
      const question = confirm(`Предлагаю строку - "${row}"! Пойдет? Для ввода своей строки нажми отмена!`);
      if(question){ return row; }else{ return prompt('Введите свою строку'); }
    }
    const firstRow = askRow('мама мыла раму');
    const secondRow = askRow('собака друг человека');
    const symbol = prompt('Какой символ будем искать?');
  
    function getRow(firstRow, secondRow, symbol) {
      const quantityOfSymbol = (str, symbol = 'а') => {
        let quantity = 0;
        for (let i = 0; i < str.length; i++) {
          if (str.charAt(i) === symbol) {
            quantity++;
          };
        }
        return quantity;
      };
      return quantityOfSymbol(firstRow, symbol) > quantityOfSymbol(secondRow, symbol) ? firstRow : secondRow;
    }
    alert(`Больше всего символа ${symbol} в фразе "${getRow(firstRow, secondRow, symbol)}"`);
  break;

  case '2':
    const phone = prompt('Введите номер телефона в формате +71234567890');
    if (phone.charAt(0) !== '+' || phone.length !== 12) {
      alert('Что-то ты не то ввел! Попробуй еще раз!');
      location.reload();
    } else {
      function formattedPhone(phone) {
        let result = '';
        for (let i = 0; i < phone.length; i++) {
          switch (i) {
            case 2:
              result = result + ' (';
              break;
            case 5:
              result = result + ') ';
              break;
            case 8:
              result = result + '-';
              break;
            case 10:
              result = result + '-';
              break;
            default:
              break;
          };
          result = result + phone.charAt(i);
        }
        return result;
      }
      alert(`Пожалуйста!  ${formattedPhone(phone)}`);
      };
  break;

  default:
    alert('Что-то ты не то ввел! Попробуй еще раз!');
    location.reload();
  break;
};