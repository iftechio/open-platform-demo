import Axios from 'axios'

Axios.defaults.baseURL = 'https://activity-beta.jike.ruguoapp.com/1.0/playlist'

// 获得播放列表
export const getMusicList = (topicId) =>
  Axios.get(`/show?topicid=${topicId}`)

// 获取播放链接
export const getAudioMeta = (url) =>
  Axios.post(`/extract`, { url })
