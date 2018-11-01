### 立即开始：一个简单的小例子

在这个例子里，我们会开发一个主题插件应用 Music-Playlist-Player。这个插件将主题「最近听了什么歌」下的歌曲整理后播放。

为了完成这个功能，首先要获得该主题下的动态和用户信息，然后过滤出有歌曲的动态，再提取出歌曲相关的信息，最后让播放器播放歌曲列表。

开始前，请完成以下流程：

0. 一些准备
- 注册开发者账号
- 注册应用 
- 等待审核结果
审核通过后，你的应用会有一个唯一的`OPEN_APP_ID`，在`JikeOpenJsSDK`中配置你的`OPEN_APP_ID`后，就可以调用`JikeOpenJsSDK`提供的API了。

那么如何配置呢？
- 安装sdk： `npm install jike-open-js-sdk -s`
- 在你的项目里引入`JikeOpenJsSDK`
```js
import { JikeOpenJsSDK } from 'jike-open-js-sdk'
```
- 新建`JikeOpenJsSDK`
```js
const OPEN_APP_ID = 'your_open_app_id'  
const sdk = new JikeOpenJsSDK(OPEN_APP_ID)
```
- 调用`JikeOpenJsSDK`提供的方法前，请确保`JikeOpenJsSDK`处于ready状态:
```js
await sdk.ready() 
```

接下来就可以使用`JikeOpenJsSDK`完成一个音乐播放器了。


1. 如何获得该主题下的动态和用户信息呢？
  `JikeOpenJsSDK`提供了 ***获取某主题下的热门动态*** 的API，直接调用sdk的相应方法即可：
  ```const { data } = await sdk.getMessages(topicId) ```
  这个API会返回如下数据：

  ```json
  { "data": 
    {
      "messages": [
        {
          "id": "5bd93e46e594d30011d6ac7b",
          "content": "2003年王磊和法国著名dub乐队High Tone 合作了一张叫 Wang Tone的专辑，2005年发行。现在听来都不落后于当下这个时代甚至还有点超前。\n\n推荐其中的这首「弼马温」，摇头晃脑的这个劲，又重又欢乐，特别适合中年养生快乐摇。\n\n这个慢慢摇的弼马温比起西游记电视剧里那个啾啾啾就踩着筋斗云远去的孙悟空，就好比罚点球助跑的博格巴之于比100米决赛的博尔特。",
          "urlsInText": [],
          "createdAt": "2018-10-31T05:31:50.609Z",
          "user": {
            "id": "37C33654-E7B2-40DE-A870-DE1CED640E66",
            "screenName": "alissi",
            "profileImage": {
              "thumbnailUrl": "https://cdn.ruguoapp.com/FuBFMX1Szgf0pie_HSuFeg48vb0W.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/120x120%3E/quality/30",
              "middlePicUrl": "https://cdn.ruguoapp.com/FuBFMX1Szgf0pie_HSuFeg48vb0W.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/300x300%3E/quality/30",
              "picUrl": "https://cdn.ruguoapp.com/FuBFMX1Szgf0pie_HSuFeg48vb0W.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/1000x1000%3E/quality/30",
              "format": "jpeg"
            }
          },
          "linkInfo": {
            "title": "High Tone - Bi Ma Wen Le palefrenier des ecuries celestes",
            "pictureUrl": "https://pic-txcdn.ruguoapp.com/FrSjF7xCZpRLbR2NyYnd_2ja7aUK?imageMogr2/auto-orient/heic-exif/1/format/jpeg?imageView2/0/w/160/h/160/q/80",
            "linkUrl": "https://h.xiami.com/song.html?id=1770908622",
            "audio": {
              "author": "High Tone",
              "title": "Bi Ma Wen Le palefrenier des ecuries celestes"
            }
          }
        },
        {
          "id": "5bd921bcdd25bb0011ff39c1",
          "content": "金庸先生已然千古，想到那刀光剑影快意恩仇的武侠世界，你印象最深的是哪首歌？课代表最喜欢的还是这首周华健的《刀剑如梦》",
          "urlsInText": [],
          "createdAt": "2018-10-31T03:30:04.528Z",
          "user": {
            "id": "yinyuekedaibiao",
            "screenName": "音乐课代表",
            "profileImage": {
              "thumbnailUrl": "https://cdn.ruguoapp.com/FuN-_CooKqaxeTpuWm8-q_0BUd-t.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/120x120%3E/quality/30",
              "middlePicUrl": "https://cdn.ruguoapp.com/FuN-_CooKqaxeTpuWm8-q_0BUd-t.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/300x300%3E/quality/30",
              "picUrl": "https://cdn.ruguoapp.com/FuN-_CooKqaxeTpuWm8-q_0BUd-t.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/1000x1000%3E/quality/30",
              "format": "jpeg"
            }
          },
          "linkInfo": {
            "title": "周华健 - 刀剑如梦",
            "pictureUrl": "https://pic-txcdn.ruguoapp.com/FuCvS00ApGCS2thw6Wnl3kD9xjtp?imageMogr2/auto-orient/heic-exif/1/format/jpeg?imageView2/0/w/160/h/160/q/80",
            "linkUrl": "https://music.163.com/#/song?id=186315",
            "audio": {
              "author": "周华健",
              "title": "刀剑如梦"
            }
          }
        },
        {
          "id": "5bd68640bbd881001782dd70",
          "content": "参加了鹅厂的《创造101》后3unshine的公司发力运营，近日还给组合成员Cindy发布新单曲《不正确的审美》并拍摄了新MV\n\n出道以来，3unshine的业务能力一直备受争议，但从《朵蜜》到《不正确的审美》，整个团体和公司表现出的审美能力与制作水准还是得到了不少肯定。这次C皇的新单请到一线EDM制作人陈星翰（编曲过蔡依林冠单《PLAY 我呸》）合作，词曲来自老板张铠麟\n\n课代表认为单从这首新单的整体成色来看即便不如大爆过的《朵蜜》，不过在这今年发过的女团歌里，有很多方面的确技高一筹。围绕这首歌的讨论主要集中于：1.C皇虽有进步业务能力提升但仍驾驭不了高水平的歌曲制作和包装；2.高配资源打造的单曲匠气很重少了3unshine原本散发的野生活力\n\n在听完这首歌后，各位即友怎么评价C皇的新单呢？欢迎友善讨论~",
          "urlsInText": [],
          "createdAt": "2018-10-29T04:02:08.874Z",
          "user": {
            "id": "yinyuekedaibiao",
            "screenName": "音乐课代表",
            "profileImage": {
              "thumbnailUrl": "https://cdn.ruguoapp.com/FuN-_CooKqaxeTpuWm8-q_0BUd-t.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/120x120%3E/quality/30",
              "middlePicUrl": "https://cdn.ruguoapp.com/FuN-_CooKqaxeTpuWm8-q_0BUd-t.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/300x300%3E/quality/30",
              "picUrl": "https://cdn.ruguoapp.com/FuN-_CooKqaxeTpuWm8-q_0BUd-t.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/1000x1000%3E/quality/30",
              "format": "jpeg"
            }
          }
        }
      ]
    },
    "count": 3,
  }
  ```
同样的，`JikeOpenJsSDK`提供了 ***获取当前用户信息*** 的API：
  ```js
  const { user: { screenName } } = await sdk.getUserInfo()
  ```
这个API会返回如下数据：
  ```json
  {
    "data": {
      "user": {
        "id": "F87FE5F2-B047-4810-AAB2-2C1D51157dd9D",
        "screenName": "hhh",
        "profileImage": {
            "thumbnailUrl": "https://cdn.ruguoapp.com/FlcID8NOEZqlxzG4MARIwA6tmwIa.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/120x120>/quality/30",
            "middlePicUrl": "https://cdn.ruguoapp.com/alcID8NOEZqlxzG4MARIwA6tmwId.jpg?imageMogr2/auto-orient/format/jpeg/thumbnail/300x300>/quality/30",
            "picUrl": "https://cdn.ruguoapp.com/FlcIa8NOEZqlxzG4MARIwA6tmwId.jpg?imageMogr2/auto-orient/format/jpeg/thuabnail/1000x1000>/quality/30",
            "format": "jpeg"
        },
        "isLoginUser": true
      }
    }
  }
  ```

2. 过滤出包含歌曲的动态
并不是每条动态都包含歌曲，所以要过滤出包含歌曲的动态: 
  ```js
  const songs = data.messages.filter(msg => msg.linkInfo && msg.linkInfo.audio)
  ```

3. 提取出歌曲相关的信息 
返回的数据包含的信息很多，但音乐播放器拿到这些信息即可：
  - 动态id 
  - 歌曲名称title 
  - 歌曲封面pictureUrl 
  - 歌曲的网页链接linkUrl
将这些信息整理为一个歌曲列表：
  ```js
  const playlist = songs.map(s => {
    return {
      url:  s.linkInfo.linkUrl, 
      id: s.id, 
      title: s.linkInfo.title,
      pictureUrl: s.linkInfo.pictureUrl,
    }
  })
  ```
这里的linkUrl仅为歌曲的网页链接，为了获得音频链接，仍需解析，这里只用了即刻的音频解析服务。

4. 完成播放器相关的前端任务。

### 前端部分

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


