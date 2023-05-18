import axios from 'axios';
import { BASE_URL } from './const.js';

const API = {
  baseUrl: BASE_URL,

  post: (endpoint, data) => {
    const url = `${API.baseUrl}${endpoint}`;
    const headers = {
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      'Content-Type': 'application/json',
    };

    return axios.post(url, data, { headers });
  },

  get: (endpoint) => {
    const url = `${API.baseUrl}${endpoint}`;
    const headers = {
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      'Content-Type': 'application/json',
    };

    return axios.get(url, { headers });
  },
};

export default API;
