export const FILTERS = [
  { id: 'none', label: 'No filter', cssFilter: 'none' },
  { id: 'grayscale', label: 'Black & White', cssFilter: 'grayscale(100%)' },
  { id: 'sepia', label: 'Sepia', cssFilter: 'sepia(100%)' }
];

export const getFilterById = (filterId) => {
  return FILTERS.find(filter => filter.id === filterId) || FILTERS[0];
};
