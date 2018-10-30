// 引入Vue框架
import Vue from 'vue'
// 引入根组件
import App from '@/App.vue'
import 'normalize.css'

// 引入JikeOpenJsSDK，并用OPEN_APP_ID定义一个JikeOpenJsSDK实例
import { JikeOpenJsSDK } from 'jike-open-js-sdk'
const OPEN_APP_ID = '5b97a2d200a7670328080029'  // this is a secret!
export const sdk = new JikeOpenJsSDK(OPEN_APP_ID)

// 关闭生产模式下给出的提示
Vue.config.productionTip = false

// 定义Vue实例
const init = async () => {
  await sdk.ready() // 确保JikeOpenJsSDK处于ready状态，使用前务必调用.
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

init()
