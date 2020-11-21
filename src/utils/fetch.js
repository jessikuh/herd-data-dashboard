const fetch = require('node-fetch');

export default async function fetchAPI(path) {
  const base = process.env.VUE_APP_SAMPLE_API;
  const lastChar = base.substr(-1);
  let fetchURL = `${base}/${path}`;

  if (lastChar === '/') fetchURL = `${base}${path}`;

  return fetch(`${fetchURL}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => {
      console.error(err);
    });
}
