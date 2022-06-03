export const events = [
  {
    id: 1,
    title: 'PlayTime 2022 ',
    date: 'Баа, Дол 11-13',
    location: 'Гачуурт ,Монгол гудамж 12 ',
    img: require('./image/p.jpeg'),
    liked: false,
    organizerId: 10,
  },
  {
    id: 2,
    title: 'PlayTime 2022',
    date: 'Пүр, Зур 11-13',
    location: 'Гачуурт ,Монгол гудамж 12',
    img: require('../src/image/festival.jpeg'),
    liked: false,
    organizerId: 10,
  },
  {
    id: 3,
    title: 'UB comedy Bataa`s special show',
    date: 'Лха, Дол 11',
    location: 'Сант асар ,Сөүл гудамж 12',
    img: require('../src/image/ub.jpeg'),
    liked: false,
    organizerId: 30,
  },
  {
    id: 4,
    title: 'Хуур Music festival',
    date: 'Пүр, Зур 11-13',
    location: 'Гачуурт ,Монгол гудамж 12',
    img: require('../src/image/h.jpeg'),
    liked: false,
    organizerId: 20,
  },
  {
    id: 5,
    title: 'UB comedy Ideree`s special show',
    date: 'Лха, Дол 12',
    location: 'Сант асар ,Сөүл гудамж 12',
    img: require('../src/image/ub.jpeg'),
    liked: false,
    organizerId: 30,
  },
];

export const organizers = [
  {
    id: 10,
    name: 'PlayTime festival',
    category: 'Хөгжим',
    img: require('../src/image/pt.png'),
    followed: false,
  },
  {
    id: 20,
    name: 'Хуур Music festival',
    category: 'Хөгжим',
    img: require('../src/image/h.jpeg'),
    followed: false,
  },
  {
    id: 30,
    name: 'UB Comedy club',
    category: 'Комеди',
    img: require('../src/image/ub.jpeg'),
    followed: false,
  },
];

export const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const categories = [
  'Хөгжим & Медиа',
  'Эрүүл мэнд',
  'Кино',
  'Аялал',
  'Спорт',
];

export const user = {
  id: 100,
  firstname: 'Намсрай',
  lastname: 'Ts',
  img: require('./image/pro.webp'),
  email: 'namsrai@gmail.com',
  city: 'Улаанбаатар',
};
