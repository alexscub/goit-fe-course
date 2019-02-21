const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const cancelLogin = 'Отменено пользователем!';
const wrongLogin = 'Доступ запрещен, неверный логин!';
const cancelPassword = 'Отменено пользователем!';
const wrongPassword = 'Доступ запрещен, неверный пароль!';
const truePassword = 'Добро пожаловать!';
let login = prompt('Введите логин!');
//проверяем логин
if (login === adminLogin) {
  //если логин совпал, просим пароль
  const password = prompt('Введите пароль!')
  //проверяем пароль
  if (password === adminPassword) {
    alert(truePassword)
  } else if (password === null) {
    alert(cancelPassword)
  } else {
    alert(wrongPassword)
  }
} else if (login === null) {
  alert(cancelLogin)
} else {
  alert(wrongLogin)
}