<template>
  <div
    class="audio-mini-player"
    :class="{ playing: playing }"
    @click.stop
    @touchstart.stop
  >
    <audio
      ref="audio"
      :src="url"
      @play="onAudioPlay"
      @pause="onAudioStop"
      @ended="onAudioEnd"
      @timeupdate="timeupdate"
    >
      您的浏览器不支持 audio 标签。
    </audio>
    <div class="ctrl-btn left" @click="before"> ◀◀ </div>
    <div
      class="cover"
      :style="{ backgroundImage: `url(${pictureUrl})` }"
    >
      <button
        class="op-btn"
        v-show="url"
        @click.stop="play"
      />
    </div>
    <div class="info" @click="onInfoClick">
      <h1 class="title">{{ title.split('-')[1] }}</h1>
      <h3 class="author">{{ title.split('-')[0] }}</h3>
    </div>
    <div class="progress">
      <div :style="{ width: progress }"></div>
    </div>
    <div class="ctrl-btn right" @click="next"> ▶▶ </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { getAudioMeta } from '@/api'

const audioList = []
export default {
  name: 'AudioPlayer',
  components: {},
  props: {
    pictureUrl: { type: String, default: '' },
    title: { type: String, default: '' },
    encodeUrl: { type: String, default: '' },
    messageUrl: { type: String, default: '' },
  },
  data () {
    return {
      originalLink: '',
      playing: false,
      progress: '0',
      url: '',
      nextPlaying: false,
    }
  },
  methods: {
    async fetchAudioMeta () {
      const { data } = await getAudioMeta(this.encodeUrl)
      this.url = data.url
    },
    play () {
      if (!this.playing) {
        audioList.forEach((audio) => {
          audio.pause()
        })
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    timeupdate () {
      const { currentTime, duration } = this.$refs.audio
      if (currentTime && duration) {
        this.progress = `${(currentTime / duration) * 100}%`
      }
    },
    onAudioPlay () {
      this.playing = true
      this.nextPlaying = true
    },
    onAudioStop () {
      this.playing = false
      this.nextPlaying = false
    },
    onAudioEnd () {
      this.nextPlaying = true
      this.next()
    },
    next () {
      this.playing = false
      this.$emit('next')
      this.$nextTick(this.makeItWork)
    },
    before () {
      this.playing = false
      this.$emit('before')
      this.$nextTick(this.makeItWork)
    },
    async makeItWork () {
      await this.fetchAudioMeta()
      if (this.nextPlaying) {
        this.play()
      }
    },
    onInfoClick() {
      window.location.href = this.messageUrl
    }
  },
  async mounted () {
    audioList.push(this.$refs.audio)
    await this.fetchAudioMeta()
  },
  beforeDestroy () {
    audioList.splice(audioList.indexOf(this.$refs.audio), 1)
  },
}
</script>
<style lang="stylus" scoped>
.audio-mini-player
  width 90%
  position relative
  display flex
  justify-content space-between
  align-items center
  overflow hidden
  height 100px
  border-radius 10px
  background #ffe411
  border 3px solid #ffffff9c
  transition all 0.3s linear
  box-shadow 0px 4px 21px 0px rgba(121, 108, 16, 0.24)
// .audio-mini-player.playing
//   border-top-left-radius 40px
//   border-bottom-left-radius 40px

.cover
  position relative
  display flex
  justify-content center
  align-items center
  flex 0 0 auto
  width 80px
  height 80px
  border-color transparent
  overflow hidden
  background rgba(0, 0, 0, 0.5)
  background-repeat no-repeat
  background-size 100% 100%
  transition all 0.3s linear
  border-radius 3px
.cover::after
  content ''
  display block
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  background rgba(0, 0, 0, 0.3)
  z-index 0
.playing .cover
  border-radius 100%
  height 70px
  width 70px
  margin 5px
  animation rotate 5s linear infinite
  animation-delay 0.3s
@keyframes rotate
  from
    transform rotate(0)
  to
    transform rotate(360deg)
.op-btn
  position relative
  z-index 1
  width 40px
  height 40px
  border 2px solid #fff
  border-radius 50%
  background rgba(255, 255, 255, 0.3)
.op-btn::before
  content ''
  position absolute
  border-left 16px solid #fff
  border-top 10px solid transparent
  border-bottom 10px solid transparent
  top 9px
  left 12px
.playing .op-btn
  animation rotate 5s linear infinite
  animation-direction reverse
  animation-delay 0.3s
.playing .op-btn::before
  border none
  height 20px
  width 2px
  border-radius 1px
  background #fff
.playing .op-btn::after
  content ''
  position absolute
  height 20px
  width 2px
  background #fff
  top 9px
  right 12px
  border-radius 1px
.info
  width 135px
  position relative
  display flex
  padding 0px 5px
  flex-direction column
  justify-content center
  line-height 1.2
  overflow hidden
  white-space nowrap
.title, .author
  overflow hidden
  text-overflow ellipsis
.title
  margin-bottom 8px
  font-size 15px /* px */
  color #333
.author
  font-size 12px /* px */
  color #888
.progress
  position absolute
  bottom 0
  left 0px
  width 100%
  height 2px /* no */
  transition margin 0.3s linear
.progress > div
  height 100%
  width 0
  background #03a9f4
audio
  display none
.title
  margin-bottom 8px
  font-size 15px
  color #333
  overflow hidden
  text-overflow ellipsis
button:focus
  outline-style none
.ctrl-btn
  display flex
  flex-direction column
  align-items center
  justify-content center
  padding 0px 20px
  height 100%
  width 50px
  color #000000
  &.left
    border-top-left-radius 10px
    border-bottom-left-radius 10px
    border-right 2px solid #ffffff7a
  &.right
    border-top-right-radius 10px
    border-bottom-right-radius 10px
    border-left 2px solid #ffffff7a

</style>
