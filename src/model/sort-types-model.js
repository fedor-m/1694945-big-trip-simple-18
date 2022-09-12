import { SORT_TYPES_ENABLED } from '../mock/sort.js';
export default class SortTypesModel {
  #SORT_TYPES = null;
  constructor(SORT_TYPES) {
    this.#SORT_TYPES = SORT_TYPES;
  }

  get sortTypes() {
    return this.#SORT_TYPES.map((type) => ({
      name: type,
      enabled: !!SORT_TYPES_ENABLED.find((item) => type === item),
    }));
  }
}
