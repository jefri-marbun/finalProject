const API_URL = 'https://www.omdbapis.com/';
const API_KEY = 'your api key here';

export const fetchMovies = async (query) => {
  const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
  const data = await response.json();
  return data.Search || [];
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};

