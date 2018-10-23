import Vue from 'vue'
import { JikeOpenJsSDK } from 'jike-open-js-sdk'
import App from '@/App.vue'
import { OPEN_APP_ID } from '@/secret' // this is a secret!
import 'normalize.css'

export const sdk = new JikeOpenJsSDK(OPEN_APP_ID)

Vue.config.productionTip = false

const init = async () => {
  await sdk.ready()
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

init()
