const fetch = require('node-fetch');

export default async function fetchAPI(path) {
  const base = process.env.VUE_APP_SAMPLE_API;

  return fetch(`${base}/${path}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.error(err);
    });
}
