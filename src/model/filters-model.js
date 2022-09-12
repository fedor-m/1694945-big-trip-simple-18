import { FILTERS, filterEnabledOnNoEvents } from '../mock/filters.js';
export default class FiltersModel {
  #length = null;
  constructor(length){
    this.#length = length;
  }

  get filters() {
    if(this.#length === 0)
    {
      return FILTERS.map((filter)=>({
        'name': filter,
        'enabled': !!filterEnabledOnNoEvents.find((item)=>filter === item),
        'checked': !!filterEnabledOnNoEvents.find((item)=>filter === item),
      }));
    }
    return FILTERS.map((filter)=>({
      'name': filter,
      'enabled': true,
    }));
  }
}
