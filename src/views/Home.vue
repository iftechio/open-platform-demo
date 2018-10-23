<template>
  <div class="home">
    <loading v-if="!allReady" />
    <template v-else>
      <UserInfo :screenName="screenName" />
      <AudioPlayer
        type="ORIGINAL_POST"
        :messageId="list[current].id"
        :pictureUrl="list[current].pictureUrl"
        :title="list[current].title"
        :encodeUrl="list[current].url"
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
import { getMusicList } from '@/api'

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
  async created () {
    const { topic: topicId } = qs.parse(window.location.search.slice(1))
    const { data } = await getMusicList(topicId)
    this.list = data.playlist
    this.current = 0

    const { user: { screenName } } = await sdk.getUserInfo()
    this.screenName = screenName
  },
  methods: {
    nextMusic () {
      this.current++
    },
    beforeMusic () {
      if (this.current !== 0) {
        this.current--
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
.home
  padding 10px
  width 100%
  display flex
  flex-direction column
  align-items center
  justify-content center
  box-sizing border-box
  background-color #fff
</style>
