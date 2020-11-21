import fetchAPI from '@/utils/fetch';

export async function fetchPageMeta() {
  return fetchAPI('page_meta.json');
}

export async function fetchItemMeta() {
  return fetchAPI('item_meta.json');
}

export async function fetchAnimalData() {
  return fetchAPI('animal_data.json');
}
