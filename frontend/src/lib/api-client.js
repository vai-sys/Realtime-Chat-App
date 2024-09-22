

import axios from 'axios';
import { HOST } from '../utils/Constants';

const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true, 
});

export { apiClient };