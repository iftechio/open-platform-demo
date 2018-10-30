### 立即开始：一个简单的小例子

在这个例子里，我们会开发一个主题插件应用 Music-Playlist-Player。这个插件将「最近听了什么歌」这个主题下的热门歌曲整理后依次播放。

这个插件使用了两个权限：`默认权限` 和 `主题插件权限`。

主要代码如下。

#### 运行

- 插件安装
- `npm run serve` 
- 访问 http://localhost:8080/


#### App.vue

建立根组件

```html
<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from '@/views/Home.vue'
export default {
  components: {
    Home,
  },
}
</script>
```

#### main.js 

引入vue框架和根组件，定义vue实例，定义JikeOpenJsSDK实例并初始化。

```js
// 引入Vue框架
import Vue from 'vue'
// 引入根组件
import App from '@/App.vue'
import 'normalize.css'

// 引入JikeOpenJsSDK，并用OPEN_APP_ID定义一个JikeOpenJsSDK实例
import { JikeOpenJsSDK } from 'jike-open-js-sdk'
const OPEN_APP_ID = '5b97a2d200a7670328080029'  
export const sdk = new JikeOpenJsSDK(OPEN_APP_ID)

// 关闭生产模式下给出的提示
Vue.config.productionTip = false

const init = async () => {
  // 确保JikeOpenJsSDK处于ready状态，使用前务必调用.  
  await sdk.ready() 
  // 定义Vue实例
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

init()
```

- 调用JikeOpenJsSDK提供的方法前，务必调用`await sdk.ready() `，确保JikeOpenJsSDK处于ready状态。
- OPEN_APP_ID请安全保存，此处仅作举例。

#### Home.vue

`created`函数会在Vue实例创建完成后、挂载前调用，在这里获得所需全部数据：歌曲列表`list`和用户信息`screenName`。

```js
async created () {
  const { topic: topicId } = { topic: '5a1ccf936e6e7c0011037480' } // 「最近听了什么歌」 主题ID
  const { data } = await getMusicList(topicId)
  this.list = data.playlist
  this.current = 0

  const { user: { screenName } } = await sdk.getUserInfo()
  this.screenName = screenName
}
```
其中歌曲列表来自外部API，用户信息来自sdk。

获取全部数据前，会展示loading组件；全部获取成功后，父组件将数据传递给UserInfo和AudioPlayer组件，并显示这两个组件，参考代码如下：

```html
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
```



接下来介绍用到的几个组件。

#### Loading.vue

这个组件比较简单。

```js
<template>
  <div class="loading">this player is LOADING ...</div>
</template>
```

#### UserInfo.vue

这里定义了UserInfo组件，接收父组件传递的screenName。

```html
<template>
  <div class="userInfo">
    {{ screenName }}, 来听听今天的推荐歌曲吧
  </div>
</template>
```

#### AudioPlayer.vue

这里定义了AudioPlayer组件，这个组件接收父组件传递的数据，完成了歌曲播放与暂停、上一首与下一首、播放进度显示、歌曲信息与歌曲封面展示。

播放状态由`playing`控制：
- 若当前歌曲是播放状态，上一首和下一首也会是播放状态
- 若当前歌曲是暂停状态，上一首和下一首也会是暂停状态

所以，

当`<audio>`的`play`事件或`pause`事件触发时，更改播放状态，`ended`事件触发时，播放下一首，参考代码如下：

```html
<audio
      ref="audio"
      :src="url"  
      @play="playing = true"
      @pause="playing = false"
      @ended="next"
      @timeupdate="timeupdate"
>
      您的浏览器不支持 audio 标签。
</audio>
```

`<audio>`的`timeupdate`事件每个tick都会触发，进而调用其绑定的`timeupdate`方法，这个方法会更新播放进度条，并且当播放完毕时，自动播放下一首。


```js
{
    if (this.$refs.audio.currentTime && this.$refs.audio.duration) {
    this.progress = `${(this.$refs.audio.currentTime / this.$refs.audio.duration) * 100}%`
    if ((this.$refs.audio.currentTime / this.$refs.audio.duration) === 1) {
        await this.next()
    }
    }
}
```

当▶️按钮的`click`事件触发时，调用其绑定的`play`方法。若当前处于未播放或暂停状态，则播放下一首，调用`<audio>`元素的`play`方法；若处于播放状态，则暂停播放，调用`<audio>`元素的`pause`方法。

``` js
play () {
  this.playing ? this.$refs.audio.pause() : this.$refs.audio.play()
}
```

当⏭按钮的`click`事件触发时，调用其绑定的`next`方法，获取下一首歌的数据，并判断是否播放。

```js
async next () {
  await this.$emit('next')
  this.$nextTick(async () => {
    await this.fetchAudioMeta()
    if (this.playing) {
      this.$refs.audio.play()
    }
  })
}
```

当⏮按钮的`click`事件触发时，调用其绑定的`before`方法，获取上一首歌的数据，并判断是否播放。

```js
async before () {
  await this.$emit('before')
  this.$nextTick(async () => {
    await this.fetchAudioMeta()
    if (this.playing) {
      this.$refs.audio.play()
    }
  })
}
```


