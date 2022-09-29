import { getRandomArrayElement } from '../utils/common.js';
export const DESTINATIONS = [
  {
    id: 1,
    name: 'Amsterdam',
    description:
      'Amsterdam, city and port, western Netherlands, located on the IJsselmeer and connected to the North Sea. It is the capital and the principal commercial and financial centre of the Netherlands.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/ff0000',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    id: 2,
    name: 'Chamonix',
    description:
      'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/0000ff',
        description:
          'Cras aliquet varius magna, non porta ligula feugiat eget.',
      },
      {
        src: 'http://dummyimage.com/248x152/0000ee',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
    ],
  },
  {
    id: 3,
    name: 'Geneva',
    description:
      'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/00ff00',
        description: 'Aliquam id orci ut lectus varius viverra.',
      },
      {
        src: 'http://dummyimage.com/248x152/00ee00',
        description:
          'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
      },
      {
        src: 'http://dummyimage.com/248x152/00dd00',
        description:
          'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
      },
    ],
  },
  {
    id: 4,
    name: 'Moscow',
    description:
      'Moscow, Russian Moskva, city, capital of Russia, located in the far western part of the country. Today Moscow is not only the political centre of Russia but also the country\'s most populous city and its industrial, cultural, scientific, and educational capital.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/42aaff',
        description:
          'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
      },
      {
        src: 'http://dummyimage.com/248x152/77dde7',
        description: 'Sed sed nisi sed augue convallis suscipit in sed felis.',
      },
      {
        src: 'http://dummyimage.com/248x152/80daeb',
        description: 'Aliquam erat volutpat.',
      },
      {
        src: 'http://dummyimage.com/248x152/1e90ff',
        description: 'Nunc fermentum tortor ac porta dapibus.',
      },
    ],
  },
  {
    id: 5,
    name: 'Saint Petersburg',
    description:
      'St. Petersburg, Russian Sankt-Peterburg, city and port, extreme northwestern Russia. A major historical and cultural centre and an important port, St. Petersburg lies about 400 miles (640 km) northwest of Moscow and only about 7° south of the Arctic Circle. It is the second largest city of Russia and one of the world\'s major cities.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/964b00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        src: 'http://dummyimage.com/248x152/4d220e',
        description:
          'Cras aliquet varius magna, non porta ligula feugiat eget.',
      },
      {
        src: 'http://dummyimage.com/248x152/633a34',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
      {
        src: 'http://dummyimage.com/248x152/8b4513',
        description: 'Aliquam id orci ut lectus varius viverra.',
      },
      {
        src: 'http://dummyimage.com/248x152/753313',
        description:
          'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
      },
    ],
  },
  {
    id: 6,
    name: 'Kazan',
    description:
      'Kazan, capital city, Tatarstan republic, western Russia. It lies just north of the Samara Reservoir on the Volga River, where it is joined by the Kazanka River. The city stretches for about 15 miles (25 km) along hills, which are much dissected by ravines.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/ffa500',
        description:
          'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
      },
    ],
  },
  {
    id: 7,
    name: 'Yekaterinburg',
    description:
      'Yekaterinburg, city and administrative centre of Sverdlovsk oblast (region), west-central Russia. The city lies along the Iset River, which is a tributary of the Tobol River, and on the eastern slope of the Ural Mountains, slightly east of the border between Europe and Asia. Yekaterinburg is situated 1,036 miles (1,667 km) east of Moscow.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/aa0eca',
        description:
          'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
      },
      {
        src: 'http://dummyimage.com/248x152/990db6',
        description: 'Sed sed nisi sed augue convallis suscipit in sed felis.',
      },
    ],
  },
  {
    id: 8,
    name: 'Barnaul',
    description:
      'Barnaul, city and administrative centre, north-central Altay kray (territory), southern Siberia, Russia. It lies on the left bank of the Ob River at its confluence with the Barnaulka River.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/ffff00',
        description: 'Aliquam erat volutpat.',
      },
      {
        src: 'http://dummyimage.com/248x152/edff21',
        description: 'Nunc fermentum tortor ac porta dapibus.',
      },
      {
        src: 'http://dummyimage.com/248x152/ffd700',
        description: 'In rutrum ac purus sit amet tempus.',
      },
    ],
  },
  {
    id: 9,
    name: 'Vladivostok',
    description:
      'Vladivostok, seaport and administrative centre of Primorsky kray (territory), extreme southeastern Russia. It is located around Zolotoy Rog ("Golden Horn Bay") on the western side of a peninsula that separates Amur and Ussuri bays on the Sea of Japan.',
    pictures: [
      {
        src: 'http://dummyimage.com/248x152/808080',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        src: 'http://dummyimage.com/248x152/a5a5a5',
        description:
          'Cras aliquet varius magna, non porta ligula feugiat eget.',
      },
      {
        src: 'http://dummyimage.com/248x152/dcdcdc',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
      {
        src: 'http://dummyimage.com/248x152/e5e4e2',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
    ],
  },
  {
    id: 10,
    name: 'Pyongyang',
  },
];
export const getRandomDestinationID = () =>
  getRandomArrayElement(DESTINATIONS).id;
export const findDestinationByID = (id) =>
  DESTINATIONS.find((destination) => id === destination.id);
export const findDestinationByName = (name) =>
  DESTINATIONS.find((destination) => destination.name === name);
