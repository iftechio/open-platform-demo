<template>
  <div class="home">
    <loading v-if="!allReady" />
    <template v-else>
      <UserInfo :screenName="screenName" />
      <AudioPlayer
        v-bind="list[current].linkInfo"
        @next="nextMusic"
        @before="beforeMusic"
      />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import qs from 'qs'
import UserInfo from '@/components/UserInfo.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import Loading from '@/components/Loading.vue'
import { sdk } from '@/main'

export default {
  name: 'home',
  components: {
    UserInfo,
    AudioPlayer,
    Loading,
  },
  data () {
    return {
      current: 0,
      list: [],
      screenName: '',
    }
  },
  computed: {
    allReady () {
      return this.screenName && this.list.length > 0
    },
  },
  created () {
    this.fetchPlayList()
    this.fetchUserInfo()
  },
  methods: {
    async fetchPlayList() {
      const { topic: topicId } = qs.parse(window.location.search.slice(1))
      const data = await sdk.getMessages(topicId)
      this.list = data.messages.filter(msg => msg.linkInfo && msg.linkInfo.audio)
      this.current = 0
    },
    async fetchUserInfo() {
      const { user: { screenName } } = await sdk.getUserInfo()
      this.screenName = screenName
    },
    nextMusic () {
      // make this list loop
      this.current = (this.current + 1) % this.list.length
    },
    beforeMusic () {
      // make this list loop
      this.current = (this.current - 1 + this.list.length) % this.list.length
    },
  },
}
</script>
<style lang="stylus" scoped>
.home
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content flex-start
  align-items center
  box-sizing border-box
  background-color #fff
</style>
