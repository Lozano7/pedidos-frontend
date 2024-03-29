import axios from 'axios';
import { getProtocol } from '../helpers/urlHelpers';

const protocol = getProtocol();

const baseURLAPI = `${protocol}://${process.env.NEXT_PUBLIC_API_URL}/api`;
const baseURL = `${protocol}://${process.env.NEXT_PUBLIC_API_URL}`;

const mainApi = axios.create();

mainApi.interceptors.request.use(
  async function (config) {
    config.baseURL = baseURLAPI;

    const token = localStorage.getItem('x-token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

mainApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: any) {
    if (error.response.status === 401) {
      localStorage.removeItem('x-token');
    }

    return Promise.reject(error);
  }
);

export { baseURL, baseURLAPI, mainApi };
