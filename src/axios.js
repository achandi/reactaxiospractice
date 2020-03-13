import axios from 'axios';

const instanceOne = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com'
});
instanceOne.defaults.headers.common['Authorization'] = 'ANOTHER auth token';

export default instanceOne;
