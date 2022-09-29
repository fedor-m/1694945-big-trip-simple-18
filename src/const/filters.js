export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};
export const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};
export const FILTER_TYPE_DEFAULT = FilterType.EVERYTHING;
