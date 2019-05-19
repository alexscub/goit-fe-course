'use strict'
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const APIURL = 'https://test-users-api.herokuapp.com/users/'

function getAllUsers() {
  return fetch(APIURL)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data")
    })
    .then(data => {
      return data.data
    })
    .catch(error => error)
}

function getUserById(id) {
  return fetch(APIURL + id)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data")
    })
    .then(data => {
      return data
    })
    .catch(error => console.log(error))
}

function addUser(name, age) {
  const obj = {};
  obj.name = name;
  obj.age = age;
  return fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      if (response.ok) return response.json()
      throw new Error("Error fetching data")
    })
    .then(data => data)
    .catch(error => console.log(error))
}

function removeUser(id) {
  return fetch(APIURL + id, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) return response.json()
      throw new Error("Error fetching data")
    })
    .then(data => data)
    .catch(error => console.log(error))
}

function updateUser(id, user) {
  return fetch(APIURL + id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

const form = document.querySelector(".user-form")
const result = document.querySelector('.result');
const inputId = document.querySelector('input[name=id]');
const inputName = document.querySelector('input[name=name]');
const inputAge = document.querySelector('input[name=age]');

form.addEventListener("click", fetchData)

function fetchData(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "BUTTON") return;
  if (target.dataset.action === 'getAll') {
    getAllUsers().then(res => result.innerHTML = res.reduce((acc, el) =>
      acc += `<p> id:${el.id} Имя: ${el.name}, Возраст: ${el.age}</p>`, ''))
  }
  if (target.dataset.action === 'getById') {
    getUserById(inputId.value).then(res => {
      if (res.status === 404) {
        result.innerHTML = `Ошибка! Пользователя с таким id не существует`
        return
      };
      if (res.status === 500) {
        result.innerHTML = `не верный формат id `
        return
      };
      result.innerHTML = `<p> id:${res.data.id} Имя: ${res.data.name}, Возраст: ${res.data.age}</p>`
    })
  }
  if (target.dataset.action === 'add') {
    addUser(inputName.value, inputAge.value).then(res => {
      if (res.status === 500) {
        result.innerHTML = `не верный формат даных `
        return
      }
      result.innerHTML = `<p>Добавлен новый пользователь: <br> Имя: ${res.data.name}, Возраст: ${res.data.age}</p>`
    })
  }
  if (target.dataset.action === 'update') {
    const obj = {};
    obj.name = inputName.value;
    obj.age = inputAge.value;
    updateUser(inputId.value, obj).then(res => {
      if (res.status === 404) {
        result.innerHTML = `Ошибка! Пользователя с таким id не существует`
        return
      };
      if (res.status === 500) {
        result.innerHTML = `не верный формат даных `
        return
      };
      result.innerHTML = `<p>пользователь id:${res.data.id} изменен, новые данные: Имя: ${res.data.name}, Возраст: ${res.data.age}</p>`
    })
  }
  if (target.dataset.action === 'remove') {
    removeUser(inputId.value).then(res => {
      if (res.status === 500) {
        result.innerHTML = `не верный формат id `
        return
      };
      result.innerHTML = `<p>пользователь удален</p>`
    })
  }
}