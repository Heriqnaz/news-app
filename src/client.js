import {API_KEY, BASE_URL} from "./constants";


function getFilteredNews(query) {
  return fetch(`${BASE_URL}/v2/top-headlines?${query}&apiKey=${API_KEY}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
}

function getSources(success) {
  return fetch(`${BASE_URL}/v2/sources?apiKey=${API_KEY}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}

function getTopNews(success) {
  return fetch(`${BASE_URL}/v2/top-headlines?country=us&apiKey=${API_KEY}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
}
function getArticleBySearchText(query) {
  return fetch(`${BASE_URL}/v2/everything${query}&apiKey=${API_KEY}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(checkStatus)
    .then(parseJSON)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export {
  getFilteredNews,
  getSources,
  getTopNews,
  getArticleBySearchText
}