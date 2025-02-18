import axios from 'axios';

const API_KEY = 'f43394db';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchQuery, type = '', year = '', page = 1) => {
  if (!searchQuery) {
    throw new Error('Search query is required.');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchQuery,
        type, 
        y: year, 
        r: 'json',
        page, 
      },
    });

    return response.data.Search || []; 
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
