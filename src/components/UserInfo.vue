<template>
  <div class="userInfo">
    {{ screenName }}, 来听听今天的推荐歌曲吧
  </div>
</template>
<script>

export default {
  name: 'UserInfo',
  props: {
    screenName: { type: String, default: '' },
    // avatarUrl: { type: String, default: '' },
  },
}
</script>
<style lang="stylus" scoped>
.userInfo
  width 100%
  text-align: left;
  padding: 7px 24px;
  font-size: 15px;
  color: #636363;
  font-weight: 800;
</style>
