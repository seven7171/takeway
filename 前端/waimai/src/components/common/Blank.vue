<template>

  <!-- 搜索框 -->
  <div class="search">
    <van-icon name="arrow-left" class="icon" @click="goBack" />
    <input type="text" @click="focusInput" ref="userNameInput" @input="searching" v-model="inputVal" />
    <div class="search-text" @click="searchKey">搜索</div>
  </div>

  <div class="blankpage">
    <!-- 搜索页面 -->
    <div class="recommend-page" v-if="type==='A'">
      <!-- 历史搜索 -->
      <div class="history-search">
        <div class="history">历史搜索</div>
        <div></div>
        <div></div>
      </div>
      <!-- 猜你想搜 -->
      <div class="guess">
        <div class="suchas">推荐前十</div>
        <!-- <div>图标</div> -->
        <ul>
          <!-- 先将数据追加到列表里再循环 -->
          <li @click="foods(i.name)" :key="i.name" v-for="i in todolist">{{i.name}}</li>
        </ul>
      </div>

      <div class="lbt" style="clear:both">猜你想搜</div>

    </div>

    <!-- 自动补全页面 -->
    <div class="auto-page" v-else-if="type==='B'">
      <ul>
        <li @click="auto_foods(item)" :key="item" v-for="item in suglist">{{item}}</li>
      </ul>

    </div>

    <!-- 点击搜索出现的内容 -->
    <div class="seachresult" v-else>
      <!-- 渲染内容 -->
      <div class="connect" v-show="!show">
        <div class="local">
          <div class="address">地址待定</div>

        </div>

        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell :key="item.id" v-for="item in results" :title="item">
            <!-- 一整个 -->
            <div class="box" @click="sendmessage(item.id)">
              <!-- 上面 -->
              <div class="top">
                <div class="left"></div>
                <div class="right">
                  <div class="message">
                    <div class="title">{{item.shopName}}</div>
                    <div class="score">评分4.9 &nbsp;&nbsp;月售 {{item.score}}</div>
                    <div class="red-package">12减3</div>
                  </div>
                  <div class="distance">{{item.distance}}</div>
                </div>
              </div>
              <!-- 下面 -->
              <div class="bom"></div>
            </div>

          </van-cell>
        </van-list>
      </div>
    </div>

  </div>

</template>

<script>
import { BlankGetOne, BlankGetTwo, BlankPostThree } from '@/api/api.js'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  setup() {
    let store = useStore()
    let router = useRouter()
    let inputVal = ref('')
    const data = reactive({
      // show: false,
      type: 'A',
      suglist: [],
      todolist: []
    })
    const goBack = () => {
      router.back()
    }
    //请求初始数据
    const initDatas = () => {
      axios.get('/blank/getSuggest').then((res) => {
        if (res.data.success === true) {
          data.todolist = res.data.data
        }
      })
      //请求数据
      BlankGetOne().then((res) => {
        // console.log(res.data)
        if (res.success === true) {
          data.todolist = res.data
        }
      })
    }
    // 搜索按钮
    const searchKey = () => {
      // console.log(inputVal)
      if (inputVal.value == '') {
        Toast('请输入内容')
      } else {
        // 发送请求
        let three = {
          key: inputVal.value,
          page: 1,
          size: 5,
          local: store.state.latlng
        }
        BlankPostThree(three)
          .then((res) => {
            // console.log(res.hotels[0])
            results.push(res.hotels[0])
          })
          .catch((err) => {
            console.log(err)
          })
        data.type = 'C'
      }
    }
    //输入框变动
    const searching = () => {
      if (inputVal.value == '') {
        data.type = 'A'
      } else {
        // 后端
        axios.get('/blank/getSearchdata').then((res) => {
          console.log(res)
          data.suglist = res.data.datas
        })
        // 发送请求---拼接字符串
        let two = {
          key: inputVal.value
        }
        BlankGetTwo(two).then((res) => {
          data.suglist = res
          // console.log(data.suglist)
        })

        data.type = 'B'
      }
    }
    //点击输入框
    const focusInput = () => {
      if (inputVal.value == '') {
        data.type = 'A'
      } else {
        data.type = 'B'
      }
    }
    // 下拉触发请求
    const results = ref([])
    const loading = ref(false)
    const finished = ref(false)
    let count = ref([0]) //length为1

    // 滚动条与底部距离小于 offset 时触发
    const onLoad = () => {
      count.push(1)
      // 再次发送请求数据
      let three = {
        key: inputVal.value,
        page: count.length, //每次触发count长度都加一
        size: 5,
        local: store.state.latlng
      }
      BlankPostThree(three)
        .then((res) => {
          console.log(res.hotels[0])
          // 不用做页面跳转！把数据push进results循环渲染
          results.push(res.hotels[0])

          // 渲染完成加载状态结束
          loading.value = false
          //如果发送请求没有返回新数据了证明加载完成
          if (!res) {
            finished.value = true
          }
        })
        .catch((err) => {
          console.log(err)
        })

      //如果发送请求没有返回新数据了证明加载完成
      //
    }

    //点击传递id信息并跳转页面
    const sendmessage = (e) => {
      // console.log(this.results)
      if (results[e - 1].id === e) {
        router.push({
          path: '/store'
          // query: {
          //传id
          // }
        })
      }
    }

    return {
      ...toRefs(data),
      goBack,
      searchKey,
      searching,
      focusInput,
      inputVal,
      initDatas,
      sendmessage,

      onLoad,
      loading,
      finished,
      results
    }
  },
  mounted() {
    // 页面渲染完成时自动聚焦到用户名输入框，ref="getfocus"
    this.$nextTick(() => {
      this.$refs.userNameInput.focus()
    })
    this.initDatas()
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 1.06667rem;
  font-size: 0.53333rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.2rem;
  input {
    width: 85%;
    border: 0.02667rem solid #ffc400;
    border-radius: 0.53333rem;
    height: 0.9rem;
    font-size: 0.5rem;
    position: absolute;
    right: 0.1rem;
  }
  .search-text {
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
    background-color: #ffc400;
    border-radius: 0.42667rem;
    width: 1.8rem;
    height: 0.85333rem;
    line-height: 0.85333rem;
    font-size: 0.37333rem;
    text-align: center;
  }
  .icon {
    position: absolute;
    left: 0.4rem;
  }
}
.blankpage {
  padding: 10px 20px 0px 20px;
  .recommend-page {
    width: 100%;
    height: 200vw;
    // background-color: pink;
  }
  .auto-page {
    width: 100%;

    // background-color: pink;
    ul li {
      height: 10vw;
      line-height: 10vw;
      font-size: 4.1vw;
      padding-left: 4vw;
      margin: 0.2vw 0;
      font-weight: 550;
    }
  }
  .history-search {
    background-color: yellowgreen;
    display: none;
  }
  .guess {
    margin: 5vw 0vw;
    // background-color: yellowgreen;
    .suchas {
      margin-bottom: 1.5vw;
      font-size: 4.5vw;
      font-weight: 600;
    }
    ul {
      li {
        float: left;
        margin-left: 3vw;
        border-radius: 3vw;
        padding: 2vw;
        color: #676363;
        background-color: #eeeded;
        margin-bottom: 2vw;
        font-size: 4vw;
      }
    }
  }
  .lbt {
    margin-bottom: 1.5vw;
    font-size: 4.5vw;
    font-weight: 600;
    margin-top: 10vw;
  }
}

.connect {
  padding: 2vw 5vw;
  position: relative;
  top: 0vw;
  border-radius: 4vw;
  background-color: white;
  .local {
    margin-bottom: 3vw;
    .address {
      color: gray;
      font-size: 15px;
    }
  }
}
.top {
  .left {
    float: left;
    width: 20vw;
    height: 20vw;
    background-color: pink;
  }
  .right {
    float: left;
    // background-color: green;
    margin: 1vw 3vw;
    width: 70%;
    .message {
      float: left;
    }
    .distance {
      float: right;
    }
    .title {
      font-weight: 600;
      font-size: 4.2vw;
    }
    .score {
      color: gray;
      font-size: 3vw;
    }
    .red-package {
      color: orange;
      font-size: 3.5vw;
    }
  }
  .bom {
    width: 100%;
    height: 50vw;
    margin-left: 22vw;
    background-color: pink;
    clear: both;
  }
}
</style>