import fetchAPI from '@/utils/fetch';

export function fetchPageMeta() {
  return fetchAPI('page_meta.json');
}

export function fetchItemMeta() {
  return fetchAPI('item_meta.json');
}

export function fetchAnimalData() {
  return fetchAPI('animal_data.json');
}
