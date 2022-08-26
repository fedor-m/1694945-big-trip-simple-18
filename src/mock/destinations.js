import { getRandomInteger, getRandomArrayElement } from '../utils.js';
export const DESTINATIONS = [
  {id: 1, name: 'Amsterdam', description: 'Amsterdam, city and port, western Netherlands, located on the IJsselmeer and connected to the North Sea. It is the capital and the principal commercial and financial centre of the Netherlands.'},
  {id: 2, name: 'Chamonix', description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.'},
  {id: 3, name: 'Geneva',description:'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.'},
  {id: 4, name: 'Moscow', description: 'Moscow, Russian Moskva, city, capital of Russia, located in the far western part of the country. Today Moscow is not only the political centre of Russia but also the country\'s most populous city and its industrial, cultural, scientific, and educational capital.'},
  {id: 5, name: 'Saint Petersburg', description: 'St. Petersburg, Russian Sankt-Peterburg, city and port, extreme northwestern Russia. A major historical and cultural centre and an important port, St. Petersburg lies about 400 miles (640 km) northwest of Moscow and only about 7° south of the Arctic Circle. It is the second largest city of Russia and one of the world\'s major cities.'},
  {id: 6, name: 'Kazan', description: 'Kazan, capital city, Tatarstan republic, western Russia. It lies just north of the Samara Reservoir on the Volga River, where it is joined by the Kazanka River. The city stretches for about 15 miles (25 km) along hills, which are much dissected by ravines.'},
  {id: 7, name: 'Yekaterinburg', description: 'Yekaterinburg, city and administrative centre of Sverdlovsk oblast (region), west-central Russia. The city lies along the Iset River, which is a tributary of the Tobol River, and on the eastern slope of the Ural Mountains, slightly east of the border between Europe and Asia. Yekaterinburg is situated 1,036 miles (1,667 km) east of Moscow.'},
  {id: 8, name: 'Barnaul', description: 'Barnaul, city and administrative centre, north-central Altay kray (territory), southern Siberia, Russia. It lies on the left bank of the Ob River at its confluence with the Barnaulka River.'},
  {id: 9, name: 'Vladivostok', description: 'Vladivostok, seaport and administrative centre of Primorsky kray (territory), extreme southeastern Russia. It is located around Zolotoy Rog ("Golden Horn Bay") on the western side of a peninsula that separates Amur and Ussuri bays on the Sea of Japan.'},
];
const PHOTO_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'
];
const generatePhotos = () => {
  const count = getRandomInteger(1, 4);
  const photos = [];
  for (let i = 0; i < count; i++) {
    photos.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: getRandomArrayElement(PHOTO_DESCRIPTIONS)
    });
  }
  return photos;
};

export const generateDestination = (id) => ({
  id,
  description: DESTINATIONS[id - 1].description,
  name: DESTINATIONS[id - 1].name,
  pictures: generatePhotos()
});
