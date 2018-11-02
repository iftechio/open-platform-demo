import Axios from 'axios'
import { HOST } from './constant'

Axios.defaults.baseURL = HOST

export const getAudioMeta = (url) =>
  Axios.post(`/extract`, { url })
