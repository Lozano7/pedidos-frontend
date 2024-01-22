import axios from 'axios';
import { getProtocol } from '../helpers/urlHelpers';

const protocol = getProtocol();

const baseURL = `${protocol}://${process.env.NEXT_PUBLIC_API_URL}/api`;

const mainFileApi = axios.create();

mainFileApi.interceptors.request.use(
  async function (config) {
    config.baseURL = baseURL;

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

mainFileApi.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  (response) => response,
  (error: any) => {
    // console.log(error);
    let errorMessage = '';

    if (error.response) {
      const enc = new TextDecoder('utf-8');
      const dataText = enc.decode(error.response.data);
      const dataJson = JSON.parse(dataText);

      errorMessage = dataJson.detail;
    } else {
      errorMessage = error.message;
    }

    const newError = {
      errorMessage,
      status: error.response?.status,
      code: error.code,
    };

    return Promise.reject(newError);
  }
);

export { baseURL, mainFileApi };
