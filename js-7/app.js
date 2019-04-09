/*
  Создайте функцию createMovieCard(), которая 
  создает и возвращает DOM-узел карточки кинофильма.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/
/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/
const posts = [{
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

function createCard({
  img,
  title,
  text,
  link
}) {
  const element = document.createElement('div');
  element.classList.add("card");
  const image = document.createElement('img');
  image.setAttribute('src', img);
  image.setAttribute('alt', 'card image');
  image.classList.add("card__image");
  const cardBody = document.createElement('div');
  cardBody.classList.add("card__body");
  const cardTitle = document.createElement('h2');
  const cardLink = document.createElement('a');
  cardTitle.classList.add("card__title");
  cardLink.textContent = title;
  cardLink.setAttribute('href', link)
  cardLink.classList.add("card__Link");
  const cardDescription = document.createElement('p');
  cardDescription.classList.add("card__description");
  cardDescription.textContent = text;
  element.appendChild(image);
  image.after(cardBody);
  cardBody.appendChild(cardTitle);
  cardTitle.after(cardDescription);
  cardTitle.appendChild(cardLink);
  return element;
}
function createCards(arr) {
  return arr.reduce( (acc, el) => 
    [...acc, createCard(el)]
  ,[])
}
//console.log(createCards(posts));
const doms = createCards(posts);
const parentDom = document.querySelector('.section');
doms.forEach(el => {
  parentDom.appendChild(el);
});